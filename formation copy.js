window.addEventListener("load", function (event) {
  canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");

  canvas.width = innerWidth;
  canvas.height = innerHeight;

  window.addEventListener("resize", function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  });

  const fish = {
    size: 100,
    head: Math.PI,
    x: 400,
    y: 400,
    move() {
      this.x += 5 * Math.cos(this.head);
      this.y += 5 * Math.sin(this.head);
      if (this.x < -50 / 2) this.x = canvas.width + 50;
    },
  };

  const fish1 = {
    size: 50,
    head: Math.PI,
    x: 400,
    y: 400,
    move() {
      this.x += 5 * Math.cos(this.head);
      this.y += 5 * Math.sin(this.head);
      if (this.x < -this.size / 2) this.x = canvas.width + this.size;
    },
  };

  const fish2 = {
    size: 50,
    head: Math.PI,
    x: 500,
    y: 400,
    move() {
      this.x += 5 * Math.cos(this.head);
      this.y += 5 * Math.sin(this.head);
      if (this.x < -this.size / 2) this.x = canvas.width + this.size;
    },
  };

  const fish3 = {
    size: 50,
    head: Math.PI,
    x: 550,
    y: 400,
    move() {
      this.x += 5 * Math.cos(this.head);
      this.y += 5 * Math.sin(this.head);
      if (this.x < -this.size / 2) this.x = canvas.width + this.size;
    },
  };

  const fish4 = {
    size: 50,
    head: Math.PI,
    x: 400,
    y: 450,
    move() {
      this.x += 5 * Math.cos(this.head);
      this.y += 5 * Math.sin(this.head);
      if (this.x < -this.size / 2) this.x = canvas.width + this.size;
    },
  };

  const fish5 = {
    size: 50,
    head: Math.PI,
    x: 500,
    y: 400,
    move() {
      this.x += 5 * Math.cos(this.head);
      this.y += 5 * Math.sin(this.head);
      if (this.x < -this.size / 2) this.x = canvas.width + this.size;
    },
  };

  const fish6 = {
    size: 50,
    head: Math.PI,
    x: 500,
    y: 450,
    move() {
      this.x += 5 * Math.cos(this.head);
      this.y += 5 * Math.sin(this.head);
      if (this.x < -this.size / 2) this.x = canvas.width + this.size;
    },
  };

  const fish7 = {
    size: 50,
    head: Math.PI,
    x: 550,
    y: 450,
    move() {
      this.x += 5 * Math.cos(this.head);
      this.y += 5 * Math.sin(this.head);
      if (this.x < -this.size / 2) this.x = canvas.width + this.size;
    },
  };

  const fish9 = {
    size: 90,
    head: Math.PI,
    x: 610,
    y: 400,
    move() {
      this.x += 5 * Math.cos(this.head);
      this.y += 5 * Math.sin(this.head);
      if (this.x < -50 / 2) this.x = canvas.width + 50;
    },
  };
  const fish10 = {
    size: 50,
    head: Math.PI,
    x: 550,
    y: 350,
    move() {
      this.x += 5 * Math.cos(this.head);
      this.y += 5 * Math.sin(this.head);
      if (this.x < -this.size / 2) this.x = canvas.width + this.size;
    },
  };
  const fish11 = {
    size: 50,
    head: Math.PI,
    x: 500,
    y: 350,
    move() {
      this.x += 5 * Math.cos(this.head);
      this.y += 5 * Math.sin(this.head);
      if (this.x < -this.size / 2) this.x = canvas.width + this.size;
    },
  };

  const fish12 = {
    size: 50,
    head: Math.PI,
    x: 400,
    y: 350,
    move() {
      this.x += 5 * Math.cos(this.head);
      this.y += 5 * Math.sin(this.head);
      if (this.x < -this.size / 2) this.x = canvas.width + this.size;
    },
  };

  const fish14 = {
    size: 50,
    head: Math.PI,
    x: 450,
    y: 350,
    move() {
      this.x += 5 * Math.cos(this.head);
      this.y += 5 * Math.sin(this.head);
      if (this.x < -this.size / 2) this.x = canvas.width + this.size;
    },
  };

  const fish13 = {
    size: 50,
    head: Math.PI,
    x: 450,
    y: 400,
    move() {
      this.x += 5 * Math.cos(this.head);
      this.y += 5 * Math.sin(this.head);
      if (this.x < -this.size / 2) this.x = canvas.width + this.size;
    },
  };

  const fish15 = {
    size: 50,
    head: Math.PI,
    x: 450,
    y: 450,
    move() {
      this.x += 5 * Math.cos(this.head);
      this.y += 5 * Math.sin(this.head);
      if (this.x < -this.size / 2) this.x = canvas.width + this.size;
    },
  };

  const drawFish = function (x, y, size, head, color) {
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

  const update = function () {
    fish.move();
    fish1.move();
    fish2.move();
    fish3.move();
    fish4.move();
    fish5.move();
    fish6.move();
    fish7.move();

    fish9.move();
    fish10.move();
    fish11.move();
    fish12.move();
    fish13.move();
    fish14.move();
    fish15.move();
  };

  const render = function () {
    context.fillStyle = "blue";
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawFish(fish.x, fish.y, fish.size, fish.head, "white");
    drawFish(fish1.x, fish1.y, fish1.size, fish1.head, "black");
    drawFish(fish2.x, fish2.y, fish2.size, fish2.head, "gray");
    drawFish(fish3.x, fish3.y, fish3.size, fish3.head, "gray");
    drawFish(fish4.x, fish4.y, fish4.size, fish4.head, "white");
    drawFish(fish5.x, fish5.y, fish5.size, fish5.head, "gray");
    drawFish(fish6.x, fish6.y, fish6.size, fish6.head, "white");
    drawFish(fish7.x, fish7.y, fish7.size, fish7.head, "white");
    drawFish(fish9.x, fish9.y, fish9.size, fish9.head, "white");
    drawFish(fish10.x, fish10.y, fish10.size, fish10.head, "white");
    drawFish(fish11.x, fish11.y, fish11.size, fish11.head, "white");
    drawFish(fish12.x, fish12.y, fish12.size, fish12.head, "white");
    drawFish(fish13.x, fish13.y, fish13.size, fish13.head, "gray");
    drawFish(fish14.x, fish14.y, fish14.size, fish14.head, "white");
    drawFish(fish15.x, fish15.y, fish15.size, fish15.head, "white");
  };

  const start = function () {
    update();
    render();
    window.requestAnimationFrame(start);
  };

  start();
});
