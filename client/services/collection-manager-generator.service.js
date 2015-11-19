angular.module('conapps').factory('collectionManagerGenerator', collectionManagerGenerator);

collectionManagerGenerator.$inject = ['$meteor', '$q', 'safeApply'];

function collectionManagerGenerator($meteor, $q, safeApply){
	let generator = function(options){
		options || (options = {});

		let {sort
			, stringSearch
			, collection
			, publication
			, mongoCollection
			, saveMethod
			,	updateMethod
			,	deleteMethod
			, defaults} = options;

		if (sort) check(sort, Object);
		if (stringSearch) check(stringSearch, Boolean);
		if (saveMethod) check(saveMethod, String);
		if (deleteMethod) check(deleteMethod, String);
		if (updateMethod) check(updateMethod, String);
		if (defaults) check(defaults, Function);

		check(publication, String);
		check(mongoCollection, Mongo.Collection);

		this.collection = collection || [];
		this.sort = new ReactiveVar(sort || {});
		
		if (stringSearch)
			this.stringSearch = new ReactiveVar('');

		if (saveMethod)
			this.saveMethod = saveMethod;

		if (deleteMethod)
			this.deleteMethod = deleteMethod;

		if (updateMethod)
			this.updateMethod = updateMethod;

		if (defaults)
			this.defaults = defaults;

		this._publication = publication;
		this._mongoCollection = mongoCollection;

		this.model = this.defaults();
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

		setModel(model){
			safeApply.onAngular(() => angular.copy(model, this.model));
		},

		save(model){
			let self = this;

			model || (model = self.model);

			if (model._id)
				return this._save(model, this.updateMethod);
			else
				return this._save(model, this.saveMethod);
		},

		delete(id){
			check(id, String);
			check(this.deleteMethod, id);

			return $meteor.call(this.deleteMethod, id);
		},

		edit(id){
			check(id, String);

			let self = this;
			let deferred = $q.defer();
			let model = self._mongoCollection.findOne(id);

			if (!model)
				deferred.reject(new Meteor.Error('ID invalida', 'Error'));
			else {
				self.setModel(model);
				deferred.resolve();
			}

			return deferred.promise;
		},

		setDefault(){
			this.setModel(this.defaults());
		},		

		///////

		defaults: defaults,

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
		},

		_save(model, method){
			check(method, String);

			return $meteor.call(method, model).
				catch(handleError);
		}
	});

	///////

  function handleError(err /* Meteor Error */) {
    let rejected = $q.defer().reject(err);

    toastr.error(err.reason, err.error);
    console.log(err);

    return rejected;
  }

  function defaults(){
  	return {};
  }

	///////

	return generator;
}