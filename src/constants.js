/**
 * Images sets
 */
var SETS = {};

const REPAINT_DELAI = 120;

/**
 * Board or object orientation
 */
const ORIENTATION = {
	N: 0,
	E: 1,
	S: 2,
	W: 3
};

/**
 * Type of goods
 */
const GOOD_TYPE = {
	WHEAT: 'WHEAT',
	FISH: 'FISH',
	MEAT: 'MEAT',
	FRUIT: 'FRUIT',
	VEGETABLE: 'VEGETABLE',
	OLIVE: 'OLIVE',
	OIL: 'OIL',
	GRAPE: 'GRAPE',
	WINE: 'WINE',
	TIMBER: 'TIMBER',
	FURNITURE: 'FURNITURE',
	CLAY: 'CLAY',
	POTTERY: 'POTTERY',
	IRON: 'IRON',
	WEAPON: 'WEAPON',
	MARBLE: 'MARBLE'
};

/**
 * Type of roads
 */
const ROAD_TYPE = {
		// Dead Ends
		E: 'E',
		N: 'N',
		S: 'S',
		W: 'W',
		// Simple roads
		NS: 'NS',
		EW: 'EW',
		// Bend
		EN: 'EN',
		ES: 'ES',
		NW: 'NW',
		SW: 'SW',
		// T crossroads
		NSW: 'NSW',
		ESW: 'ESW',
		ENS: 'ENS',
		ENW: 'ENW',
		// Full crossroad
		ENSW: 'ENSW'
};