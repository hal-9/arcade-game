
const bodyColor = document.querySelector('body');

class Enemy {
  constructor(x, y, movementSpeed) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.movementSpeed = movementSpeed;
  }
  update(dt) {
    // collision handler checks if
    if (Math.round(this.x) + 50 > player.x &&
        Math.round(this.x) < player.x + 50 &&
        50 + player.y > this.y &&
        player.y < this.y + 50) {
          if (document.querySelectorAll('.fa-star')[1].classList.contains('fa-star-o')) {
            document.querySelectorAll('.fa-star')[0].classList.add('fa-star-o');
            document.querySelector('.modal').style.display = 'block';
          }
          if (document.querySelectorAll('.fa-star')[2].classList.contains('fa-star-o')) {
            document.querySelectorAll('.fa-star')[1].classList.add('fa-star-o');
          }
          else {
          document.querySelectorAll('.fa-star')[2].classList.add('fa-star-o');
          }
          player.x = 101 * 2;
          player.y = -35 + 83*5;
        }
    this.x += this.movementSpeed * dt;
    if (this.x > 505) {
      let enemyPosY = allEnemyPosY[Math.floor(Math.random() * allEnemyPosY.length)];
      let movementSpeed = Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed;
      this.movementSpeed = movementSpeed;
      this.y = enemyPosY;
      this.x = -200;
    }
  }
  render() {
    // enemy is drawn on the canvas
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

let points = 0;

let raisePoints = () => {
  points += 5;
  document.getElementsByClassName('points')[0].innerText = points;
  document.getElementsByClassName('points')[1].innerText = points;
}

class Player {
  constructor() {
    // initial position for the player character
    this.x = 101 * 2;
    this.y = -35 + 83*5;
    this.sprite = 'images/char-boy.png';
  }
  update() {
    if (this.y === -35 + 83 * 0) {
      setTimeout(() => {
        raisePoints();
        this.x = 101 * 2;
        this.y = -35 + 83*5;
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
    if (keyName === 'left' && this.x !== 0) {
      this.x -= 101;
    };
    if (keyName === 'right' && this.x !== 101 * 4) {
      this.x += 101;
    };
    if (keyName === 'down' && this.y !== -35 + 83 * 5) {
      this.y += 83;
    };
    if (keyName === 'up' && this.y !== -35) {
      this.y -= 83;
    };
  };
};

let allEnemies = [];
let player =  new Player();
let enemyCount = 5;
const minSpeed = 40;
const maxSpeed = 300;
const allEnemyPosY = [48, 131, 214];
const enemyType = ['slime', 'skurr']

for (let i = 0; i < enemyCount; i++) {
  let enemyPosY = allEnemyPosY[Math.floor(Math.random() * allEnemyPosY.length)];
  let movementSpeed = Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed;
  let enemy = new Enemy(-300, enemyPosY, movementSpeed);
  allEnemies.push(enemy);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
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

winningScreenRestart.addEventListener('click', function(e){
  document.querySelectorAll('.fa-star')[0].classList.remove('fa-star-o');
  document.querySelectorAll('.fa-star')[1].classList.remove('fa-star-o');
  document.querySelectorAll('.fa-star')[2].classList.remove('fa-star-o');
  document.querySelector('.modal').style.display = 'none';
  points = 0;
  document.getElementsByClassName('points')[0].innerText = points;
  document.getElementsByClassName('points')[1].innerText = points;
});
