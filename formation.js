const controlFish = new Fish(
    Math.random() * canvas.width,
    Math.random() * canvas.height
);
controlFish.buildFish();
controlFish.pieces.forEach((piece) => {
    piece.color = 'yellow';
});

const numFishes = 50;
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
        fish.alignment.set(0, 0);
        fish.cohesion.set(0, 0);
        let counter = 0;
        let headAverage = fish.head;
        let positionAverage = fish.position;
        for (otherFish of fishes) {
            if (fish.inNeighborhood(otherFish)) {
                fish.avoidance = fish.avoidance.add(
                    fish.position.sub(otherFish.position)
                );
                headAverage =
                    (counter * headAverage + otherFish.head) / (counter + 1);
                positionAverage = positionAverage
                    .scale(counter)
                    .add(otherFish.position)
                    .scale(1 / (counter + 1));
            }
        }
        fish.avoidance = fish.avoidance.normalize(0.06);
        fish.alignment = angleToVector(headAverage).normalize(0.07);
        fish.cohesion = positionAverage.sub(fish.position).normalize(0.06);
        // fish.avoidance = fish.avoidance.normalize(0.06);
        // fish.alignment = angleToVector(headAverage).normalize(0.07);
        // fish.cohesion = positionAverage.sub(fish.position).normalize(0.05);
    }
};

const render = function () {
    context.fillStyle = 'blue';
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawNeighborhood(controlFish);
    drawFish(controlFish);
    fishes.forEach((fish) => {
        drawFish(fish);
    });
};

const start = function () {
    update();
    render();
    window.requestAnimationFrame(start);
};

start();
