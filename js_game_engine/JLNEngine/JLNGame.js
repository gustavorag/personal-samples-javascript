//MY JS Lib
(function init(){
	console.log("Init Jln");

	var game_window;
	var keyboard = {
		keysDown:[],
		putKeyDown: function(key){
			var put = true;
			for(var index=0; index < keyboard.keysDown.length; index++){
				if(keyboard.keysDown[index] == key) put = false;
			}
			if(put){
				keyboard.keysDown.push(key);
			}
		},
		popKeyDown: function(key){
			var keyToRemove;
			for(var index=0; index < keyboard.keysDown.length; index++){
				if(keyboard.keysDown[index] == key){
					keyToRemove = index;	
				} 
			}
			if(keyToRemove > -1){
				keyboard.keysDown.splice(keyToRemove, 1);	
			}
			
		},
		isKeyUp: function(key){
			for(var index=0; index < keyboard.keysDown.length; index++){
				if(keyboard.keysDown[index] == key) return false;
			}
			return true;
		},
		isKeyDown: function(key){
			for(var index=0; index < keyboard.keysDown.length; index++){
				if(keyboard.keysDown[index] == key) return true;
			}
			return false;
		}
	}
	
	function createGameWindow(screenWidth, screenHeight){

		var _window = GraphicalObject();
		var w = window.innerWidth;
		var h = window.innerHeight;

		//console.log("Window sizes : "+w+" - "+h);

		_window.width = screenWidth <  w ? screenWidth: w;
		_window.height = screenHeight <  h ? screenHeight : h;

		_window.position.y = Math.round((w - _window.width)/2);
		//_window.position.x = Math.round((h - _window.height)/2);
		_window.position.x = 10;
		_window.loadContent = function(callbackFunc){
			if(callbackFunc){
				callbackFunc();
			}
		}
		_window.draw = function(zIndex, callbackFunc){
			//console.log("draw of game window")
			var gameWindowDiv = document.getElementById(_window.getId());
			
			if(!gameWindowDiv){
				var style = "position: static; width:"+_window.width+"px; height:"+
					_window.width+"px; background-color: black; margin-top: "
					+_window.position.x+"px; margin-left: "+_window.position.y+"px; z-index:"+zIndex;
				// document.write("<div id='"+_window.getId()+"' style='"+style+"'></div>");

				var newElement = document.createElement("div");
				newElement.setAttribute('id', _window.getId());
    			newElement.setAttribute('style', style);

    			var body = document.getElementsByTagName("body")[0];
    			body.style.overflow = 'hidden';
				body.appendChild(newElement);
			}else{

			}

			if(callbackFunc){
				callbackFunc();
			}
		}
		_window.update = function(callbackFunc){
			callbackFunc();
		}
		return _window;
	}

	

	function generateUUID() {
		    var d = new Date().getTime();
		    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		        var r = (d + Math.random()*16)%16 | 0;
		        d = Math.floor(d/16);
		        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
		    });
		    return uuid;
	};

	function GraphicalObject(imgSource, isViseble, isCollisionActive, updateMethod){

		var id = generateUUID();
		console.log("Creating new Graphical Object with ID: "+id)
		var _newGraphicObject = {
			image: undefined,
			position: {x:0, y:0},
			width: 0,
			height: 0,
			visible: isViseble,
			velocity: {vX: 0, vY: 0},
			collisionActive: isCollisionActive,
			update:updateMethod,
			getId: function(){return id},
			loadContent: function(callbackFunc){
				var img = new Image();
				img.onload = function() {
		  			_newGraphicObject.width = this.width;
					_newGraphicObject.height = this.height; 
					_newGraphicObject.image = img;
					callbackFunc();
				}
				img.src = imgSource;
			},
			draw: function(zIndex, callbackFunc){

				var gameWindowDiv = document.getElementById(game_window.getId());
				var thisElement = document.getElementById(_newGraphicObject.getId());
				//console.log("Velocity"+_newGraphicObject.velocity.vX);

				_newGraphicObject.position.x = (_newGraphicObject.position.x 
					+ _newGraphicObject.velocity.vX);
				_newGraphicObject.position.y = (_newGraphicObject.position.y 
					+ _newGraphicObject.velocity.vY);

    			// var ctx = gameWindowDiv.getContext("2d");
    			// ctx.drawImage(_newGraphicObject.image,
    			// 	_newGraphicObject.position.y,_newGraphicObject.position.x,
    			// 	20, 15);
					
				if(!thisElement){

					var style = "position: absolute; width:"+_newGraphicObject.width+"px; height:"
					+_newGraphicObject.height+"px; margin-top: "
					+_newGraphicObject.position.x
					+"px; margin-left: "+_newGraphicObject.position.y+"px;";
					
					var divImage = document.createElement("div");
					divImage.setAttribute('id', _newGraphicObject.getId());
					divImage.setAttribute('style', style);
					var newElement = document.createElement("img");
    				newElement.setAttribute('src', _newGraphicObject.image.src);
    				newElement.setAttribute('style', style);
    				
    				divImage.appendChild(newElement);
					gameWindowDiv.appendChild(divImage);

				}else{

					// if( (_newGraphicObject.position.x+_newGraphicObject.heigth < game_window.position.x)
					// 	&& (_newGraphicObject.position.x+_newGraphicObject.heigth < game_window.position.x)

					thisElement.style.marginTop = _newGraphicObject.position.x+"px";
					thisElement.style.marginLeft = _newGraphicObject.position.y+"px";
				}
				if(callbackFunc){
					callbackFunc();
				}
			}
		}

		return _newGraphicObject;

	}

	function GameHandler(screenWidth, screenHeight, updateGame, frameRate){ //FrameRate should be fixed?

		var graphicalObjects = [];
		var gameRunning = false;
		var loading = false;
		game_window = createGameWindow(screenWidth, screenHeight);
		graphicalObjects.push(game_window);

		var indexLoadContent = 0;
		var indexDrawAllContent = 0;
		var indexUpdateContent = 0;
		
		var loadAllContent = function(){

			if(indexLoadContent < (graphicalObjects.length-1)){
				// console.log("loading item :"+indexLoadContent)
				// console.log(graphicalObjects[indexLoadContent])
				graphicalObjects[indexLoadContent++].loadContent(loadAllContent) //This is this method to be called again until finish all objects in array	
			}else if (indexLoadContent === graphicalObjects.length-1){
				// console.log("loading item :"+indexLoadContent)
				// console.log(graphicalObjects[indexLoadContent])
				graphicalObjects[indexLoadContent++].loadContent(runGame);
			}
		}

		var updateContent = function(){
			
			if(indexUpdateContent < (graphicalObjects.length-1)){
				graphicalObjects[indexUpdateContent++].update(updateContent) //This is this method to be called again until finish all objects in array
			}else if (indexUpdateContent === graphicalObjects.length-1){
				graphicalObjects[indexUpdateContent++].update(drawAllContent);
			}
		}
		
		var drawAllContent = function(){
			
			if(indexDrawAllContent < (graphicalObjects.length-1)){
				graphicalObjects[indexDrawAllContent++].draw(indexDrawAllContent, drawAllContent);//This is this method to be called again until finish all objects in array
			}else if (indexDrawAllContent === graphicalObjects.length-1){
				graphicalObjects[indexDrawAllContent++].draw(indexDrawAllContent, drawAllContent);
			}
		}

		var updateGlobal = function(updateFrequency){
			//console.log("update with:"+updateFrequency);
			indexUpdateContent = 0;
			indexDrawAllContent = 0;
			updateGame();
			updateContent();
			drawAllContent();
			if(gameRunning){
				setTimeout(function(){
					updateGlobal(updateFrequency)
				},updateFrequency);
			}
		}

		var runGame = function(){
			loading = false;
			indexLoadContent = 0;
			gameRunning = true;
			var updateFrequency = 1000 / frameRate;
			updateGlobal(updateFrequency);
		}

		var _GameHandler_API = {
			createNewGraphicalObject: GraphicalObject,
			addGraphicalObjects: function(grapicalObject){
				graphicalObjects.push(grapicalObject);
			},
			start: function(){
				console.log("Initiating game");
				loading = true;
				loadAllContent();
			},
			stop: function clean(){
				gameRunning = false;
				graphicalObjects = [];
				//What more to do? how to dispose all content ?
			},
			pause: function pause(){
				gameRunning = false;
			},

		}

		return _GameHandler_API;
	}

	document.onkeydown = function (e) {
    	e = e || window.event;
    	// use e.keyCode
    	//console.log(e.keyCode)
    	keyboard.putKeyDown(e.keyCode);
	};

	document.onkeyup = function (e) {
    	e = e || window.event;
    	// use e.keyCode
    	//console.log(e.keyCode)
    	keyboard.popKeyDown(e.keyCode);
	};


	jln = {
		createGameHandler : GameHandler,
		keyboardUtil : {
			isKeyDown: keyboard.isKeyDown,
			isKeyUp: keyboard.isKeyUp
		}
	}
	
	window.$JLN = jln;
}
)();