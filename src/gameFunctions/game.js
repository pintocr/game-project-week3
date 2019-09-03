class Goku {
  constructor() {
    this.position_X = 7;
    this.position_Y = 7;

    this.direction = "front";
    this.countDB = 0;
  }

  digDBup(direction) {
    switch (direction) {
      case "back":
        if (
          document.getElementById(`${this.position_Y - 1}-${this.position_X}`)
            .className === "buriedDragonball"
        ) {
          document.getElementById(
            `${this.position_Y - 1}-${this.position_X}`
          ).className = "dragonball";
        }
        break;
      case "front":
        if (
          document.getElementById(`${this.position_Y + 1}-${this.position_X}`)
            .className === "buriedDragonball"
        ) {
          document.getElementById(
            `${this.position_Y + 1}-${this.position_X}`
          ).className = "dragonball";
        }
        break;
      case "left":
        if (
          document.getElementById(`${this.position_Y}-${this.position_X - 1}`)
            .className === "buriedDragonball"
        ) {
          document.getElementById(
            `${this.position_Y}-${this.position_X - 1}`
          ).className = "dragonball";
        }
        break;
      case "right":
        if (
          document.getElementById(`${this.position_Y}-${this.position_X + 1}`)
            .className === "buriedDragonball"
        ) {
          document.getElementById(
            `${this.position_Y}-${this.position_X + 1}`
          ).className = "dragonball";
        }
        break;
    }
  }

  takeDB(direction) {
    switch (direction) {
      case "back":
        if (
          document.getElementById(`${this.position_Y - 1}-${this.position_X}`)
            .className === "dragonball"
        ) {
          document.getElementById(
            `${this.position_Y - 1}-${this.position_X}`
          ).className = "open-field";
          this.countDB += 1;
        }

        break;
      case "front":
        if (
          document.getElementById(`${this.position_Y + 1}-${this.position_X}`)
            .className === "dragonball"
        ) {
          document.getElementById(
            `${this.position_Y + 1}-${this.position_X}`
          ).className = "open-field";
          this.countDB += 1;
        }

        break;
      case "left":
        if (
          document.getElementById(`${this.position_Y}-${this.position_X - 1}`)
            .className === "dragonball"
        ) {
          document.getElementById(
            `${this.position_Y}-${this.position_X - 1}`
          ).className = "open-field";
          this.countDB += 1;
        }
        break;
      case "right":
        if (
          document.getElementById(`${this.position_Y}-${this.position_X + 1}`)
            .className === "dragonball"
        ) {
          document.getElementById(
            `${this.position_Y}-${this.position_X + 1}`
          ).className = "open-field";

          this.countDB += 1;
        }
        break;
    }
  }

  walk(direction) {
    switch (direction) {
      case "back":
        if (
          this.position_Y > 0 &&
          document.getElementById(`${this.position_Y - 1}-${this.position_X}`)
            .className === "open-field"
        ) {
          document.getElementById(
            `${this.position_Y}-${this.position_X}`
          ).className = "open-field";
          this.direction = "back";
          this.position_Y -= 1;
          document.getElementById(
            `${this.position_Y}-${this.position_X}`
          ).className = "goku-back";
        } else {
          document.getElementById(
            `${this.position_Y}-${this.position_X}`
          ).className = "goku-back";
          this.direction = "back";
        }
        break;
      case "front":
        if (
          this.position_Y < 20 &&
          document.getElementById(`${this.position_Y + 1}-${this.position_X}`)
            .className === "open-field"
        ) {
          document.getElementById(
            `${this.position_Y}-${this.position_X}`
          ).className = "open-field";
          this.direction = "front";
          this.position_Y += 1;
          document.getElementById(
            `${this.position_Y}-${this.position_X}`
          ).className = "goku-front";
        } else {
          document.getElementById(
            `${this.position_Y}-${this.position_X}`
          ).className = "goku-front";
          this.direction = "front";
        }
        break;
      case "left":
        if (
          this.position_X > 0 &&
          document.getElementById(`${this.position_Y}-${this.position_X - 1}`)
            .className === "open-field"
        ) {
          document.getElementById(
            `${this.position_Y}-${this.position_X}`
          ).className = "open-field";
          this.direction = "left";
          this.position_X -= 1;
          document.getElementById(
            `${this.position_Y}-${this.position_X}`
          ).className = "goku-left";
        } else {
          document.getElementById(
            `${this.position_Y}-${this.position_X}`
          ).className = "goku-left";
          this.direction = "left";
        }
        break;
      case "right":
        if (
          this.position_X < 20 &&
          document.getElementById(`${this.position_Y}-${this.position_X + 1}`)
            .className === "open-field"
        ) {
          document.getElementById(
            `${this.position_Y}-${this.position_X}`
          ).className = "open-field";
          this.direction = "right";
          this.position_X += 1;
          document.getElementById(
            `${this.position_Y}-${this.position_X}`
          ).className = "goku-right";
        } else {
          document.getElementById(
            `${this.position_Y}-${this.position_X}`
          ).className = "goku-right";
          this.direction = "right";
        }
        break;
    }
  }
}

class KiBlast {
  constructor(x, y, dir) {
    this.position_Y = y;
    this.position_X = x;
    this.direction = dir;
  }

  fly() {
    switch (this.direction) {
      case "back": {
        setInterval(function () {
          //dostuff
        }, 500);
      }
    }
  }
}


let goku = new Goku();

document.querySelector("#controllPanel").onclick = function() {
  location.reload();
};

document.addEventListener("keydown", function(event) {
  if (event.which === 38) {
    goku.walk("back");
  } else if (event.which === 39) {
    goku.walk("right");
  } else if (event.which === 40) {
    goku.walk("front");
  } else if (event.which === 37) {
    goku.walk("left");
  } else if (event.which === 32) {
    goku.takeDB(goku.direction);
    goku.digDBup(goku.direction);
    document.getElementById(
      "counter"
    ).innerHTML = `Dragonball counter: ${goku.countDB}`;
  } else if (event.which === 66) {
    let someKi = new KiBlast(goku.position_X, goku.position_Y, goku.direction);
    someKi.fly();
  }
  console.log(event.which);
  console.log("Gokus current Position: " + goku.position_Y + goku.position_X);
  console.log("Gokus current direction: " + goku.direction);
});
