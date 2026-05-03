import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import fs from 'fs';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

export default [
  // 1. Package Format (ESM and CJS)
  {
    input: 'index.js',
    output: [
      {
        file: 'dist/index.cjs.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      }
    ],
    // Treat peer dependencies and react as external so they are not bundled
    external: Object.keys(packageJson.peerDependencies || {}).concat(['react', 'react-dom']),
    plugins: [
      resolve({
        extensions: ['.js', '.jsx']
      }),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        presets: [
          '@babel/preset-env',
          ['@babel/preset-react', { runtime: 'automatic' }]
        ],
        extensions: ['.js', '.jsx'],
        exclude: 'node_modules/**'
      }),
      postcss({
        config: true,
        inject: true,
        extract: false
      })
    ]
  },
  // 2. CDN Format (UMD minified)
  {
    input: 'index.js',
    output: {
      file: 'dist/index.umd.min.js',
      format: 'umd',
      name: 'UiLibrarySpj', // Global variable name when used via CDN
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM'
      },
      sourcemap: true,
    },
    external: ['react', 'react-dom'],
    plugins: [
      resolve({
        extensions: ['.js', '.jsx']
      }),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        presets: [
          '@babel/preset-env',
          ['@babel/preset-react', { runtime: 'automatic' }]
        ],
        extensions: ['.js', '.jsx'],
        exclude: 'node_modules/**'
      }),
      postcss({
        config: true,
        inject: true,
        extract: false
      }),
      terser() // Minifies the output for CDN
    ]
  }
];
