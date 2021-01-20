import Loader from "./assets.js";
import Scene from "./scene.js";
import { config } from "./config.js";

function Game() {
	this.loader    = new Loader();
	this.assets    = null;
	this.scene     = null;
	this.interval  = null;
	this.frameRate = config.MAX_FRAMERATE;

}


//-------------------------------------------------------------------------------------------------

Game.prototype.gameLoop = function() {

	this.scene.update();
	this.scene.draw();
	this.scene.sound();

	if(this.scene.time % 1000 === 0 && this.frameRate > config.MIN_FRAMERATE) {
		clearInterval(this.interval);
		this.interval = setInterval(() => {this.gameLoop()} , this.frameRate -= config.FRAMERATE_STEP);
		console.log("increased with jesus christ to " , this.frameRate);
	}

	if(this.scene.isFinised) {clearInterval(this.interval);return;}
	if(this.scene.isPaused ) {clearInterval(this.interval);return;}
}

//-------------------------------------------------------------------------------------------------


Game.prototype.start = function() {
	return this.loader.fetch().then((assets) => {
		this.assets = assets;
		this.scene  = new Scene(this.assets);
		this.controllers();

		this.interval = setInterval(() => {this.gameLoop()} , this.frameRate);

		return assets;
	} , (error) => {
		throw error;
	})
}

//-------------------------------------------------------------------------------------------------

Game.prototype.controllers = function() {
	document.addEventListener('keydown', event => {
		if (event.code === 'Space') {
			if(this.scene.isFinised) return;
			if(this.scene.isPaused) {
				this.scene.sceneTogglePauseSignal();
				this.interval = setInterval(() => {this.gameLoop()} , this.frameRate);
			}
			this.scene.dinoJumpSingnal();
		}
	});

	document.addEventListener('keydown', event => {
		if (event.code === 'Escape') {
			if(this.scene.isFinised) return;
			this.scene.sceneTogglePauseSignal();
			if(!this.scene.isPaused) this.interval = setInterval(() => {this.gameLoop()} , this.frameRate);
		}
	});
}



let game = new Game();

game.start().then((assets) => {
	console.log(assets , "loaded successfully with jesus christ help");
} , (error) => {
	console.log(error);
})
