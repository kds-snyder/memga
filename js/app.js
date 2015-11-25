angular.module('app', ['ngMaterial']).config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey');
});

angular.module('app').controller('MemoryGameController', function($scope, $timeout) {

	function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
	}

	$scope.cards = [];

	$scope.selectedCards = [];

	for(var i = 0; i < 32; i++) {
		$scope.cards.push({
			id: i + 1,
			flipped: false,
			value: i % 2 == 0 ? i : i - 1,
			disabled: false
		});
	}

	shuffle($scope.cards);

	$scope.clickCard = function(card) {

		var found = false;

		for(var i = 0; i < $scope.selectedCards.length; i++) {
			if($scope.selectedCards[i].id === card.id) {
				found = true;
			}
		}

		if(!card.disabled && $scope.selectedCards.length < 2 && !found) {
			card.flipped = !card.flipped;

			$scope.selectedCards.push(card);
			
			if($scope.selectedCards.length == 2) {
				
				if($scope.selectedCards[0].value == $scope.selectedCards[1].value) {

					$scope.selectedCards[0].disabled = true;
					$scope.selectedCards[1].disabled = true;

					$scope.selectedCards = [];

				} else {
				

					$timeout(function() {
						$scope.selectedCards[0].flipped = false;
						$scope.selectedCards[1].flipped = false;

						$scope.selectedCards = [];
					}, 1000);
					
				}
			}
		}
	};


});