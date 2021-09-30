class Game {
  constructor() {
    this.currentTime = 0;
    this.car = null;
    this.obstaclesArray = [];
  }

  startGame() {
    this.car = new Car();
    this.car.create();
    this.addEventListeners();

    // OPTION 1
    // setInterval(() => {
    //   const newObstacle = new Obstacle();
    //   this.obstaclesArray.push(newObstacle);
    //   newObstacle.create();
    //   newObstacle.draw();
    // }, 6000);

    // setInterval(() => {
    //   this.obstaclesArray.forEach((elm) => {
    //     elm.moveDown();
    //     elm.draw();
    //   });
    // }, 1000);

    // OPTION 2
    setInterval(() => {
      // update timer
      this.currentTime++;

      this.obstaclesArray.forEach((obstacle) => {
        // update positions
        obstacle.moveDown();
        obstacle.draw();

        if (obstacle.y === 100) {
          // collision detection
          if (this.car.x < obstacle.x + obstacle.width && this.car.x + this.car.width > obstacle.x) {
            alert("game over!");
          }
        } else if (obstacle.y > 100) {
          obstacle.remove();
          this.obstaclesArray.shift();
        }
      });

      // create new obstacles
      if (this.currentTime % 8 === 0) {
        const newObstacle = new Obstacle();
        this.obstaclesArray.push(newObstacle);
        newObstacle.create();
      }
    }, 400);
  }

  addEventListeners() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        this.car.moveLeft();
        this.car.draw();
      } else if (event.key === "ArrowRight") {
        this.car.moveRight();
        this.car.draw();
      }
    });
  }
}

class Thing {
  constructor() {
    this.domElm = null;
    this.gameElm = document.getElementById("game");
  }
  create() {
    this.domElm = document.createElement("div");
    this.domElm.className = this.className;
    this.gameElm.appendChild(this.domElm);
  }
  remove() {
    this.gameElm.removeChild(this.domElm);
  }
  draw() {
    this.domElm.style.width = this.width + "%";
    this.domElm.style.height = this.height + "%";
    this.domElm.style.left = this.x + "%";
    this.domElm.style.top = this.y + "%";
  }
}

class Car extends Thing {
  constructor() {
    super();
    this.x = 50;
    this.y = 100;
    this.width = 10;
    this.height = 20;
    this.movementSpeed = 3;
    this.className = "car";
  }
  moveLeft() {
    if (this.x > 0) {
      this.x--;
    }
  }
  moveRight() {
    if (this.x + this.width < 100) {
      this.x++;
    }
  }
}

class Obstacle extends Thing {
  constructor() {
    super();
    this.x = 50;
    this.y = 0;
    this.width = 20;
    this.height = 5;
    this.className = "obstacle";
  }
  moveDown() {
    this.y = this.y + 5;
  }
}
