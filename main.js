const images = [ //
	// "Rosa.png", //  RIP :(
	"Mouska.png",
	"Tiki.png",
	"Winkie.png", //
	"Heather.png", //
	"Marc.png", //
	"Minka 2020.png", //
	"Victor 2020.png" //
];

const height = innerHeight;
const width = innerWidth;
const size = 12;
const maxX = 92;

Math.sign = Math.sign || function (x) {
	x = +x; // convert to a number
	if (x === 0 || isNaN(x)) {
		return x;
	}
	return x > 0 ? 1 : -1;
}

// let h = 0, s = 0, v = 0;
// let dh = 1, ds = 1, dv = 1;
let t = 0;
const imageY = [], imageX = [];
const dx = [], dy = [];
const xVel = [], yVel = [];
const rot = [];
const rotVel = [];
const rotDirection = [];
const tStart = [];

function load() {
	for (const image of images) {
		new Image().src = `img/${image}`;
	}

	// document.addEventListener("touchmove", function (event) {
	// 	if (event.scale !== 1) {
	// 		event.preventDefault();
	// 	}
	// }, {
	// 	passive: false
	// });
}

function start() {
	// const body = document.getElementById("body");

	const audio = new Audio("snowman-dance.mp3");
	audio.loop = true;
	audio.play();

	document.getElementById("text").style.display = "block";
	document.getElementById("start-button").style.display = "none";

	let html = "";
	for (let i = 0; i < images.length; i++) {
		const image = images[i];
		html += `<img id="image${i}" src="img/${image}" />`;
		imageX[i] = Math.floor(Math.random() * maxX);
		imageY[i] = Math.floor(Math.random() * 20);
		// 			imageY[i] = Math.floor(Math.random() * body.clientHeight);
		dx[i] = 1;
		dy[i] = 1;
		xVel[i] = Math.random();
		// 			yVel[i] = Math.random();
		yVel[i] = Math.random() * 0.002;
		rot[i] = 0;
		rotVel[i] = (1 + Math.random()) / 50;
		rotDirection[i] = (Math.random() - 0.5) * 200;
	}
	body.innerHTML += html;

	for (let i = 0; i < images.length; i++) {
		const image = document.getElementById("image" + i);
		image.style.width = size + "vw";
		image.style.height = size + "vw";
	}

	requestAnimationFrame(draw);
}

const yVelMax = 1.4;
function draw() {
	requestAnimationFrame(draw);
	t++;
	for (let i = 0; i < images.length; i++) {
		if (tStart[i]) {
			const prevVel = yVel[i];
			yVel[i] += 0.01;

			if (Math.sign(prevVel) != Math.sign(yVel[i]) && imageY[i] > 60) {
				// give a boost
				yVel[i] += Math.sign(yVel[i]) * yVelMax;
				// console.log('boost', yVel[i]);
			}
			imageY[i] += dy[i] * yVel[i];
			if (imageY[i] > 100 - size) {
				imageY[i] = 100 - size;
				yVel[i] *= -1;
			} else if (imageY[i] <= 0) {
				imageY[i] = 0;
				yVel[i] *= -1;
			}

			imageX[i] += dx[i] * xVel[i];
			if (imageX[i] >= maxX - size) {
				dx[i] = -1;
			} else if (imageX[i] < 0) {
				dx[i] = 1;
			}
			if (Math.abs(yVel[i]) > yVelMax) {
				yVel[i] = Math.sign(yVel[i]) * yVelMax;
			}
			yVel[i] *= 0.9994;

			rot[i] = rotDirection[i] * Math.sin((t - tStart[i]) * rotVel[i]);
		} else if (Math.random() < 0.012) {
			tStart[i] = t;
		}
		const image = document.getElementById("image" + i);
		image.style.top = imageY[i] + "vh";
		image.style.left = imageX[i] + "vw";
		image.style.transform = `rotate(${rot[i]}deg)`
	}
}
// /**
//  * Converts an HSV color value to RGB. Conversion formula
//  * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
//  * Assumes h, s, and v are contained in the set [0, 1] and
//  * returns r, g, and b in the set [0, 255].
//  *
//  * @param   Number  h       The hue
//  * @param   Number  s       The saturation
//  * @param   Number  v       The value
//  * @return  Array           The RGB representation
//  */
// function hsvToRgb(h, s, v) {
// 	let r, g, b;

// 	let i = Math.floor(h * 6);
// 	let f = h * 6 - i;
// 	let p = v * (1 - s);
// 	let q = v * (1 - f * s);
// 	let t = v * (1 - (1 - f) * s);

// 	switch (i % 6) {
// 		case 0:
// 			r = v, g = t, b = p;
// 			break;
// 		case 1:
// 			r = q, g = v, b = p;
// 			break;
// 		case 2:
// 			r = p, g = v, b = t;
// 			break;
// 		case 3:
// 			r = p, g = q, b = v;
// 			break;
// 		case 4:
// 			r = t, g = p, b = v;
// 			break;
// 		case 5:
// 			r = v, g = p, b = q;
// 			break;
// 	}

// 	return [r * 255, g * 255, b * 255];
// }
