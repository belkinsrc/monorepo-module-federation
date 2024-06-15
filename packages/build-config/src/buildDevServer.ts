import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types/types';

export function buildDevServer({ port }: BuildOptions): DevServerConfiguration {
  return {
    port: port ?? 3000,
    open: true,
    // Нужно для роутинга
    historyApiFallback: true,
    // Чтоб не перезагружалась страница при любых изменениях 
    // (но работает только) для native JS/TS,
    // для React нужно сделать доп манипуляции
    hot: true, 
  };
}
