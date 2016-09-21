(function () {
  'use strict';

var basePaths = {
	src: 'src/',
	dest: 'dest/',
  lib: 'libraries/'
};

var paths = {
  root: './',
	sprite: {
		src: basePaths.src + 'img',
		dest: basePaths.dest + 'img',
		css: basePaths.src + 'sass/sprite',
    tpl: basePaths.src + 'tpl'
	}
};

var gulp = require('gulp'),
    svgSprite = require('gulp-svg-sprite'),
    imagemin = require('gulp-imagemin'),
    svg2png = require('gulp-svg2png');

//////////////////////////////
// SVG Sprite with PNG fallback
//////////////////////////////

gulp.task('svgSprite', function() {
  return gulp.src(paths.sprite.src + '/*.svg')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(svgSprite({
      'mode': {
        'css': {
          'spacing': {
            'padding': 5
          },
          'dest': './',
          'layout': 'diagonal',
          'sprite': paths.sprite.dest + '/sprite.svg',
          'bust': false,
          'render': {
            'scss': {
              'dest': paths.sprite.css + '/_variables.scss',
              'template': paths.sprite.tpl + '/sprite-template.scss'
            }
          }
        }
      }
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('pngSprite', ['svgSprite'], function() {
  return gulp.src(paths.sprite.dest + '/sprite.svg')
    .pipe(svg2png())
    .pipe(gulp.dest(paths.sprite.dest));
});

//////////////////////////////
// Build Tasks
//////////////////////////////

gulp.task('sprite', ['pngSprite']);

}());
