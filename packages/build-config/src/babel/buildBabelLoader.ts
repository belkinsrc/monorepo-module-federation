import { BuildOptions } from 'config/types/types';
import { removeDataTestIdBabelPlugin } from './removeDataTestIdBabelPlugin';

export function buildBabelLoader({ mode }: BuildOptions) {
  const plugins = [];

  if (mode === 'production') {
    plugins.push([
      removeDataTestIdBabelPlugin,
      {
        props: ['data-testid'],
      },
    ]);
  }

  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-typescript',
          [
            '@babel/preset-react',
            {
              runtime: mode === 'development' ? 'automatic' : 'classic',
            },
          ],
        ],
        plugins: plugins.length ? plugins : undefined,
      },
    },
  };
}
