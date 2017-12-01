const
  gulp   = require('gulp'),
  del    = require('del'),
  config = require('./config.json');

const paths = {
    allCopyOnly: [
        // css 請由 webpack 載入
        'src/**/*.jpg',
        'src/**/*.gif',
        'src/**/*.png',
        'src/**/*.eot',
        'src/**/*.svg',
        'src/**/*.ttf',
        'src/**/*.woff',
        'src/**/*.woff2',
        'dist/app.js',
    ],
    buildDir: '../../public/' + config.app_name,
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
 * 複製前先刪除目的目錄
 * 如果目的目錄不在該程式之下, 必須啟用 force 指令
 */
gulp.task('clean', () => {
  let buildPath = paths.buildDir + '/*';
  return del(buildPath, {force: true});
});

/**
 *
 */
gulp.task('default', ['clean', 'copy_files'], function() {
    console.log("============================================================");
    console.log("copy files to " + paths.buildDir + "/");
    console.log("============================================================");
});
