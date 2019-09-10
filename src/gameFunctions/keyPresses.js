class KeyPresses {
  constructor() {}

  handleControls() {
    let hasMoved = false;

    if (keyPresses.w) {
      hero.moveCharacter(0, -hero.MOVEMENT_SPEED);
      antiHeroObjectArray.splice[(antiHeroObjectArray.length - 1, 1)];
      antiHeroObjectArray.push(hero);
      justTheHero.splice(0, 1);
      justTheHero.push(hero);
      hasMoved = true;
      hero.direction = 2;
    } else if (keyPresses.s) {
      hero.moveCharacter(0, hero.MOVEMENT_SPEED);
      antiHeroObjectArray.splice[(antiHeroObjectArray.length - 1, 1)];
      antiHeroObjectArray.push(hero);
      justTheHero.splice(0, 1);
      justTheHero.push(hero);
      hasMoved = true;
      hero.direction = 0;
    }

    if (keyPresses.a) {
      hero.moveCharacter(-hero.MOVEMENT_SPEED, 0);
      antiHeroObjectArray.splice[(antiHeroObjectArray.length - 1, 1)];
      antiHeroObjectArray.push(hero);
      justTheHero.splice(0, 1);
      justTheHero.push(hero);
      hasMoved = true;
      hero.direction = 3;
    } else if (keyPresses.d) {
      hero.moveCharacter(hero.MOVEMENT_SPEED, 0);
      antiHeroObjectArray.splice[(antiHeroObjectArray.length - 1, 1)];
      antiHeroObjectArray.push(hero);
      justTheHero.splice(0, 1);
      justTheHero.push(hero);
      hasMoved = true;
      hero.direction = 1;
    }
    if (keyPresses.j) {
      let foundDragonball = hero.pickUpItem();
      if (Number.isInteger(foundDragonball)) {
        //delete here from allObjects
        keyPresses.j = false;
        if (allDragonballs[foundDragonball].status === "buried") {
          allDragonballs[foundDragonball].img.src = "./img/dragonball.png";
          allDragonballs[foundDragonball].loadImage();
          allDragonballs[foundDragonball].status = "normal";
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
    if (keyPresses.k) {
      if (allKiBlasts.length < 1 && hero.energy > 0) {
        hero.energy = hero.energy - 5;
        document.getElementById(
          "energy"
        ).innerHTML = `Energy: ${hero.energy}<br>`;
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
  }
}
