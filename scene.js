import { Dino , Stone , Cloud , Tree , Bird } from "./body.js";
import { randomInteger  , percentOf} from "./utils.js"
import { config } from "./config.js";

function Scene(assets) {
	this.assets  	= assets;
	this.time       = 0;
	this.isFinised  = false;
	this.isPaused 	= true;
	this.firstDraw  = true;
	this.score   	= 0;


	this.dino    = new Dino(assets["images"]["dino"]);
	this.trees   = [];
	this.birds   = [];
	this.clouds  = [];
	this.stars   = [];
	this.stones  = [];


	this.generateStones();
	this.generateClouds();
}

//-------------------------------------------------------------------------------------------------

Scene.prototype.addBlock = function() {
	if(this.time > 1500) {
		if(10 < randomInteger(0 , 49)) {
			this.trees.push(new Tree(this.assets["images"]["tree"]));
		} else {
			this.birds.push(new Bird(this.assets["images"]["bird"]));
		}
	} else {
		this.trees.push(new Tree(this.assets["images"]["tree"]));			
	}

}

//-------------------------------------------------------------------------------------------------

Scene.prototype.update = function() {

	if(this.trees.length === 0 && this.birds.length === 0) this.addBlock();
	if(randomInteger(0 , 1000) <= 50) {
		if(config.CANVAS_WIDTH - Math.max((this.trees.length > 0) ? this.trees[this.trees.length - 1].pos.x : 0 , 
										  (this.birds.length  > 0) ? this.birds[this.birds.length - 1].pos.x : 0) 
								>= config.BLOCK_MIN_DIST) 
			{
				this.addBlock();
			}
	}

	
	this.dino.update();
	
	this.stones.forEach((stone , i) => {
		stone.update();
	});

	this.clouds.forEach((cloud) => {
		cloud.update();
	});


	this.trees.forEach((tree , i) => {
		tree.update();
		if(tree.offScreen()) {
			this.trees.splice(i , 1);
		}
	})

	this.birds.forEach((bird , i) => {
		bird.update();
		if(bird.offScreen()) {
			this.birds.splice(i , 1);
		}
	})
	this.time++;
	if(this.time % 100 === 0) this.score++;
	this.checkEnd();
}

//-------------------------------------------------------------------------------------------------

Scene.prototype.draw = function() {
	this.wipe();
	
	config.CONTEXT.fillStyle = "white";
	config.CONTEXT.rect(0 , 0 , config.CANVAS_WIDTH , config.CANVAS_HEIGHT);
	config.CONTEXT.fill();
	config.CONTEXT.beginPath();

	config.CONTEXT.globalAlpha = 1;
	config.CONTEXT.lineWidth = 0.1;
	config.CONTEXT.moveTo(0 , config.FLOOR_LEVEL_HEIGHT);
	config.CONTEXT.lineTo(config.CANVAS_WIDTH , config.FLOOR_LEVEL_HEIGHT);
	config.CONTEXT.stroke();
	config.CONTEXT.lineWidth = 1;


	this.stones.forEach((stone) => {
		stone.draw();
	});

	this.clouds.forEach((cloud) => {
		cloud.draw();
	});

	this.trees.forEach((tree) => {
		tree.draw();
	});

	this.birds.forEach((bird) => {
		bird.draw(this.time);
	});

	this.drawScore();

	this.dino.draw(this.time , this.isFinised);

	if(this.isFinised) this.drawWideText("Game Over");
	if(this.isPaused) if(this.firstDraw) { 
		this.drawWideText("Tap to Play"); 
		this.firstDraw = false;
	}
	else this.drawWideText("Game Paused");
}

//-------------------------------------------------------------------------------------------------

Scene.prototype.drawWideText = function(text) {
	config.CONTEXT.font = `bold ${Math.floor(config.WIDE_TEXT_SIZE)}px atari-1`;
    config.CONTEXT.fillStyle   = "#FFF";
    config.CONTEXT.globalAlpha = 0.5;
    config.CONTEXT.fillRect(0 , 0 , config.CANVAS_WIDTH , config.CANVAS_HEIGHT);
    config.CONTEXT.fillStyle   = "black";
    config.CONTEXT.fillText(text , Math.floor(config.CANVAS_WIDTH) / 2 - (Math.floor(config.CONTEXT.measureText(text).width / 2)) , Math.floor(config.CANVAS_HEIGHT) / 2 , config.CANVAS_HEIGHT);
}

//-------------------------------------------------------------------------------------------------

Scene.prototype.drawScore = function() {

}

//-------------------------------------------------------------------------------------------------


Scene.prototype.sound = function() {
	// if(this.dino.jumping) console.log(this.assets["sounds"]["jump"]);
}

//-------------------------------------------------------------------------------------------------

Scene.prototype.checkEnd = function() {
	for(let i = 0;i < this.trees.length;i++) {
		if(this.dino.isHit(this.trees[i].mask)) {this.isFinised = true; return};
	}

	for(let i = 0;i < this.birds.length;i++) {
		if(this.dino.isHit(this.birds[i].mask)) {this.isFinised = true; return};
	}
}

//-------------------------------------------------------------------------------------------------

Scene.prototype.generateStones = function() {
	let count = 70;
	for(let i = 0;i < count;i++) {
		this.stones.push(new Stone());
	}
}

//-------------------------------------------------------------------------------------------------

Scene.prototype.generateClouds = function() {
	let count = 5;
	for(let i = 0;i < count;i++) {
		this.clouds.push(new Cloud(this.assets["images"]["cloud"]));
	}
}

//-------------------------------------------------------------------------------------------------

Scene.prototype.dinoJumpSingnal = function() {
	if(this.isPaused) {return;}
	this.dino.jump();
}

//-------------------------------------------------------------------------------------------------

Scene.prototype.sceneTogglePauseSignal = function() {
	if(this.isPaused) this.isPaused = false;
	else this.isPaused = true;
}

//-------------------------------------------------------------------------------------------------


Scene.prototype.wipe = function() {
	config.CONTEXT.clearRect(0 , 0 , config.CANVAS_WIDTH , config.CANVAS_HEIGHT);
}




export default Scene;