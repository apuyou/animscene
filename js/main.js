function Matchs($scope, $http, $timeout) {
  $scope.deleted = [];
  
  // Read with polling
  (function poll(){
    if(!$scope.retry){
      $scope.retry = 3000;
    }
    $http.get(poolzorlive_url + 'ajax.php?page=pad_liste_matchs_finis').success(function(data) {
      $scope.error = false;
      $scope.matchs = data.matchs;
      $scope.message = data.message || "";
      $timeout(poll, $scope.retry);
    }).error(function(data, status){
      $scope.error = "Impossible de récupérer l'état";
      console.error("Cannot get status:", data);
      $scope.retry *= 2;
      $timeout(poll, $scope.retry);
    });
  })();
  
  $scope.delete = function(id) {
    $scope.deleted.push(id);
  }
}
