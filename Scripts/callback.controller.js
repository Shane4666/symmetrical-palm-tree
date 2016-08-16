myApp.controller('SummonerData', function ($scope, Database){
	var vm= this;
	summonerReturn = function(data){
		vm.database = data;
		vm.summoner = {
			iconId: data[Object.keys(data)[0]].profileIconId,
			summonerName: data[Object.keys(data)[0]].name,
			summonerId: data[Object.keys(data)[0]].id
		};
		Database.getSummonerMatches(matchReturn, failureFunction, vm.summoner.summonerId);
	};

	matchReturn = function(data){
		vm.myMatches = data.games;
		var lookup = {};
		for (var i = 0; i < vm.myMatches.length; i++) {
		var detail = Database.getImageInfo(vm.myMatches[i].championId, vm.myMatches);
		vm.myMatches[i]["name"] = detail;
		}
	};

	vm.getSummonerMastery = function(){
	Database.getMasteryInfo(vm.summoner.summonerId);
	console.log("YAY");
	};

	getMatchHistory = function(summonerId){
		Database.getSummonerMatches(matchReturn, failureFunction, vm.summoner.summonerId);
	};

	failureFunction = function(data){
		console.log('Error' + data);
	};
	vm.getSummoner = function(summonerName){
		Database.getSummonerInfo(summonerReturn, failureFunction, summonerName);
	}; 

	myApp.filter('iif', function () {
  		 return function(input, trueValue, falseValue) {
        return input ? trueValue : falseValue;
   };
});
});