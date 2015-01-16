'use strict';
(function(){ // START IIFE

angular.module('wxApp.coremodules.wxattributes', ['wxApp.coremodules.conversions', 'wxApp.coremodules.tools'])
.service('WxAttributesService', WxAttributesService);
WxAttributesService.$inject = ['ConversionsService', 'ToolsService'];

function WxAttributesService(ConversionsService, ToolsService){

	// calculates the difference in humidity between two cities as compared to the distance between them
        this.calculateDrylineValues = function(cities, region){
                var drylineValues = [];
                for (let i = 0; i < cities.length; i++){
                        for (let j = 0; j < cities.length;j++){
                                if (cities[i].name != cities[j].name && cities[i].region == cities[j].region && cities[i].region == region){
                                        var kmDistance = ConversionsService.getCoordinatesToDistance(cities[i].coord.lat, cities[i].coord.lon, cities[j].coord.lat, cities[j].coord.lon);
                                        var humidityDiff = cities[i].main.humidity - cities[j].main.humidity;
                                        if (humidityDiff != 0){
                                                if (humidityDiff < 0)
                                                        humidityDiff = humidityDiff * -1;
                                                drylineValues.push({
                                                        region : cities[i].region,
                                                        cityA : cities[i].name,
                                                        cityB : cities[j].name,
                                                        cityAHumidity : cities[i].main.humidity,
                                                        cityBHumidity : cities[j].main.humidity,
							cityACoord : cities[i].coord,
							cityBCoord : cities[j].coord,
                                                        delta : humidityDiff / kmDistance
                                                });
                                        }
                                }
                        }
                }
                drylineValues = ToolsService.sortByAttribute(drylineValues, 'delta', 'desc');
                return drylineValues;
        }		

}

}
)(); // END IIFE

