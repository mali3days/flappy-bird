import Phaser, { Textures } from 'phaser';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 400 },
      debug: true,
    }
  },
  scene: {
    preload,
    create,
    update,
  },
};

new Phaser.Game(config);

let bird = null;
const VELOCITY = 200;
const flapVelocity = 250;
const initialBirdPosition = { x: config.width / 10, y: config.height / 2};

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
}

function create() {
  this.add.image(0, 0, 'sky').setOrigin(0);
  bird = this.physics.add
    .sprite(initialBirdPosition.x, initialBirdPosition.y, 'bird')
    .setOrigin(0);

  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown_SPACE', flap);

  console.log(bird);
}

function update(time, delta) {
  bird.body.velocity.x = 100;
  if (bird.y < - bird.height || bird.y > config.height) {
    restartPlayerPos();
  }
}

function flap() {
  bird.body.velocity.y = -flapVelocity;
}

function restartPlayerPos() {
  bird.x = initialBirdPosition.x;
  bird.y = initialBirdPosition.y;
  bird.body.velocity.x = 0;
  bird.body.velocity.y = 0;
}