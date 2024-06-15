export interface BuildPaths {
  entry: string;
  src: string;
  public: string;
  output: string;
}

export type BuildMode = 'development' | 'production';
export type BuildPlatform = 'mobile' | 'desktop';

export interface BuildOptions {
  paths: BuildPaths;
  port?: number;
  mode?: BuildMode;
  analyzer?: boolean;
  platform?: BuildPlatform;
}