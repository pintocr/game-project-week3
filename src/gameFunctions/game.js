/***
 *
 * 'Dragonball GAME
 *
 */

class KiBlast {
  constructor(x, y, dir) {
    this.CYCLE_LOOP = [0, 1, 0, 0, 1, 0];
    this.CYCLE_INDEX = 0;
    this.positionX = x;
    this.positionY = y;
    this.canvasWidth = 25;
    this.canvasHeigth = 25;
    this.width = 25;
    this.height = 25;
    this.characterWidth = 21;
    this.characterHeigth = 21;

    this.img = new Image();
    this.direction = dir;
  }

  loadImage() {
    this.img.src = "../../img/kiBlast.bmp";
    this.img.onload = function() {
      window.requestAnimationFrame(gameLoop);
    };
  }

  drawFrame() {
    ctx.drawImage(
      this.img,
      this.CYCLE_LOOP[this.CYCLE_INDEX] * this.characterWidth,
      this.characterHeigth * this.direction,
      this.characterWidth,
      this.characterHeigth,
      this.positionX,
      this.positionY,
      this.canvasWidth,
      this.canvasHeigth
    );
  }

  moveCharacter() {
    let deltaX = 0;
    let deltaY = 0;
    switch (this.direction) {
      case 0:
        deltaY += 0.75;
        break;
      case 1:
        deltaX += 0.75;
        break;
      case 2:
        deltaY -= 0.75;
        break;
      case 3:
        deltaX -= 0.75;
        break;
    }

    if (
      this.positionX + deltaX > 0 &&
      this.positionX + 25 + deltaX < canvas.width
    ) {
      let borderObjects = GokuCollision(
        this.positionX + deltaX,
        this.positionY + deltaY,
        this.width,
        this.height,
        "all"
      );
      if (borderObjects === false) {
        this.positionX += deltaX;
        if (this.CYCLE_INDEX < 6) {
          this.CYCLE_INDEX++;
        } else {
          this.CYCLE_INDEX = 0;
        }
      } else {
        this.breakStone();
        allKiBlasts.splice(0, 1);
      }
    } else {
      allKiBlasts.splice(0, 1);
    }
    if (
      this.positionY + deltaY > 0 &&
      this.positionY + 25 + deltaY < canvas.height
    ) {
      let borderObjects2 = GokuCollision(
        this.positionX + deltaX,
        this.positionY + deltaY,
        this.width,
        this.height,
        "all"
      );
      if (borderObjects2 === false) {
        this.positionY += deltaY;
        if (this.CYCLE_INDEX < 6) {
          this.CYCLE_INDEX++;
        } else {
          this.CYCLE_INDEX = 0;
        }
      } else {
        this.breakStone();
        allKiBlasts.splice(0, 1);
      }
    } else {
      allKiBlasts.splice(0, 1);
    }
  }

  breakStone() {
    //free the dragonballs
    let deltaX = 0;
    let deltaY = 0;
    switch (this.direction) {
      case 0:
        deltaY += 0.75;
        break;
      case 1:
        deltaX += 0.75;
        break;
      case 2:
        deltaY -= 0.75;
        break;
      case 3:
        deltaX -= 0.75;
        break;
    }

    let result = GokuCollision(
      this.positionX + deltaX,
      this.positionY + deltaY,
      this.width,
      this.height,
      "dragonball"
    );
    if (Number.isInteger(result)) {
      allDragonballs[result].status = "normal";
      allDragonballs[result].img.src = "../../img/freeDragonball.png";
    }
  }
}

class Obstacle {
  constructor(positionX, positionY) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.canvasWidth = 100;
    this.canvasHeigth = 50;
    this.width = 100;
    this.height = 50;
    this.sourceWidth = 250;

    this.img = new Image();
  }

  loadImage() {
    this.img.src = "../../img/rocks.bmp";
    this.img.onload = function() {
      window.requestAnimationFrame(gameLoop);
    };
  }

  drawFrame() {
    ctx.drawImage(
      this.img,
      0,
      0,
      this.sourceWidth,
      150,
      this.positionX,
      this.positionY,
      this.canvasWidth,
      this.canvasHeigth
    );
  }
}

