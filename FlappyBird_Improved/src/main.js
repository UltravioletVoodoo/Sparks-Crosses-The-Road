import Phaser from 'phaser'
import GameplayScene from './scenes/GameplayScene'

export const config = {
	type: Phaser.AUTO,
	backgroundColor: 0x262d38,
	scale: {
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 320,
		height: 480
	},
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
