import Phaser from 'phaser'
import { defaultSettings } from '../constants/defaultSettings'
import { config } from '../main'

let gameOptions = {
    sparksGravity: 800,
    sparksSpeed: 125,
    sparksFlapPower: 300,
    sparksFlapSpin: -2.5,
    sparksRotationAcceleration: 0.1,
    sparksRotationSpeed: 0,
    minCarHeight: 50,
    carDistance: [220, 280],
    carGap: [100, 130],
    localStorageName: 'highScore'
}

let settings

export default class GameplayScene extends Phaser.Scene {
    constructor() {
        super('GameplayScene')
    }

    preload() {
        this.load.image('sparks', 'Sparks.png')
        this.load.image('car', 'Car.png')
        this.load.audio('gameplayMusic', 'sparksGameplayMusic.mp3')
        this.load.audio('sparksMindMode', 'rollMusic.mp3')
        this.load.audio('flap', 'sparksFlapSfx.mp3')
    }

    create() {
        settings = localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')) : defaultSettings

        this.sound.stopAll()
        const music = settings.sparksMindMode ? 'sparksMindMode' : 'gameplayMusic'
        this.sound.play(music, {
            volume: settings.musicVolume,
            rate: settings.caterpillarNess,
            loop: true
        })
        
        this.carGroup = this.physics.add.group()
        this.carPool = []
        for (let i=0; i < 4; i++) {
            this.carPool.push(this.carGroup.create(0, 0, 'car'))
            this.carPool.push(this.carGroup.create(0, 0, 'car'))
            this.placeCars(false)
        }
        this.carGroup.setVelocityX(-gameOptions.sparksSpeed)
        this.sparks = this.physics.add.sprite(80, config.scale.height / 2, 'sparks')
        this.sparks.body.gravity.y = gameOptions.sparksGravity
        this.input.on('pointerdown', this.flap, this)
        this.input.keyboard.on('keydown-SPACE', this.flap, this);
        this.score = 0
        this.topScore = localStorage.getItem(gameOptions.localStorageName) === null ? 0 : localStorage.getItem(gameOptions.localStorageName)
        this.scoreText = this.add.text(10, 10, '')
        this.updateScore(this.score)
    }

    flap() {
        this.sound.play('flap', {
            volume: settings.sfxVolume
        })
        this.sparks.body.velocity.y = -gameOptions.sparksFlapPower
        gameOptions.sparksRotationSpeed = gameOptions.sparksFlapSpin
    }

    updateScore(inc) {
        this.score += inc
        this.scoreText.text = 'Score: ' + this.score + '\nBest: ' + this.topScore
    }

    placeCars(addScore) {
        let rightMost = this.getRightMostCar()
        let carGapHeight = Phaser.Math.Between(gameOptions.carGap[0], gameOptions.carGap[1])
        let carGapPosition = Phaser.Math.Between(gameOptions.minCarHeight + carGapHeight / 2, config.scale.height - gameOptions.minCarHeight - carGapHeight / 2)
        this.carPool[0].x = rightMost + this.carPool[0].getBounds().width + Phaser.Math.Between(gameOptions.carDistance[0], gameOptions.carDistance[1])
        this.carPool[0].y = carGapPosition - carGapHeight / 2
        this.carPool[0].setOrigin(0, 1)
        this.carPool[0].flipY = true
        this.carPool[1].x = this.carPool[0].x
        this.carPool[1].y = carGapPosition + carGapHeight / 2
        this.carPool[1].setOrigin(0, 0)
        this.carPool = []
        if (addScore) {
            this.updateScore(1)
        }
    }

    getRightMostCar() {
        let rightMostCar = 0
        this.carGroup.getChildren().forEach(function(car) {
            rightMostCar = Math.max(rightMostCar, car.x)
        })
        return rightMostCar
    }

    update() {
        this.physics.world.collide(this.sparks, this.carGroup, function() {
            this.die()
        }, null, this)
        if (this.sparks.y > config.scale.height || this.sparks.y < 0) {
            this.die()
        }
        this.carGroup.getChildren().forEach(function(car) {
            if (car.getBounds().right < 0) {
                this.carPool.push(car)
                if (this.carPool.length == 2) {
                    this.placeCars(true)
                }
            }
        }, this)
        this.updateRotation()
    }

    updateRotation() {
        gameOptions.sparksRotationSpeed += gameOptions.sparksRotationAcceleration
        this.sparks.angle += gameOptions.sparksRotationSpeed
        if (this.sparks.angle > 45) this.sparks.angle = 45
        if (this.sparks.angle < -30) this.sparks.angle = -30
    }

    die() {
        localStorage.setItem(gameOptions.localStorageName, Math.max(this.score, this.topScore))
        this.scene.launch('GameOverScene')
        this.scene.pause()
    }
}