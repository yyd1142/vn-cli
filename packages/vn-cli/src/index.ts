import { program } from 'commander';
import Table from 'cli-table3';
import chalk from 'chalk';
import prompts from 'prompts';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { TEMPLATES } from './config';
import { makeDir, removeDir, copyFiles } from './utils';
import { name, version, description } from '../package.json';

program.name(name).description(description).version(version);

/** 查看目前所提供的模版: --list */
program.option('-l, --list', 'Show all currently available templates.').action(() => {
  const table = new Table({
    head: [chalk.blue('Template name'), chalk.blue('Desc')],
    colWidths: [40, 60],
  });
  for (const key in TEMPLATES) {
    table.push([key, chalk.green(TEMPLATES[key] ?? '')]);
  }
  // 显示表格
  console.info(table.toString());
});

/** 创建next.js项目: create-next yourProjectName -t templateName */
program
  .command('create-next <project-name>')
  .description('Create a next.js project.')
  .option(
    '-t, --template <template-name>',
    'Please enter template name.',
  )
  .action(async (projectName, options) => {
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
      // 如果输入的命令里没有传-t, --template的话，就开始询问开发者
      const { isAppRouter } = await prompts([
        {
          type: 'toggle',
          name: 'isAppRouter',
          message: `Would you like to use ${chalk.blue('App Router')}? (recommended)`,
          initial: true,
          active: 'yes',
          inactive: 'no',
        },
      ]);
      if (isAppRouter) {
        // TODO
      } else {
        // TODO
      }
    }
  });

program.parse();