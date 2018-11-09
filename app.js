/* Genetic Algorithms 
 *
 * Applied to generative modern art
 * by Zoe Kniskern
 *
*/

const canvas = document.getElementById("mainCanvas");
const ctx = mainCanvas.getContext('2d', {alpha: false});

let w = window.innerWidth;
let h = window.innerHeight - 150;

//population area
let borderX = 50;
let borderYtop = 50;
let borderYbottom = 50;
let drawAreaW = w - (borderX * 2);
let drawAreaH = h - (borderYtop + borderYbottom);

//artboard sizes
let artborderX = 5;
let artborderY = 5;
let artPopRow = 2;
let artPopColumn = 3;
let artPopSize = artPopRow * artPopColumn;
let artW = (drawAreaW - (artPopColumn*artborderX) - artborderX) / artPopColumn;
let artH = (drawAreaH - (artPopRow*artborderY) - artborderY) / artPopRow;

let boards = [];
let boardsTemp = [];
let artStyle = [1,2,3];
let paletteSize = 3;
let boardPalatte = [];
let colors = ["CadetBlue ", "DarkCyan", "LightSteelBlue", "MediumTurquoise", "Aqua", "Aquamarine", "CornflowerBlue", "DarkOliveGreen", "DarkSlateGrey", "LightSeaGreen", "Teal"];

//making the next generation
let total = 0; //total fitness
let button = document.getElementById("nextGen");
button.onclick = function(){
    processGA(boards);
}

/* UTILITY CODE */

/* use to update global w and h and reset canvas width/height */ 
function updateCanvasSize() {
      w = window.innerWidth;
      h = window.innerHeight - 150;
      canvas.width = w;
      canvas.height = h;
}
updateCanvasSize();

//returns a number between two points (inclusive)
function randInclusive(a,b){
    let rand = Math.floor(Math.random() * (b - a + 1)) + a;

    return rand;
}

function randInt(max) {
    return Math.floor(Math.random() * max);
}

//check to see if a point is inside a rectangle
function intersects(point, rect){
    return rect.left <= point.x && point.x <= rect.right &&
            rect.top <= point.y && point.y <= rect.bottom;
}

//check all rectangles
function checkSquares(point){
    boards.forEach((board,i) => {

        if(intersects(point, board)){
            //console.log("point object: " + board);
            //console.log("index: " + i);

            ctx.save();
            ctx.translate(board.left + borderX, board.top + borderYtop);
            ctx.fillStyle = 'white';
            ctx.strokeRect(0, 0, board.wid, board.hei);
            board.fitness ++;
            //console.log("fitness increased");
            ctx.restore();
        }
    })
}

class Board {
    constructor(sX,sY,aW,aH){
        this.left = sX;
        this.top = sY;
        this.right = sX + aW;
        this.bottom = sY + aH;
        this.wid = aW;
        this.hei = aH;
        this.string = createString();
        this.fitness = 0;
    }
}

/* ARTBOARD CODE */

function initBoards() {
    ctx.save();
    ctx.translate(borderX, borderYtop);
    let startX = artborderX;
    let startY = artborderY;
    let curBoard = 0; 

    for(let i=0; i<artPopSize; i++){
        //draws basic rects for testing
        //ctx.fillStyle = 'purple';
        //ctx.fillRect(startX, startY, artW, artH);
        //drawing each board function

        //drawing boards from function
        ctx.save();
        ctx.translate(startX, startY);
        //gradientBoard(artborderX/2, artborderY/2, artW, artH);

        board = new Board(startX, startY, artW, artH);
        // var board = {
        //     left: startX,
        //     top: startY,
        //     right: startX + artW,
        //     bottom: startY + artH,
        //     wid: artW,
        //     hei: artH,
        //     string: createString(),
        //     fitness: 0 
        // };

        paramBoard(artborderX/2, artborderY/2, artW, artH, board.string);

        boards.push(board);
        // console.log("boards: ")
        //console.log(boards);

        //starting x and y
        if(curBoard==2) {
            startX = artborderX;
            startY += artborderY + artH
        } else {
            startX += artborderX + artW;
        }

        curBoard+=1;
        ctx.restore();
    }

    ctx.restore();
}

