import Phaser from 'phaser'
import { config } from '../main'


export default class TitleScene extends Phaser.Scene {
    constructor() {
        super('TitleScene')
    }

    preload() {
        this.load.spritesheet('titleArt', 'titleSheet.png', {frameWidth: 320, frameHeight: 480})
    }

    create() {
        this.anims.create({
            key: 'titleArtAnimation',
            frames: this.anims.generateFrameNumbers('titleArt', {start: 0, end: 25}),
            frameRate: 24,
            repeat: -1
        })

        this.add.sprite(0, 0, 'titleArt').setOrigin(0, 0).play('titleArtAnimation')

        const textPos = {
            x: config.scale.width * 0.7,
            y: config.scale.height * 0.90
        }
        this.add.text(textPos.x, textPos.y, 'Press SPACEBAR\nto start').setOrigin(0.5)
        this.input.on('pointerdown', this.startGame, this)
        this.input.keyboard.on('keydown-SPACE', this.startGame, this)
    }

    startGame() {
        this.scene.start('GameplayScene')
    }
}