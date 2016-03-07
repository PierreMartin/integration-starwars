module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-sass');
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        //////////////////////////////// JSHINT ////////////////////////////////
        jshint: {
            all: [
                'js/*.js',
                '!js/min.*.js'
            ]
        },

        //////////////////////////////// JS ////////////////////////////////
        uglify: {
            options: {
                mangle: false
            },
            main_js: {
                files: {
                    'js/min.main.js': [
                        'js/main.js',
                        '!js/min.*.js'
                    ]
                }
            }
        },

        //////////////////////////////// SCSS ////////////////////////////////
        sass: {
            options: {
                compass: true,
                style: 'compressed'
            },
            main_css: {
                files: {'css/min.main.css': ['css/main.scss']}
            },
            fonts_css: {
                files: {'css/min.fonts.css': ['css/fonts.scss']}
            },
            rwd_css: {
                files: {'css/min.rwd.css': ['css/rwd.scss']}
            }
        },

        //////////////////////////////// WATCH ////////////////////////////////
        watch: {
            js: {
                files: ['js/*.js', '!js/min.*.js'], // fichiers d'entrer
                tasks: ['uglify'],
                options: { spawn: false }
            },
            css: {
                files: ['css/*.scss', '!css/min.*.css'],
                tasks: ['sass'],
                options: { spawn: false }
            }
        }

    });

    grunt.registerTask('default', [
        'jshint',
        'uglify',
        'sass'
    ]);
    grunt.registerTask('js', ['uglify']);
    grunt.registerTask('compile', ['css', 'js']);

    // # grunt
    // # grunt watch

};