const score = document.querySelector('.score');
const start = document.querySelector('.start');
const gameArea = document.querySelector('.gameArea');
const car = document.createElement('div');

car.classList.add('car');

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
	ArrowUp: false,
	ArrowRight: false,
	ArrowDown: false,
	ArrowLeft: false,
};

const settings = {
	start: false,
	score: 0,
	speed: 3,
	traffic: 5
}

function getQuantityElements(heightElement) {
	return document.documentElement.clientHeight / heightElement + 1;
}

function startGame() {
	start.classList.add('hide');
	gameArea.innerHTML = '';

	for (let i = 0; i < getQuantityElements(100); i++) {
		const line = document.createElement('div');
		line.classList.add('line');
		line.style.top = (i * 100) + 'px';
		line.y = i * 100;
		gameArea.appendChild(line);
	}

	for (let i = 0; i < getQuantityElements(100 * settings.traffic); i++) {
		const enemy = document.createElement('div');
		enemy.classList.add('enemy');
		enemy.y = -100 * settings.traffic * (i + 1);
		enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 100)) + 'px';
		enemy.style.top = enemy.y + 'px';
		enemy.style.background = " url('../image/enemy2.png') center / cover no-repeat";
		gameArea.appendChild(enemy)
	}

	settings.score = 0;
	settings.start = true;
	gameArea.appendChild(car);
	car.style.left = '100px';
	car.style.top = 'auto';
	car.style.bottom = '10px';
	settings.x = car.offsetLeft;
	settings.y = car.offsetTop;
	requestAnimationFrame(playGame);
}

function playGame() {

	if (settings.start) {
		settings.score += settings.speed;
		score.innerHTML = "SCORE</br>" + settings.score;

		moveRoad();
		moveEnemy();

		if (keys.ArrowLeft && settings.x > 0) {
			settings.x -= settings.speed;
		}
		if (keys.ArrowRight && settings.x < (gameArea.offsetWidth - car.offsetWidth)) {
			settings.x += settings.speed;
		}
		if (keys.ArrowDown && settings.y < (gameArea.offsetHeight - car.offsetHeight)) {
			settings.y += settings.speed;
		}
		if (keys.ArrowUp && settings.y > 0) {
			settings.y -= settings.speed;
		}

		car.style.left = settings.x + "px";
		car.style.top = settings.y + "px";


		requestAnimationFrame(playGame);
	}
}

function startRun(event) {
	event.preventDefault();

	keys[event.key] = true;
}

function stopRun(event) {
	event.preventDefault();

	keys[event.key] = false;
}

function moveRoad() {
	let lines = document.querySelectorAll('.line');

	lines.forEach((line) => {
		line.y += settings.speed;
		line.style.top = line.y + 'px';

		if (line.y >= document.documentElement.clientHeight) {
			line.y = -100;
		}
	})
}

function moveEnemy() {
	let enemys = document.querySelectorAll('.enemy');

	enemys.forEach((enemy) => {
		let carRect = car.getBoundingClientRect();
		let enemyRect = enemy.getBoundingClientRect();

		if (carRect.top <= enemyRect.bottom &&
			carRect.right >= enemyRect.left &&
			carRect.left <= enemyRect.right && 
			carRect.bottom >= enemyRect.top) {
			settings.start = fasle;
			console.warn("dtp");
			start.classList.remove('hide');
			score.style.top = start.offsetHeight;
		}

		enemy.y += settings.speed / 2;
		enemy.style.top = enemy.y + 'px';

		if (enemy.y >= document.documentElement.clientHeight) {
			enemy.y = -100 * settings.traffic;
			enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
		}
	})

}