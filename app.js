/* Genetic Algorithms 
 *
 * Genetic Algorithms (GA) are modeled on evolutionary processes of 
 * Natural Selection. We apply GA to roblems where brute force computation 
 * would be extraordinarily expensive. GA is therefore addresses optimization 
 * problems. 
 * 
 * It is a generational algorithm that processes populations of datum to
 * generate new populations according "fitness". Variety of parameters, whether
 * through the initial population or through mutation, allows for
 * evolution to occur with consideration over the entire parameter space.  
 *
*/

const canvas = document.getElementById("mainCanvas");
const ctx = mainCanvas.getContext('2d', {alpha: false});

let w = window.innerWidth;
let h = window.innerHeight;

//population area
let borderX = 50;
let borderYtop = 50;
let borderYbottom = 150;
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

let boardStrings = [];
/* UTILITY CODE */

/* use to update global w and h and reset canvas width/height */ 
function updateCanvasSize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
}
updateCanvasSize();

function randInclusive(a,b){
    Math.floor(Math.random() * (b - a + 1)) + a;
}

/* ARTBOARD CODE */

function drawBoards() {

    ctx.save();
    ctx.translate(borderX, borderYtop);
    let startX = artborderX;
    let startY = artborderY;
    let curBoard = 0;

    for(let i=0; i<artPopSize; i++){
        // console.log(i);
        // console.log(curBoard);
        // console.log(" ")

        //draws basic rects for testing
        //ctx.fillStyle = 'purple';
        //ctx.fillRect(startX, startY, artW, artH);
        //drawing each board function

        //drawing boards from function
        //ctx.translate(startX, startY);
        basicBoard(startX, startY, artW, artH);

        //starting x and y
        if(curBoard==2) {
            startX = artborderX;
            startY += artborderY + artH
        } else {
            startX += artborderX + artW;
        }

        curBoard+=1;
    }

    ctx.restore();
}

//basic function to draw a board
function basicBoard(x,y,bw,bh){
    ctx.save()
    
    let colors = ["red", "yellow", "white"];
    //ctx.fillRect(x,y,bw,bh);
    //ctx.clip();

    /*
    //GRADIENT CODE
    let gradient=ctx.createLinearGradient(x,y,bw,bh);
    let stop = 0;
    for(let j=0; j < colors.length; j++) {
        gradient.addColorStop(stop,colors[j]);
        stop+=.5;
    }
    // use gradient
    ctx.fillStyle=gradient;
    ctx.fillRect(x,y,bw,bh);
    */

    //DOTS CODE

    //GRID CODE
    //ctx.translate(x, y);
    
    //let gx = x;
    let gsize = 5;
    let gpad = 10;

    while(x < x+bw) {
        let gy = y;
        while (gy < gy+bh) {
            let index = randInclusive(0, colors.length-1);
            ctx.fillStyle = colors[1];
            ctx.fillRect(x + 5 - gsize/2, gy + 5 - gsize/2, gsize, gsize);
            gy += gpad;
        }
        x += gpad;
    }
   

    //ctx.restore();
}

//parameterized function to draw a board
function paramBoard(x,y,bw,bh,chromosome){

}

/* GENETIC ALGORITHM CODE */

let population;

// create our initial population
function initializeGA() {
}

// our fitness function
function evalFitness(item) {
} 

// perform selection process of population 
// and returns a mating pool 
function processSelection(population, fitnessFunction) {

}

function processReproduction(matingPool) {

}

// perform reproduction from mating pool to create next generation 
// (population)
function processGA(population) {
     
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

    drawBoards();

    basicBoard(10,10, 100, 100);
}

//requestAnimationFrame(draw);
draw();

// Use event listener for resize to update canvas size when necessary
window.addEventListener('resize', () => {
    updateCanvasSize();
    // only need this here for static images. can remove if doing animation with requestAnimationFrame().
    draw();
});
