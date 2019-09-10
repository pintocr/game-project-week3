/***
 *
 * 'Dragonball GAME
 *
 */
/**
 *
 * Here I create my Objects and load the images
 *
 *
 */

//Background
let ground = new Grass(0, 0);
ground.loadImage();
//array for collision detection
let canvasObjectsArray = [];
//Son Goku
let hero = new SonGoku(75, 105);
hero.loadImage();

//ROCKS
let obstacleOne = new Obstacle(0, 220);
obstacleOne.loadImage();
canvasObjectsArray.push(obstacleOne);
let obstacleTwo = new Obstacle(350, 350);
obstacleTwo.loadImage();
canvasObjectsArray.push(obstacleTwo);
let obstacleThree = new Obstacle(430, 350);
obstacleThree.loadImage();
canvasObjectsArray.push(obstacleThree);
let obstacleFour = new Obstacle(430, 150);
obstacleFour.loadImage();
canvasObjectsArray.push(obstacleFour);
//Different ROCK
let obstacleFive = new Obstacle(380, 130);
obstacleFive.loadImage();
canvasObjectsArray.push(obstacleFive);
obstacleFive.canvasWidth = 50;
obstacleFive.canvasheight = 70;
obstacleFive.width = 50;
obstacleFive.height = 70;
obstacleFive.sourceWidth = 150;

//House
let obstacleHouse = new Obstacle(30, 390);
obstacleHouse.loadImage();
obstacleHouse.img.src = "./img/house.png";
canvasObjectsArray.push(obstacleHouse);
obstacleHouse.canvasWidth = 125;
obstacleHouse.canvasheight = 85;
obstacleHouse.width = 125;
obstacleHouse.height = 82;
obstacleHouse.sourceWidth = 205;
obstacleHouse.sourceHeight = 150;

//TOP BORDER FOREST
let topWoods = new Woods(0, 0);
topWoods.loadImage();
canvasObjectsArray.push(topWoods);
let topWoodsTwo = new Woods(350, 0);
topWoodsTwo.loadImage();
canvasObjectsArray.push(topWoodsTwo);

let allKiBlasts = [];
let ki = new KiBlast(hero.positionX, hero.positionY, hero.direction);
ki.loadImage();

//Here we create all the Dragonballs
let allDragonballs = [];
let dragonballOne = new DragonBall(100, 255, "dragonballOne");
dragonballOne.loadImage();
canvasObjectsArray.push(dragonballOne);
allDragonballs.push(dragonballOne);
let dragonballTwo = new DragonBall(460, 40, "dragonballTwo");
dragonballTwo.loadImage();
canvasObjectsArray.push(dragonballTwo);
allDragonballs.push(dragonballTwo);
let dragonballThree = new DragonBall(10, 44, "dragonballThree");
dragonballThree.loadImage();
canvasObjectsArray.push(dragonballThree);
allDragonballs.push(dragonballThree);
let dragonballFour = new DragonBall(430, 180, "dragonballFour");
dragonballFour.loadImage();
canvasObjectsArray.push(dragonballFour);
allDragonballs.push(dragonballFour);
let dragonballFive = new DragonBall(110, 452, "dragonballFive");
dragonballFive.loadImage();
canvasObjectsArray.push(dragonballFive);
allDragonballs.push(dragonballFive);
let dragonballSix = new DragonBall(500, 400, "dragonballSix");
dragonballSix.loadImage();
canvasObjectsArray.push(dragonballSix);
allDragonballs.push(dragonballSix);
let dragonballSeven = new DragonBall(400, 380, "dragonballSeven");
dragonballSeven.loadImage();
canvasObjectsArray.push(dragonballSeven);
allDragonballs.push(dragonballSeven);
//change Image for 3rd, 4th, 5th, 6th & 7th Dragonball
dragonballThree.img.src = "./img/buriedDragonball.png";
dragonballThree.status = "buried";
dragonballFour.img.src = "./img/hiddenDragonball.png";
dragonballFour.status = "hidden";
dragonballFive.img.src = "./img/hiddenDragonballHouse.png";
dragonballFive.status = "hidden";
dragonballSix.img.src = "./img/buriedDragonball.png";
dragonballSix.status = "buried";
dragonballSeven.img.src = "./img/hiddenDragonball.png";
dragonballSeven.status = "hidden";

let antiHeroObjectArray = Array.from(canvasObjectsArray);
let justTheHero = [];
let justTheEnemy = [];
antiHeroObjectArray.push(hero);
justTheHero.push(hero);
//freezer firstEnemy
let enemy = new Villain(350, 100);
enemy.loadImage();
canvasObjectsArray.push(enemy);
justTheEnemy.push(enemy);
//cell secondEnemy
let secondEnemy = new Villain(140, 260);
secondEnemy.loadImage();
secondEnemy.sourceWidth = 48;
secondEnemy.sourceheight = 73;
secondEnemy.img.src = "./img/cellWalk.png";
canvasObjectsArray.push(secondEnemy);
justTheEnemy.push(secondEnemy);
//buu thirdEnemy
let thirdEnemy = new Villain(330, 420);
thirdEnemy.loadImage();
thirdEnemy.sourceWidth = 23;
thirdEnemy.sourceHeight = 54;
thirdEnemy.img.src = "./img/buuWalk.png";
canvasObjectsArray.push(thirdEnemy);
justTheEnemy.push(thirdEnemy);

