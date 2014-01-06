module.exports = function(grunt) {

  // this is where all the grunt configs will go
  grunt.initConfig({
    // read the package.json
    // pkg will contain a reference to out package.json file use of which we will see later
    pkg: grunt.file.readJSON('package.json'),

    // configuration for the cssmin task
    // note that this syntax and options can found on npm page of any grunt plugin/task
    clean: {
      build: ['dist']
    },
    copy: {
      dist: {
        files: [{
          dest: 'dist/',
          src: ['**'],
          cwd: 'app/',
          expand: true
        }]
      }
    },
    useminPrepare: {
        html: 'dist/index.html',
        options: {
            dirs: ['dist']
        }
    },
    rev: {
      img: {
        options: {
          algorithm: 'sha1',
          length: 4
        },
        files: {
          src: ['dist/**/*.{png,jpg,ico}']
        }
      },
      jscss: {
        options: {
          algorithm: 'sha1',
          length: 4
        },
        files: {
          src: ['dist/**/*.{js,css}']
        }
      }
    },
    usemin: {
        html: ['dist/*.html'],
        css: ['dist/**/*.css']
    }

  }); // end of configuring the grunt task

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-rev');



  // main build task
  //grunt.registerTask('default', ['cssmin','uglify', 'usemin']);
  grunt.registerTask('default',
    ['clean', 'copy', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'rev:img', 'usemin:css', 'rev:jscss', 'usemin:html']);


};