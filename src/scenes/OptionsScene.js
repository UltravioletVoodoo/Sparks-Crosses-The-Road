import Phaser from 'phaser'
import { defaultSettings } from '../constants/defaultSettings'
import { config } from '../main'


export default class OptionsScene extends Phaser.Scene {
    constructor() {
        super('OptionsScene')
    }

    preload() {

    }

    create() {
        let settings = localStorage.getItem('settings') ? JSON.stringify(localStorage.getItem('settings')) : defaultSettings
        let highScore = localStorage.getItem('highScore') ? localStorage.getItem('highScore') : '0'
        
        
        const highScorePos = {
            x: config.scale.width / 2,
            y: config.scale.height * 0.25
        }
        this.add.text(highScorePos.x, highScorePos.y, highScore)
            .setOrigin(0.5)
            .setFontSize(30)

        // TODO: Add sliders
        // TODO: Add toggle switch for sparksmind mode
        // TODO: Implement preventors based on highscore
        
        this.add.text(0, 0, 'Options menu\nShould include:\nmusic/sfx on/off\nvolume\ncaterpillar meter\nxp bar\nsparksmind mode (rick roll)').setOrigin(0,0)
        this.input.keyboard.on('keydown-SPACE', this.startGame, this)
    }

    startGame() {
        this.scene.start('GameplayScene')
    }
}