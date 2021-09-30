class Game {
  constructor() {
    this.currentTime = 0;
    this.car = null;
  }

  startGame() {
    this.car = new Car();
    this.car.create();
    this.addEventListeners();
  }
  addEventListeners() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.car.moveLeft();
        this.car.draw();
      } else if (e.key === "ArrowRight") {
        this.car.moveRight();
        this.car.draw();
      }
    });
  }
}

class Car {
  constructor() {
    this.x = 50;
    this.y = 0;
    this.width = 8;
    this.height = 16;
    this.carDiv = document.createElement("div");
  }

  moveLeft() {
    if (this.x > 0) {
      this.x--;
      this.draw();
    }
  }
  moveRight() {
    if (this.x <= 99 - this.width) {
      this.x++;
      this.draw();
    }
  }

  create() {
    this.carDiv.className = "car";

    this.carDiv.style.width = this.width + "%";
    this.carDiv.style.height = this.height + "%";
    this.carDiv.style.left = this.x + "%";
    this.carDiv.style.bottom = this.y + "%";

    //append to DOM
    const gameElm = document.getElementById("game");
    gameElm.appendChild(this.carDiv);
  }

  draw() {
    this.carDiv.style.width = this.width + "%";
    this.carDiv.style.height = this.height + "%";
    this.carDiv.style.left = this.x + "%";
    this.carDiv.style.bottom = this.y + "%";
  }
}
