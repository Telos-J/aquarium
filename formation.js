const controlFish = new Fish(
    Math.random() * canvas.width,
    Math.random() * canvas.height
);
controlFish.buildFish();
controlFish.pieces.forEach((piece) => {
    piece.color = 'yellow';
});

const numFishes = 10;
const fishes = [];

for (i = 0; i < numFishes; i++) {
    const fish = new Fish(
        Math.random() * canvas.width,
        Math.random() * canvas.height
    );
    fish.buildFish();
    fishes.push(fish);
}

const update = function () {
    controlFish.move();
    fishes.forEach((fish) => {
        fish.move();
    });

    controlFish.avoidance.set(0, 0);
    for (fish of fishes) {
        if (controlFish.inNeighborhood(fish)) {
            // avoidance, allignment, cohesion
            controlFish.avoidance = controlFish.avoidance.add(
                controlFish.position.sub(fish.position)
            );
        }
    }
    controlFish.avoidance = controlFish.avoidance.normalize(0.3);
};

const render = function () {
    context.fillStyle = 'blue';
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawNeighborhood(controlFish);
    drawFish(controlFish);
    fishes.forEach((fish) => {
        drawFish(fish);
    });

    for (fish of fishes) {
        if (controlFish.inNeighborhood(fish)) {
            context.strokeStyle = 'black';
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
