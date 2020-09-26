import Phaser from 'phaser'
import { config } from '../main'

let sprite = undefined

export default class GameOverScene extends Phaser.Scene {

    constructor() {
        super('GameOverScene')
    }

    preload() {
        this.load.spritesheet('youDied', 'youDiedSheet2.png', {frameWidth: 320, frameHeight: 480})
    }

    create() {
        this.input.keyboard.on('keydown-SPACE', this.restart, this)

        this.anims.create({
            key: 'deathAnimation',
            frames: this.anims.generateFrameNumbers('youDied', {start: 0, end: 96}),
            frameRate: 24
        })

        sprite = this.add.sprite(0, 0, 'youDied').setOrigin(0, 0).play('deathAnimation')


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