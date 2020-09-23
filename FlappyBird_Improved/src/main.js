import Phaser from 'phaser'
import GameplayScene from './scenes/GameplayScene'
import TitleScene from './scenes/TitleScene'

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
	}
}

let game = new Phaser.Game(config)

// Load Scenes
game.scene.add('TitleScene', TitleScene)
game.scene.add('GameplayScene', GameplayScene)

// Start the Title Screen
game.scene.start('TitleScene')
