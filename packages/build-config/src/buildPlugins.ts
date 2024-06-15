import { Configuration, DefinePlugin, ProgressPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/types';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
// import ForkTSCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import path from 'path';

export function buildPlugins({
  mode,
  paths,
  analyzer,
  platform,
}: BuildOptions): Configuration['plugins'] {
  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, paths.public, 'index.html'),
      favicon: path.resolve(__dirname, paths.public, 'favicon.ico'),
      publicPath: '/',
    }),
    // Глобальные переменные окружения
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(platform),
      __ENV__: JSON.stringify(mode),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(paths.public, 'locales'),
          to: path.resolve(paths.output, 'locales'),
        },
      ],
    }),
  ];

  if (mode === 'development') {
    plugins.push(new ProgressPlugin());
    // Выносит проверку типов TS в одельный процесс, не нагружая при этом сборку
    // plugins.push(new ForkTSCheckerWebpackPlugin());
    plugins.push(new ReactRefreshWebpackPlugin());
  }

  if (mode === 'production') {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      })
    );
    if (analyzer) {
      plugins.push(new BundleAnalyzerPlugin());
    }
  }
  return plugins;
}
