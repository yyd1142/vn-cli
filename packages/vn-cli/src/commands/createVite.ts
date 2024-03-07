import prompts from 'prompts';
import download from 'download-git-repo';
import ora from 'ora';

import { TEMPLATES } from '@/config';
import { makeDir, removeDir, replaceTemplateText } from '@/utils';

import type { Command } from 'commander';

  /** 创建vite react项目: create-vite yourProjectName -t templateName */
export const createVite = (program: Command) => {
  program
    .command('create-vite [project-name]')
    .description('Create a react project by vite')
    .option(
      '-t, --template <template-name>',
      'Please enter template name.',
    )
    .action(async (projectName = 'my-app', options) => {
      const { myName } = await prompts([
        {
          type: 'text',
          name: 'myName',
          message: `What is your project named?`,
          initial: projectName
        },
      ]);
      const projectDir = makeDir(myName);

      if (options?.template) {
        const template = options.template;
        const flag = !!TEMPLATES?.[template];

        // 如果有这个模板代码，就创建目录，并且把模板代码都拷贝到开发者的目录里，反之就删掉刚创建的目录
        if (flag) {
          // TODO
        } else {
          removeDir(projectDir);
          console.info(`Cannot find template: ${template}, please check whether the template name is correct? `);
        }
      } else {
        const spinner = ora('Downloading repository...').start(); // 开始loading
        download('github:yyd1142/vite-react-template', projectDir, (error: any) => {
          if (error) {
            spinner.fail('Download failed');
            removeDir(projectDir);
          } else {
            spinner.succeed('Download completed');
            // 替换package.json里的name为项目名称
            replaceTemplateText(`${projectDir}/package.json.hbs`, { projectName: myName });
          }
        });
      }
    });

};