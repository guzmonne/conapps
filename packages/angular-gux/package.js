Package.describe({
  name: 'guzmonne:angular-gux',
  version: '0.0.1',
  summary: 'Anular gux directives and services',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  var packages = [
    'urigo:angular@0.9.3'
  ];
  api.versionsFrom('1.1.0.3');

  api.use(packages);

  api.addFiles([
    'angular-gux.js',
    'directives/gux-enter.directive.js',
    'directives/gux-accordion.directive.js',
    'templates/gux-accordion.template.ng.html',
    'directives/gux-accordion-item.directive.js',
    'templates/gux-accordion-item.template.ng.html',
    'directives/gux-form-input.directive.js',
    'templates/gux-form-input.template.ng.html',
    'directives/gux-form-select.directive.js',
    'templates/gux-form-select.template.ng.html',
    'directives/gux-radio-group.directive.js',
    'templates/gux-radio-group.template.ng.html',
    'directives/gux-radio-option.directive.js',
    'templates/gux-radio-option.template.ng.html',
    'directives/gux-selectable-item.directive.js',
    'templates/gux-selectable-item.template.ng.html',
  ], ['client']);
});