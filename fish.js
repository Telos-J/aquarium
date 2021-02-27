class Fish {
  constructor(x, y) {
    this.head = Math.random() * 2 * Math.PI;
    this.pieces = [];
    this.size = 3;
    this.speed = 3;
    this.range = 200;
    this.hunger = 100;
    this.position = new Vector2(x, y);
    this.velocity = angleToVector(this.head).scale(this.speed);
    this.frameNum = 0;
  }

  move() {
    this.velocity = this.velocity.normalize(this.speed);
    this.head = vectorToAngle(this.velocity);
    this.position = this.position.add(this.velocity);
  }
  
  starve() {
    this.hunger -= 0.01;
    return this.hunger < 0 ? true : false
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
  
  avoidWall() {
    this.avoidanceWall.set(0, 0);

    if (this.position.x < this.range)
      this.avoidanceWall.x += this.avoidanceWallConstant
    if (this.position.y < this.range)
      this.avoidanceWall.y += this.avoidanceWallConstant
    if (this.position.x > canvas.width - this.range)
      this.avoidanceWall.x -= this.avoidanceWallConstant
    if (this.position.y > canvas.height - this.range)
      this.avoidanceWall.y -= this.avoidanceWallConstant
  }
}

class SchoolingFish extends Fish {
  constructor(x, y) {
    super(x, y);
    this.size = 3;
    this.speed = 3;
    this.range = 200;
    this.avoidance = new Vector2();
    this.avoidanceWall = new Vector2();
    this.avoidanceShark = new Vector2();
    this.alignment = new Vector2();
    this.cohesion = new Vector2();
    this.avoidanceConstant = 0.06;
    this.avoidanceWallConstant = 0.1;
    this.avoidanceSharkConstant = 0.4;
    this.alignmentConstant = 0.07;
    this.cohesionConstant = 0.06;
  }

  static fishImages = []

  static buildFish() {
    for (let i=0; i<1; i++) {
      const fishImage = new Image();
      const prefix = i < 10 ? '0' : '';
      fishImage.src = 'assets/flounder/flounder' + prefix + i + '.png'
      SchoolingFish.fishImages.push(fishImage)
    }
  }

  move() {
    this.velocity = this.velocity.add(
      this.avoidance,
      this.avoidanceWall,
      this.avoidanceShark,
      this.alignment,
      this.cohesion,
    );
   super.move()
  }

  avoidShark(sharks) {
    this.avoidanceShark.set(0, 0);

    for (const shark of sharks) {
      if (this.inNeighborhood(shark)) {
        this.avoidanceShark = this.avoidanceShark.add(
          this.position.sub(shark.position)
        );
      }
    }

    this.avoidanceShark = this.avoidanceShark.normalize(this.avoidanceSharkConstant);
  }
}

class Shark extends Fish {
  constructor(x, y) {
    super(x, y);
    this.size = 3;
    this.speed = 5;
    this.range = 200;
    this.eatRange = 10;
    this.avoidanceWall = new Vector2();
    this.chaseFish = new Vector2()
    this.avoidanceWallConstant = 0.2;
    this.chaseFishConstant = 0.1;
    this.target = undefined;
  }

  move() {
    this.velocity = this.velocity.add(
      this.chaseFish,
      this.avoidanceWall
    );
   super.move()
  }
  
  buildShark() {
    //Fin
    this.pieces.push(new FishPiece(this.size*2 , -this.size*7, -this.size*3, 0, "#5295c0"));
    this.pieces.push(new FishPiece(this.size*2 , -this.size*1, -this.size*3, -Math.PI, "#5295c0"));
    // head
    this.pieces.push(new FishPiece(this.size *3, 0, 0, Math.PI/2, "white"));
    this.pieces.push(new FishPiece(this.size *5, -this.size*5, -this.size*3, -Math.PI/2, "#5295c0"));
    this.pieces.push(new FishPiece(this.size *5, -this.size*5, this.size*3, Math.PI/2, "#5295c0"));
    this.pieces.push(new FishPiece(this.size *3, -this.size*10, 0, Math.PI/2, "#5295c0"));
    this.pieces.push(new FishPiece(this.size *3, -this.size*10, 0, -Math.PI/2, "#5295c0"));
    //Support Tail - Body
    this.pieces.push(new FishPiece(this.size *2.6, -this.size*13, this.size*2, Math.PI/2.4, "#5295c0"));
    this.pieces.push(new FishPiece(this.size *2.7, -this.size*13, -this.size*2.1, -Math.PI/2.4, "#5295c0"));
    //Support Tail - Body 2
    this.pieces.push(new FishPiece(this.size *2, -this.size*16, this.size, Math.PI/2.4, "#5295c0"));
    this.pieces.push(new FishPiece(this.size *2, -this.size*16, -this.size*1.2, -Math.PI/2.4, "#5295c0"));
    //Fill in the hole
    this.pieces.push(new FishPiece(this.size *2.5, -this.size*14, -this.size*0.9, -Math.PI/2.4, "#5295c0"));
    this.pieces.push(new FishPiece(this.size *3, -this.size*2.5, -this.size*3, -Math.PI/2, "white"));
    this.pieces.push(new FishPiece(this.size *3, 0, 0, -Math.PI/2,"#5295c0"));
    this.pieces.push(new FishPiece(this.size *3, -this.size*5, 0, Math.PI/2, "#5295c0"));
    //Tail
    this.pieces.push(new FishPiece(this.size*2 , -this.size*17.5, this.size*0, -Math.PI/2, "#5295c0"));
    this.pieces.push(new FishPiece(this.size*2 , -this.size*19.5, this.size*2, 0, "#5295c0"));
    //tail 2
    this.pieces.push(new FishPiece(this.size*2.5 , -this.size*18, -this.size*1, 0, "#5295c0"));
    //top fin
    this.pieces.push(new FishPiece(this.size*4 , -this.size*8, this.size*3, 0, "#5295c0"));
  }
  
  inEatRange(fish) {
    const relPos = fish.position.sub(this.position);
    const dis = relPos.magnitude();

    return dis < this.eatRange ? true : false;
  }

  chase(fishes) {
    this.chaseFish.set(0, 0);
    let distance = this.range;

    if (!this.target || !this.inNeighborhood(this.target))
      for (const fish of fishes) {
        if (this.inNeighborhood(fish)) {
          const tempDistance = this.position.sub(fish.position).magnitude()
          if (distance > tempDistance) {
            distance = tempDistance;
            this.target = fish;
          }
        }
      }
    
    if (this.target)
      this.chaseFish = this.target.position.sub(this.position).normalize(this.chaseFishConstant)
  }
  
  eat(fishes) {
    const newFishes = []
    for (const fish of fishes) {
      if (this.inEatRange(fish)) {
        this.hunger += 30;
        this.hunger = Math.min(this.hunger, 100);
      } else newFishes.push(fish)     
    }
    
    return newFishes
  }
}

function drawFish (fish) {
  context.save()
  context.translate(fish.position.x, fish.position.y)
  if (fish.velocity.x > 0) {
    context.rotate(fish.head)
  } else {
    context.rotate(fish.head - Math.PI)
    context.scale(-1, 1)
  }

  context.drawImage(
    SchoolingFish.fishImages[fish.frameNum],
    0,
    0,
    390,
    200,
    -92,
    -50,
    184,
    100
  )
  context.restore()
  fish.frameNum++;
  if (fish.frameNum > SchoolingFish.fishImages.length - 1) fish.frameNum = 0;
};

function drawNeighborhood (fish) {
  context.fillStyle = "rgba(241, 241, 241, 0.5)";
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

  for (otherFish of fishes) {
    if (fish.inNeighborhood(otherFish)) {
      if (fish.target === otherFish) context.strokeStyle = "red";
      else context.strokeStyle = "rgba(241, 241, 241, 0.5)";
      context.beginPath();
      context.moveTo(fish.position.x, fish.position.y);
      context.lineTo(otherFish.position.x, otherFish.position.y);
      context.stroke();
    }
  }
};
