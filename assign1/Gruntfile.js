module.exports = function(grunt) {
  grunt.initConfig({
    nodeunit: {
      all: ['test/**/*test.js']
    },
    "install-dependencies": {
      options: {
        isDevelopment: true
      }
    },
    exec: {
      remove_include_js: 'rm src/include.js',
      weatherjs_to_include: 'cp src/weather.js src/include.js',
      coverage: 'node "node_modules/istanbul/lib/cli.js" cover "node_modules/nodeunit/bin/nodeunit" -- test',
      run_driver: 'node src/driver.js'
    }
  });

  grunt.loadNpmTasks('grunt-install-dependencies');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-exec');
  
  grunt.registerTask('coverage', 'exec:coverage');
  grunt.registerTask('run_driver', 'exec:run_driver');
  grunt.registerTask('weatherjs_to_include', 'exec:weatherjs_to_include');
  grunt.registerTask('remove_include_js', 'exec:remove_include_js');
  grunt.registerTask('default', ['install-dependencies', 'weatherjs_to_include', 'nodeunit', 'coverage','run_driver']);
}
