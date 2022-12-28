<template>
	<div>
		<div class="home-wrapper">
			<div class="header-box">
				<h1>Tetris JS</h1>
			</div>
			<div class="control-panel">
				<div class="control-panel-buttons">
					<button class="start-button" @click="startGame">Start</button>
				</div>
			</div>
		</div>
	</div>
</template>
  
<script>
  
	export default {
		name: 'HomePage',
		components: {

		},
		methods: {
			startGame() {
				this.$router.push('/game')
			}
		}
	}
</script>
  
<style>
	.header-box {
		background-image: linear-gradient(blue, lightblue);
		height: 67vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: stretch;
	}

	.header-box h1 {
		text-align: center;
		font-size: 160px;
		font-family: 'Courier New', Courier, monospace;
		color: orangered;
		opacity: 0.6;
		margin: 0;
		text-shadow: -5px -2px 10px gold;
	}

	.control-panel {
		height: 33vh;
		background-color: gray;
		
	}

	.control-panel-buttons {
		height: 25%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.home-wrapper {
		display: flex;
		flex-direction: column;
	}

	.start-button {
		width: 15%;
		height: 60%;
		font-family: 'Courier New', Courier, monospace;
		font-size: 2em;
		letter-spacing: 3px;
		border: 2px solid black;
	}
</style>  