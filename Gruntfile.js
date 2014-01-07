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
        
        // @annotation:snippet task-copy
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
        // @annotation:snippet task-useminPrepare
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
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-rev');
    // @annotation:/tour load-tasks
    
    // @annotation:tour register-tasks
    grunt.registerTask('default', ['clean', 'copy', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'rev:img', 'usemin:css', 'rev:jscss', 'usemin:html']);
    grunt.registerTask('prep', ['clean', 'copy', 'ÌuseminPrepare']);
    // @annotation:/tour register-tasks

};