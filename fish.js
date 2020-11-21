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
    this.head = Math.random() * 2 * Math.PI;
    this.pieces = [];
    this.size = 10;
    this.speed = 4;
    this.color = "white";
    this.range = 200;
    this.position = new Vector2(x, y);
    this.velocity = angleToVector(this.head);
    this.velocity = this.velocity.scale(this.speed);
    this.avoidance = new Vector2();
    this.alignment = new Vector2();
    this.cohesion = new Vector2();
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
    this.velocity = this.velocity.add(
      this.avoidance,
      this.alignment,
      this.cohesion
    );
    this.velocity = this.velocity.normalize(this.speed);
    this.head = vectorToAngle(this.velocity);
    this.position = this.position.add(this.velocity);

    if (this.position.x < -4 * this.size)
      this.position.x = canvas.width + this.size;
    if (this.position.x > canvas.width + 4 * this.size)
      this.position.x = -this.size;
    if (this.position.y > canvas.height + 4 * this.size)
      this.position.y = -this.size;
    if (this.position.y < -4 * this.size)
      this.position.y = canvas.height - this.size;
  }

  inNeighborhood(fish) {
    const relPos = fish.position.sub(this.position);
    const dis = relPos.magnitude();

    const cos =
      this.velocity.dot(relPos) /
      this.velocity.magnitude() /
      relPos.magnitude();

    if (dis < this.range && cos < 1 && cos > Math.cos((Math.PI * 3) / 4))
      return true;
    else return false;
  }
}

const drawFishPiece = function (x, y, size, head, color) {
  context.beginPath();
  context.moveTo(x + size * Math.cos(head), y + size * Math.sin(head));
  context.lineTo(
    x + size * Math.cos(head + Math.PI / 2),
    y + size * Math.sin(head + Math.PI / 2)
  );

  context.lineTo(
    x + size * Math.cos(head - Math.PI / 2),
    y + size * Math.sin(head - Math.PI / 2)
  );
  context.closePath();
  context.fillStyle = color;
  context.fill();
};

const drawFish = function (fish) {
  fish.pieces.forEach((fishpiece) => {
    drawFishPiece(
      fish.position.x +
        fishpiece.dx * Math.cos(fish.head) +
        fishpiece.dy * Math.sin(fish.head),
      fish.position.y +
        fishpiece.dx * Math.sin(fish.head) -
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
  context.moveTo(fish.position.x, fish.position.y);
  context.arc(
    fish.position.x,
    fish.position.y,
    fish.range,
    fish.head - (Math.PI * 3) / 4,
    fish.head + (Math.PI * 3) / 4
  );
  context.fill();
};
