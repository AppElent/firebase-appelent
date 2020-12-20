import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';

import pkg from './package.json';

export default {
    input: 'src/index.ts',
    output: [
        {
            dir: 'lib',
            format: 'cjs',
            exports: 'named',
            sourcemap: true,
            inlineDynamicImports: true,
        },
        {
            dir: 'lib',
            format: 'es',
            exports: 'named',
            sourcemap: true,
            inlineDynamicImports: true,
        },
    ],
    plugins: [
        external(),
        resolve(),
        typescript({
            rollupCommonJSResolveHack: true,
            exclude: '**/__tests__/**',
            clean: true,
        }),
        commonjs({
            include: ['node_modules/**'],
            namedExports: {
                'node_modules/react/react.js': ['Children', 'Component', 'PropTypes', 'createElement'],
                'node_modules/react-dom/index.js': ['render'],
                'node_modules/react-is/index.js': [
                    'isElement',
                    'isValidElementType',
                    'ForwardRef',
                    'Memo',
                    'isFragment',
                ],
                'node_modules/react-router/node_modules/react-is/index.js': ['isValidElementType'],
                'node_modules/lodash/lodash.js': ['isEmpty'],
                'node_modules/react-redux/node_modules/react-is/index.js': ['isValidElementType', 'isContextConsumer'],
                'node_modules/material-table/dist/index.js': ['MTableEditField'],
            },
        }),
    ],
};
