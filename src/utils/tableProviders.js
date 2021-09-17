function getWinner(table) {
	let winnerData = null;
	for (const [i, fila] of table.entries()) {
		// GANA POR FILA
		if (fila[0] != 0 && fila[0] == fila[1] && fila[1] == fila[2]) {
			winnerData = {
				player: fila[0],
				casillas: [
					[i, 0],
					[i, 1],
					[i, 2],
				],
			};
		}
		// GANA POR COLUMNA
		if (
			table[0][i] != 0 &&
			table[0][i] == table[1][i] &&
			table[0][i] == table[2][i]
		) {
			winnerData = {
				player: table[0][i],
				casillas: [
					[0, i],
					[1, i],
					[2, i],
				],
			};
		}
	}
	//GANA POR DIAGONALES
	if (
		table[0][0] != 0 &&
		table[0][0] == table[1][1] &&
		table[0][0] == table[2][2]
	) {
		winnerData = {
			player: table[0][0],
			casillas: [
				[0, 0],
				[1, 1],
				[2, 2],
			],
		};
	}
	if (
		table[0][2] != 0 &&
		table[0][2] == table[1][1] &&
		table[0][2] == table[2][0]
	) {
		winnerData = {
			player: table[0][2],
			casillas: [
				[0, 2],
				[1, 1],
				[2, 0],
			],
		};
	}
	return winnerData;
}

//[[x,x,x],
// [x,x,x],
// [x,x,x]]
export default {
	getWinner,
};
