import Phaser from 'phaser'
import { config } from '../main'

export default class GameOverScene extends Phaser.Scene {

    constructor() {
        super('GameOverScene')
    }

    preload() {
        this.load.spritesheet('youDied', 'youDiedSheet2.png', {frameWidth: 320, frameHeight: 480})
        this.load.audio('deathAudio', 'sparksDeathSfx.mp3')
        this.load.image('options', 'optionsCog.png')
    }

    create() {
        this.sound.stopAll()
        this.sound.play('deathAudio')
        this.input.keyboard.on('keydown-SPACE', this.restart, this)

        this.anims.create({
            key: 'deathAnimation',
            frames: this.anims.generateFrameNumbers('youDied', {start: 0, end: 96}),
            frameRate: 24
        })

        this.add.sprite(0, 0, 'youDied').setOrigin(0, 0).play('deathAnimation')
        this.add.sprite(config.scale.width - 32, 0, 'options')
            .setOrigin(0, 0)
            .setInteractive()
            .on('pointerdown', this.openOptions, this)


        const textPos = {
            x: config.scale.width / 2,
            y: config.scale.height * 0.75
        }
        this.add.text(textPos.x, textPos.y, 'Press SPACE to restart').setOrigin(0.5)
    }

    openOptions() {
        this.scene.stop('GameplayScene')
        this.scene.start('OptionsScene')
    }

    restart() {
        this.scene.start('GameplayScene')
    }
}