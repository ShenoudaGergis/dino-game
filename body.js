import Vector from "./vector.js";
import { config } from "./config.js";
import { randomInteger , percentOf , isCollided} from "./utils.js";


function Dino(images) {
	this.images  	= images;
	this.imageIndex = 0;
	this.jumping 	= false;
	this.pos 		= new Vector(config.DENO_XSTART , config.FLOOR_DEPTH_HEIGHT - config.DENO_HEIGHT);
	this.vel    	= new Vector(0  ,  0);
	this.pForce 	= config.PFORCE;
	this.gForce 	= config.GFORCE;
	this.mask 		= [];

}

//-------------------------------------------------------------------------------------------------

Dino.prototype.jump = function() {
	if(!this.jumping) {
		this.jumping = true;
		this.vel.add(this.pForce);
	}
}

//-------------------------------------------------------------------------------------------------

Dino.prototype.update = function() {
	this.pos.add(this.vel);
	this.vel.add(this.gForce);
	if((this.pos.y + config.DENO_HEIGHT) > config.FLOOR_DEPTH_HEIGHT) {
		this.pos.y = config.FLOOR_DEPTH_HEIGHT - config.DENO_HEIGHT;
		this.vel.mul(0);
		this.jumping = false;
	}
	this.getMasks();
}

//-------------------------------------------------------------------------------------------------

Dino.prototype.draw = function(time , isFinished , debug=false) {
	if(isFinished) {
		this.imageIndex = 4;
	} else {
		if(time % 8 === 0) {
			if(this.jumping) this.imageIndex = 2;
			else {
				this.imageIndex = (this.imageIndex === 2) ? this.imageIndex = 0 : (this.imageIndex === 0) ? 1 : 0;
			}
		}
	}
	config.CONTEXT.drawImage(this.images[`dino-${this.imageIndex}`].obj , this.pos.x , this.pos.y , config.DENO_WIDTH , config.DENO_HEIGHT);

	if(debug) {
		this.mask.forEach((m) => {
			config.CONTEXT.beginPath();
			config.CONTEXT.rect(m.x , m.y , m.w , m.h);
			config.CONTEXT.stroke();
		});
	}
}

//-------------------------------------------------------------------------------------------------

Dino.prototype.isHit = function(rects) {
	for(let i = 0;i < this.mask.length;i++) {
		for(let j = 0;j < rects.length;j++) {
			if(isCollided(this.mask[i]  ,  rects[j])) return true;
		}
	}
	return false;
}

//-------------------------------------------------------------------------------------------------

Dino.prototype.getMasks = function() {
	let headStart = {x : this.pos.x + config.DENO_WIDTH / 2.2  ,  y : this.pos.y};
	let headWidth = config.DENO_WIDTH / 1.8;
	let headHight = config.DENO_HEIGHT / 2.8;

	let stomachStart  = {x : this.pos.x + config.DENO_WIDTH / 5  ,  y : this.pos.y + config.DENO_HEIGHT / 2.5};
	let stomachWidth  = config.DENO_WIDTH / 2.3;
	let stomachHeight = config.DENO_HEIGHT / 1.8;

	this.mask[0] = {
		x : headStart.x ,
		y : headStart.y ,
		w : headWidth ,
		h : headHight
	};

	this.mask[1] = {
		x : stomachStart.x ,
		y : stomachStart.y ,
		w : stomachWidth ,
		h : stomachHeight
	};
}

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

function Stone() {
	this.pos   = new Vector(randomInteger(0 , config.CANVAS_WIDTH) , randomInteger(config.FLOOR_LEVEL_HEIGHT , config.FLOOR_DEPTH_HEIGHT));
	this.width = randomInteger(config.STONE_MIN_WIDTH , config.STONE_MAX_WIDTH); 
}

//-------------------------------------------------------------------------------------------------

Stone.prototype.update = function() {
	this.pos.add(config.XCHANGE);
	if(this.offScreen()) {
		this.pos.x = config.CANVAS_WIDTH;
		this.pos.y = randomInteger(config.FLOOR_LEVEL_HEIGHT , config.FLOOR_DEPTH_HEIGHT);
		this.width = randomInteger(config.STONE_MIN_WIDTH , config.STONE_MAX_WIDTH);
	}
}

