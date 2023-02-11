const gameTiles = document.querySelectorAll('.tile');
const gameBoard = document.querySelector('#game-board');
const resetBtn = document.querySelector('.reset-btn');
const pictureBtn = document.querySelector('.picture-btn');

let emptyTile;

const gameState = [
	[gameTiles[0], gameTiles[1], gameTiles[2]],
	[gameTiles[3], gameTiles[4], gameTiles[5]],
	[gameTiles[6], gameTiles[7], gameTiles[8]],
];

function render() {
	emptyTile = {
		x: 2,
		y: 2,
	};

	gameState.forEach((row, rowIndex) => {
		row.forEach((tile, tileIndex) => {
			// remove any exisiting style
			tile.style = '';

			tile.style.top = `${rowIndex * 100}px`;
			tile.style.left = `${tileIndex * 100}px`;

			tile.style['background-position-y'] = `-${rowIndex * 100}px`;
			tile.style['background-position-x'] = `-${tileIndex * 100}px`;

			gameBoard.appendChild(tile);
		});
	});
}

function moveElement(clickedTile, emptyTile) {
	// const tempTop = clickedTile.style.top;
	// const tempLeft = clickedTile.style.left;

	// clickedTile.style.top = emptyTile.style.top;
	// clickedTile.style.left = emptyTile.style.left;

	// emptyTile.style.top = tempTop;
	// emptyTile.style.left = tempLeft;

	// [a,b] = [b,a]
	[clickedTile.style.top, emptyTile.style.top] = [emptyTile.style.top, clickedTile.style.top];
	[clickedTile.style.left, emptyTile.style.left] = [emptyTile.style.left, clickedTile.style.left];
}

render();

gameBoard.addEventListener('click', event => {
	const target = event.target;

	let x, y;

	gameState.forEach((row, rowIndex) => {
		row.forEach((tile, tileIndex) => {
			if (tile === target) {
				x = rowIndex;
				y = tileIndex;
			}
		});
	});

	if (
		(y === emptyTile.y && (x + 1 === emptyTile.x || x - 1 === emptyTile.x)) ||
		(x === emptyTile.x && (y + 1 === emptyTile.y || y - 1 === emptyTile.y))
	) {
		moveElement(gameState[x][y], gameState[emptyTile.x][emptyTile.y]);

		// [a,b] = [b,a]
		[gameState[x][y], gameState[emptyTile.x][emptyTile.y]] = [gameState[emptyTile.x][emptyTile.y], gameState[x][y]];

		// moved tile leaves empty space
		emptyTile = {
			x,
			y,
		};
	}
});

const changePicture = () => {
	render();

	const URL = `url('https://picsum.photos/300/300?random=${Math.random()}')`;
	gameTiles.forEach(tile => (tile.style.backgroundImage = URL));
};

resetBtn.addEventListener('click', render);
pictureBtn.addEventListener('click', changePicture);
