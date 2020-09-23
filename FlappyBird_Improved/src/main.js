import Phaser from 'phaser'
import GameplayScene from './scenes/GameplayScene'

const config = {
	type: Phaser.AUTO,
	width: 320,
	height: 480,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: false
		}
	},
	scene: [GameplayScene]
}

export default new Phaser.Game(config)
