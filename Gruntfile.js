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
          'dist/js/output.min.js': ['app/js/*.js']
        }
      }
    }, 

    cssmin: {
      combine: {
        files: {
          'dist/css/styles.css': ['app/css/main.css', 'app/css/normalize.css']
        }
      }
    },    

    useminPrepare: {
        html: 'app/index.html',
        options: {
            dest: 'dist'
        }
    },

    usemin: {
        html: ['dist/*.html'],
    }


  }); // end of configuring the grunt task

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-usemin');


  // main build task
  //grunt.registerTask('default', ['cssmin','uglify', 'usemin']);
  grunt.registerTask('default', ['usemin']);  


};