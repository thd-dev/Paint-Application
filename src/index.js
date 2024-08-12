const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const brush = document.querySelector('#brush')
const eraser = document.querySelector('#eraser')
const paint = document.querySelector('#paint') 
const colorGrid = document.querySelector('#colorGrid')

const download = document.querySelector('#download')
const clear = document.querySelector('#clear');
const save = document.querySelector('#save')

const brushOption = document.querySelector('#brushOption')
const eraserOption = document.querySelector('#eraserOption')
const brushSize = document.querySelector('#brushSize')
const eraserSize = document.querySelector('#eraserSize')

// canvas Color
canvas.style.backgroundColor = '#ffffff'

// Brush, Eraser and paint clicked: 

let draw = true;
let erase = false;
let fill = false;

brush.addEventListener('click', () => {
    brush.children[0].children[0].children[0].setAttribute('stroke', '#000000')
    eraser.children[0].children[0].children[0].setAttribute('stroke', '#9e9e9e')
    paint.children[0].setAttribute('stroke', '#9e9e9e')
    console.log(brush.children[0].children[0]);

    draw = true;
    erase = false;
    fill = false;
})

eraser.addEventListener('click', () => {
    eraser.children[0].children[0].children[0].setAttribute('stroke', '#000000')
    brush.children[0].children[0].children[0].setAttribute('stroke', '#9e9e9e')
    paint.children[0].setAttribute('stroke', '#9e9e9e')

    console.log(eraser.children[0].children[0]);
    
    draw = false;
    erase = true;
    fill = false;
})
paint.addEventListener('click', () => {
    eraser.children[0].children[0].children[0].setAttribute('stroke', '#9e9e9e')
    brush.children[0].children[0].children[0].setAttribute('stroke', '#9e9e9e')
    paint.children[0].setAttribute('stroke', '#000000')
    console.log(eraser.children[0]);
    
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

// brush Color
function rgbToHex(rgb) {
    const rgbValues = rgb.match(/\d+/g);
    return `#${rgbValues.map(x => parseInt(x).toString(16).padStart(2, '0')).join('')}`;
}

let color;
colorGrid.addEventListener('click',event => {
    let hexCode = rgbToHex(window.getComputedStyle(event.target).backgroundColor);    
    colorGrid.children[colorGrid.children.length - 1].value = hexCode;
    color = colorGrid.children[colorGrid.children.length - 1].value;
})

colorGrid.children[colorGrid.children.length - 1].addEventListener('change', event => {
    console.log('color changed');
    color = event.target.value;
})


// Brush and Eraser Size
let brushSizeValue = 30;
let eraserSizValue = 2;

brushSize.addEventListener('change', event => {
    brushSizeValue = event.target.value;
})
eraserSize.addEventListener('change', event => {
    eraserSizValue = event.target.value;
})

// Canvas setup
let isDrawing = false;
let x = undefined;
let y = undefined;

canvas.addEventListener('mousedown', event => {
    isDrawing = true
    x = event.offsetX;
    y = event.offsetY;
})

canvas.addEventListener('mouseup', () => {
    isDrawing = false
})


const setUp = () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
}

const init = (event) => {
    if(!isDrawing) return

    if(draw){
        ctx.lineWidth = brushSizeValue;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(x, y, event.offsetX, event.offsetY);
        ctx.strokeStyle = color;
        ctx.stroke()

        x = event.offsetX;
        y = event.offsetY;

    }else if(erase){
        ctx.clearRect(event.offsetX, event.offsetY, eraserSizValue, eraserSizValue)
    }else if(fill){

    }

}




canvas.addEventListener('mousemove', init)

window.addEventListener('resize', setUp)
setUp();



// save to local space
save.addEventListener('click', () => {
    localStorage.setItem('saved file', canvas.toDataURL())
})


// download
download.addEventListener('click', () => {    
    download.setAttribute('href', canvas.toDataURL())
})

// clear the canvas
clear.addEventListener('click', () => {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})