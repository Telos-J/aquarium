const controlFish = new Fish(
  Math.random() * canvas.width,
  Math.random() * canvas.height
);
controlFish.buildFish();
controlFish.pieces.forEach((piece) => {
  piece.color = "yellow";
});

const numFishes = 10;
const fishes = [controlFish];

for (i = 0; i < numFishes; i++) {
  const fish = new Fish(
    Math.random() * canvas.width,
    Math.random() * canvas.height
  );
  fish.buildFish();
  fishes.push(fish);
}

const update = function () {
  fishes.forEach((fish) => {
    fish.move();
  });

  for (fish of fishes) {
    fish.avoidance.set(0, 0);
    for (otherFish of fishes) {
      let fishAverage = otherFish.head / (numFishes + 1);

      if (fish.inNeighborhood(otherFish)) {
        // avoidance, allignment, cohesion
        // fish.avoidance = fish.avoidance.add(
        //   fish.position.sub(otherFish.position)
        // );
        fish.alignment = angleToVector(fishAverage);
      }
    }
    // fish.avoidance = fish.avoidance.normalize(0.3);
  }
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
      context.moveTo(controlFish.position.x, controlFish.position.y);
      context.lineTo(fish.position.x, fish.position.y);
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
