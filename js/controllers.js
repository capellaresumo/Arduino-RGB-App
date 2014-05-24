var APP2 = angular.module('starter.controllers', []);

APP2.controller('DashCtrl', function($scope, $ionicModal, $location, $ionicLoading, Comandos, Dispositivos) {
    $scope.comandos = Comandos.all();
    $scope.change = function(comam) { 
      if(comam.value == false){
       console.log(comam.comando+'0');
      } else {
       console.log(comam.comando+'1');   
      }
    };
    if(Dispositivos.isConnected != true){
        $location.path( '/tab/account' );
    }
});

APP2.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
});

APP2.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
});

APP2.controller('AccountCtrl', function($scope, $ionicLoading, Dispositivos) {
    $scope.devices  = Dispositivos.all();
    $scope.click = function(dispo) { 
        $ionicLoading.show({
          template: 'Conectando...'
        });
        console.log(dispo.address);
        var status;
        bluetoothSerial.connect(dispo.address, function(){
            $location.path( '/tab/dash' );
            $ionicLoading.hide();
        }, function(){ 
            $ionicLoading.hide();
        });
    };
});
