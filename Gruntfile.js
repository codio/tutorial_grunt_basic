module.exports = function(grunt) {

  // files to be minified and combined
  var cssFiles = [
    'app/css/main.css',
    'app/css/normalize.css'
  ];

  // this is where all the grunt configs will go
  grunt.initConfig({
    // read the package.json
    // pkg will contain a reference to out package.json file use of which we will see later
    pkg: grunt.file.readJSON('package.json'),

    // configuration for the cssmin task
    // note that this syntax and options can found on npm page of any grunt plugin/task

    uglify: {
      my_target: {
        files: {
          'dest/output.min.js': ['app/js/*.js']
        }
      }
    }, 

    cssmin: {
      combine: {
        files: {
          'dest/css/styles.css': ['app/css/main.css', 'normailize.css']
        }
      }
    }    

  }); // end of configuring the grunt task

  // Load the plugin that provides the "cssmin" task.
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('cssmin', ['cssmin']);
  // main build task
  grunt.registerTask('default', ['cssmin']);

};