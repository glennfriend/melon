const
  gulp   = require('gulp'),
  del    = require('del'),
  config = require('./config.json');

const paths = {
    allCopyOnly: [
        // css 請由 webpack 載入
        // 其它的資源請放置在目標處
        'dist/app.js',
    ],
    buildDir: '../../' + config.app_name,
};

// --------------------------------------------------------------------------------
//  convert
// --------------------------------------------------------------------------------

/**
 * copy only
 */
gulp.task('copy_files', [], () => {
    return gulp.src(paths.allCopyOnly)
        .pipe(gulp.dest(paths.buildDir));
});

/**
 *
 */
gulp.task('default', ['copy_files'], function() {
    console.log("============================================================");
    console.log("copy files to " + paths.buildDir + "/");
    console.log("============================================================");
});
