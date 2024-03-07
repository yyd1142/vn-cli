import { defineBuildConfig } from 'unbuild';
import path from 'node:path';

export default defineBuildConfig({
  entries: ['src/index'],
  clean: true,
  rollup: {
    inlineDependencies: true,
    esbuild: {
      target: 'node18',
      minify: false,
    },
  },
  alias: {		
    '@': path.resolve(__dirname, './src')
},
});
