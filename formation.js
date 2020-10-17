window.addEventListener("load", function (event) {
  canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");

  canvas.width = innerWidth;
  canvas.height = innerHeight;

  window.addEventListener("resize", function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  });

  class FishPiece {
    constructor(size, dx, dy, color) {
      this.size = size;
      this.dx = dx;
      this.dy = dy;
      this.color = color;
    }
  }

  class Fish {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.head = Math.random() * 2 * Math.PI;
      this.pieces = [];
      this.size = 10;
      this.speed = 5;
      this.color = "white";
      this.range = 200;
    }

    //prettier-ignore
    buildFish() {
      // head
      this.pieces.push(new FishPiece(this.size *2, 0, 0, "white"));
      // //eye
      this.pieces.push(new FishPiece(this.size, 0, 0, "black"));
      this.pieces.push(new FishPiece(this.size, 0, this.size, "white"));
      this.pieces.push(new FishPiece(this.size, 0, -this.size, "white"));
      //spine
      this.pieces.push(new FishPiece(this.size, -2 * this.size, 0, "gray"));
      this.pieces.push(new FishPiece(this.size, -3 * this.size, 0, "gray"));
      this.pieces.push(new FishPiece(this.size, -this.size, 0, "gray"));
      // //body
      this.pieces.push(new FishPiece(this.size, -2 * this.size, this.size, "white"));
      this.pieces.push(new FishPiece(this.size, -3 * this.size, this.size, "white"));
      this.pieces.push(new FishPiece(this.size, -3 * this.size, -this.size, "white"));
      this.pieces.push(new FishPiece(this.size, -2 * this.size, -this.size, "white"));
      this.pieces.push(new FishPiece(this.size, -this.size, -this.size, "white"));
      this.pieces.push(new FishPiece(this.size, -this.size, this.size, "white"));
      // //tail
      this.pieces.push(new FishPiece(this.size*3/2, -4.5 * this.size, 0, "white"));
    }

    move() {
      this.x += this.speed * Math.cos(this.head);
      this.y -= this.speed * Math.sin(this.head);
      if (this.x < -4 * this.size) this.x = canvas.width + this.size;
      if (this.x > canvas.width + 4 * this.size) this.x = -this.size;
      if (this.y > canvas.height + 4 * this.size) this.y = -this.size;
      if (this.y < -4 * this.size) this.y = canvas.height - this.size;
    }

    inNeighborhood(fish) {
      // Determine if fish is in neighborhood
      const a = fish.x - this.x;
      const b = fish.y - this.y;
      const c = Math.sqrt(a * a + b * b);
      if (c < this.range) return true;
      else return false;
    }
  }

  const numFishes = 10;
  const controlFish = new Fish(
    Math.random() * canvas.width,
    Math.random() * canvas.height
  );
  controlFish.buildFish();
  controlFish.pieces.forEach((piece) => {
    piece.color = "yellow";
  });
  const fishes = [];

  for (i = 0; i < numFishes; i++) {
    const fish = new Fish(
      Math.random() * canvas.width,
      Math.random() * canvas.height
    );
    fish.buildFish();
    fishes.push(fish);
  }

  const drawFishPiece = function (x, y, size, head, color) {
    context.beginPath();
    context.moveTo(x + size * Math.cos(head), y - size * Math.sin(head));
    context.lineTo(
      x + size * Math.cos(head + Math.PI / 2),
      y - size * Math.sin(head + Math.PI / 2)
    );

    context.lineTo(
      x + size * Math.cos(head - Math.PI / 2),
      y - size * Math.sin(head - Math.PI / 2)
    );
    context.closePath();
    context.fillStyle = color;
    context.fill();
  };

  const drawFish = function (fish) {
    fish.pieces.forEach((fishpiece) => {
      drawFishPiece(
        fish.x +
          fishpiece.dx * Math.cos(fish.head) +
          fishpiece.dy * Math.sin(fish.head),
        fish.y -
          fishpiece.dx * Math.sin(fish.head) +
          fishpiece.dy * Math.cos(fish.head),
        fishpiece.size,
        fish.head,
        fishpiece.color
      );
    });
  };

  const drawNeighborhood = function (fish) {
    context.fillStyle = "grey";
    context.beginPath();
    context.arc(fish.x, fish.y, fish.range, 0, Math.PI * 2);
    context.fill();
  };

  const update = function () {
    controlFish.move();
    fishes.forEach((fish) => {
      fish.move();
    });
  };

  const render = function () {
    context.fillStyle = "blue";
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawNeighborhood(controlFish);
    drawFish(controlFish);
    fishes.forEach((fish) => {
      drawFish(fish);
    });

    for (fish of fishes) {
      if (controlFish.inNeighborhood(fish)) {
        context.strokeStyle = "black";
        context.moveTo(controlFish.x, controlFish.y);
        context.lineTo(fish.x, fish.y);
        context.stroke();
      }
    }
  };

  const start = function () {
    update();
    render();
    window.requestAnimationFrame(start);
  };

  start();
});
