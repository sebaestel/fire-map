module.exports = function (grunt) {
    'use strict';
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-exec');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        build: grunt.file.readJSON('build-config.json'),
        stylus: {
            compile: {
                files: {
                    'styles/style.css': 'styles/main.styl'
                }
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src:  '<%= build.scripts %>',
                        flatten: true,
                        dest: 'build/js'
                    },
                    {
                        expand: true,
                        src:  'app/**/**.html',
                        flatten: true,
                        dest: 'build/templates'
                    },
                    {
                        expand: true,
                        src:  '<%= build.styles %>',
                        flatten: true,
                        dest: 'build/css'
                    },
                    {
                        expand: true,
                        src:  'app/**/**.js',
                        flatten: true,
                        dest: 'build/app'
                    },
                    {
                        expand: true,
                        src:  'js/**.js',
                        flatten: true,
                        dest: 'build/js'
                    }
                ]
            }
        },
        clean: {
            build: ['build'],
            css: ['css'],
        },
        watch: {
            css: {
                files: [
                    'app/**/*.*',
                    'app/**/*.*',
                    'app/*.*',
                    'styles/*.styl'
                ],
                tasks: [
                    'develop'
                ],
                options: {
                    livereload: true,
                    port: 8900
                }
            }
        },
        jslint: {
            server: {
                src: [
                    'app/*.js',
                    'app/**/*.js',
                    'app/**/**/*.js'
                ],
                exclude: [
                    'node_modules/*.js',
                    'bower_components/*.js',
                    'app/app.directives.js'
                ],
                directives: {
                    'node': true,
                    'todo': true,
                    'plusplus': true,
                    'regexp': true,
                    'globals': {
                        'window': true,
                        'localStorage': true,
                        'admetricks': true,
                        'jasmine': true,
                        'describe': true,
                        'beforeEach': true,
                        'it': true,
                        'expect': true,
                        'inject': true,
                        'angular': true,
                        'browser': true,
                        'document': true,
                        'element': true,
                        'moment': true,
                        'mixpanel': true,
                        'zE': true,
                        'by':true,
                        'io':true,
                        '_':false,
                        '$':true
                    }
                },
            }
        },
        htmlbuild: {
            app: {
                src: 'index.html',
                dest: 'build/index.html',
                options: {
                    beautify: true,
                    prefix: '',
                    relative: true,
                    styles: {
                        bundle: 'build/css/**.css'
                    },
                    scripts: {
                        dependencies: '<%= build.scripts %>',
                        modules: [
                            'build/app/**.**'
                        ]
                    }
                }
            }
        },

        exec: {
          fake_api: 'json-server --watch db.json',
          serve: 'serve -p 8000 build'

        },
        replace: {
            app: {
                src: 'build/index.html',
                dest: 'build/index.html',
                replacements: [{
                    from: /(..\/bower_components(?:.*)js)/g,
                    to: function (matchedWord) {
                        var path = matchedWord.split('/');
                        return 'js/' + path.pop();
                    }

                },{
                    from: /(..\/node_modules(?:.*)js)/g,
                    to: function (matchedWord) {
                        var path = matchedWord.split('/');
                        return 'js/' + path.pop();
                    }

                }]
            }
        }
    });
    grunt.registerTask('develop', [
        'stylus',
        'clean:build',
        'copy:main',
        'clean:css',
        'htmlbuild:app',
        'replace:app',
        'watch'
    ]);

    grunt.registerTask('serve', [
        'exec:serve'
    ]);
    grunt.registerTask('fake_api', [
        'exec:fake_api'
    ]);

};