function drawBoards(){
    ctx.save();
    ctx.translate(borderX, borderYtop);
    let startX = artborderX;
    let startY = artborderY;
    let curBoard = 0; 

    for(let i=0; i<artPopSize; i++){
        ctx.save();
        ctx.translate(startX, startY);

        paramBoard(artborderX/2, artborderY/2, artW, artH, boards[i].string);


        //starting x and y
        if(curBoard==2) {
            startX = artborderX;
            startY += artborderY + artH
        } else {
            startX += artborderX + artW;
        }

        curBoard+=1;
        ctx.restore();
    }

    ctx.restore();
}

//function to draw a grid artboard
function gridBoard(x,y,bw,bh){
    ctx.save();

    //GRID CODE
    ctx.translate(x, y);
    
    //let gx = x;
    let gsize = 5;
    let gpad = 10;

    while(x < bw - gpad) {
        let gy = y;
        while (gy < bh - gpad) {
            index = randInclusive(0, boardPalatte.length-1);
            ctx.fillStyle = boardPalatte[index];
            ctx.fillRect(x + 5 - gsize/2, gy + 5 - gsize/2, gsize, gsize);
            gy += gpad;
        }
        x += gpad;
    }

    ctx.restore();
}

//function to draw dots board
function dotsBoard(x,y,bw,bh,g){
    ctx.save();
    ctx.translate(x, y);

    ctx.fillStyle = boardPalatte[randInclusive(0, boardPalatte.length-1)];
    ctx.fillRect(0,0,bw - artborderX,bh - artborderY);

    let circX, circY, circInd;

    let dotsNum = g*10;

    ctx.beginPath();
    for(let k=0; k < dotsNum; k++){
        //randomize position
        
        circX = randInclusive(30, bw - 30);
        circY = randInclusive(30, bh - 30);
        //randomize color
        circInd = randInclusive(0, boardPalatte.length-1);
        ctx.fillStyle = boardPalatte[circInd];
        //ctx.beginPath();
        ctx.arc(circX,circY,20,0,2*Math.PI);
        ctx.fill();
    }

    ctx.clip();

    ctx.restore();
}

//function to draw gradient board
function gradientBoard(x,y,bw,bh){
    ctx.save();

    //GRADIENT CODE
    let gradient=ctx.createLinearGradient(x,y,bw,bh);
    let stop = 0;
    for(let j=0; j < boardPalatte.length; j++) {
        gradient.addColorStop(stop,boardPalatte[j]);
        stop+=1/boardPalatte.length;
    }
    // use gradient
    ctx.fillStyle=gradient;
    ctx.fillRect(x,y,bw - artborderX,bh - artborderY);

    ctx.restore();
}

//parameterized function to draw a board
function paramBoard(x,y,bw,bh,chromosome){

    //choose colors
    let cInd;
    let color;
    boardPalatte = [];
    for(let m=0; m<paletteSize; m++){
        cInd = chromosome.charAt(m + 1);
        color = colors[cInd];
        // console.log("index: " + cInd);
        // console.log("color: " + color);
        boardPalatte.push(color);
    }
    // console.log("boardPalatte");
    // console.log(boardPalatte);

    //choose graph type
    let graph = chromosome.charAt(0);
    if(graph > artStyle.length){
        graph = artStyle[randInclusive(0, artStyle.length-1)];
    }
    console.log("graph type: " + graph);
    switch(graph) {
        case "1":
            //gradient
            gradientBoard(x,y,bw,bh);
            //console.log("Draw a gradient board");
            break;
        case "2":
            //grid
            gridBoard(x,y,bw,bh);
            //console.log("Draw a grid board");
            break;
        case "3":
            //dots
            dotsBoard(x,y,bw,bh,graph);
            //console.log("Draw a dot board");
            break;
        default:
            //faking a problem that sometimes occurs
            ctx.fillStyle = colors[randInclusive(0, colors.length-1)];
            ctx.fillRect(x,y,bw - artborderX,bh - artborderY);
            //console.log("default ran");
            break;
    }
}

