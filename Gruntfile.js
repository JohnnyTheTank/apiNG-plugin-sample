module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            js: {
                files : {
                    'dist/aping-plugin-sample.min.js' : [
                        'src/aping-sample-directive.js',
                        'src/aping-sample-helper.js',
                        'bower_components/angular-sample-api-factory/src/angular-sample-api-factory.js'
                    ]
                }
            },
            options: {
                banner: '\n/*! <%= pkg.name %> v<%= pkg.version %> (<%= grunt.template.today("dd-mm-yyyy") %>) by <%= pkg.author %> */\n',
            }
        },
        watch: {
            minifiyJs: {
                files: [
                    'src/aping-sample-directive.js',
                    'src/aping-sample-helper.js',
                    'bower_components/angular-sample-api-factory/src/angular-sample-api-factory.js'
                ],
                tasks: ['uglify'],
                options: {
                    spawn: true,
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);

};

