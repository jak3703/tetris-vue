<template>
	<div 
		id="tetris-event-target"
	>
		<div v-if="tetris">
			<div class="tetris-wrapper">
				<div>
					Score: {{ currentScore }}
				</div>
				<TetrisView 
					:tetris="tetris"
					:board-cell-dims="tetrisBoardCellDims"
					class="tetris-board-wrapper board-border"
					:class="{
						'board-ghosted': tetris.paused || tetris.terminated
					}"
				>
				</TetrisView>
				<div class="backlog-menu-wrapper" :style="{height: `${backlogMenuHeight}px`}">
					<div 
						class="grid-container backlog-alignment board-border"
						:class="{
							'board-ghosted': tetris.paused || tetris.terminated
						}"
						:style="backlogBox"
					>
						<div 
							v-for="i in backlogGrid.length * backlogGrid[0].length"
							:key="i"
							:style="backlogBoxCell"
							:class="getBacklogCellColor(i)"
						>
						</div>
					</div>
					<TetrisMenu
						:paused="tetris.paused"
						:terminated="tetris.terminated"
						:style="{
							height: `${0.5 * backlogMenuHeight}px`,
							width: `${0.75 * backlogMenuWidth}px`
						}"
						@menu-resume="tetris.togglePause()"
						@menu-restart="$router.go()"
					>
					</TetrisMenu>
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
	import TetrisMenu from '../TetrisMenu.vue'
	import Tetris from 'tetris'

	export default {
		name: 'GamePage',
		components: {
			TetrisView,
			TetrisMenu
		},
		data() {
			return {
				tetris: null,
				tetrisAnchor: null,
				backlogGrid: null,
				backlogGridDims: 5,
				backlogGridCellDims: 15, //px
				tetrisBoardCellDims: 25, //px
				currentScore: 0
			}
		},
		computed: {
			backlogBox() {
				return {
					'grid-template-columns': `repeat(${this.backlogGridDims}, ${this.backlogGridCellDims}px)`
				}
			},
			backlogBoxCell() {
				return {
					width: `${this.backlogGridCellDims}px`,
					height: `${this.backlogGridCellDims}px`
				}
			},
			backlogMenuHeight() {
				return Tetris.GRID_HEIGHT * this.tetrisBoardCellDims
			},
			backlogMenuWidth() {
				return Tetris.GRID_WIDTH * this.tetrisBoardCellDims
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
			document.querySelector('body').setAttribute('style', 'background-color: gray')
		},
		mounted() {
			this.tetrisAnchor = document.querySelector('#tetris-event-target')
			this.tetris = new Tetris(this.tetrisAnchor)
		},
		unmounted() {
			document.querySelector('body').removeAttribute('style')
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

	.board-ghosted {
		opacity: 0.5;
	}

	.board-border {
		border: 3px solid black;
	}

	#tetris-event-target {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 90vw;
		height: 90vh;
	}

	.backlog-menu-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}

</style>
  