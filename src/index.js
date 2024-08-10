const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const mouse = {
    x: undefined,
    y: undefined,
}

canvas.addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

const color = [
    "#FF0000", // Red
    "#00FF00", // Green
    "#0000FF", // Blue
    "#FFFF00", // Yellow
    "#FF00FF", // Magenta
    "#00FFFF", // Cyan
    "#000000", // Black
    "#FFFFFF", // White
    "#808080", // Gray
    "#FFA500"  // Orange
]

class MyObject {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color[Math.floor(Math.random() * color.length)];
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(){

        this.draw();
    }
}

const setUp = () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    init();
}

let ball1;
const init = () => {
    ball1 = new MyObject(200, 200, 30)
}

const animate = () => {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)


    ball1.update();
}


window.addEventListener('resize', setUp)
setUp();
animate();