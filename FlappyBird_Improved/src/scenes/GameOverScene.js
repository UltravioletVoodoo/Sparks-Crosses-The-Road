import Phaser from 'phaser'
import { config } from '../main'

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene')
    }

    preload() {

    }

    create() {
        const center = {
            x: config.scale.width / 2,
            y: config.scale.height / 2
        }
        this.add.text(center.x, center.y, 'You Died. Spacebar to restart').setOrigin(0.5)
        this.input.keyboard.on('keydown-SPACE', this.restart, this)
    }

    restart() {
        this.scene.start('GameplayScene')
    }
}