Package.describe({
  name: 'guzmonne:spin',
  version: '0.0.1',
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  api.use('ecmascript');
  api.addFiles('spin.js', 'client');
});