let kiEnemy = new KiEnergy(enemy.positionX, enemy.positionY, enemy.direction);
kiEnemy.loadImage();

function GokuCollision(positionX, positionY, width, height, what) {
  let result = false;

  if (what === "all") {
    canvasObjectsArray.forEach(element => {
      if (
        positionX < element.positionX + element.width &&
        positionX + width > element.positionX &&
        positionY < element.positionY + element.height &&
        positionY + height > element.positionY
      ) {
        result = true;
      }
    });
  } else if (what === "dragonball") {
    allDragonballs.forEach((element, index) => {
      if (
        positionX < element.positionX + element.width &&
        positionX + width > element.positionX &&
        positionY < element.positionY + element.height &&
        positionY + height > element.positionY
      ) {
        result = index;
      }
    });
  } else if (what === "heroSearch") {
    justTheHero.forEach(element => {
      if (
        positionX < element.positionX + element.width &&
        positionX + width > element.positionX &&
        positionY < element.positionY + element.height &&
        positionY + height > element.positionY
      ) {
        result = true;
      }
    });
  } else if (what === "enemySearch") {
    justTheEnemy.forEach((element, index) => {
      if (
        positionX < element.positionX + element.width &&
        positionX + width > element.positionX &&
        positionY < element.positionY + element.height &&
        positionY + height > element.positionY
      ) {
        result = index;
      }
    });
  } else {
    antiHeroObjectArray.forEach(element => {
      if (
        positionX < element.positionX + element.width &&
        positionX + width > element.positionX &&
        positionY < element.positionY + element.height &&
        positionY + height > element.positionY
      ) {
        result = true;
      }
    });
  }

  return result;
}

const FRAME_LIMIT = 12;
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let keyPresses = {};
let currentLoopIndex = 0;
let currentLoopIndexAI = 0;

let frameCount = 0;

window.addEventListener("keydown", keyDownListener);
function keyDownListener(event) {
  keyPresses[event.key] = true;
}

window.addEventListener("keyup", keyUpListener);
function keyUpListener(event) {
  keyPresses[event.key] = false;
}

let controller = new KeyPresses();
let freezer = new ArtificialIntelligence(enemy, 60, 40);
let cell = new ArtificialIntelligence(secondEnemy, 5, 40);
cell.directionChange = 2;
let buu = new ArtificialIntelligence(thirdEnemy, 60, 10);
buu.directionChange = 3;

let allExplosions = [];
let bigExplo = new Explosion(0, 0);
bigExplo.loadImage();
let enemyExplosions = [];
let enemyKiBlasts = [];
let enemyExplo = new EnemyExplosion(0, 0);
enemyExplo.loadImage();

let gameTime = new timer();
let countdown = gameTime.setTimer();
gameTime.counts();
let noTime = false;

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  controller.handleControls();
  freezer.raiseAwareness();
  cell.raiseAwareness();
  buu.raiseAwareness();

  if (
    hero.collectedDragonballs < 7 &&
    hero.lifePoints > 0 &&
    noTime === false
  ) {
    ground.drawFrame();
    hero.drawFrame(currentLoopIndex, hero.direction);
    obstacleOne.drawFrame();
    obstacleThree.drawFrame();
    obstacleTwo.drawFrame();
    obstacleFour.drawFrame();
    obstacleFive.drawFrame();
    obstacleHouse.drawFrame();
    topWoods.drawFrame();
    topWoodsTwo.drawFrame();

    justTheEnemy.forEach(element => {
      if (element.lifePoints > 0) {
        element.drawFrame(currentLoopIndexAI, element.direction);
      }
    });

    allDragonballs.forEach(element => {
      element.drawFrame();
    });
    allKiBlasts.forEach(element => {
      element.moveCharacter();
      element.drawFrame();
    });
    allExplosions.forEach(element => {
      element.drawFrame();
      element.frameCalci();
    });

    enemyKiBlasts.forEach(element => {
      element.moveCharacter();
      element.drawFrame();
    });
    enemyExplosions.forEach(element => {
      element.drawFrame();
      element.frameCalci();
    });

    window.requestAnimationFrame(gameLoop);
  } else if (hero.lifePoints > 0 && noTime === false) {
    document.getElementById("canvas").style = "display: none;";
    document.getElementById("winningGif").style = "display: flex";
    document.getElementById("mission").innerHTML =
      "<span>Game Control:<br></span><span>          [Up: w]<br> [Right: d] [Down: s] [Left: a]<br> [PickUp: j] [Shoot: k]<br></span><span><br>Mission complete!<br></span><span>You found all 7 Dragonballs!<br>You safed planet Earth!<br></span>";
  } else {
    document.getElementById("canvas").style = "display: none;";
    document.getElementById("gameOver").style = "display: flex";
  }
}

let button = document.getElementById("button");
button.onclick = function() {
  location.reload();
};
