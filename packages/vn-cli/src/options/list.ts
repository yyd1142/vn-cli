import Table from 'cli-table3';
import chalk from 'chalk';

import { TEMPLATES } from '@/config';

import type { Command } from 'commander';

  /** 查看目前所提供的模版: --list */
export const list = (program: Command) => {
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
}