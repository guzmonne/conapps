angular.module('angular-gux').directive('guxRadioOption', function() {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    templateUrl: 'guzmonne_angular-gux_templates/gux-radio-option.template.ng.html',
    scope: {
      value: '@radioValue',
    },
    controller: [function() {
      this.selected = false;

      this.setParentModel = function() {
        this.group.ngModel = this.value;
      }
    }],
    controllerAs: 'option',
    require: '^guxRadioGroup',
    bindToController: true,
    link: function(scope, element, attrs, group) {
      scope.option.group = group;

      scope.$watch('option.group.ngModel', function(newValue) {
        scope.option.selected = (scope.option.value == newValue);
      }, true);
    }
  }
});