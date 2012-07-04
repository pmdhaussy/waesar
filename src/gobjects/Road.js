/**
 * Road 
 */
var Road = function() { // FIXME Comment on fait pour hériter ?
	const SET = SETS['roman'];

	/**
	 * Constructor
	 * @param gcontext the graphical context
	 * @param position absolute position object instance on the game board (first : 0,0 ; second 1,0 ; ...)
	 */
	var Class = function(gcontext) {
		this.gcontext = gcontext;
		this.size = {width: 1, height: 1};
	};
	
	/**
	 * Draw object on canvas
	 */
	Class.prototype.paint = function() {
		var type = this.computeType();
		//this.gcontext.drawImage(SET['ROAD_' + this.number], this.size, this.position);
	};
	
	/*
	 * Retrieve a JSON string to save object state
	 */
	Class.prototype.serialize = function() {
		return {
			position: this.position
		};
	};
	
	/*
	 * Set attributes from json object
	 */
	Class.prototype.unserialize = function(description) {
		this.position = description.position;
	};
		
	return Class;
}();
