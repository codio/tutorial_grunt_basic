// @annotation:tour gruntfile

module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        
        // **********************************************
        // User can customize everything starting here  *
        // each entry in this JSON structure is a tasks *
        // **********************************************
        
        // @annotation:tour grunt-tasks
        
        // @annotation:snippet task-clean
        clean: {
            build: ['dist']
        },
        // @annotation:/snippet task-clean
        
        // @annotation:snippet task-copy
        copy: {
            main: {
                files: [{
                    dest: 'dist/',
                    src: ['**'],
                    cwd: 'src/',
                    expand: true
                }]
            }
        },
        // @annotation:/snippet task-copy
        
        // @annotation:snippet task-useminPrepare
        useminPrepare: {
            html: 'dist/index.html',
        },
        // @annotation:/snippet task-useminPrepare
        
        // @annotation:snippet task-rev
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
        // @annotation:/snippet task-rev
        
        // @annotation:snippet task-usemin 
        usemin: {
            html: ['dist/*.html'],
            css: ['dist/**/*.css']
        },
        // @annotation:/snippet task-usemin
        
        htmlmin: {                                     
            dist: {                                      
                options: {                                 
                    removeComments: true,
                },
                files: [{                                                                                                                                                                                                                                                               
                    dest: 'dist/',
                    src: '**/*.html',
                    cwd: 'src/',
                    dot: false,
                    expand: true                                                                                                                                                                                                        
                }]                  
            }
        }

        // *********************************************
        // and this is the end of the task block *
        // *********************************************    
        // @annotation:/tour grunt-tasks
            
    });
    
    // @annotation:tour load-tasks 
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');    
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-rev');
    // @annotation:/tour load-tasks
    
    // @annotation:tour register-tasks
    grunt.registerTask('default', ['clean', 'copy', 'useminPrepare', 
       'concat', 'uglify', 'cssmin', 'rev:img', 
       'usemin:css', 'rev:jscss', 'usemin:html', 'htmlmin']);
    grunt.registerTask('prep', ['clean', 'copy', 'useminPrepare']);
    // @annotation:/tour register-tasks

};

// @annotation:/tour gruntfile