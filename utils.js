export function percentOf(value , percent) {
	return percent * value / 100;
}

//-------------------------------------------------------------------------------------------------

export function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//-------------------------------------------------------------------------------------------------

export function isCollided(r1 , r2) {
	if (r2.x > r1.w + r1.x || r1.x > r2.w + r2.x || r2.y > r1.h + r1.y || r1.y > r2.h + r2.y){
        return false;
    }
    return true;
}

//-------------------------------------------------------------------------------------------------

export function prime(n) {
	if(n <= 0 || n === 1) return [];
	let r = [];
	for(let i = n;i >= 1;i--) {
		for(let j = 1;j < i;j++) {
			if(i % j === 0) {
				if(j !== 1) {
					break;
				}
			}
			if(j === i - 1) {
				r.push(i);
			}
		}
	}
	return r;
}