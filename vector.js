export default function Vector(x , y) {
	this.x = x;
	this.y = y;
}

//-------------------------------------------------------------------------------------------------

Vector.prototype.add = function(other) {
	this.x += other.x;
	this.y += other.y;
}

//-------------------------------------------------------------------------------------------------

Vector.prototype.sub = function(other) {
	this.x -= other.x;
	this.y -= other.y;
}

//-------------------------------------------------------------------------------------------------

Vector.prototype.mul = function(factor) {
	this.x *= factor;
	this.y *= factor;
}