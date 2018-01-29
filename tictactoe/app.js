let turn = 0;
let xo = ['X', 'O'];
let arrNames = ["zero","one","two","three","four","five","six","seven","eight","nine"];
let posArr = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
let winner = "";
let numTurns = 0;
let playingComputer = false;
let computerTakingTurn = false;

if(confirm("Play against the Computer?") == true) {
	playingComputer = true;
}


function getSum(total, num) {
	return total + num;
}

function reset_game() {
	computerTakingTurn = false;
	playingComputer = false;
	turn = 0;
	posArr = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
	winner = "";
	numTurns = 0;
	for(let i=1; i<arrNames.length; i++) {
		document.getElementById(arrNames[i]).textContent = "";
	}

	if(confirm("Play against the Computer?") == true) {
		playingComputer = true;
	}
}

function checkMoves() {
	let openSpaces = [];//posArr.findIndex( () => { return -1;  });
	
	for(let i=0; i < posArr.length; i++) {
		for(let j=0; j < posArr[i].length; j++) {
			if(posArr[i][j] == -1) {
				openSpaces.push((i*3)+j+1);
			}
		}
	}
	let x = checkWinner(true)
	console.log(x);
	console.log(openSpaces);//.length;
	//document.getElementById('test').textContent = openSpaces.length;
	//1 = row1, 2 = row2, 3 = row3
	//4 = col1, 5 = col2, 6 = col3
	//7 = diag1, 8 = diag2
	//person x0, computer x3
}

function checkWinner(isPlanning = false) {
	let xFactor = 0;
	let maxFactor = 0;
	let maxCol = -3;
	let maxRow = -3;
	let xRow = 0;
	let xCol = 0;
	let row = [];
	let rowSum = -3;
	let colSum = -3;
	let diag1 = posArr[0][0] + posArr[1][1] + posArr[2][2];
	let diag2 = posArr[0][2] + posArr[1][1] + posArr[2][0];
	for (let i=0; i<3; i++) {
		row = posArr[i];
		rowSum = row.reduce(getSum);
		colSum = posArr[0][i] + posArr[1][i] + posArr[2][i];
		if(isPlanning) {
			if(colSum > maxCol) {
				maxCol = colSum;
				xCol = i + 4;
			}
			if(rowSum > maxRow) {
				maxRow = rowSum;
				xRow = i + 1;
			}
		} else {
			if(rowSum == 0) {
				winner = "Xs";
			} else if (rowSum == 9) {
				winner = "Os";
			}
			if(colSum == 0) {
				winner = "Xs";
			} else if (colSum == 9) {
				winner = "Os";
			}
		}
	}
	if(!isPlanning) {
		if(diag1 == 0 || diag2 == 0) {
			winner = "Xs";
		} else if( diag1 == 9 || diag2 == 9) {
			winner = "Os";
		}
		if(winner != "") {
			if(confirm(winner + " won!\nReset the board?") == true) {
				reset_game();
				return 1;
			}
		}
		return 0;
	} else {
		maxFactor = maxCol > maxRow ? maxCol : maxRow;
		xFactor = xCol > xRow ? xCol : xRow;
		if(diag1 > maxFactor) {
			maxFactor = diag1;
			xFactor = 7*3;
		} else if (diag2 > maxFactor) {
			maxFactor = diag2;
			xFactor = 8*3;
		}
		return xFactor;
	}
}


function getBoxNum(boxInWords) {
	let _ret = arrNames.indexOf(boxInWords);
	let a = -1;
	let b = -1;

	if(_ret <4 && _ret > 0) {
		a=0;
	} else if(_ret > 3 && _ret < 7) {
		a=1;
	} else if(_ret > 6 && _ret < 10) {
		a=2;
	}
	b = (_ret - 1) % 3;
	if(a > -1 && b > -1 && posArr[a][b] == -1) {
		posArr[a][b] = turn *3;
	}
	return _ret;
}

function occupyBox(xoTurn, boxNum) {
	let box = document.getElementById(boxNum);
	let content = box.textContent.toLowerCase();
	if(content != 'x' && content != 'o') {
		box.textContent = xoTurn;
		turn == 0 ? turn = 1 : turn = 0;
		numTurns++;
	}
}

function computerMove() {
	computerTakingTurn = true;
	let boxNum = 0;
	let move = 1 + (parseInt(Math.random()*1000) % 8);
	let valid = false;
	let temp = ""
	while(!valid) {
		temp = document.getElementById(arrNames[move]).textContent;
		if(temp == "X" || temp == "O") {
			move = 1 + (parseInt(Math.random()*1000) % 8);
		} else {
			valid = true;
		}
	}
	boxNum = getBoxNum(arrNames[move]);
	occupyBox(xo[turn], arrNames[move]);
	setTimeout(checkWinner,500);
	if (numTurns >= 9 || posArr.reduce(getSum) == -15) {
		if(confirm("Game over; Let's call it a draw.\nReset the board?") == true) {
			reset_game();
		}
	}
	checkMoves();
	computerTakingTurn = false;
}

function selectBox(boxNumInWords) {
	if(!computerTakingTurn) {
		let boxNum = 0;
		if(winner == "") {
			boxNum = getBoxNum(boxNumInWords);
			occupyBox(xo[turn], boxNumInWords);
			setTimeout(checkWinner,300);
			if(playingComputer && turn%2 > 0) {
				setTimeout(computerMove, 300);
			}
		} else {
			if(confirm("Game over; " + winner + " won.\nReset the board?") == true) {
				reset_game();
			}
		}
		if (numTurns >= 9 || posArr.reduce(getSum) == -15) {
			if(confirm("Game over; Let's call it a draw.\nReset the board?") == true) {
				reset_game();
			}
		}
	}
//	document.getElementById('test').textContent = turn;
}

