
function Loader() {
	this.assets = {
		"images" : {
			"dino" : {
				"dino-0" : {
					src : "./assets/images/dino/dinoLeftUp.png",
					obj : null
				} ,
				"dino-1" : {
					src : "./assets/images/dino/dinoRightUp.png",
					obj : null
				} , 
				"dino-2" : {
					src : "./assets/images/dino/dinoAllOnEyeOpen.png",
					obj : null
				} ,
				"dino-3" : {
					src : "./assets/images/dino/dinoAllOnEyeClosed.png",
					obj : null
				} ,
				"dino-4" : {
					src : "./assets/images/dino/dinoDie.png",
					obj : null
				} ,
			} ,

			"tree" : {
				"tree-0" : {
					src : "./assets/images/tree/treeOne-0.png",
					obj : null
				} ,
				"tree-1" : {
					src : "./assets/images/tree/treeOne-1.png",
					obj : null
				} ,
				"tree-2" : {
					src : "./assets/images/tree/treeTwo-0.png",
					obj : null
				} ,
				"tree-3" : {
					src : "./assets/images/tree/treeTwo-1.png",
					obj : null
				} ,
				"tree-4" : {
					src : "./assets/images/tree/treeTwo-2.png",
					obj : null
				} 
			} ,

			"bird" : {
				"bird-0" : {
					src : "./assets/images/bird/birdWingDown.png",
					obj : null
				} ,
				"bird-1" : {
					src : "./assets/images/bird/birdWingUp.png",
					obj : null
				} 
			} ,

			"cloud" : {
				"cloud-0" : {
					src : "./assets/images/cloud/cloud-0.png",
					obj : null
				}
			} ,

			"button" : {
				"again" : {
					src : "./assets/images/button/playAgain.png",
					obj : null
				}
			}


		} ,

		"sounds" : {
			"jump" : {
				src : "./assets/sounds/lose.mp3",
				obj : null
			} ,
			"hit" : {
				src : "./assets/sounds/hit.mp3" ,
				obj : null
			}
		} ,

		"fonts" : {
			"atari-0" : {
				src : "./assets/fonts/AtariClassicChunky-PxXP.ttf" ,
				obj : null
			} ,
			"atari-1" : {
				src : "./assets/fonts/AtariClassicExtrasmooth-LxZy.ttf" ,
				obj : null
			} ,
			"atari-2" : {
				src : "./assets/fonts/AtariClassic-gry3.ttf" ,
				obj : null
			} ,
			"atari-3" : {
				src : "./assets/fonts/AtariClassicSmooth-XzW2.ttf" ,
				obj : null
			} ,
		}
	}
}

//-------------------------------------------------------------------------------------------------


Loader.prototype.loadImages = function() {
	let promises = [];
	Object.getOwnPropertyNames(this.assets["images"]).forEach((category) => {
		Object.getOwnPropertyNames(this.assets["images"][category]).forEach((element) => {
			let obj = this.assets["images"][category][element];
			let img = new Image();
			promises.push(new Promise((resolve , reject) => {
				img.src = obj.src;
				img.onload = function() {
					resolve({
						"category" : category,
						"name" : element,
						"obj"  : img
					});
				}
				img.onerror = function(error) {
					reject({
						"category" : category,
						"name"  : element,
						"obj"   : img,
						"error" : error 
					});
				}
			}));
		});
	})
	return Promise.all(promises).then((imgData) => {
		imgData.forEach((item) => {
			this.assets["images"][item.category][item.name].obj = item.obj;
		})
		return true;
	})
}

//-------------------------------------------------------------------------------------------------

Loader.prototype.loadSounds = function() {
	let promises = [];
	Object.getOwnPropertyNames(this.assets["sounds"]).forEach((element) => {
		let item = this.assets["sounds"][element];
		promises.push(new Promise((resolve , reject) => {
			let audio = new Audio(item.src);
			audio.onloadeddata = function() {
				resolve({
					"name" : element,
					"obj"  : audio,
				});
			}
			audio.onerror = function(error) {
				reject({
					"name" : element,
					"obj"  : audio,
					"error" : error
				})
			}	
		}));
	});

	return Promise.all(promises).then((soundData) => {
		soundData.forEach((item) => {
			this.assets["sounds"][item.name].obj = item.obj;
		});
		return true
	});
}

//-------------------------------------------------------------------------------------------------

Loader.prototype.loadFonts = function() {
	let promises = [];
	Object.getOwnPropertyNames(this.assets["fonts"]).forEach((element) => {
		let item = this.assets["fonts"][element];
		let font = new FontFace(element , `url(${item["src"]})`);
		promises.push(font.load().then((loadedFont) => {
			document.fonts.add(loadedFont);
			return {name : element , obj : loadedFont};
		} , 
		(error) => {
			throw {name : element , obj : loadedFont , error : error};
		}))
	});
	return Promise.all(promises).then((fontData) => {
		fontData.forEach((item) => {
			this.assets["fonts"][item.name].obj = item.obj;
		});
		return true
	});
}

//-------------------------------------------------------------------------------------------------

Loader.prototype.fetch = function() {
	return Promise.all([
		this.loadImages(),
		this.loadSounds(),
		this.loadFonts()
	]).then((bool) => {
		return this.assets;
	} , (error) => {
		console.log("error found");
		throw error;
	})
}







export default Loader;