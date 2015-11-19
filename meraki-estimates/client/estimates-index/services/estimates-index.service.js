angular.module('conapps').factory('estimatesIndexService', estimatesIndexService);

estimatesIndexService.$inject = ['collectionManagerGenerator'];

function estimatesIndexService(cmg){
  let service = new cmg({
    sort: { createdAt: -1 },
    publication: 'estimates:index',
    stringSearch: true,
    mongoCollection: Estimates
  });

  //////

  return service;
}