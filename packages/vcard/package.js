Package.describe({
  name: 'guzmonne:vcard',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Custom vCard creator. Based on Outlooks vCard format',
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');

  api.use([
    'underscore',
  ]);

  api.addFiles('vcard.js', ['client']);
  api.export('vCard', ['client']);
});