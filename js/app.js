// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

class Player {
  constructor() {
    this.x = 101 * 2;
    this.y = -35 + 83*5;
    this.sprite = 'images/char-boy.png';
  }
  update() {
    // stuff
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
    // stuff
  handleInput(keyName) {
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
let enemyCount = 10;

for (var i = 0; i < enemyCount; i++) {
  let enemy = new Enemy();
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
