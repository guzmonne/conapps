angular.module('conapps').factory('estimatesIndexService', estimatesIndexService);

estimatesIndexService.$inject = ['$meteor', '$q', '$rootScope', 'safeApplyAutorun'];

function estimatesIndexService($meteor, $q, $rootScope, safeApplyAutorun){

  var service = {
    subscribe(){
      return $meteor.subscribe('estimates:index').
        then(subscription => {
          service.subscription = subscription;
          console.log('Subscribed to "estimates:index".');
        }).
        catch(handleError);
    },

    getEstimates(){
      if (!service.subscription)
        service.subscribe().
        then(getEstimates).
        catch(handleError);
      else
        getEstimates();
    },

    unsubscribe(){
      if (service.subscription && service.subscription.stop)
        service.subscription.stop();

      if (service.computation && service.computation.stop)
        service.computation.stop();

      service.subscription = null;
      service.computation = null;

      console.log('Unsubscribed from "estimates:index".');
    },

    sortBy(field){
      var sort = service.sort.get();
      var value = (!!sort[field]) ? sort[field] * -1 : 1;

      sort = {};

      sort[field] = value;

      service.sort.set(sort);
    },

    //////

    estimates: [],

    sort: new ReactiveVar({
      createdAt: -1
    }),

    stringSearch: new ReactiveVar('')
  };

  //////

  function handleError(err) {
    var rejected = $q.defer().reject(err);

    toastr.error(err.reason, err.error);
    console.log(err);

    return rejected;
  }

  function getEstimates(){
    service.computation = safeApplyAutorun(() => {
      var query = {
        stringSearch: {
          $regex: service.stringSearch.get().toLowerCase()
        }
      };

      var options = {
        sort: service.sort.get()
      };

      angular.copy(Estimates.find(query, options).fetch(), service.estimates);
    });
  }

  //////

  return service;
}