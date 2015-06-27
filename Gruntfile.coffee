path = require('path')
cordovaServer = require('./lib/cordova_server')

config = (grunt) ->

  connect:
    options:
      hostname: '0.0.0.0'
    ios:
      options:
        port: 7000
        middleware: cordovaServer.iOS
    android:
      options:
        port: 6000
        middleware: cordovaServer.android
    web:
      options:
        keepalive: true
        middleware: cordovaServer.web
        port: 5000

  clean:
    default:
      options:
        "no-write": true
      src: ["!www/config.xml", "!www/js/spec/index.html", "!www/js/spec/lib/*.js", "www/*"]

  copy:
    img:
      files: [
        expand: true
        cwd: 'assets/img/'
        src: ['**/*']
        dest: 'www/img/'
      ]
    js:
      files: [
        expand: true
        cwd: 'assets/javascripts/'
        src: ['**/*.js']
        dest: 'www/js/'
      ]
    css:
      files: [
        expand: true
        cwd: 'assets/stylesheets/'
        src: ['*.css']
        dest: 'www/css/'
      ]
    fonts:
      files: [
        expand: true
        cwd: 'assets/fonts/'
        src: ['*.otf', '*.eot', '*.svg', '*.ttf', '*.woff', '*.woff2']
        dest: 'www/fonts/'
      ]
  less:
    compile:
      options:
        paths: ['assets/stylesheets']
      files:
        'www/css/main.css': 'assets/stylesheets/main.less'

  cssmin:
    compress:
      files:
        'www/css/main.css': ['www/css/main.css']
      options:
        keepSpecialComments: 0
  handlebars:
    compile:
      options:
        namespace: "JST"
        amd: true,
        processName: (filePath)->
          filePath.substring(filePath.lastIndexOf('/') + 1)
      files:
        "www/js/app/templates.js": "assets/templates/*.html"
  requirejs:
    cordova:
      options:
        mainConfigFile: 'www/js/app/require_config.js'
        out: 'www/js/cordova.js'
        optimize: 'uglify2'
        wrap: false
        almond: true
        preserveLicenseComments: false

  htmlbuild:
    dist:
      src: ['assets/public/index.html', 'assets/public/cordova.html']
      dest: 'www/'
      options:
        beautify: true

  mocha_phantomjs:
    options:
      reporter: 'dot'
    nerds: ['www/js/spec/index.html']

  watch:
    js:
      files: ['assets/javascripts/**/*']
      tasks: ['copy:js']
    handlebars:
      files: ['assets/templates/*.html']
      tasks: ['handlebars']
    less:
      files: ['assets/stylesheets/**/*.less']
      tasks: ['less']
      options:
        spawn: true
    img:
      files: ['assets/img/**/*']
      tasks: ['copy:img']
    htmlbuild:
      files: ['assets/public/**/*.html']
      tasks: ['htmlbuild']

module.exports = (grunt) ->

  grunt.initConfig(config(grunt))

  grunt.loadNpmTasks('grunt-requirejs')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-contrib-connect')
  grunt.loadNpmTasks('grunt-contrib-handlebars')
  grunt.loadNpmTasks('grunt-mocha-phantomjs')
  grunt.loadNpmTasks('grunt-html-build')

  grunt.registerTask('default', ['build'])

  grunt.registerTask('build', [
    'copy'
    'handlebars'
    'requirejs'
    'less'
    'cssmin'
    'htmlbuild'
  ])

  grunt.registerTask('server', [
    'copy:js'
    'connect:web'
  ])

  grunt.registerTask('test', [
    'mocha_phantomjs'
  ])
