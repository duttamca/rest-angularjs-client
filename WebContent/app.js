var app = angular.module("usersApp",['ngResource']);

app.factory("UserFactory",function($resource){
	var appUrl = "http://localhost:7001/UsersRestWS/rest/v1/users/";
	//return $resource(appUrl);
	return $resource("",{},
	{
		'getAll':{
			method:"GET",
			url:appUrl,
			isArray:true
		},
		'save':{
			method:"POST",
			url:appUrl,
			params:{user:'@user'}
		},
		'update':{
			
		},
		'query':{
			
		},
		'remove':{		
			method:"DELETE",
			url:"http://localhost:7001/UsersRestWS/rest/v1/users/delete/:id",
			id: '@id'
		}
	});
});

app.controller("UserResourceController",function($scope,UserFactory){
	
	getUsers();
	
	function getUsers() {
		alert("inside get users");
		$scope.users = UserFactory.getAll();
		
    }
	
	$scope.addUser = function(username,emailid){
		  
		  alert(username);
		  alert(emailid);
		  
		  var user = {userName : username,emailID : emailid};
		 		  
		  UserFactory.save(user);
		  
		  getUsers();
	  };
	
	$scope.deleteUser = function(id){
		 var confirm = window.confirm("Confirm Delete");
		 	 
		  if(confirm){
			  UserFactory.remove({id:id});
			  getUsers();
		  }
	}; 
    
    /*function getUsers(){
		$http.get("http://localhost:7001/UsersRestWS/rest/v1/users/")
	  .success(function(response) {$scope.users = response;});
    };*/
	
	 $scope.toggle = function() {
	      $scope.myVar = !$scope.myVar;
	  };
});