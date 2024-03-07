import { program } from 'commander';

import { name, version, description } from '../package.json';
import { createNext, createVite } from '@/commands';
import { list } from '@/options';

program.name(name).description(description).version(version);

// commands
createNext(program);
createVite(program);

// options
list(program);

program.parse();