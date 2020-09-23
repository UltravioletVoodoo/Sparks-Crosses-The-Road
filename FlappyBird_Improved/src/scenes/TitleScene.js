import Phaser from 'phaser'
import { config } from '../main'


export default class TitleScene extends Phaser.Scene {
    constructor() {
        super('TitleScene')
    }

    preload() {

    }

    create() {
        const center = {
            x: config.scale.width / 2,
            y: config.scale.height / 2
        }
        this.add.text(center.x, center.y, 'Press Spacebar to start').setOrigin(0.5)
        this.input.keyboard.on('keydown-SPACE', this.startGame)
        console.log(this.scene)
    }

    startGame() {
        this.scene.switch('GameplayScene')
    }
}