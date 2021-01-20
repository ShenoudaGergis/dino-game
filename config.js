import { percentOf } from "./utils.js";
import Vector from "./vector.js";

const CANVASID		     = "jesus";
const CANVAS			 = document.getElementById(CANVASID);
const CANVAS_WIDTH		 = CANVAS.width;
const CANVAS_HEIGHT		 = CANVAS.height;
const CONTEXT		     = CANVAS.getContext("2d");
const MIN_FRAMERATE		 = 2;
const MAX_FRAMERATE		 = 16;
const FRAMERATE_STEP	 = 2;

const WIDE_TEXT_SIZE	 = 0.009;

const FLOOR_LEVEL_HEIGHT  = 80;
const FLOOR_DEPTH_HEIGHT  = 84;

const DENO_HEIGHT 	     = 15;
const DENO_WIDTH  	     = 6;
const DENO_XSTART		 = 5;

const TREE_SINGLE_HEIGHT = 16;
const TREE_SINGLE_WIDTH	 = 5;
const TREE_DOUBLE_HEIGHT = 16;
const TREE_DOUBLE_WIDTH	 = 7;

const BLOCK_MIN_DIST	 = 30; 


const CLOUD_WIDTH 		 		= 9;
const CLOUD_HEIGHT		 		= 7;
const CLOUD_MAX_DEPTH_HEIGHT    = 50;
const CLOUD_MIN_XCHANGE			= 0.05;
const CLOUD_MAX_XCHANGE			= 0.1;


const BIRD_WIDTH 		 = 9;
const BIRD_HEIGHT		 = 13;

const STONE_MAX_WIDTH    = 0.7;
const STONE_MIN_WIDTH    = 0.3;

const GFORCE			 = 0.4;
const PFORCE			 = 6;
const XCHANGE	 	     = 0.75;


export let config = {
	CANVAS  			: CANVAS,
	CANVAS_WIDTH        : CANVAS_WIDTH,
	CANVAS_HEIGHT		: CANVAS_HEIGHT,
	CONTEXT 			: CONTEXT,
	MIN_FRAMERATE		: MIN_FRAMERATE,
	MAX_FRAMERATE		: MAX_FRAMERATE,
	FRAMERATE_STEP		: FRAMERATE_STEP,

	WIDE_TEXT_SIZE		: percentOf(CANVAS.width * CANVAS.height , WIDE_TEXT_SIZE),

	FLOOR_LEVEL_HEIGHT  : percentOf(CANVAS.height , FLOOR_LEVEL_HEIGHT),
	FLOOR_DEPTH_HEIGHT	: percentOf(CANVAS.height , FLOOR_DEPTH_HEIGHT),
	
	DENO_HEIGHT			: percentOf(CANVAS.height , DENO_HEIGHT),
	DENO_WIDTH			: percentOf(CANVAS.width , DENO_WIDTH),
	DENO_XSTART         : percentOf(CANVAS.width , DENO_XSTART),

	TREE_SINGLE_WIDTH	: percentOf(CANVAS.width , TREE_SINGLE_WIDTH),
	TREE_SINGLE_HEIGHT	: percentOf(CANVAS.height , TREE_SINGLE_HEIGHT),
	TREE_DOUBLE_WIDTH	: percentOf(CANVAS.width , TREE_DOUBLE_WIDTH),
	TREE_DOUBLE_HEIGHT	: percentOf(CANVAS.height , TREE_DOUBLE_HEIGHT),


	BLOCK_MIN_DIST 		: percentOf(CANVAS.width , BLOCK_MIN_DIST) ,


	CLOUD_WIDTH 			: percentOf(CANVAS.width , CLOUD_WIDTH),
	CLOUD_HEIGHT			: percentOf(CANVAS.height , CLOUD_HEIGHT),
	CLOUD_MAX_DEPTH_HEIGHT	: percentOf(CANVAS.height , CLOUD_MAX_DEPTH_HEIGHT),
	CLOUD_MIN_XCHANGE		: percentOf(CANVAS.width , CLOUD_MIN_XCHANGE),
	CLOUD_MAX_XCHANGE		: percentOf(CANVAS.width , CLOUD_MAX_XCHANGE),


	STONE_MAX_WIDTH     : percentOf(CANVAS.width , STONE_MAX_WIDTH),
	STONE_MIN_WIDTH     : percentOf(CANVAS.height , STONE_MIN_WIDTH),

	BIRD_WIDTH			: percentOf(CANVAS.width , BIRD_WIDTH),
	BIRD_HEIGHT			: percentOf(CANVAS.height , BIRD_HEIGHT),
	
	GFORCE				: new Vector(0  ,  percentOf(CANVAS.height , GFORCE)),
	PFORCE				: new Vector(0  , -percentOf(CANVAS.height , PFORCE)),
	XCHANGE				: new Vector(-percentOf(CANVAS.width  ,  XCHANGE)  ,  0)


};