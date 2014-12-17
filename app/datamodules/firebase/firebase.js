'use strict';
(function(){ // START IIFE

angular.module('wxApp.datamodules.firebase', ['firebase'])
.service('FirebaseDataService', FirebaseDataService);
FirebaseDataService.$inject = ['$q'];

function FirebaseDataService($q){
	var self = this;

	var firebaseObj = new Firebase("https://resplendent-heat-1209.firebaseio.com/wx/");

	// returns the full dataset for the current weather data
	// in using promises it keeps the process in the digest cycle
	// input: callback function
	// output: calls callback function with data	
	this.getFullDataset = function(callback){
		var promise = getOnce();
                promise.then(function(message) {
			callback(message);
                }, function(error) {
                        alert('Failed: ' + error);
                });

		function getOnce(){
			var deferred = $q.defer();
			firebaseObj.once('value', function(snapshot) {
				var message = snapshot.val();
				deferred.resolve(message);
			});
			return deferred.promise;
		};		
	};

	// returns any updates to the full dataset
	// input: callback function
	// output: calls callback function with data
	this.getUpdates = function(callback){
		firebaseObj.on('child_changed', function(snapshot) {
                        var message = snapshot.val();
			callback(message);
		});
	};
}

}
)(); // END IIFE
