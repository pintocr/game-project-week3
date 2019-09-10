class CanvasObject {
  constructor(positionX, positionY) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.canvasWidth = 0;
    this.canvasheight = 0;
    this.width = 0;
    this.height = 0;
    this.sourceWidth = 0;
    this.sourceHeight = 0;

    this.img = new Image();
  }

  loadImage() {
    this.img.src = "";
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
      this.sourceHeight,
      this.positionX,
      this.positionY,
      this.canvasWidth,
      this.canvasheight
    );
  }
}

class Obstacle extends CanvasObject {
  constructor(positionX, positionY) {
    super(positionX, positionY);
    this.canvasWidth = 100;
    this.canvasheight = 50;
    this.width = 100;
    this.height = 50;
    this.sourceWidth = 250;
    this.sourceHeight = 150;
  }

  loadImage() {
    this.img.src = "./img/rocks.bmp";
  }
}

class Woods extends CanvasObject {
  constructor(positionX, positionY) {
    super(positionX, positionY);
    this.canvasWidth = 350;
    this.canvasheight = 50;
    this.width = 350;
    this.height = 50;
    this.sourceWidth = 1600;
    this.sourceHeight = 200;
  }

  loadImage() {
    this.img.src = "./img/wood.bmp";
  }
}

class Grass extends CanvasObject {
  constructor() {
    super(0, 0);
    this.sourceWidth = 25;
    this.sourceHeight = 25;
    this.positionX = 0;
    this.positionY = 0;
    this.canvasWidth = 525;
    this.canvasheight = 525;
  }

  loadImage() {
    this.img.src = "./img/grass.png";
  }
}

class Explosion extends CanvasObject {
  constructor(positionX, positionY) {
    super(positionX, positionY);
    this.canvasWidth = 25;
    this.canvasheight = 25;
    this.width = 25;
    this.height = 25;
    this.sourceWidth = 155;
    this.sourceHeight = 130;
    this.currentLoopIndex = 0;
    this.frameCount = 0;
    this.CYCLE_LOOP = [0, 1, 2, 3, 4, 5, 6];
  }

  loadImage() {
    this.img.src = "./img/explosion.jpg";
  }

  drawFrame() {
    ctx.drawImage(
      this.img,
      this.CYCLE_LOOP[this.currentLoopIndex] * this.sourceWidth,
      0,
      this.sourceWidth,
      this.sourceHeight,
      this.positionX,
      this.positionY,
      this.canvasWidth,
      this.canvasheight
    );
  }

  frameCalci() {
    this.frameCount++;
    if (this.frameCount >= 4) {
      this.frameCount = 0;
      this.currentLoopIndex++;
      if (this.currentLoopIndex >= this.CYCLE_LOOP.length) {
        this.frameCount = 0;
        this.currentLoopIndex = 0;
        allExplosions.splice(0, 1);
      }
    }
  }
}

class EnemyExplosion extends Explosion {
  constructor(positionX, positionY) {
    super(positionX, positionY);
  }

  frameCalci() {
    this.frameCount++;
    if (this.frameCount >= 4) {
      this.frameCount = 0;
      this.currentLoopIndex++;
      if (this.currentLoopIndex >= this.CYCLE_LOOP.length) {
        this.frameCount = 0;
        this.currentLoopIndex = 0;
        enemyExplosions.splice(0, 1);
      }
    }
  }
}

class DragonBall extends CanvasObject {
  constructor(positionX, positionY, name) {
    super(positionX, positionY);
    this.name = name;
    this.canvasWidth = 20;
    this.canvasheight = 20;
    this.width = 20;
    this.height = 20;
    this.status = "normal"; //buried, hidden or normal
    this.sourceWidth = 25;
    this.sourceHeight = 25;
  }
  loadImage() {
    this.img.src = "./img/dragonball.png";
  }
}

