import Phaser from 'phaser'
import { config } from '../main'

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene')
    }

    preload() {
        this.load.image('youDied', 'YouDied_Frame0060.png')
    }

    create() {
        this.input.keyboard.on('keydown-SPACE', this.restart, this)

        this.add.image(0, 0, 'youDied').setOrigin(0, 0)


        const textPos = {
            x: config.scale.width / 2,
            y: config.scale.height * 0.75
        }
        this.add.text(textPos.x, textPos.y, 'Press SPACE to restart').setOrigin(0.5)
    }

    restart() {
        this.scene.start('GameplayScene')
    }
}