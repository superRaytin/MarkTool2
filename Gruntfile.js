var process = require('process');

var pwd = process.env.PWD;

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }
    });

    grunt.registerTask('run', function(){
        var done = this.async();
        var cp = require('child_process');

        console.log('Run ...'.cyan);
        cp.exec('/Users/shiliang/Downloads/electron-v0.25.3-darwin-x64/Electron.app/Contents/MacOS/Electron ' + pwd, function(error, stdout, stderr){
            if(error){
                return console.log('Failed'.red)
            }

            done();
        });
    });

    grunt.registerTask('jsxWatch', function(){
        var done = this.async();
        var cp = require('child_process');
        var src = './assets/js/src/view';
        var build = './assets/js/build/view';

        console.log('jsx watch ...'.cyan);
        cp.exec('jsx --watch ' + src + ' ' + build, function(error, stdout, stderr){
            if(error){
                return console.log('Failed'.red)
            }

            console.log(stdout);
            console.log(stderr);

            done();
        });
    });

    //grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['run']);

};