class Fighter extends CanvasObject {
  constructor(positionX, positionY) {
    super(positionX, positionY);
    this.CYCLE_LOOP = [2, 0, 1, 2, 3, 4];
    this.canvasWidth = 25;
    this.canvasheight = 25;
    this.width = 25;
    this.height = 25;
    this.sourceWidth = 28;
    this.sourceheight = 40;
    this.MOVEMENT_SPEED = 1;
    this.FACING_DOWN = 0;
    this.FACING_RIGHT = 1;
    this.FACING_UP = 2;
    this.FACING_LEFT = 3;
    this.direction = 0;
  }

  drawFrame(frameX, frameY) {
    ctx.drawImage(
      this.img,
      this.CYCLE_LOOP[frameX] * this.sourceWidth,
      frameY * this.sourceheight,
      this.sourceWidth,
      this.sourceheight,
      this.positionX,
      this.positionY,
      this.canvasWidth,
      this.canvasheight
    );
  }

  moveCharacter(deltaX, deltaY) {
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
      }
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
      }
    }
  }
}

class SonGoku extends Fighter {
  constructor(positionX, positionY) {
    super(positionX, positionY);
    this.collectedDragonballs = 0;
    this.energy = 100;
    this.lifePoints = 100;
  }

  loadImage() {
    this.img.src = "./img/gokuWalk.bmp";
  }

  drawFrame(frameX, frameY) {
    ctx.drawImage(
      this.img,
      this.CYCLE_LOOP[frameX] * this.sourceWidth,
      frameY * this.sourceheight,
      this.sourceWidth,
      this.sourceheight,
      this.positionX,
      this.positionY,
      this.canvasWidth,
      this.canvasheight
    );
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

class Villain extends Fighter {
  constructor(positionX, positionY) {
    super(positionX, positionY);
    this.CYCLE_LOOP = [0, 1, 2, 3, 4];
    this.sourceWidth = 28;
    this.sourceheight = 36;
    this.foundHero = false;
    this.lifePoints = 50;
  }

  loadImage() {
    this.img.src = "./img/freezerWalk.png";
  }

  moveCharacter(deltaX, deltaY) {
    if (
      this.positionX + deltaX > 0 &&
      this.positionX + 25 + deltaX < canvas.width
    ) {
      let borderObjects = GokuCollision(
        this.positionX + deltaX,
        this.positionY + deltaY,
        this.width,
        this.height,
        "antiHero"
      );
      if (borderObjects === false) {
        this.positionX += deltaX;
      }
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
        "antiHero"
      );
      if (borderObjects2 === false) {
        this.positionY += deltaY;
      }
    }
    this.heroDetection(deltaX, deltaY);
  }

  heroDetection(deltaX, deltaY) {
    let zoom = 1;
    while (zoom < 180) {
      let search = GokuCollision(
        this.positionX + deltaX * zoom,
        this.positionY + deltaY * zoom,
        this.width,
        this.height,
        "heroSearch"
      );
      if (search === true) {
        this.foundHero = true;
      }
      zoom = zoom + 20;
    }
  }
}

class KiEnergy {
  constructor(x, y, dir) {
    this.CYCLE_LOOP = [0, 1, 0, 0, 1, 0];
    this.CYCLE_INDEX = 0;
    this.positionX = x;
    this.positionY = y;
    this.canvasWidth = 25;
    this.canvasheight = 25;
    this.width = 25;
    this.height = 25;
    this.characterWidth = 21;
    this.characterheight = 21;

    this.img = new Image();
    this.direction = dir;
  }

  loadImage() {
    this.img.src = "./img/enemyKiBlast.bmp";
    this.img.onload = function() {
      window.requestAnimationFrame(gameLoop);
    };
  }

  drawFrame() {
    ctx.drawImage(
      this.img,
      this.CYCLE_LOOP[this.CYCLE_INDEX] * this.characterWidth,
      this.characterheight * this.direction,
      this.characterWidth,
      this.characterheight,
      this.positionX,
      this.positionY,
      this.canvasWidth,
      this.canvasheight
    );
  }

