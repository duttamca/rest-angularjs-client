var module = angular.module('usersApp', []);
/*.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);*/

 
module.service('UserService', function ($http) {
    
	var baseURL="http://localhost:7001/UsersRestWS/rest/v1/users/";
	//delete $http.defaults.headers.common['X-Requested-With'];
    //add method add a new User 
   this.addUser = function (user) {
       //alert("inside add user service");
    	$http.post(baseURL,user);
    	return;
  	  /*.success(function() {
  		  alert("User added");
  		  loadUsers($scope);
  		});*/
    	
    };
 
        
    //iterate through contacts list and delete 
    //contact if found
    this.deleteUser = function (id) {
    	//alert("iniside service delete user");
    	$httpdelete(baseURL +"delete/"+id);
    	return;
		  /*.success(function() {
			  //alert("User Deleted");
			  //loadUsers();
			});*/
    };
 
    //simply returns the Users list
    this.loadUsers = function () {
    	//alert("inside service load users");
    	//$http.jsonp(baseURL +"callback=jsonp_callback")
    	//delete $http.defaults.headers.common['X-Requested-With'];
    	$http.get(baseURL)
    	.success(function(response) {
    		  //alert("User loaded");
    		  $scope.users = response;
    		  //return;
    		  //loadUsers();
    		});
    	
    };
    
    /*function jsop_callback(response){
    	alert("jsonp call back");
    	$scope.users = response;
    }*/
});
 
module.controller('UserController', function ($scope, UserService) {
 
	UserService.loadUsers($scope);
	
    $scope.addUser = function (username,emailid) {
    	
    	//alert("inside add user");
    	
    	var dataObj = {userName : username,	emailID : emailid};
    	
        $scope.users = UserService.addUser(dataObj);
        //UserService.loadUsers($scope);
        
    };
 
 
    $scope.deleteUser = function (id) {
    	//alert(id);
    	var confirm = window.confirm("Confirm Delete");
    	if(confirm){
    		$scope.users = UserService.deleteUser(id);
        	//UserService.loadUsers($scope);
    	}
    	
        
    };
    
    $scope.toggle = function() {
        $scope.myVar = !$scope.myVar;
    };
});