Package.describe({
  name: 'guzmonne:app',
  version: '0.0.1',
});

Package.onUse(function(api) {
  var files = [
    'app.js',
    'app.query-constructor.js',
    'app.helpers.js',
  ];

  api.versionsFrom('1.2.0.2');
  
  api.use('ecmascript');

  api.addFiles(files, ['client', 'server']);

  api.export('App', ['client', 'server']);
});