  moveCharacter() {
    let deltaX = 0;
    let deltaY = 0;
    switch (this.direction) {
      case 0:
        deltaY += 2.75;
        break;
      case 1:
        deltaX += 2.75;
        break;
      case 2:
        deltaY -= 2.75;
        break;
      case 3:
        deltaX -= 2.75;
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
        "antiHero"
      );
      if (borderObjects === false) {
        this.positionX += deltaX;
        if (this.CYCLE_INDEX < 6) {
          this.CYCLE_INDEX++;
        } else {
          this.CYCLE_INDEX = 0;
        }
      } else {
        enemyKiBlasts.splice(0, 1);
      }
    } else {
      enemyKiBlasts.splice(0, 1);
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
        "antiHero"
      );
      if (borderObjects2 === false) {
        this.positionY += deltaY;
        if (this.CYCLE_INDEX < 6) {
          this.CYCLE_INDEX++;
        } else {
          this.CYCLE_INDEX = 0;
        }
      } else {
        let hurtHero = GokuCollision(
          this.positionX + deltaX,
          this.positionY + deltaY,
          this.width,
          this.height,
          "heroSearch"
        );
        if (hurtHero === true) {
          hero.lifePoints = hero.lifePoints - 25;
          document.getElementById(
            "lifePoints"
          ).innerHTML = `Life Points: ${hero.lifePoints}<br>`;
        }
        enemyExplo.positionX = this.positionX;
        enemyExplo.positionY = this.positionY;
        enemyExplosions.push(enemyExplo);
        enemyKiBlasts.splice(0, 1);
      }
    } else {
      enemyKiBlasts.splice(0, 1);
    }
  }
}

class KiBlast extends KiEnergy {
  constructor(x, y, dir) {
    super(x, y, dir);
  }

  loadImage() {
    this.img.src = "./img/kiBlast.bmp";
  }

  moveCharacter() {
    let deltaX = 0;
    let deltaY = 0;
    switch (this.direction) {
      case 0:
        deltaY += 2.75;
        break;
      case 1:
        deltaX += 2.75;
        break;
      case 2:
        deltaY -= 2.75;
        break;
      case 3:
        deltaX -= 2.75;
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
        let hurtEnemy = GokuCollision(
          this.positionX + deltaX,
          this.positionY + deltaY,
          this.width,
          this.height,
          "enemySearch"
        );
        if (Number.isInteger(hurtEnemy)) {
          justTheEnemy[hurtEnemy].lifePoints =
            justTheEnemy[hurtEnemy].lifePoints - 25;
        }
        bigExplo.positionX = this.positionX;
        bigExplo.positionY = this.positionY;
        allExplosions.push(bigExplo);
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
        deltaY += 2.75;
        break;
      case 1:
        deltaX += 2.75;
        break;
      case 2:
        deltaY -= 2.75;
        break;
      case 3:
        deltaX -= 2.75;
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
      allDragonballs[result].img.src = "./img/freeDragonball.png";
    }
  }
}

class timer {
  constructor() {}

  setTimer() {
    let newTimer = new Date().getTime() + 125000;
    return newTimer;
  }

  counts() {
    let time = setInterval(function() {
      // Get today's date and time
      let now = new Date().getTime();

      // Find the distance between now and the count down time
      let actualDistance = countdown - now;

      // Time calculations for minutes and seconds
      let minutes = Math.floor(
        (actualDistance % (1000 * 60 * 60)) / (1000 * 60)
      );
      let seconds = Math.floor((actualDistance % (1000 * 60)) / 1000);

      // Output the result in an element with id="demo"

      document.getElementById("time").innerHTML =
        "Time: " + minutes + "m " + seconds + "s <br>";

      // If the count down is over, write some text
      if (
        actualDistance < 1000 ||
        hero.lifePoints === 0 ||
        hero.collectedDragonballs === 7
      ) {
        noTime = true;
        console.log(noTime);
        clearInterval(time);
      }
    }, 1000);
  }
}
