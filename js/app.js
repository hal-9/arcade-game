const minY = -35;         // minimum y-axis pixel
const stepSizeY = 83;     // amount of pixels per step the player moves on y-axis
const stepSizeX = 101;    // amount of pixels per step the player moves on x-axis
const minX = 0;           // minimum x-axis pixel
const maxX = 505;         // maximum x-axis pixel
const maxY = 606;         // maximum y-axis pixel
const enemyStartX = -200; // starting point of enemies on the x-axis
const collisionRange = 50; // range of pixels around player sprite that triggers collision
const laneCountY = 5;     // total lanes on y-axis
const laneCountX = 6;     // total lanes on x-axis
const allEnemies = [];    // array that stores all enemies
const enemyCount = 5;     // amount of enemies in game
const minSpeed = 40;      // minium speed of enemy in pixels
const maxSpeed = 300;     // maximum speed of enemy in pixels
const allEnemyPosY = [48, 131, 214]; // all possible lanes on which enemies can spawn
let points = 0;           // points counter for player score


class Enemy {
  constructor() {
    // everthing thats added to new enemy objects
    this.resetEnemy();
    this.sprite = 'images/enemy-bug.png';
  }
  resetEnemy() {
    // resets enemy x position, randomizes y position from possible lanes and randomizes
    // speed in which the enemy moves through the lane
    this.x = enemyStartX;
    this.y = allEnemyPosY[Math.floor(Math.random() * allEnemyPosY.length)];
    this.movementSpeed = Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed;
  }
  handleCollision() {
    // when collision is detected
    // remove one player life
    player.playerLifes -= 1;
    // reset player position
    player.x = stepSizeX * 2;
    player.y = minY + stepSizeY*5;
    // change stars accordingly
    const stars = document.querySelectorAll('.fa-star');
    stars[player.playerLifes].classList.add('fa-star-o');
    if (player.playerLifes === 0) {
      // if player has no stars left
      // show game over modal
      document.querySelector('.modal').style.display = 'block';
    }
  }
  update(dt) {
    // determine how far enemy sprites move forward
    this.x += this.movementSpeed * dt;
    // collision is detected by checking player position plus collision range against enemy position
    const collisionDetected = Math.round(this.x) + collisionRange > player.x &&
                              Math.round(this.x) < player.x + collisionRange &&
                              collisionRange + player.y > this.y &&
                              player.y < this.y + collisionRange;

    if (collisionDetected) {
      this.handleCollision();
    }
    if (this.x > maxX) {
      // when enemy leaves visible lane reset position to the beginning and reset speed
      this.resetEnemy();
    }
  }
  render() {
    // enemy is drawn on the canvas
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}


let raisePoints = () => {
  // raise points and modify presentation accordingly
  points += 5;
  document.getElementsByClassName('points')[0].innerText = points;
  document.getElementsByClassName('points')[1].innerText = points;
}

class Player {
  constructor() {
    // initial position for the player character, player sprite and lifes
    this.x = stepSizeX * 2;
    this.y = minY + stepSizeY * 5;
    this.sprite = 'images/char-boy.png';
    this.playerLifes = 3;
  }
  update() {
    if (this.y === minY + stepSizeY * 0) {
      // if player reaches top lane (winning lane) reset position after 10 miliseconds
      setTimeout(() => {
        raisePoints();
        this.x = stepSizeX * 2;
        this.y = minY + stepSizeY * 5;
      }, 10);
    }
  }
  render() {
    // player character is drawn on the canvas
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
    // stuff
  handleInput(keyName) {
    // keyboard inputs move the player character accordingly
    // if player is on either border of the canvas, don't do anything (block movement)
    if (keyName === 'left' && this.x !== minX) {
      this.x -= stepSizeX;
    };
    if (keyName === 'right' && this.x !== stepSizeX * 4) {
      this.x += stepSizeX;
    };
    if (keyName === 'down' && this.y !== minY + stepSizeY * 5) {
      this.y += stepSizeY;
    };
    if (keyName === 'up' && this.y !== minY) {
      this.y -= stepSizeY;
    };
  };
};

const player =  new Player();

for (let i = 0; i < enemyCount; i++) {
  // create enemies according to the enemy count
  let enemy = new Enemy();
  allEnemies.push(enemy);
}

// This listens for key presses and sends the keys to your
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

const winningScreenRestart = document.querySelector('.restartButton');
// restart button put in a variable

winningScreenRestart.addEventListener('click', function(e){
  // when restart button is clicked, restore starting state by adding all stars
  // make the modal disappear, reset points and add all player lifes
  document.querySelectorAll('.fa-star')[0].classList.remove('fa-star-o');
  document.querySelectorAll('.fa-star')[1].classList.remove('fa-star-o');
  document.querySelectorAll('.fa-star')[2].classList.remove('fa-star-o');
  document.querySelector('.modal').style.display = 'none';
  points = 0;
  player.playerLifes = 3;
  document.getElementsByClassName('points')[0].innerText = points;
  document.getElementsByClassName('points')[1].innerText = points;
});
