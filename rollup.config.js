import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import pkg from './package.json';

const plugins = () => {
  return [
    typescript(),
    terser({
      ecma: 5,
      module: true,
      toplevel: true,
      compress: { pure_getters: true },
      format: { wrap_func_args: false },
    }),
  ];
};

export default [
  {
    input: 'src/index.tsx',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        file: 'dist/index.js',
        exports: 'named',
        sourcemap: true,
        strict: true,
      },
    ],
    plugins: plugins(),
    external: ['react', 'react/jsx-runtime', 'colorblender'],
  },
  {
    input: 'src/index.tsx',
    output: [
      {
        file: pkg.main,
        format: 'es',
        file: 'dist/index.mjs',
        exports: 'named',
        sourcemap: true,
        strict: true,
      },
    ],
    plugins: plugins(),
    external: ['react', 'react/jsx-runtime', 'colorblender'],
  },
  {
    input: 'src/style.css',
    output: {
      file: 'dist/style.css',
      name: 'style',
    },
    plugins: [
      postcss({
        extract: true,
        sourceMap: false,
        minimize: true,
        plugins: [],
      }),
    ],
  },
];
