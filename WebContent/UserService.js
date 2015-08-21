var module = angular.module('usersApp', []);
 
module.service('UserService', function ($http) {
	
	var baseURL="http://localhost:7001/UsersRestWS/rest/v1/users/";
	
	this.loadUsers=function($scope){
		//alert("inside load users");
		$http.get(baseURL).then(function(response) {
			$scope.users = (response.data);
  		});
		
		//return users;
	};
	
	this.loadUser=function(id){
		//alert("inside load users");
		$http.get(baseURL+id).success(function(response) {
			alert(response.data.userID);
			//$scope.users = (response.data);
  		});
		
		//return users;
	};
	
	this.addUser=function(user){
		alert(user.userID);
		alert(user.userName);
		alert(user.emailID);
		/*$http.post(baseURL,user).success(function() {
  		  //alert("User added");
  		  //loadUsers($scope);
  		});*/
		
	};
	
this.deleteUser=function(id){
		
		$http.remove(baseURL +"delete/" +id).success(function() {
  		  //alert("User deleted");
  		  //loadUsers($scope);
  		});
		
	};
    
	
});
 
module.controller('UserController', function ($scope, UserService) {
	
	$scope.users=[];
	
	init();
	
	function init(){
		UserService.loadUsers($scope);
		//var response=UserService.loadUsers();
		//$scope.users = UserService.loadUsers();
		//alert("response from service is :" +response);
		//$scope.users = response;
	}
	
	$scope.addUser = function(){
		//alert($scope.user.userName);
		//alert($scope.user.emailID);
		var dataObj = {userID: $scope.user.userID,userName : $scope.user.userName,	emailID : $scope.user.emailID};
		UserService.addUser(dataObj);
		init();
		
		$scope.user.userName="";
		$scope.user.emailID="";	
	};
	
	$scope.deleteUser = function(id){
		
		UserService.deleteUser(id);
		init();
	};
	
	$scope.editUser = function(userid,username,emailid){
		alert(username);
		$scope.newuser.userID=userid;
		$scope.newuser.userName = username;
		$scope.newuser.emailID=emailid;
		alert($scope.newuser.userName);
		//$scope.newuser = angular.copy(UserService.loadUser(id));
		//UserService.loadUser(id);
		//init();
	};
 
   
    $scope.toggle = function() {
        $scope.myVar = !$scope.myVar;
    };
});