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

    draw = true;
    erase = false;
    fill = false;
})

eraser.addEventListener('click', () => {
    eraser.children[0].children[0].children[0].setAttribute('stroke', '#000000')
    brush.children[0].children[0].children[0].setAttribute('stroke', '#9e9e9e')
    paint.children[0].setAttribute('stroke', '#9e9e9e')

    
    draw = false;
    erase = true;
    fill = false;
})
paint.addEventListener('click', () => {
    eraser.children[0].children[0].children[0].setAttribute('stroke', '#9e9e9e')
    brush.children[0].children[0].children[0].setAttribute('stroke', '#9e9e9e')
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

// brush Color
function rgbToHex(rgb) {
    const rgbValues = rgb.match(/\d+/g);
    return `#${rgbValues.map(x => parseInt(x).toString(16).padStart(2, '0')).join('')}`;
}

let color = '#000000';
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

canvas.addEventListener('touchstart', event => {
    isDrawing = true
    x = event.offsetX;
    y = event.offsetY;
})

canvas.addEventListener('touchend', () => {
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
    }
}
canvas.addEventListener('click',  event => {
    if(fill){
        const x = event.offsetX;
        const y = event.offsetY
        const fillColor = hexToRgb(color);
        const ImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const targetColor = getPixelColor(x, y, ImageData)        
        floodfill(x, y, targetColor, fillColor, ImageData)
    }
})

function hexToRgb(hex) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b, a: 255 };
}

const getPixelColor = (x, y, ImageData) => {
    const index = (y * ImageData.width + x) * 4

    const r = ImageData.data[index]
    const g = ImageData.data[index + 1]
    const b = ImageData.data[index + 2]
    const a = ImageData.data[index + 3]
    return {r, g, b, a}
}

const setPixelColor = (x, y, ImageData, fillColor) => {
    if(!fillColor){
        console.log('Your color is not defined');
        return   
    }

    const index = (y * ImageData.width + x) * 4
    ImageData.data[index + 0] = fillColor.r;
    ImageData.data[index + 1] = fillColor.g;
    ImageData.data[index + 2] = fillColor.b;
    ImageData.data[index + 3] = fillColor.a;
}

const colorMatch = (cc, tc) => {
    return cc.r === tc.r && cc.g === tc.g && cc.b === tc.b && cc.a === tc.a    
}

const floodfill = (x, y, targetColor, fillColor, ImageData) => {
    const stack = [{x, y}];
    const visited = new Set();

    while(stack.length){
        const {x, y} = stack.pop();
        const index = (y * ImageData.width + x) * 4;

        if(visited.has(index)) continue;
        visited.add(index);

        const currentColor = {
            r : ImageData.data[index],
            g : ImageData.data[index + 1],
            b : ImageData.data[index + 2],
            a : ImageData.data[index + 3],
        }

        if(!colorMatch(currentColor, targetColor)) continue;

        setPixelColor(x, y, ImageData, fillColor);

        stack.push({x: x - 1, y})
        stack.push({x: x + 1, y})
        stack.push({x, y: y - 1})
        stack.push({x, y: y + 1})
    }

    ctx.putImageData(ImageData, 0, 0)
}
canvas.addEventListener('mousemove', init)
canvas.addEventListener('touchmove', init)

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
