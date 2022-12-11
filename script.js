const h1 = document.querySelector('h1');
const colorInfo = document.querySelector('.header__color-info');
const scoreInfo = document.querySelector('.header__score');
const highscoreInfo = document.querySelector('.header__highscore');
const hearts = document.querySelectorAll('.header__heart');
const container = document.querySelector('.container');
const boxes = document.getElementsByClassName('box');
const dynamicBoxes = document.getElementsByClassName('dynamicSquare');

let numberOfNextBox,
	mainBoxColor,
	boxColor,
	numberOfMainBox,
	rgbColorValueR,
	rgbColorValueG,
	rgbColorValueB,
	rgbColorFinalValue,
	boxWithColors;

let score = 0;
let highscore = 0;
let heart = 3;

const rgbColorGenerator = () => {
	rgbColorValueR = Math.floor(Math.random() * 255);
	rgbColorValueG = Math.floor(Math.random() * 255);
	rgbColorValueB = Math.floor(Math.random() * 255);
	rgbColorFinalValue = `(${rgbColorValueR}, ${rgbColorValueG}, ${rgbColorValueB})`;
};

const squareGenerator = () => {
	const square = document.createElement('div');
	square.classList.add('box');
	square.classList.add('dynamicSquare');
	container.append(square);
	square.addEventListener('click', guessing);
};

const colorsGenerator = () => {
	boxWithColors = [];
	rgbColorGenerator();

	mainBoxColor = rgbColorFinalValue;
	colorInfo.textContent = `RGB${mainBoxColor}`;

	numberOfMainBox = Math.floor(Math.random() * boxes.length);
	boxes[numberOfMainBox].style.backgroundColor = `RGB${mainBoxColor}`;
	boxWithColors.push(numberOfMainBox);

	for (let i = 0; i < boxes.length - 1; i++) {
		rgbColorGenerator();
		boxColor = rgbColorFinalValue;

		do {
			numberOfNextBox = Math.floor(Math.random() * boxes.length);
		} while (boxWithColors.includes(numberOfNextBox));

		boxWithColors.push(numberOfNextBox);
		boxes[numberOfNextBox].style.backgroundColor = `RGB${boxColor}`;
	}
	h1.style.background = `linear-gradient(140deg, ${boxes[0].style.backgroundColor} 0%,${boxes[1].style.backgroundColor} 50%,${boxes[2].style.backgroundColor} 100%)`;
	h1.style.backgroundClip = 'text';
	h1.style.webkitBackgroundClip = 'text';
	h1.style.color = 'transparent';
};

const checkHighscore = () => {
	if (score > highscore) {
		highscore = score;
		highscoreInfo.textContent = score;
	}
};

const reset = () => {
	checkHighscore();
	boxWithColors = [];
	score = 0;
	heart = 3;
	scoreInfo.textContent = score;
	hearts.forEach((el) => el.classList.remove('hide'));

	while (dynamicBoxes.length !== 0) {
		dynamicBoxes[0].remove();
	}
	colorsGenerator();
};

const guessing = (e) => {
	if (e.target.style.backgroundColor === `rgb${mainBoxColor}`) {
		score++;
		scoreInfo.textContent = score;
		if (score <= 3) squareGenerator();
		colorsGenerator();
	} else {
		heart--;
		hearts[heart].classList.add('hide');
		if (heart === 0) reset();
	}
};

for (let i = 0; i < boxes.length; i++) {
	boxes[i].addEventListener('click', guessing);
}

document.addEventListener('DOMContentLoaded', colorsGenerator);
