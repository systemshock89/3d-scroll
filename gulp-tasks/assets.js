"use strict";

import { dist, production } from "../gulpfile.js";

const {src, dest, parallel, series, watch} = pkg;
import pkg from 'gulp';
import changed from "gulp-changed";
import browserSync from "browser-sync";

function copyAssets() {
    src("./src/media/**/*")
        .pipe(changed(dist + "/media"))
        .pipe(dest(dist + "/media"))
        .pipe(browserSync.stream());

    return src("./src/fonts/**/*")
        .pipe(changed(dist + "/fonts"))
        .pipe(dest(dist + "/fonts"))
        .pipe(browserSync.stream());
}

export default copyAssets;