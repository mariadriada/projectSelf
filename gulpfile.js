var	gulp 		   = 	require('gulp'),
	browserSync  = 	require('browser-sync'),
	sass		     =	require('gulp-sass'),
	prefix       =	require('gulp-autoprefixer'),
	concat       = 	require('gulp-concat'),
	cssmin       = 	require('gulp-minify-css'),
	uglify       = 	require('gulp-uglify'),
  bower        =  require('gulp-bower'),
	reload       =	 browserSync.reload
	;

//Browser sync
gulp.task('browser-sync', ['sass'], function () {
  browserSync({
    server: {
      baseDir: "./"
    }
  });
});


//Takes main.scss, add the prefixes and set the compiled file in the css folder.
gulp.task('sass', function(){
	gulp.src('./app/scss/main.scss')
    .pipe(sass({      
      onError: browserSync.notify
    }))
    .pipe(prefix(['last 3 versions', '> 1%'], { cascade: true }))
    .pipe(gulp.dest('./app/css/'))
     .pipe(browserSync.reload({stream: true}));

     
});


// Compile files from scss into minified css
gulp.task('sassmin', function () {
  gulp.src('./app/css/main.css')    
    .pipe(prefix(['last 3 versions', '> 1%'], { cascade: true }))
    .pipe(cssmin())
    .pipe(gulp.dest('./app/css/min/'));
});


// Minifies main.js
gulp.task('uglify', function () {
  gulp
    .src('./app/scripts/src/*.js')   
    .pipe(uglify())
    .pipe(gulp.dest('./app/scripts/min/'));
});

// Concat the scripts in the src folder.
gulp.task('scripts', function () {
  gulp
    .src(['./app/scripts/src/*.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./app/scripts/'));
});

//Html templates on public directory for production
gulp.task('public-html', function(){
	 gulp
    .src(['./app/**/*.html'])
    .pipe(gulp.dest('./public/'));
});

//Scripts on public directory for production
gulp.task('public-scripts', function(){
	 gulp
    .src(['./app/scrips/src/main.js'])
    .pipe(gulp.dest('./public/scripts/src/'));
});

//Style on public directory for production
gulp.task('public-style', function(){
	 gulp
    .src(['./app/css/**/*.css'])
    .pipe(gulp.dest('./public/css/'));
});

//Resources on public directory for production
gulp.task('public-resources', function(){
   gulp
    .src(['./app/resources/**/*'])  //Copy directories and files
    .pipe(gulp.dest('./public/resources/'));  //Paste on public directory

});

//Scripts on public directory for production
gulp.task('public-scripts', function(){
   gulp
    .src(['./app/scripts/**/*'])  //Copy directories and files
    .pipe(gulp.dest('./public/scripts/'));  //Paste on public directory
});


//Watch
gulp.task('watch', function(){
	//Reload Templates and Scripts
	gulp.watch(['./app/*.html', 'app/scripts/src/*.js', './app/views/**/*.html'], reload);
	gulp.watch('./app/scss/**/*.scss', ['sass', 'sassmin']);  
	gulp.watch('./app/scripts/src/*.js', ['scripts', 'uglify']);

});

//Bower: for downloading packages for development front-end
gulp.task('bower', function() {
  return bower('./my_bower_components')
    .pipe(gulp.dest('lib/'))
});


//DEFAULT TASK
gulp.task('default', ['serve']);


//Serve task
gulp.task('serve', ['browser-sync', 'watch']);

//Production Task 
gulp.task('production', ['sassmin', 'uglify', 'public-html', 'public-scripts', 'public-style', 'public-resources', 'public-scripts']);

//Build task
gulp.task('build', ['sass', 'scripts', 'uglify']);



