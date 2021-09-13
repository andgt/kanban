const gulp = require("gulp");
const ghPages = require('gh-pages');
const path = require('path');
const plumber = require("gulp-plumber");
const sync = require("browser-sync").create();

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Reload

const reload = done => {
  sync.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch("source/css/*.css").on("change", sync.reload);
  gulp.watch("source/index.html").on("change", sync.reload);
}

exports.default = gulp.series(
  server, watcher
);

//gh-pages

function deploy(cb) {
  ghPages.publish(path.join(process.cwd(), './source'), cb);
}

exports.deploy = deploy;