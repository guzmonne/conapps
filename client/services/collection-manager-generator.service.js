angular.module('conapps').factory('collectionManagerGenerator', collectionManagerGenerator);

collectionManagerGenerator.$inject = ['$meteor', '$q', 'safeApply'];

function collectionManagerGenerator($meteor, $q, safeApply){
	let generator = function(options){
		let {sort, stringSearch, collection, publication, mongoCollection} = options;

		if (sort) check(sort, Object);
		if (stringSearch) check(stringSearch, Boolean);

		check(publication, String);
		check(mongoCollection, Mongo.Collection);

		this.collection = collection || [];
		this.sort = new ReactiveVar(sort || {});
		
		if (stringSearch)
			this.stringSearch = new ReactiveVar('');

		this._publication = publication;
		this._mongoCollection = mongoCollection;
	};

	angular.extend(generator.prototype, {

		subscribe(){
			let self = this;

			return $meteor.subscribe(this._publication).
				then(subscription => {
					self.subscription = subscription;
					console.log('Subscribed to ' + self._publication);
				}).
				catch(self.handleError);
		},

		getCollection(){
			if (!this.subscription)
				this.subscribe().
					then(this._getCollection.bind(this)).
					catch(this.handleError);
			else
				this._getCollection();
		},

		unsubscribe(){
			if (this.subscription && this.subscription.stop)
				this.subscription.stop();

			if (this.computation && this.computation.stop)
				this.computation.stop();

			this.subscription = null;
			this.computation = null;

			console.log('Unsubscribed from ' + this._publication);
		},

		handleError: handleError,

		///////
		
		_getCollection(){
			let self = this;

			self.computation = safeApply.onAutorun(() => {
				let query = {}, options = {};

				if (self.stringSearch)
					query = {
						stringSearch: {
							$regex: self.stringSearch.get().toLowerCase()
						}
					};

				options.sort = self.sort.get();

				angular.copy(self._mongoCollection.find(query, options).fetch(), self.collection);
			});
		}
	});

	///////

  function handleError(err /* Meteor Error */) {
    let rejected = $q.defer().reject(err);

    toastr.error(err.reason, err.error);
    console.log(err);

    return rejected;
  }

	///////

	return generator;
}