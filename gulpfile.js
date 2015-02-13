'use strict';
// generated on 2014-11-04 using generator-gulp-webapp 0.1.0

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var open = require("gulp-open");
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var coreautoprefixer = require('autoprefixer-core');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var jsmin = require('gulp-jsmin');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var gzip = require('gulp-gzip');
var livereload = require('gulp-livereload');
var pako = require('gulp-pako');
var imageResize = require('gulp-image-resize');
var uncss = require('gulp-uncss');
var uglify = require('gulp-uglifyjs');
var mainBowerFiles = require('main-bower-files');



// load plugins
var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {
    return gulp.src('app/styles/main.scss')
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(sass({ style: 'expanded' }))
    .pipe($.size())
    .pipe(gulp.dest('app/styles'));
});

gulp.task('ap', function(){
    return gulp.src('app/styles/main.css')
    .pipe(postcss([ coreautoprefixer({ browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'] }) ]))
    .pipe(minifycss())
    .pipe(gulp.dest('app/styles/'))
})


gulp.task('uncss', function() {
    gulp.src('app/styles/main.css')
        .pipe(uncss({
            html: [
                'app/index_fake.html'
            ]
        }))
        .pipe(gulp.dest('app/styles/clean'));
});

gulp.task('uglify', function() {
  gulp.src('app/scripts/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('app/dist/scripts'))
});

gulp.task('css-gzip', function(){
    return gulp.src('app/styles/sass/main.css')
    .pipe(pako.gzip())
    .pipe(gulp.dest('app/styles/'))
})
gulp.task('js-gzip', function(){
    return gulp.src('app/scripts/**/*.js')
    .pipe(pako.gzip())
.pipe(gulp.dest('app/dist/scripts/'))
})
gulp.task('min-scripts', function () {
    return gulp.src('app/scripts/**/*.js')
    .pipe($.jshint())
    .pipe(jsmin())
     .pipe($.size())
    //  .pipe(pako.gzip())
    .pipe(gulp.dest('app/dist/scripts'));
});
gulp.task('scripts', function () {
    return gulp.src('app/scripts/**/*.js')
    .pipe($.jshint())
//    .pipe(jsmin())
//    .pipe(rename({suffix: '.min'}))
.pipe($.size())
    //  .pipe(pako.gzip())
    .pipe(gulp.dest('app/scripts'));
});

gulp.task('html', ['styles', 'scripts'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src('app/*.html')
    .pipe($.useref.assets({searchPath: '{.tmp,app}'}))
    .pipe(jsFilter)
    .pipe($.uglify())
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe($.useref.restore())
    .pipe($.useref())
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

gulp.task('images', function () {
    return gulp.src('app/images/**/*')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant({ quality: '65-80', speed: 4 })]
    }))
    .pipe(gulp.dest('app/dist/images'))
    .pipe($.size());
});


gulp.task('image-resize', function(){

  return gulp.src( 'content/**/*.+(jpeg|jpg|png|tiff|webp)' )
  .pipe(gulpSharp({
      resize : [1280, 800],
      max : true,
      quality : 60,
      progressive : true
  }))
  .pipe(gulp.dest('output'));

});

gulp.task('gallery', function(){
    return gulp.src('app/dist/images/galleries/*.png')
    .pipe(imageResize({ 
      width : 100,
      height : 100,
      crop : true,
      upscale : false
  }))
    .pipe(gulp.dest('app/dist/images/galleries/'))
})

gulp.task('fonts', function () {
    return $.mainBowerFiles()
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'))
    .pipe($.size());
});

gulp.task("url", function(){
  var options = {
    url: "http://localhost:3000",
    app: "chrome"
};
gulp.src("app/index.html")
.pipe(open("", options));
});

gulp.task('extras', function () {
    return gulp.src(['app/*.*', '!app/*.html'], { dot: true })
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    return gulp.src(['.tmp', 'dist'], { read: false }).pipe($.clean());
});

gulp.task('build', ['html', 'images', 'fonts', 'extras']);

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

gulp.task('connect', function () {
    var connect = require('connect');
    var app = connect()
    .use(require('connect-livereload')({ port: 35729 }))
    .use(connect.static('app'))
    .use(connect.static('.tmp'))
    .use(connect.directory('app'));

    require('http').createServer(app)
    .listen(9000)
    .on('listening', function () {
        console.log('Started connect web server on http://localhost:9000');
    });
});

gulp.task('serve', ['connect', 'styles'], function () {
    require('opn')('http://localhost:9000');
});

// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;

    gulp.src('app/styles/*.scss')
    .pipe(wiredep({
        directory: 'app/bower_components'
    }))
    .pipe(gulp.dest('app/styles'));

    gulp.src('app/*.html')
    .pipe(wiredep({
        directory: 'app/bower_components',
        exclude: ['bootstrap-sass-official']
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('watch', ['connect', 'serve'], function () {
    var server = $.livereload();

    // watch for changes

    gulp.watch([
        'app/*.html',
        '.tmp/styles/**/*.css',
        'app/scripts/**/*.js',
        'app/images/**/*'
        ]).on('change', function (file) {
            server.changed(file.path);
        });

        gulp.watch('app/styles/**/*.scss', ['styles']);
        gulp.watch('app/scripts/**/*.js', ['scripts']);
        gulp.watch('app/images/**/*', ['images']);
        gulp.watch('bower.json', ['wiredep']);
    });
