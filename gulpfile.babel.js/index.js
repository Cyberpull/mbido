import { src, dest, watch, series } from 'gulp';
import babel from 'gulp-babel';
import minify from 'gulp-uglify';
import concat from 'gulp-concat';
import cleanCSS from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import header from 'gulp-header';
import rename from 'gulp-rename';

import sassFactory from 'gulp-sass';
import sassComp from 'sass';

import { BUILD_OUTPUT, Copyright, SRC_PATH_JS, SRC_PATH_SCSS } from './config';

const sass = sassFactory(sassComp);

const ENTRY_JS = [
  `${SRC_PATH_JS}/main.js`,
];

const ENTRY_SCSS = [
  `${SRC_PATH_SCSS}/variables.scss`,
  `${SRC_PATH_SCSS}/functions.scss`,
  `${SRC_PATH_SCSS}/mixins/**.scss`,
  `${SRC_PATH_SCSS}/main.scss`,
  `${SRC_PATH_SCSS}/styles/**/*.scss`
];

function BuildJS() {
  const CopyrightData = Copyright();

  return src(ENTRY_JS)
    .pipe(concat('mbido.js'))
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(header(CopyrightData))
    .pipe(dest(BUILD_OUTPUT))
    // Minify
    .pipe(rename('mbido.min.js'))
    .pipe(minify({ compress: true }))
    .pipe(header(CopyrightData))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(BUILD_OUTPUT));
}

function BuildCSS() {
  const CopyrightData = Copyright();

  return src(ENTRY_SCSS)
    .pipe(concat('mbido.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(header(CopyrightData))
    .pipe(dest(BUILD_OUTPUT))
    // Minify
    .pipe(rename('mbido.min.css'))
    .pipe(cleanCSS())
    .pipe(header(CopyrightData))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(BUILD_OUTPUT));
}

export const build = series(BuildJS, BuildCSS);

export function watcher() {
  watch(ENTRY_JS, BuildJS);
  watch(ENTRY_SCSS, BuildCSS);
};

export const start = series(build, watcher);
