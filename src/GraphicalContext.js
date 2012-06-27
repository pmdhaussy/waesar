/**
 * GraphicalContext 
 */
var GraphicalContext = function() {
	const SQUARE_WIDTH = 58;
	const SQUARE_HEIGHT = 30;

	/**
	 * Constructor
	 * @param canvas canvas
	 */
	var Class = function(canvas, width, height, orientation) {
		this.canvas = canvas;
		this.context = canvas.getContext("2d");
		this.width = width;
		this.height = height;
		this.orientation = orientation;
		this.angle = orientation*Math.PI/2 + Math.PI/4
		this.zoom = 1;
		this.offset = {x: 0, y: 0};
		this.mousePosition = {x : 0, y : 0};
		this.selectedTile = undefined;
		this.listeners = {};
		var gcontext = this;
		canvas.addEventListener('mousemove', function(event) {gcontext.onmousemove(event);}, false);
		canvas.addEventListener('click', function(event) {gcontext.onclick(event);}, false);
		canvas.addEventListener("mousewheel", function(event) {gcontext.onmousewheel(event);}, false);
		canvas.addEventListener("mouseup", function(event) {gcontext.onmouseup(event);}, false);
		canvas.addEventListener("mousedown", function(event) {gcontext.onmousedown(event);}, false);
	};
	
	Class.prototype.changeOrientation = function(orientation) {
	console.log(orientation);
		this.orientation = orientation;
		this.angle = orientation*Math.PI/2 + Math.PI/4
		this.fireEvent("rotate", {orientation: orientation});
	};
	
	/**
	 * Clear canvas
	 */
	Class.prototype.clear = function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	};
	
	Class.prototype.drawImage = function(image, size, position, offset) {
		var width = image.width * this.zoom;
		var height = image.height * this.zoom;

		var i = position.i;
		var j = position.j;
		i -= Math.floor(((this.orientation+0)%4)/2) * (size.width -1);
		j -= Math.floor(((this.orientation+1)%4)/2) * (size.height-1);

		var c = this.toRealCoord({i:i,j:j});
		var x = c.x - SQUARE_WIDTH / 2 * this.zoom;
		var y = c.y + SQUARE_HEIGHT / 2;

		x += (SQUARE_WIDTH - image.width) * 0.5 * this.zoom;
		y -= image.height * 0.5 * this.zoom + (image.height - SQUARE_HEIGHT) * 0.5 * this.zoom;
		if(!!offset) {
			x += offset.x * this.zoom;
			y += offset.y * this.zoom;
		}
		this.context.drawImage(image, x, y, width, height);
	};

	Class.prototype.addEventListener = function(eventType, callback, object) {
		var listeners = this.listeners[eventType];
		if(!listeners) {
			listeners = [];
			this.listeners[eventType] = listeners;
		}
		listeners.push({callback: callback, object: object}); 
	}
	
	Class.prototype.fireEvent = function(eventType, event) {
		var listeners = this.listeners[eventType];
		if(!!listeners) {
			for(var i=0; i<listeners.length; i++) {
				var listener = listeners[i];
				if(listener.object) {
					listener.callback.apply(listener.object, [event]);
				} else {
					listener.callback(event);
				}
			}
		}
	}

	Class.prototype.toRealCoord = function(coord) {
		// Centrage de la carte sur l'origine des axes
		var x = coord.i - this.width /2;
		var y = coord.j - this.height/2;
		// Rotation pour orienter la carte dans le bon sens
		// TODO: Prendre en comte la direction N/E/S/W
		var transform = Matrix.Rotation(this.angle);
		coord = $M([[x], [y]]); // FIXME The parameter coord should not be assigned
		coord = transform.multiply(coord); // FIXME The parameter coord should not be assigned
		// Etirement de la carte pour s'adapter à la taille des images 
		x = coord.elements[0][0] / Math.sqrt(2) * SQUARE_WIDTH  * this.zoom;
		y = coord.elements[1][0] / Math.sqrt(2) * SQUARE_HEIGHT * this.zoom;
		// Déplacement de la carte pour la centrer correctement
		x = x + this.canvas.width /2 + this.offset.x;
		y = y + this.canvas.height/2 + this.offset.y;
		// Optim pour faire référence a des pixels entier
		x = Math.round(x);
		y = Math.round(y);
		return {x: x, y: y};
	};

	Class.prototype.fromRealCoord = function(coord) {
		// Déplacement de la carte pour la centrer correctement
		var x = coord.x - this.offset.x - this.canvas.width/2;
		var y = coord.y - this.offset.y - this.canvas.height/2;
		// Etirement de la ccarte pour s'adapter à la taille des images
		x = x / SQUARE_WIDTH  * Math.sqrt(2) / this.zoom;
		y = y / SQUARE_HEIGHT * Math.sqrt(2) / this.zoom;
		// Rotation pour orienter la carte dans le bon sens
		// TODO: Prendre en comte la direction N/E/S/W
		var transform = Matrix.Rotation(-this.angle);
		coord = $M([[x], [y]]); // FIXME The parameter coord should not be assigned
		coord = transform.multiply(coord); // FIXME The parameter coord should not be assigned
		// Centrage de la carte sur l'origine des axes
		var x = coord.elements[0][0] + this.width/2;
		var y = coord.elements[1][0] + this.height/2;

		// Hack for adjusting values
		x += Math.floor(((this.orientation+0)%4)/2);
		y += Math.floor(((this.orientation+1)%4)/2);

		return {
			i: Math.floor(x),
			j: Math.floor(y)
		};
	};

	Class.prototype.onmousemove = function(event) {
		var evt = event || window.event;
		var x = event.clientX - this.canvas.offsetLeft + window.pageXOffset;
		var y = event.clientY - this.canvas.offsetTop + window.pageYOffset;

		var c = this.fromRealCoord({x: x, y: y});
		if(!this.mousePosition || this.mousePosition.i != c.i || this.mousePosition.j != c.j) {
			this.mousePosition = c;
			this.fireEvent("move", {position: this.mousePosition});
		}


		if(!!this.moveMap) {
			this.offset.x += evt.clientX - this.moveMap.x;
			this.offset.y += evt.clientY - this.moveMap.y;
			this.moveMap = {x: evt.clientX, y: evt.clientY};
		}
	};

	Class.prototype.onclick = function(event) {
		var x = event.clientX - this.canvas.offsetLeft + window.pageXOffset;
		var y = event.clientY - this.canvas.offsetTop + window.pageYOffset;
		var c = this.fromRealCoord({x: x, y: y});

		this.fireEvent("click", {position: c});
	};
	
	Class.prototype.onmousewheel = function(event) {
		if(event.shiftKey) { // FIXME Et les autres navigateurs ?
			var step = 1.1;
			if(event.wheelDelta>0) {
				this.zoom *= step;
			} else {
				this.zoom /= step;
			}
			event.stopPropagation();
		}
	};

	Class.prototype.onmousedown = function(event) {
		var evt = event || window.event;
		this.moveMap = {x: evt.clientX, y: evt.clientY};
	}

	Class.prototype.onmouseup = function(event) {
		this.moveMap = undefined;
	}
		
	return Class;
}();
