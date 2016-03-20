/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
    '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
    ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    browserify: {
      options: {
               transform: [
                  ["babelify", { "presets": ["react", "es2015"] }]
               ]
            },
      dist: {
        files: {
          'build/js/bundle.js': ['src/index/js/LoginButton.js'],
          'build/dashboard/assets/js/CH/bundle_login.js': ['src/dashboard/assets/js/CH/Router_login.js'],
          'build/dashboard/assets/js/CH/bundle_dash.js': ['src/dashboard/assets/js/CH/Router_dash.js']
        }
      }
    },
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {                         // Dictionary of files
          './public/stylesheets/style-index.css': './src/stylesheets/style-index.scss',       // 'destination': 'source'
          './public/stylesheets/style-contribute.css': './src/stylesheets/style-contribute.scss',
          './public/stylesheets/style.css': './src/stylesheets/style.scss'
        }
      }
    }
  });
  //Add the task runners
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('babelify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  // Default task.
  grunt.registerTask('default', ['sass']); //'browserify:dist', 
};
