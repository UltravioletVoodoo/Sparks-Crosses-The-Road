import Phaser from 'phaser'
import { defaultSettings } from '../constants/defaultSettings'
import { config } from '../main'


let settings = undefined
let checkbox = undefined

export default class OptionsScene extends Phaser.Scene {
    constructor() {
        super('OptionsScene')
    }

    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        })
        this.load.image('checkbox', 'checkBox.png')
        this.load.image('checkbox-filled', 'checkBox-filled.png')
    }

    create() {
        settings = localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')) : defaultSettings
        let highScore = localStorage.getItem('highScore') ? localStorage.getItem('highScore') : '0'
        
        const center = {
            x: config.scale.width / 2,
            y: config.scale.width / 2
        }
        this.add.text(center.x, config.scale.height * 0.25, highScore)
            .setOrigin(0.5)
            .setFontSize(30)

        this.add.text(center.x, center.y, 'Music Volume').setOrigin(0.5)
        this.rexUI.add.slider({
            x: center.x,
            y: center.y + 15,
            width: 200,
            height: 20,
            orientation: 'x',

            track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 6, '#4287f5'),
            thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, '#3d5478'),

            valuechangeCallback: function (value) {
                settings.musicVolume = parseFloat(value);
            },
            space: {
                top: 4,
                bottom: 4
            },
            input: 'drag', // 'drag'|'click'
            value: settings.musicVolume
        }).layout();

        this.add.text(center.x, center.y + 50, 'SFX Volume').setOrigin(0.5)
        this.rexUI.add.slider({
            x: center.x,
            y: center.y + 65,
            width: 200,
            height: 20,
            orientation: 'x',

            track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 6, '#4287f5'),
            thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, '#3d5478'),

            valuechangeCallback: function (value) {
                settings.sfxVolume = parseFloat(value);
            },
            space: {
                top: 4,
                bottom: 4
            },
            input: 'drag', // 'drag'|'click'
            value: settings.sfxVolume
        }).layout();

        this.add.text(center.x, center.y + 100, 'CaterpillarNess').setOrigin(0.5)
        this.rexUI.add.slider({
            x: center.x,
            y: center.y + 115,
            width: 200,
            height: 20,
            orientation: 'x',

            track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 6, '#4287f5'),
            thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, '#3d5478'),

            valuechangeCallback: function (value) {
                settings.caterpillarNess = parseFloat(value) + 1;
            },
            space: {
                top: 4,
                bottom: 4
            },
            input: 'drag', // 'drag'|'click'
            value: settings.caterpillarNess - 1
        }).layout();

        this.add.text(center.x, center.y + 175, 'SPARKS').setOrigin(0.5)
        this.add.text(center.x, center.y + 225, 'MIND').setOrigin(0.5)
        const texture = settings.sparksMindMode ? 'checkbox-filled' : 'checkbox'
        checkbox = this.add.sprite(center.x, center.y + 200, texture)
            .setInteractive()
            .on('pointerdown', this.checkOrUncheck)
            .setOrigin(0.5)
        

        this.add.text(center.x, config.scale.height * 0.95, 'Press SPACE to restart')
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', this.startGame, this)
        this.input.keyboard.on('keydown-SPACE', this.startGame, this)
    }

    checkOrUncheck() {
        settings.sparksMindMode = !settings.sparksMindMode
        checkbox.setTexture(settings.sparksMindMode ? 'checkbox-filled' : 'checkbox')
    }

    startGame() {
        localStorage.setItem('setttings', JSON.stringify(settings))
        this.scene.start('GameplayScene')
    }
}