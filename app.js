const controlFish = new Fish(
  Math.random() * canvas.width,
  Math.random() * canvas.height
);

// controlFish.buildFish();
// controlFish.pieces.forEach((piece) => {
//     piece.color = 'yellow';
// });

const numFishes = 50;
const numSharks = 5;
const fishes = [];

const controlShark = new Fish(
  Math.random() * canvas.width,
  Math.random() * canvas.height
);
controlShark.buildShark()

const sharks = [controlShark];

for (i = 0; i < numFishes; i++) {
  const fish = new Fish(
    Math.random() * canvas.width,
    Math.random() * canvas.height
  );
  fish.buildFish()
  fishes.push(fish);
}

for (i = 0; i < numSharks; i++) {
  const shark = new Fish(
    Math.random() * canvas.width,
    Math.random() * canvas.height
  );
  shark.buildShark()
  sharks.push(shark);
}

const update = function () {
  for (let fish of fishes) {
    fish.avoidance.set(0, 0);
    fish.alignment.set(0, 0);
    fish.cohesion.set(0, 0);

    let counter = 0;
    let headAverage = fish.head;
    let positionAverage = fish.position;
    
    fish.avoidWall()
    
    for (const otherFish of fishes) {
      if (fish.inNeighborhood(otherFish)) {
        fish.avoidance = fish.avoidance.add(
          fish.position.sub(otherFish.position)
        );
        headAverage = (counter * headAverage + otherFish.head) / (counter + 1);
        positionAverage = positionAverage
          .scale(counter)
          .add(otherFish.position)
          .scale(1 / (counter + 1));
      }
    }

    fish.avoidShark(sharks)

    fish.avoidance = fish.avoidance.normalize(fish.avoidanceConstant);
    fish.alignment = angleToVector(headAverage).normalize(fish.alignmentConstant);
    fish.cohesion = positionAverage.sub(fish.position).normalize(fish.cohesionConstant);
    fish.move();
  }
  
  for (const shark of sharks) {
    shark.avoidWall()
    shark.move()
    shark.chase(fishes)
  }
};

const render = function () {
  context.fillStyle = "blue";
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawNeighborhood(controlShark);
  drawFish(controlShark);
  for (let fish of fishes) {
    drawFish(fish);
  }
  for (let shark of sharks) {
    drawFish(shark);
  }
};

const start = function () {
  update();
  render();
  window.requestAnimationFrame(start);
};

start();
