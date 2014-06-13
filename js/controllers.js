var APP2 = angular.module('starter.controllers', []);
var code;

APP2.controller('DashCtrl', function($scope, $ionicModal, $location, $ionicLoading, Dispositivos) {
    $scope.change = function(comam) { 
      if(comam.value == false){
       console.log(comam.comando+'0');
          if(enviar(comam.comando+'0')==false){$location.path( '/tab/account' );}
      } else {
       console.log(comam.comando+'1'); 
          if(enviar(comam.comando+'1')==false){$location.path( '/tab/account' );}
      }
    };
    $scope.muda = function() { 
      enviar2(document.getElementById("corr").value,document.getElementById("corg").value,document.getElementById("corb").value);
    };
    bluetoothSerial.isConnected(function(){ console.log(23); }, function(){ $location.path( '/tab/account' ); });
});

APP2.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
});

APP2.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
});

APP2.controller('AccountCtrl', function($scope, $ionicLoading, $ionicPopup, $location, Dispositivos) {
    $scope.devices  = Dispositivos.all();
    $scope.click = function(dispo) { 
        $ionicLoading.show({
          template: 'Conectando...'
        });
        console.log(dispo.address);
        var status;
        bluetoothSerial.connect(dispo.address, function(c){
            $ionicLoading.hide();
            code = dispo.address;
            console.log(c);
            $location.path( '/tab/dash' );
        }, function(x){ 
            $ionicLoading.hide();
            console.log(x);
            $ionicPopup.alert({
                  title: 'Aviso!',
                  content: x
                });
        });
    };
});

function enviar(str){
    var f = {d: str};
    var s = JSON.stringify(f);
    bluetoothSerial.isConnected(function(){
        bluetoothSerial.write(s,function(c){ console.log(c); }, function(c){ console.log("ERRO: "+c);});
        return true;
    }, function(){
        bluetoothSerial.connect(code, function(c){
             bluetoothSerial.write(s,function(c){ console.log(c); }, function(c){ console.log("ERRO: "+c);});
            return true;
        }, function(x){ 
            return false;
        });
    });
}

function enviar2(r,g,b){
    var en = r+","+g+","+b+",";
    console.log(en);
    bluetoothSerial.isConnected(function(){
        bluetoothSerial.write(en,function(c){ console.log(c); }, function(c){ console.log("ERRO: "+c);});
        return true;
    }, function(){
        bluetoothSerial.connect(code, function(c){
             bluetoothSerial.write(en,function(c){ console.log(c); }, function(c){ console.log("ERRO: "+c);});
            return true;
        }, function(x){ 
            return false;
        });
    });
}
