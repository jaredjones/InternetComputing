module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    nodeunit: {
      all: ['test/**/*test.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  
  grunt.registerTask('default', ['nodeunit']);
}
