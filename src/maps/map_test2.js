/*
 * Map description
 */
const MAP_SIZE = {width: 25, height:25};
var MAP = [];

// Put some grass in whole map 
for(var i = 0 ; i < MAP_SIZE.width ; i++) {
	for(var j = 0 ; j < MAP_SIZE.height ; j++) {
		MAP.push({clazz: 'Grass', position: {i:i, j:j}});
	}
}


function circleWithSigns(i, j, m) {
	for(var n = 0 ; n < m ; n++) {
		MAP.push({clazz: 'Sign', position: {i:i+n, j:j-1}, orientation: ORIENTATION.N}); // top
		MAP.push({clazz: 'Sign', position: {i:i-1, j:j+n}, orientation: ORIENTATION.N}); // left
		MAP.push({clazz: 'Sign', position: {i:i+m, j:j+n}, orientation: ORIENTATION.N}); // right
		MAP.push({clazz: 'Sign', position: {i:i+n, j:j+m}, orientation: ORIENTATION.N}); // bottom
	}
}


MAP.push({
	clazz: 'Farm', 
	position: {i:12, j:12},
	good: {type: GOOD_TYPE.FRUIT, quantity: 3},
});
MAP.push({
	clazz: 'Farm', 
	position: {i:15, j:12},
	good: {type: GOOD_TYPE.MEAT, quantity: 3},
});
MAP.push({
	clazz: 'Farm', 
	position: {i:18, j:12},
	good: {type: GOOD_TYPE.WHEAT, quantity: 3},
});
MAP.push({
	clazz: 'Farm', 
	position: {i:12, j:15},
	good: {type: GOOD_TYPE.VEGETABLE, quantity: 3},
});
MAP.push({
	clazz: 'Warehouse', 
	position: {i:15, j:15},
	goods: [
	        {type: GOOD_TYPE.WHEAT, quantity: 4},
	        {type: GOOD_TYPE.FURNITURE, quantity: 3},
	        {type: GOOD_TYPE.WINE, quantity: 4},
	        {type: GOOD_TYPE.MARBLE, quantity: 1},
	        {type: GOOD_TYPE.GRAPE, quantity: 3}
    ]
});
MAP.push({
	clazz: 'Farm', 
	position: {i:18, j:15},
	good: {type: GOOD_TYPE.VEGETABLE, quantity: 3},
});
MAP.push({
	clazz: 'Farm', 
	position: {i:12, j:18},
	good: {type: GOOD_TYPE.WHEAT, quantity: 3},
});
MAP.push({
	clazz: 'Farm', 
	position: {i:15, j:18},
	good: {type: GOOD_TYPE.OLIVE, quantity: 3},
});
MAP.push({
	clazz: 'Farm', 
	position: {i:18, j:18},
	good: {type: GOOD_TYPE.FRUIT, quantity: 3},
});