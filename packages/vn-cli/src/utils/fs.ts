import path from 'node:path';
import fs from 'node:fs';
import util from 'node:util';
import handlebars from 'handlebars';

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);
const copyFile = util.promisify(fs.copyFile);
const mkdir = util.promisify(fs.mkdir);

/** 拷贝目录 */
export const copyFiles = async (srcDir: string, destDir: string) => {
  try {
    // 确保目标目录存在
    await mkdir(destDir, { recursive: true });

    // 读取源目录的内容
    const files = await readdir(srcDir);

    for (const file of files) {
      const srcFilePath = path.join(srcDir, file);
      const destFilePath = path.join(destDir, file);

      // 检查是文件还是目录
      const fileStat = await stat(srcFilePath);

      if (fileStat.isDirectory()) {
        // 如果是目录，则递归调用函数自身
        await copyFiles(srcFilePath, destFilePath);
      } else {
        // 如果是文件，则复制文件
        await copyFile(srcFilePath, destFilePath);
      }
    }
  } catch (err) {
    console.warn('Error copying files:', err);
  }
};

/** 创建目录 */
export const makeDir = (name: string) => {
  const projectPath = path.join(process.cwd(), name);

  // 检查目录是否已经存在
  if (fs.existsSync(projectPath)) {
    return projectPath;
  }

  try {
    fs.mkdirSync(projectPath, { recursive: true });
    return projectPath;
  } catch (err: any) {
    console.error(`Error creating directory: ${err.message}`);
    return projectPath;
  }
};

/** 删除目录 */
export const removeDir = (srcDir: string) => {
  fs.rm(srcDir, { recursive: true, force: true }, (err) => {
    if (err) {
      // 处理错误
      console.error(err);
    } else {
      console.error('Directory and all its contents have been deleted.');
    }
  });
};


/** 使用handlebars替换占位字符串为project name */
export const replaceTemplateText = (filePath: string, params: ReplaceTemplateParams) => {
  // 读取 *.hbs 模版文件的内容
  const templateContent = fs.readFileSync(filePath, 'utf8');

  // 使用 Handlebars 编译模版
  const compiledTemplate = handlebars.compile(templateContent);

  // 替换占位字符串为 projectName
  const replacedContent = compiledTemplate(params);
  const newFilePath = filePath.split('.hbs')[0];

  // 删除原始的 *.hbs 文件
  fs.unlinkSync(filePath);

  // 将替换后的内容写入新文件
  if (newFilePath) fs.writeFileSync(newFilePath, replacedContent);


};