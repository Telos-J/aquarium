const mode = "display";
const bg = new Image();
bg.src = 'assets/aquarium-background.png';
const mapStart = 300;
const mapWidth = 920;
const sealevel = 217;

// const controlShark = new Shark(
//   Math.random() * canvas.width,
//   Math.random() * canvas.height
// );
// controlShark.buildShark()

let numFishes = 1;
let numSharks = 0;
let fishes = [];
let sharks = [];

for (let i = 0; i < numFishes; i++) {
  const fish = new SchoolingFish();
  fishes.push(fish);
}

for (let i = 0; i < numSharks; i++) {
  const shark = new Shark();
  shark.buildShark()
  sharks.push(shark);
}

const KFish = 50;
const rFish = 0.001;
const KShark = 10;
const rShark = 0.0005;

function update() {
  numFishes = numFishes + rFish * numFishes * (1 - numFishes / KFish);
  numSharks = numSharks + rShark * numSharks * (1 - numSharks / KShark);

  for (let i = 0; i < Math.floor(numFishes - fishes.length); i++) {
    const fish = new SchoolingFish(
      Math.random() * canvas.width,
      Math.random() * canvas.height
    );
    fishes.push(fish);
  }

  for (let i = 0; i < Math.floor(numSharks - sharks.length); i++) {
    const shark = new Shark(
      Math.random() * canvas.width,
      Math.random() * canvas.height
    );
    shark.buildShark();
    sharks.push(shark);
  }
  
  for (let fish of fishes) {
    fish.avoidance.set(0, 0);
    fish.alignment.set(0, 0);
    fish.cohesion.set(0, 0);

    let counter = 0;
    let headAverage = fish.head;
    let positionAverage = fish.position;
    
    fish.avoidWall();
    fish.avoidSurface();
    
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
  
  const tempSharks = sharks;
  
  for (const shark of tempSharks) {
    shark.avoidWall()
    shark.move()
    shark.chase(fishes)
    fishes = shark.eat(fishes)
    sharks = sharks.filter((shark) => !shark.starve())
  }
  
  const numFishDiff = numFishes - fishes.length;
  if (numFishDiff > 1) numFishes = numFishes - numFishDiff;
  const numSharkDiff = numSharks - sharks.length;
  if (numSharkDiff > 1) numSharks = numSharks - numSharkDiff;
};

function render() {
  const width = mapWidth;
  const height = mapWidth / canvas.width * canvas.height;
  context.drawImage(bg, 0, mapStart, width, height, 0, 0, canvas.width, canvas.height)
  drawNeighborhood(fishes[0]);
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
  SchoolingFish.buildFish()

  if (mode === "display") loop()
  else if (mode === "nodisplay") {
    while (fishes.length && sharks.length && populationChart.data.datasets[0].data.length < 10000) {
      update()
      populationChart.data.labels.push('')
      populationChart.data.datasets[0].data.push(sharks.length)
      populationChart.data.datasets[1].data.push(fishes.length)
    }
    populationChart.update()
  }
}

start();