//-------------------------------------------------------------------------------------------------

Stone.prototype.draw = function() {
	config.CONTEXT.moveTo(this.pos.x , this.pos.y);
	config.CONTEXT.lineTo(this.pos.x + this.width , this.pos.y);
	config.CONTEXT.stroke();
	config.CONTEXT.beginPath();

}

//-------------------------------------------------------------------------------------------------

Stone.prototype.offScreen = function() {
	return (
		this.pos.x + this.width <= 0
	);
}

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

function Cloud(images) {
	this.image 		= images["cloud-0"];
	this.xchange    = new Vector(randomInteger(config.CLOUD_MIN_XCHANGE , config.CLOUD_MAX_XCHANGE) * [1 , -1][randomInteger(0 , 1)] , 0);
	this.pos        = new Vector(randomInteger(-100 , config.CANVAS_WIDTH + 100) , randomInteger(0 , config.CLOUD_MAX_DEPTH_HEIGHT));
}

//-------------------------------------------------------------------------------------------------

Cloud.prototype.update = function() {
	this.pos.add(this.xchange);
	if(this.pos.x <= -500 || this.pos.x >= config.CANVAS_WIDTH + 500) {
		this.xchange.mul(-1);
	}
}

//-------------------------------------------------------------------------------------------------

Cloud.prototype.draw = function() {
	config.CONTEXT.drawImage(this.image.obj , this.pos.x , this.pos.y , config.CLOUD_WIDTH , config.CLOUD_HEIGHT);
}

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

function Tree(images) {
	this.choice = ["single" , "double"][randomInteger(0  ,  1)];
	if(this.choice === "single") {
		this.image  = images[`tree-${randomInteger(0 , 1)}`];
		this.width  = config.TREE_SINGLE_WIDTH;
		this.height = config.TREE_SINGLE_HEIGHT;
	} else {
		this.image = images[`tree-${randomInteger(2 , 4)}`];
		this.width  = config.TREE_DOUBLE_WIDTH;
		this.height = config.TREE_DOUBLE_HEIGHT;
	}
	this.pos   = new Vector(config.CANVAS_WIDTH , config.FLOOR_DEPTH_HEIGHT - this.height);
	this.mask  = []; 

}

//-------------------------------------------------------------------------------------------------

Tree.prototype.update = function() {
	this.pos.add(config.XCHANGE);
	this.getMasks();
}

//-------------------------------------------------------------------------------------------------

Tree.prototype.draw = function(debug=false) {
	config.CONTEXT.drawImage(this.image.obj , this.pos.x , this.pos.y , this.width , this.height);	

	if(debug) {
		this.mask.forEach((m) => {
			config.CONTEXT.beginPath();
			config.CONTEXT.rect(m.x , m.y , m.w , m.h);
			config.CONTEXT.stroke();
		});
	}
}

//-------------------------------------------------------------------------------------------------

Tree.prototype.offScreen = function() {
	return (
		this.pos.x + this.width <= 0
	);
}

//-------------------------------------------------------------------------------------------------

Tree.prototype.getMasks = function() {
	let treeStart;
	let treeWidth;
	let treeHeight;

	if(this.choice === "single") {
		treeStart = {x : this.pos.x + this.width / 5.5  ,  y : this.pos.y};
		treeWidth = this.width / 1.5;
		treeHeight = this.height;

	} else {
		treeStart = {x : this.pos.x + this.width / 10  ,  y : this.pos.y};
		treeWidth = this.width / 1.2;
		treeHeight = this.height;

	}

	this.mask[0] = {
		x : treeStart.x ,
		y : treeStart.y ,
		w : treeWidth ,
		h : treeHeight
	}
}

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

function Bird(images) {
	this.images     = images;
	this.imageIndex = 1;
	this.pos 		= new Vector(config.CANVAS_WIDTH , [
		config.FLOOR_DEPTH_HEIGHT - 1 * config.DENO_HEIGHT , 
		config.FLOOR_DEPTH_HEIGHT - 2 * config.DENO_HEIGHT,
		config.FLOOR_DEPTH_HEIGHT - 3 * config.DENO_HEIGHT		
	][randomInteger(0 , 2)]);
	this.mask = [];
}

