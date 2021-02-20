const mode = "display";

// const controlShark = new Shark(
//   Math.random() * canvas.width,
//   Math.random() * canvas.height
// );
// controlShark.buildShark()

let numFishes = 0;
let numSharks = 0;
let fishes = [];
let sharks = [];

for (let i = 0; i < numFishes; i++) {
  const fish = new SchoolingFish(
    Math.random() * canvas.width,
    Math.random() * canvas.height
  );
  fish.buildFish()
  fishes.push(fish);
}

for (let i = 0; i < numSharks; i++) {
  const shark = new Shark(
    Math.random() * canvas.width,
    Math.random() * canvas.height
  );
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
    fish.buildFish();
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

/////////// temporary code
const fishImages = []
for (let i=0; i<20; i++) {
  const fishImage = new Image();
  const prefix = i < 10 ? '0' : '';
  fishImage.src = 'assets/fish/fish' + prefix + i + '.png'
  fishImages.push(fishImage)
}

let frameNum = 0;

function render() {
  context.fillStyle = "#6f92ee";
  context.fillRect(0, 0, canvas.width, canvas.height);
  // drawNeighborhood(controlShark);
  for (let fish of fishes) {
    drawFish(fish);
  }
  for (let shark of sharks) {
    drawFish(shark);
  
  }
  
  /////////// temporary code
  context.drawImage(fishImages[frameNum], 0, 0, 800, 599, canvas.width/2, canvas.height/2, 160, 120)
  frameNum++;
  if (frameNum > 19) frameNum = 0;
};

function loop() {
  update();
  render();
  window.requestAnimationFrame(loop);
};

function start() {
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