class Woods {
  constructor(positionX, positionY) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.canvasWidth = 350;
    this.canvasHeigth = 50;
    this.width = 350;
    this.height = 50;
    this.img = new Image();
  }

  loadImage() {
    this.img.src = "../../img/wood.bmp";
    this.img.onload = function() {
      window.requestAnimationFrame(gameLoop);
    };
  }

  drawFrame() {
    ctx.drawImage(
      this.img,
      0,
      0,
      1600,
      200,
      this.positionX,
      this.positionY,
      this.canvasWidth,
      this.canvasHeigth
    );
  }
}

class DragonBall {
  constructor(positionX, positionY, name) {
    this.name = name;
    this.positionX = positionX;
    this.positionY = positionY;
    this.canvasWidth = 20;
    this.canvasHeigth = 20;
    this.width = 20;
    this.height = 20;
    this.status = "normal"; //buried, hidden or normal
    this.img = new Image();
  }
  loadImage() {
    this.img.src = "../../img/dragonball.png";
    this.img.onload = function() {
      window.requestAnimationFrame(gameLoop);
    };
  }

  drawFrame() {
    ctx.drawImage(
      this.img,
      0,
      0,
      25,
      25,
      this.positionX,
      this.positionY,
      this.canvasWidth,
      this.canvasHeigth
    );
  }
}

class SonGoku {
  constructor() {
    this.CYCLE_LOOP = [2, 0, 1, 2, 3, 4];
    this.characterWidth = 28;
    this.characterHeigth = 40;
    this.positionX = 175;
    this.positionY = 175;
    this.canvasWidth = 25;
    this.canvasHeigth = 25;
    this.width = 25;
    this.height = 25;

    this.img = new Image();
    this.MOVEMENT_SPEED = 0.5;
    this.FACING_DOWN = 0;
    this.FACING_RIGHT = 1;
    this.FACING_UP = 2;
    this.FACING_LEFT = 3;
    this.direction = 0;
    this.collectedDragonballs = 0;
  }

  loadImage() {
    this.img.src = "../../img/gokuWalk.bmp";
    this.img.onload = function() {
      window.requestAnimationFrame(gameLoop);
    };
  }

  drawFrame(frameX, frameY) {
    ctx.drawImage(
      this.img,
      this.CYCLE_LOOP[frameX] * this.characterWidth,
      frameY * this.characterHeigth,
      this.characterWidth,
      this.characterHeigth,
      this.positionX,
      this.positionY,
      this.canvasWidth,
      this.canvasHeigth
    );
  }

  moveCharacter(deltaX, deltaY, direction) {
    if (
      hero.positionX + deltaX > 0 &&
      hero.positionX + 25 + deltaX < canvas.width
    ) {
      let borderObjects = GokuCollision(
        hero.positionX + deltaX,
        hero.positionY + deltaY,
        hero.width,
        hero.height,
        "all"
      );
      if (borderObjects === false) {
        hero.positionX += deltaX;
      }
    }
    if (
      hero.positionY + deltaY > 0 &&
      hero.positionY + 25 + deltaY < canvas.height
    ) {
      let borderObjects2 = GokuCollision(
        hero.positionX + deltaX,
        hero.positionY + deltaY,
        hero.width,
        hero.height,
        "all"
      );
      if (borderObjects2 === false) {
        hero.positionY += deltaY;
      }
    }
    currentDirection = direction;
  }

  pickUpItem() {
    let deltaX = 0;
    let deltaY = 0;
    switch (this.direction) {
      case 0:
        deltaY += 5;
        break;
      case 1:
        deltaX += 5;
        break;
      case 2:
        deltaY -= 5;
        break;
      case 3:
        deltaX -= 5;
        break;
    }
    let result = GokuCollision(
      this.positionX + deltaX,
      this.positionY + deltaY,
      this.width,
      this.height,
      "dragonball"
    );
    return result;
  }
}

/**
 *
 * Here I create my Objects and load the images
 *
 *
 */

let canvasObjectsArray = [];
let hero = new SonGoku();
hero.loadImage();
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

