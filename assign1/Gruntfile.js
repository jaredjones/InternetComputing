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
      weatherjs_to_include: '',
      weathercoffee_to_files: 'coffee -o src/temp -c src/weather.coffee',
      weathercoffee_to_include:'',
      coverage: 'node "node_modules/istanbul/lib/cli.js" cover "node_modules/nodeunit/bin/nodeunit" -- test',
      run_driver: 'node src/driver.js; rm -rf src/temp',
    }
  });

  grunt.loadNpmTasks('grunt-install-dependencies');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-exec');
  
  grunt.registerTask('coverage', 'exec:coverage');
  grunt.registerTask('run_driver', 'exec:run_driver');
  grunt.registerTask('weatherjs_to_include', 'exec:weatherjs_to_include', function(){
    grunt.file.copy('src/weather.js', 'src/include.js');
  });
  grunt.registerTask('weathercoffee_to_include', 'exec:weathercoffee_to_include', function(){
    grunt.file.copy('src/temp/weather.js', 'src/include.js');
    grunt.file.delete('src/temp/weather.js');
  });
  grunt.registerTask('weathercoffee_to_files', 'exec:weathercoffee_to_files');
  grunt.registerTask('default', ['install-dependencies', 'weatherjs_to_include', 'nodeunit', 'coverage','run_driver','weathercoffee_to_files','weathercoffee_to_include','nodeunit','run_driver']);
}
