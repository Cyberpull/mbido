import { defineConfig } from 'rollup';
import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import CleanCSS from 'clean-css';

const minifyCSS = () => {
  return {
    name: 'mbi-minify-css',
    version: '1.0.0',

    async generateBundle(options, bundle) {
      const clean = new CleanCSS({ sourceMap: true });

      for (const [filename, data] of Object.entries(bundle)) {
        if (!filename.endsWith('.css')) continue;

        const output = clean.minify(data.source, {
          version: 3,
          file: filename,
          sources: [],
          sourcesContent: [data.source],
          mappings: '',
        });

        data.source = output.styles;

        if (output.sourceMap) {
          const { sourceMap } = output;

          const mapname = filename + '.map';
          data.source += `\n/*# sourceMappingURL=${mapname} */`;

          this.emitFile({
            type: 'asset',
            fileName: mapname,
            source: sourceMap.toString(),
          });
        }
      }
    }
  };
};

export default defineConfig({
  input: {
    mbido: `src/main.js`,
  },

  output: [
    {
      dir: 'dist',
      entryFileNames: '[name].js',
      format: 'iife',
    },
    {
      dir: 'dist',
      entryFileNames: '[name].min.js',
      format: 'iife',
      sourcemap: true,
      plugins: [
        minifyCSS(),
        terser(),
      ],
    },
  ],

  treeshake: true,

  plugins: [
    postcss({
      extract: true,
      modules: false,
      use: ['sass'],
      plugins: [],
    }),

    resolve(),

    commonjs(),

    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': "'production'"
    }),

    babel({
      presets: ['@babel/preset-env'],
      babelHelpers: 'bundled'
    }),
  ]
});
