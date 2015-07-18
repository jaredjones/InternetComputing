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
      remove_include_temp: 'rm -f src/include.js; rm -rf src/temp',
      weatherjs_to_include: 'cp src/weather.js src/include.js',
      weathercoffee_to_files: 'coffee -o src/temp -c src/driver.coffee; coffee -o src/temp -c src/weather.coffee; mv src/temp/weather.js src/include.js; mv src/temp/driver.js src/driver-coffee.js',
      coverage: 'node "node_modules/istanbul/lib/cli.js" cover "node_modules/nodeunit/bin/nodeunit" -- test',
      run_driver: 'node src/driver.js',
      run_driver_coffee: 'node src/driver-coffee.js; rm -rf src/temp'
    }
  });

  grunt.loadNpmTasks('grunt-install-dependencies');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-exec');
  
  grunt.registerTask('coverage', 'exec:coverage');
  grunt.registerTask('run_driver', 'exec:run_driver');
  grunt.registerTask('weatherjs_to_include', 'exec:weatherjs_to_include');
  grunt.registerTask('weathercoffee_to_files', 'exec:weathercoffee_to_files');
  grunt.registerTask('remove_include_temp', 'exec:remove_include_js');
  grunt.registerTask('run_driver_coffee','exec:run_driver_coffee');
  grunt.registerTask('default', ['install-dependencies', 'weatherjs_to_include', 'nodeunit', 'coverage','run_driver','weathercoffee_to_files','run_driver_coffee']);
}