/* GENETIC ALGORITHM CODE */

let population;

//function create and return art string
function createString(){
    let as = artStyle[randInclusive(0, artStyle.length-1)];

    let color1 = randInclusive(0, colors.length-1);
    let color2 = randInclusive(0, colors.length-1);
    let color3 = randInclusive(0, colors.length-1);

    let newArt = [as, color1, color2, color3];

    let artString = newArt.join('');

    return artString;
}

// our fitness function
//calculate total fitness
function totalFitness() {

    total = 0;
    boards.forEach((board) => {
        total += board.fitness;
    })
}

function evalFitness(item) {
    return item.fitness / total;
} 

// perform selection process of population 
// and returns a mating pool 
function processSelection(population) {

    totalFitness();
    //console.log(total); 
    let matingPool = [];

    for(let n = 0; n < population.length; n++) {
        let fit = evalFitness(boards[n]);
        console.log(fit);
        if(fit > 0){
            matingPool.push(population[n]);
        }
        //matingPool = matingPool.concat(Array.from({length: Math.floor(fit * 100)}, () => population[n]));
    }

    // console.log("mating pool");
    // console.log(matingPool);
    return matingPool;
}

//graphs mating time
function processMate(mate1, mate2){
    //let offspring = new Board();
    let newchrom = "";
    for(let o=0; o<mate1.string.length; o++){
        newchrom += (Math.random() < .05) ? mate1.string.charAt(o) : mate2.string.charAt(o);
    }

    //offspring.string = newchrom;
    //return offspring;

    return newchrom;
}

function mutate(b) {
    let newchrom = "";
    for(let p=0;p<b.length;p++){
        //change to mutate
        newchrom += (Math.random() < 0.05) ? randInclusive(0, colors.length-1)
                                            : b.charAt(p);
    }

    b=newchrom;

    return b;
}

function processReproduction(matingPool, size) {
    let pop = [];

    for(let q=0; q < size; q++) {
        let m1 = matingPool[randInt(matingPool.length)];
        let m2 = matingPool[randInt(matingPool.length)];
        let newb = processMate(m1, m2);

        newb = mutate(newb);
        pop.push(newb);

    }

    return pop;
}

// perform reproduction from mating pool to create next generation 
// (population)
function processGA(population) {
     let matingPool = processSelection(population);
     boardsTemp = processReproduction(matingPool, population.length);

     //console.log(boardsTemp);

     for(let g=0;g<artPopSize;g++){
         boards[g].string = boardsTemp[g];
         boards[g].fitness = 0;
     }

    ctx.fillStyle = 'gray';
    ctx.fillRect(borderX, borderYtop, drawAreaW, drawAreaH);
    ctx.strokeRect(borderX, borderYtop, drawAreaW, drawAreaH);
     drawBoards();
}


/* MAIN DRAWING CODE */

function draw(t) {
    
    ctx.fillStyle = 'gray';
    ctx.fillRect(0,0,w,h);

    ctx.strokeStyle = 'white';
    ctx.strokeSize = 2;
    ctx.strokeRect(borderX, borderYtop, drawAreaW, drawAreaH);

    // Use this "temporal recursion" call to do animation
    //requestAnimationFrame(draw);

    initBoards();
}

//requestAnimationFrame(draw);
draw();

// Use event listener for resize to update canvas size when necessary
window.addEventListener('resize', () => {
    updateCanvasSize();
    // only need this here for static images. can remove if doing animation with requestAnimationFrame().
    draw();
});

canvas.addEventListener('click', (e) => {
    let mouse = {
        x: e.clientX - canvas.offsetTop,
        y: e.clientY - canvas.offsetLeft
    };
    //console.log("mouse coordinates: " + mouse);

    checkSquares(mouse);
})