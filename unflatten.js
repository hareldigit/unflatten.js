function unflatten(data,groupingRules) {
  	
	Array.prototype.getUniqueValues = function(key) {
		return [...new Set(this.map(item => item[key]))];
	};
	
	Array.prototype.findMatchItems = function(key,value) {
		return this.filter(function( obj ) {return obj[key] == value;});
	};
	
	Array.prototype.cleanPropeties = function(keys) {
		var arrItems = this;
		_.each(arrItems, function(item){
				_.each(keys, function(key){
					delete item[key];
				});
		});
	};
	
	Object.prototype.pushClusterItems = function(items) {
		var cluster = this;
			_.each(items, function(obj){
				  cluster.__Items.push(obj);
		 });
	};
	
	var prepareCluster = function (key,value){
		var cluster = {};
		cluster[key] = value;
		cluster.__Items = [];
		return cluster;
	}
  
	var enrichClusterAssociatedInfo = function (associatedInfo,items,key,cluster){
		_.each(associatedInfo, function(propName){  
		  var propValue = _.find(items, function(i) { return i[key] == cluster[key];})[propName] || "";
		  cluster[propName] = propValue;
		});
	}
	
	var exec = function(data,groupingRules){
		
		var branch = [];
		
		var key = groupingRules[0].key || "";
		var associatedInfo = groupingRules[0].associatedInfo || [];
		
		var keyValues = data.getUniqueValues(key);
		
		_.each(keyValues, function(value){            
			var arrMatchItems = data.findMatchItems(key,value);
			var cluster = prepareCluster(key,value); 
			enrichClusterAssociatedInfo(associatedInfo,arrMatchItems,key,cluster);
			
			var arrPropetiesForRemoval = associatedInfo;
				arrPropetiesForRemoval.push(key);
				arrMatchItems.cleanPropeties(arrPropetiesForRemoval);

			var arrNextIterateKeys =  [];
			if(groupingRules.length>1){
        var duplicatedGroupingRules = groupingRules.slice();
				duplicatedGroupingRules.shift();
				arrNextIterateKeys = duplicatedGroupingRules;
			}
		
			if(arrNextIterateKeys.length>0){
				if(!Array.isArray(arrNextIterateKeys)){
				  var tempValue = arrNextIterateKeys;
				  arrNextIterateKeys = [tempValue];
				}
		    console.log("before enter: ",arrMatchItems);
				arrMatchItems = exec(arrMatchItems,arrNextIterateKeys);
        console.log("after enter: ",arrMatchItems);
         console.log("---------------------");
			}
			cluster.pushClusterItems(arrMatchItems);
			 
			branch.push(cluster)
		});
		return branch		
	}
	
	var root = exec(data,groupingRules);
	return root;
}
