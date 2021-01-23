const mode = "display";

// const controlShark = new Shark(
//   Math.random() * canvas.width,
//   Math.random() * canvas.height
// );
// controlShark.buildShark()

const numFishes = 50;
const numSharks = 5;
let fishes = [];
let sharks = [];

for (i = 0; i < numFishes; i++) {
  const fish = new SchoolingFish(
    Math.random() * canvas.width,
    Math.random() * canvas.height
  );
  fish.buildFish()
  fishes.push(fish);
}

for (i = 0; i < numSharks; i++) {
  const shark = new Shark(
    Math.random() * canvas.width,
    Math.random() * canvas.height
  );
  shark.buildShark()
  sharks.push(shark);
}

function update() {
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
  
  const tempSharks = sharks
  
  for (const shark of tempSharks) {
    shark.avoidWall()
    shark.move()
    shark.chase(fishes)
    fishes = shark.eat(fishes)
    sharks = sharks.filter((shark) => !shark.starve())
  }
};

function render() {
  context.fillStyle = "blue";
  context.fillRect(0, 0, canvas.width, canvas.height);
  // drawNeighborhood(controlShark);
  for (let fish of fishes) {
    drawFish(fish);
  }
  for (let shark of sharks) {
    drawFish(shark);
  }
};

function loop() {
  update();
  render();
  window.requestAnimationFrame(loop);
};

function start() {
  if (mode === "display") loop()
  else if (mode === "nodisplay") {
    while (fishes.length && sharks.length) {
      update()
      populationChart.data.labels.push('')
      populationChart.data.datasets[0].data.push(sharks.length)
      populationChart.data.datasets[1].data.push(fishes.length)
    }
    populationChart.update()
  }
}

start();