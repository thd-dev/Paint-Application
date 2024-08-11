const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const brush = document.querySelector('#brush')
const eraser = document.querySelector('#eraser')
const paint = document.querySelector('#paint') 
const colorGrid = document.querySelector('#colorGrid')

const brushOption = document.querySelector('#brushOption')
const eraserOption = document.querySelector('#eraserOption')
const brushSize = document.querySelector('#brushSize')
const eraserSize = document.querySelector('#eraserSize')



// Brush, Eraser and paint clicked: 

let draw = false;
let erase = false;
let fill = false;

brush.addEventListener('click', () => {
    brush.children[0].children[0].setAttribute('stroke', '#000000')
    eraser.children[0].children[0].setAttribute('stroke', '#9e9e9e')
    paint.children[0].setAttribute('stroke', '#9e9e9e')

    draw = true;
    erase = false;
    fill = false;
})

eraser.addEventListener('click', () => {
    eraser.children[0].children[0].setAttribute('stroke', '#000000')
    brush.children[0].children[0].setAttribute('stroke', '#9e9e9e')
    paint.children[0].setAttribute('stroke', '#9e9e9e')

    draw = false;
    erase = true;
    fill = false;
})
paint.addEventListener('click', () => {
    eraser.children[0].children[0].setAttribute('stroke', '#9e9e9e')
    brush.children[0].children[0].setAttribute('stroke', '#9e9e9e')
    paint.children[0].setAttribute('stroke', '#000000')
    
    draw = false;
    erase = false;
    fill = true;
})


// Size actions
brush.addEventListener('mouseenter', () => {
    brushOption.classList.remove('hidden');
})
brush.addEventListener('mouseleave', () =>{
    brushOption.classList.add('hidden');
    brushSize.classList.remove('hidden')
    brushSize.classList.add('hidden')
})

brushOption.addEventListener('click', () => {
    brushSize.classList.toggle('hidden')
})

eraser.addEventListener('mouseenter', () => {
    eraserOption.classList.remove('hidden')
})
eraser.addEventListener('mouseleave', () => {
    eraserOption.classList.add('hidden')
    eraserSize.classList.remove('hidden')
    eraserSize.classList.add('hidden')
})

eraserOption.addEventListener('click', () => {
    eraserSize.classList.toggle('hidden')
}, true)



// console.log(colorGrid.children.length);
// for(i = 0 ; i < colorGrid.children.length; i++){
//     if(colorGrid.children[i].classList.contains('hidden')) continue
//     console.log(window.getComputedStyle(colorGrid.children[i]).backgroundColor);
    
// }

// brush Color
function rgbToHex(rgb) {
    const rgbValues = rgb.match(/\d+/g);
    return `#${rgbValues.map(x => parseInt(x).toString(16).padStart(2, '0')).join('')}`;
}

let color;
colorGrid.addEventListener('click',event => {
    let hexCode = rgbToHex(window.getComputedStyle(event.target).backgroundColor);
    colorGrid.children[colorGrid.children.length - 1].value = hexCode;
    color = hexCode;
})

colorGrid.children[colorGrid.children.length - 1].addEventListener('change', event => {
    color = event.target.value;
})


// Brush and Eraser Size
let brushSizeValue = 30;
let eraserSizValue = 2;

brushSize.addEventListener('change', event => {
    // console.log(event.target.value);
    brushSizeValue = event.target.value;
})
eraserSize.addEventListener('change', event => {
    console.log(event.target.value);
    eraserSizValue = event.target.value;
})


const mouse = {
    x: undefined,
    y: undefined,
}

canvas.addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

// const color = [
//     "#FF0000", // Red
//     "#00FF00", // Green
//     "#0000FF", // Blue
//     "#FFFF00", // Yellow
//     "#FF00FF", // Magenta
//     "#00FFFF", // Cyan
//     "#000000", // Black
//     "#FFFFFF", // White
//     "#808080", // Gray
//     "#FFA500"  // Orange
// ]

class MyObject {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = brushSizeValue;
        this.color = 'black';
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
    ball1 = new MyObject(200, 200)
    // console.log(ball1);
    
}

const animate = () => {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ball1.color = color;
    ball1.radius = brushSizeValue;
    ball1.update();
}


window.addEventListener('resize', setUp)
setUp();
animate();



// save to local space


// download