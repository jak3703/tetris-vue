<template>
	<div 
		id="tetris-event-target"
		@tetris-game-over="gameOverHandler"
	>
		<div v-if="tetris">
			<div class="tetris-wrapper">
				<div>
					Score: {{ currentScore }}
				</div>
				<TetrisView :tetris="tetris" class="tetris-board-wrapper"></TetrisView>
				<div class="grid-container backlog-alignment" :style="backlogBox">
					<div 
						v-for="i in backlogGrid.length * backlogGrid[0].length"
						:key="i"
						:style="backlogBoxCell"
						:class="getBacklogCellColor(i)"
					>
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			Loading...
		</div>
	</div>
</template>
  
<script>
	import TetrisView from '../TetrisView.vue'
	import Tetris from 'tetris'

	export default {
		name: 'GamePage',
		components: {
			TetrisView
		},
		data() {
			return {
				tetris: null,
				backlogGrid: null,
				backlogGridDims: 5,
				backlogGridCellDims: '15px',
				currentScore: 0
			}
		},
		computed: {
			backlogBox() {
				return {
					'grid-template-columns': `repeat(${this.backlogGridDims}, ${this.backlogGridCellDims})`
				}
			},
			backlogBoxCell() {
				return {
					width: this.backlogGridCellDims,
					height: this.backlogGridCellDims
				}
			}
		},
		watch: {
			'tetris.backlog.backlogPiece'(newValue) {
				this.resetBacklogGrid()
				const tLocs = this.tetris.normalizePiecePositions(newValue)
				const symbol = newValue.getSymbol()
				for (let i = 0; i < tLocs.length; i++) {
					this.backlogGrid[3+tLocs[i][0]][2+tLocs[i][1]] = symbol
				}
			},
			'tetris.score'(newValue) {
				this.currentScore = newValue
			}
		},
		created() {
			this.resetBacklogGrid()
		},
		mounted() {
			this.tetris = new Tetris(document.querySelector('#tetris-event-target'))
		},
		methods: {
			getBacklogCellColor(idx) {
				const nCols = this.backlogGrid[0].length
				switch (this.backlogGrid[Math.floor((idx-1) / nCols)][(idx-1) % nCols]) {
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
			},
			resetBacklogGrid() {
				this.backlogGrid = []
				for (let i = 0; i < this.backlogGridDims; i++) {
					this.backlogGrid.push(new Array(this.backlogGridDims).fill('.'))
				}
			},
			gameOverHandler() {
				console.log('GAME OVER')
			}
		}
	}
</script>

<style>
	.tetris-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.backlog-alignment {
		align-self: flex-start;
	}

	.tetris-board-wrapper {
		margin-left: 100px;
		margin-right: 75px;
	}

	#tetris-event-target {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 90vw;
		height: 90vh;
	}
</style>
  