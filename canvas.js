canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});
