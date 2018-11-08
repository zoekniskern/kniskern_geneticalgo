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

/* UTILITY CODE */

/* use to update global w and h and reset canvas width/height */ 
function updateCanvasSize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
}
updateCanvasSize();

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
    
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,w,h);

    ctx.strokeStyle = 'white';
    ctx.strokeSize = 2;
    ctx.strokeRect(w - 60, h - 60, 50, 50);

    // Use this "temporal recursion" call to do animation
    //requestAnimationFrame(draw);

}

//requestAnimationFrame(draw);
draw();

// Use event listener for resize to update canvas size when necessary
window.addEventListener('resize', () => {
    updateCanvasSize();
    // only need this here for static images. can remove if doing animation with requestAnimationFrame().
    draw();
});