let obstacleFive = new Obstacle(380, 130);
obstacleFive.loadImage();
canvasObjectsArray.push(obstacleFive);
obstacleFive.canvasWidth = 50;
obstacleFive.canvasHeigth = 70;
obstacleFive.width = 50;
obstacleFive.height = 70;
obstacleFive.sourceWidth = 150;


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
let dragonballTwo = new DragonBall(400, 40, "dragonballTwo");
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
//change Image for 3rd & 4th Dragonball
dragonballThree.img.src = "../../img/buriedDragonball.png";
dragonballThree.status = "buried";
dragonballFour.img.src = "../../img/hiddenDragonball.png";
dragonballFour.status = "hidden";

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
  } else {
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
  }

  return result;
}

const FRAME_LIMIT = 12;
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let keyPresses = {};
let currentDirection = hero.FACING_DOWN;
let currentLoopIndex = 0;
let frameCount = 0;

window.addEventListener("keydown", keyDownListener);
function keyDownListener(event) {
  keyPresses[event.key] = true;
}

window.addEventListener("keyup", keyUpListener);
function keyUpListener(event) {
  keyPresses[event.key] = false;
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let hasMoved = false;

  if (keyPresses.w) {
    hero.moveCharacter(0, -hero.MOVEMENT_SPEED, hero.FACING_UP);
    hasMoved = true;
    hero.direction = 2;
  } else if (keyPresses.s) {
    hero.moveCharacter(0, hero.MOVEMENT_SPEED, hero.FACING_DOWN);
    hasMoved = true;
    hero.direction = 0;
  }

  if (keyPresses.a) {
    hero.moveCharacter(-hero.MOVEMENT_SPEED, 0, hero.FACING_LEFT);
    hasMoved = true;
    hero.direction = 3;
  } else if (keyPresses.d) {
    hero.moveCharacter(hero.MOVEMENT_SPEED, 0, hero.FACING_RIGHT);
    hasMoved = true;
    hero.direction = 1;
  }
  if (keyPresses.e) {
    let foundDragonball = hero.pickUpItem();
    if (Number.isInteger(foundDragonball)) {
      //delete here from allObjects
      keyPresses.e = false;
      if (allDragonballs[foundDragonball].status === "buried") {
        allDragonballs[foundDragonball].img.src = "../../img/dragonball.png";
        allDragonballs[foundDragonball].loadImage();
        allDragonballs[foundDragonball].status = "normal";
        buriedTime = false;
      } else if (allDragonballs[foundDragonball].status === "normal") {
        canvasObjectsArray.forEach((element, index) => {
          if (element.name === allDragonballs[foundDragonball].name) {
            canvasObjectsArray.splice(index, 1);
          }
        });
        allDragonballs.splice(foundDragonball, 1);
        hero.collectedDragonballs++;
        document.getElementById(
          "counter"
        ).innerHTML = `Dragonball counter: ${hero.collectedDragonballs}`;
      }
    }
  }
  if (keyPresses.f) {
    if (allKiBlasts.length < 1) {
      ki.positionX = hero.positionX;
      ki.positionY = hero.positionY;
      ki.direction = hero.direction;
      allKiBlasts.push(ki);
    }
  }

  if (hasMoved) {
    frameCount++;
    if (frameCount >= FRAME_LIMIT) {
      frameCount = 0;
      currentLoopIndex++;
      if (currentLoopIndex >= hero.CYCLE_LOOP.length) {
        currentLoopIndex = 0;
      }
    }
  }

  if (!hasMoved) {
    currentLoopIndex = 0;
  }

  hero.drawFrame(currentLoopIndex, currentDirection);
  obstacleOne.drawFrame();
  obstacleThree.drawFrame();
  obstacleTwo.drawFrame();
  obstacleFour.drawFrame();
  obstacleFive.drawFrame();
  topWoods.drawFrame();
  topWoodsTwo.drawFrame();
  allDragonballs.forEach(element => {
    element.drawFrame();
  });
  allKiBlasts.forEach(element => {
    element.moveCharacter();
    element.drawFrame();
  });
  window.requestAnimationFrame(gameLoop);
}
