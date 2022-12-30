<template>
	<div>
		<div v-if="curGrid" class="grid-container" :style="boardGrid">
			<div
				v-for="i in numCells"
				:key="-i"
				:style="boardGridCell"
				:class="getGridCellColor(i)"
			>
			</div>
		</div>
	</div>
</template>

<script>
	import Tetris from 'tetris'

	export default {
		name: "TetrisView",
		props: ['tetris', 'boardCellDims'],
		data() {
			return {
				numCells: Tetris.GRID_HEIGHT * Tetris.GRID_WIDTH,
				curGrid: null // grid of what to display
			}
		},
		computed: {
			boardGrid() {
				return {
					'grid-template-columns': `repeat(${Tetris.GRID_WIDTH}, ${this.boardCellDims}px)`
				}
			},
			boardGridCell() {
				return {
					width: `${this.boardCellDims}px`,
					height: `${this.boardCellDims}px`
				}
			}
		},
		watch: {
			'tetris.fallingPiece': {
				handler(newVal) {
					this.updateCurGrid(newVal, this.tetris.board.grid)
				},
				deep: true,
				immediate: true
			},
			'tetris.board.grid': {
				handler(newVal) {
					this.updateCurGrid(this.tetris.fallingPiece, newVal)
				},
				deep: true
			}
		},
		mounted() {
			this.tetris.init()
		},
		methods: {
			updateCurGrid(fallingPiece, grid) {
				const newGrid = []
				const fallingPieceTileLocations = fallingPiece.tileLocations
				// having to worry about the 4 buffer rows on the vue end is the price I must pay
				// for working outside the event system that I built for myself
				const visibleGrid = grid.slice(4)
				for (let i = 0; i < Tetris.GRID_HEIGHT; i++) {
					newGrid.push(new Array(Tetris.GRID_WIDTH).fill('.'))
				}
				for (let r = 0; r < Tetris.GRID_HEIGHT; r++) {
					for (let c = 0; c < Tetris.GRID_WIDTH; c++) {
						newGrid[r][c] = visibleGrid[r][c]
					}
				}
				for (let i = 0; i < 4; i++) {
					if (fallingPieceTileLocations[i][0] >= 4) {
						newGrid[fallingPieceTileLocations[i][0] - 4][fallingPieceTileLocations[i][1]] = fallingPiece.getSymbol()
					}
				}
				this.curGrid = newGrid
			},
			getGridCellColor(idx) {
				switch(this.curGrid[Math.floor((idx-1) / Tetris.GRID_WIDTH)][(idx-1) % Tetris.GRID_WIDTH]) {
					case 'S':
						return 's-piece'
					case 'Z':
						return 'z-piece'
					case 'R':
						return 'right-l-piece'
					case 'L':
						return 'left-l-piece'
					case 'Q':
						return 'square-piece'
					case 'I':
						return 'line-piece'
					case 'T':
						return 't-piece'
					default:
						return 'blank-cell'
				}
			}
		}
	}
</script>

<style>


</style>