module.exports = function(grunt) {

    // A very basic default task.
    grunt.registerTask('default', 'Log some stuff.', function() {
        grunt.log.write('Logging some stuff...').ok();
    });

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner : "/*! index.min.js file */\n"
            },
            build: {
                src : ["js/index.js"],
                dest : "dist/js/index.js"
            }
        },

        
        cssmin : {
            target : {
                src : ["css/**/*.css"],
                dest : "dist/css"
            }
        },

        htmlmin: {                                     // Task
            dist: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {                                   // Dictionary of files
                    'dist/index.html': 'index.html',     // 'destination': 'source'
                    'dist/site.webmanifest': 'site.webmanifest',     // 'destination': 'source'
                }
            }
        },

        copy: {
            main: {
                files: [
                    // includes files within path
                    {expand: true, src: ['img/*'], dest: 'dist', filter: 'isFile'},
                    {expand: true, src: ['css/*'], dest: 'dist', filter: 'isFile'},
                    {expand: true, src: ['js/*'], dest: 'dist', filter: 'isFile'},
                    {expand: true, src: ['*.html'], dest: 'dist', filter: 'isFile'},

                   ],
            },
        },

        watch: {
           
            html: {
                files: ['index.html','fitnessappcasestudy.html'],
                tasks: ['htmlmin']
            }
        },

        sass: {
            dist: {
                options: {                 
                    compass: true,
                },
                files: {
                    'dist/css/custom.css' : 'scss/custom.scss'
                }
            }
        },

        'gh-pages': {
            options: {
              base: 'dist' ,
              message: 'Generated by grunt gh-pages'
            } ,
            src: ['**/*']
          }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['copy','htmlmin','uglify','watch']);
    grunt.registerTask ('deploy', ['gh-pages']);


};