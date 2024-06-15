import { ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/types';
import ReactRefreshTypeScript from 'react-refresh-typescript';
// import { buildBabelLoader } from './babel/buildBabelLoader';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const { mode } = options;

  const stylesWithModules = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName:
          mode === 'development' ? '[path][name]__[local]' : '[hash:base64:8]',
      },
    },
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      stylesWithModules,
      // Compiles Sass to CSS
      'sass-loader',
    ],
  };

  const tsLoader = {
    test: /\.tsx?$/,
    // ts-loader умеет работать с JSX
    // Если бы мы не использовали TypeScript: нужен был бы babel-loader
    use: [
      {
        loader: 'ts-loader',
        options: {
          // Отключает проверку типов во время сборки (ускоряет сборку)
          transpileOnly: mode === 'development',
          // Доп настройка для DevServer (для React), чтоб не перезагружалась страница при любых изменениях в коде
          getCustomTransformers: () => ({
            before: [mode === 'development' && ReactRefreshTypeScript()].filter(
              Boolean
            ),
          }),
        },
      },
    ],
    exclude: /node_modules/,
  };

  // const babelLoader = buildBabelLoader(options);

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };

  // позволяет работать с svg как с React-компонентами
  const svgrLoader = {
    test: /\.svg$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          // позволяет для svg использовать свойство color, а не fill
          svgoConfig: {
            plugins: [
              {
                name: 'convertColors',
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  };

  return [
    // порядок имеет значение
    assetLoader,
    scssLoader,
    tsLoader,
    // babelLoader,
    svgrLoader,
  ];
}
