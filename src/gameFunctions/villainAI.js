class ArtificialIntelligence {
  constructor(soul, routineX, routineY) {
    this.soul = soul;
    this.routineX = routineX;
    this.routineY = routineY;
    this.frameCountAI = 0;
    this.directionChange = 0;
    this.changeCounter = 0;
  }
  raiseAwareness() {
    if (this.soul.lifePoints > 0) {
      this.frameCountAI++;
      if (this.frameCountAI >= FRAME_LIMIT) {
        this.frameCountAI = 0;
        currentLoopIndexAI++;
        if (currentLoopIndexAI >= this.soul.CYCLE_LOOP.length) {
          currentLoopIndexAI = 0;
        }
      }

      switch (this.directionChange) {
        case 0:
          this.soul.direction = 1;
          this.soul.moveCharacter(this.soul.MOVEMENT_SPEED, 0);
          this.changeCounter++;
          if (this.changeCounter > this.routineX) {
            this.changeCounter = 0;
            this.directionChange++;
          }
          break;
        case 1:
          this.soul.moveCharacter(0, -this.soul.MOVEMENT_SPEED);
          this.soul.direction = 2;
          this.changeCounter++;
          if (this.changeCounter > this.routineY) {
            this.changeCounter = 0;
            this.directionChange++;
          }
          break;
        case 2:
          this.soul.moveCharacter(-this.soul.MOVEMENT_SPEED, 0);
          this.soul.direction = 3;
          this.changeCounter++;
          if (this.changeCounter > this.routineX) {
            this.changeCounter = 0;
            this.directionChange++;
          }
          break;
        case 3:
          this.soul.moveCharacter(0, this.soul.MOVEMENT_SPEED);
          this.soul.direction = 0;
          this.changeCounter++;
          if (this.changeCounter > this.routineY) {
            this.changeCounter = 0;
            this.directionChange = 0;
          }
          break;
      }
      if (this.soul.foundHero === true) {
        if (enemyKiBlasts.length < 1) {
          kiEnemy.positionX = this.soul.positionX;
          kiEnemy.positionY = this.soul.positionY;
          kiEnemy.direction = this.soul.direction;
          enemyKiBlasts.push(kiEnemy);
          this.soul.foundHero = false;
        }
      }
    } else {
      this.soul.positionX = 0;
      this.soul.positionY = 0;
      this.soul.width = 0;
      this.soul.height = 0;
    }
  }
}
