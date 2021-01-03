import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import ts from 'rollup-plugin-typescript2';

export default {
    input: 'src/index.ts',
    output: {
        format: 'cjs',
        file: path.resolve('dist/bundle.js')
    },
    plugins: [
        ts({
            tsconfig: path.resolve('tsconfig.json')
        }),
        nodeResolve({
            extensions: ['js', 'ts']
        })
    ]
}