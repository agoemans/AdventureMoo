module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        //your server
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: ['_build', 'node_modules', '../../tools/phaser/dist']
                }
            }
        },
        //typescript settings
        typescript: {
            options: {
                module: 'amd',
                target: 'es5',
                sourceMap: false,
                declaration: false,
                references: [
                    'node_modules/phaser/typescript/phaser.d.ts'
                ]
            },
            gameBuild: {
                src: ['script/**/*.ts'],
                dest: '_build/game.js'
            }
        },
        copy: {
            gameBuild: {
                files: [
                    {expand: true, cwd: 'assets', dest: '_build/assets', src: ['**/*']},
                    {expand: true, cwd: 'src', dest: '_build', src: ['index.html']}
                ]
            }
        },
        watch: {
            typescript: {
                files: ['script/**/*.ts'],
                tasks: ['typescript:gameBuild']
            },
            assets: {
                files: ['assets/**/*.*', 'src/index.html'],
                tasks: ['copy:gameBuild']
            }
        }
    });

    //Creates your build
    grunt.registerTask('gameBuild', [
        'copy:gameBuild',
        'typescript:gameBuild',
        'connect:server',
        'watch'
    ]);

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-typescript');
};
