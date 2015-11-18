angular.module('conapps').factory('tableHelpers', tableHelpers);

tableHelpers.$inject = [];

function tableHelpers(){
	const factory = {

		chevronDownEl: '<i class="fa fa-chevron-down pull-right"></i>',
		chevronUpEl: '<i class="fa fa-chevron-up pull-right"></i>',

		sortByField(header /* Angular Element */, sort /* ReactiveVar */){
			check(header, angular.element);
			check(sort, ReactiveVar);

			let field = header.data('sortBy');

			factory.sortBy(field, sort);

			factory.applyChevrons(header, field, sort);
		},

		sortBy(field /* String */, sort /* ReactiveVar */){
			check(field, String);
			check(sort, ReactiveVar);

			let _sort = sort.get();

			// We toggle the sort value between 1 and -1
			let value = (!!_sort[field]) ? _sort[field] * -1 : 1;

			_sort = {};

			_sort[field] = value;

			sort.set(_sort);
		},

		removeChevrons(thead /* Angular Element */){
			check(thead, angular.element);

			thead.find('[data-sort-by] > i').remove();
		},

		applyChevrons(header /* Angular Element */, field /* String */, sort /* ReactiveVar */){
			var _sort;

			check(header, angular.element);
			check(field, String);
			check(sort, ReactiveVar);

			_sort = sort.get();

			if (_sort[field] === 1)
				header.append(factory.chevronUpEl);
			if (_sort[field] === -1)
				header.append(factory.chevronDownEl);
		},

	};

	//////

	return factory;
}