//-------------------------------------------------------------------------------------------------

Bird.prototype.update = function() {
	this.pos.add(config.XCHANGE);
	this.getMasks();
}

//-------------------------------------------------------------------------------------------------

Bird.prototype.draw = function(time , debug=false) {
	if(time % 8 === 0) this.imageIndex = (this.imageIndex === 0) ? 1 : 0;
	config.CONTEXT.drawImage(this.images[`bird-${this.imageIndex}`].obj , this.pos.x , this.pos.y , config.BIRD_WIDTH , config.BIRD_HEIGHT);	

	if(debug) {
		this.mask.forEach((m) => {
			config.CONTEXT.rect(m.x , m.y , m.w , m.h);
			config.CONTEXT.stroke();
		});
	}
}

//-------------------------------------------------------------------------------------------------

Bird.prototype.offScreen = function() {
	return (
		this.pos.x + config.BIRD_WIDTH <= 0
	);
}

//-------------------------------------------------------------------------------------------------

Bird.prototype.getMasks = function() {
	let birdHeadStart;
	let birdHeadWidth;
	let birdHeadHeight;

	let birdBodyStart;
	let birdBodyWidth;
	let birdBodyHeight;

	let birdWingUpStart;
	let birdWingUpWidth;
	let birdWingUpHeight;

	let birdWingDownStart;
	let birdWingDownWidth;
	let birdWingDownHeight;


	if(this.imageIndex === 0) {
		birdHeadStart  = {x : this.pos.x + config.BIRD_WIDTH / 8.5,  y : this.pos.y + config.BIRD_HEIGHT / 4};
		birdHeadWidth  = config.BIRD_WIDTH / 3.8;
		birdHeadHeight = config.BIRD_HEIGHT / 4;

		birdBodyStart  = {x : this.pos.x + config.BIRD_WIDTH / 2.8,  y : this.pos.y + config.BIRD_HEIGHT / 2.3};
		birdBodyWidth  = config.BIRD_WIDTH / 2;
		birdBodyHeight = config.BIRD_HEIGHT / 3.5;

		birdWingDownStart  = {x : this.pos.x + config.BIRD_WIDTH / 2.7,  y : this.pos.y + config.BIRD_HEIGHT / 2};
		birdWingDownWidth  = config.BIRD_WIDTH / 5.5;
		birdWingDownHeight = config.BIRD_HEIGHT / 2.8;

	} else {
		birdHeadStart  = {x : this.pos.x + config.BIRD_WIDTH / 8.5,  y : this.pos.y + config.BIRD_HEIGHT / 3};
		birdHeadWidth  = config.BIRD_WIDTH / 4.5;
		birdHeadHeight = config.BIRD_HEIGHT / 3.5;

		birdBodyStart  = {x : this.pos.x + config.BIRD_WIDTH / 2.8,  y : this.pos.y + config.BIRD_HEIGHT / 1.8};
		birdBodyWidth  = config.BIRD_WIDTH / 2;
		birdBodyHeight = config.BIRD_HEIGHT / 3;

		birdWingUpStart  = {x : this.pos.x + config.BIRD_WIDTH / 3,  y : this.pos.y + config.BIRD_HEIGHT / 10};
		birdWingUpWidth  = config.BIRD_WIDTH / 4;
		birdWingUpHeight = config.BIRD_HEIGHT / 2;

	}

	this.mask[0] = {x : birdHeadStart.x , y : birdHeadStart.y , w : birdHeadWidth , h : birdHeadHeight};
	this.mask[1] = {x : birdBodyStart.x , y : birdBodyStart.y , w : birdBodyWidth , h : birdBodyHeight};
	if(this.imageIndex === 0) this.mask[2] = {x : birdWingDownStart.x , y : birdWingDownStart.y , w : birdWingDownWidth , h : birdWingDownHeight};
	else this.mask[2] = {x : birdWingUpStart.x , y : birdWingUpStart.y , w : birdWingUpWidth , h : birdWingUpHeight};

}


export { Dino , Stone , Cloud , Tree , Bird };