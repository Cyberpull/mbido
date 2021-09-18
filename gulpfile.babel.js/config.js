import fs from 'fs';

export const SRC_PATH = 'src';
export const SRC_PATH_JS = `${SRC_PATH}/js`;
export const SRC_PATH_SCSS = `${SRC_PATH}/scss`;

export const BUILD_OUTPUT = 'dist';

export function Copyright() {
  return fs.readFileSync('./Copyright');
}
