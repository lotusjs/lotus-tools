import { existsSync } from 'fs';
import { join } from 'path';
import * as assign from 'object-assign';

export default function () {
  let userConfig: any = {};
  const configPath = join(process.cwd(), 'tsconfig.json');

  if (existsSync(configPath)) {
    userConfig = require(configPath);
  }

  return assign(
    {
      // noUnusedParameters: true,
      // noUnusedLocals: true,
      // strictNullChecks: true,
      target: 'es6',
      jsx: 'preserve',
      moduleResolution: 'node',
      declaration: true,
      allowSyntheticDefaultImports: true,
    },
    userConfig.compilerOptions
  );
}

