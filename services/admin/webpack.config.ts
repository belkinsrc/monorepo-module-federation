import path from 'path';
import { Configuration, container } from 'webpack';
import {
  BuildMode,
  BuildPlatform,
  BuildPaths,
  buildWebpack,
} from '@packages/build-config';
import packageJson from './package.json';

interface EnvVariables {
  mode?: BuildMode;
  port?: number;
  analyzer?: boolean;
  platform?: BuildPlatform;
}

// Определим тип, чтобы включить react-router-dom и сделать dependencies опциональными
interface PackageJson {
  dependencies: {
    "@packages/build-config"?: string;
    "@packages/shared"?: string;
    react?: string;
    "react-dom"?: string;
    "react-router-dom"?: string;
    [key: string]: string | undefined; // Разрешить любые другие зависимости
  };
}

const pkgJson: PackageJson = packageJson as PackageJson;

export default (env: EnvVariables): Configuration => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: path.resolve(__dirname, 'build'),
    public: path.resolve(__dirname, 'public'),
    src: path.resolve(__dirname, 'src'),
  };

  const config: Configuration = buildWebpack({
    mode: env.mode ?? 'development',
    port: env.port ?? 3002,
    paths,
    analyzer: env.analyzer ?? false,
    platform: env.platform ?? 'desktop',
  });

  config.plugins.push(
    new container.ModuleFederationPlugin({
      name: 'admin',
      filename: 'remoteEntry.js',
      exposes: {
        './Router': './src/router/Router.tsx',
      },
      shared: {
        ...pkgJson.dependencies,
        react: {
          eager: true,
          requiredVersion: pkgJson.dependencies.react,
        },
        'react-router-dom': {
          eager: true,
          requiredVersion: pkgJson.dependencies['react-router-dom'],
        },
        'react-dom': {
          eager: true,
          requiredVersion: pkgJson.dependencies['react-dom'],
        },
      },
    })
  );

  return config;
};