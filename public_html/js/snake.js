/* --------------------------------------------------------------------------
 * Variables
 * --------------------------------------------------------------------------
 */


var snake;
var snakeLength;
var snakeSize;
var snakeDirection;

var food;

var context;
var screenWidth;
var screenHeight;

var gameState;
var gameOverMenu;
var restartButton;
var playHud;
var scoreboard;

/* --------------------------------------------------------------------------
 * Executing Game Code
 * --------------------------------------------------------------------------
 */

gameInitialize();
snakeInitialize();
foodInitialize();
setInterval(gameLoop, 1000/30);

/* --------------------------------------------------------------------------
 * Game Functions
 * --------------------------------------------------------------------------
 */

function gameInitialize() {
    var canvas = document.getElementById("game-screen");
    context = canvas.getContext("2d");
    
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    
    canvas.width = screenWidth;
    canvas.height = screenHeight;
    
    document.addEventListener("keydown", keyboardHandler);
    
    gameOverMenu = document.getElementById("gameOver");
    centerMenuPosition(gameOverMenu);
    
    restartButton = document.getElementById(restartButton);
    restartButton.addEventListener("click", gameRestart);
    
    playHUD = document.getElementById("playHUD");
    scoreboard = document.getElementById("scoreboard");
    
    setState("PLAY");
}

function gameLoop() {
    gameDraw();
    if(gameState == "PLAY") {
    snakeUpdate();
    snakeDraw();
    foodDraw();
    }
}

function gameDraw() {
    context.fillStyle = "rgb(180, 250, 213)";
    context.fillRect(0, 0, screenWidth, screenHeight);
}

function gameRestart() {
    snakeInitialize();
    foodInitialize();
    hideMenu(gameOverMenu);
    setState("PLAY");
}
/* -------------------------------------------------------------------------
 * Snake Functions
 * -------------------------------------------------------------------------
 */

function snakeInitialize(){
    snake  = [];
    snakeLength = 1;
    snakeSize = 20;
    snakeDirection = "down";
    
    for(var index = snakeLength - 1; index>=0; index--) {
        snake.push ( {
        x: index,
        y: 0 
    });
    }
    }
       
function snakeDraw(){
    for(var index = 0; index< snake.length; index++) {
        context.fillStyle = "white";
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
}
}

function snakeUpdate() {
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;
    
   if(snakeDirection == "down") {
       snakeHeadY++;
   }
   
   else if(snakeDirection == "left"){
       snakeHeadX--;
   }
   
   else if(snakeDirection == "right") {
       snakeHeadX++;
    }
   
   else if(snakeDirection == "up") {
       snakeHeadY--;
   }
   
   checkFoodCollisions(snakeHeadX, snakeHeadY);
   checkWallCollisions(snakeHeadX, snakeHeadY);
   checkFoodCollisions(snakeHeadX, snakeHeadY);
   
    var snakeTail = snake.pop();
    snakeTail.x = snakeHeadX;
    snakeTail.y = snakeHeadY;
    snake.unshift(snakeTail);
   
}

/*--------------------------------------------------------------------------
 * Food Functions
 * -------------------------------------------------------------------------
 */

function foodInitialize() {
    food = {
        x: 0,
        y: 0
    };
    setFoodPosition();
}
function foodDraw() {
    context.fillStyle = "white";
    context.fillRect(food.x * snakeSize, food.y * snakeSize, snakeSize, snakeSize);
}

function setFoodPosition() {
    var randomX = Math.floor(Math.random() * screenWidth);
    var randomY = Math.floor(Math.random() * screenHeight);
    
    food.x = Math.floor(randomX / snakeSize);
    food.y = Math.floor(randomY / snakeSize);
}
/* -------------------------------------------------------------------------
 * Input Functions
 * -------------------------------------------------------------------------
 */
function keyboardHandler(event) {
    console.log(event, keyboardHandler);
    
    if(event.keycode == "39" && snakeDirection != "left") {
        snakeDirection = "right";
    }
    else if(event.keycode == "40" && snakeDirection != "up") {
        snakeDirection = "down";
    }
}

/* -------------------------------------------------------------------------
 * Collision Handling
 * -------------------------------------------------------------------------
 */

function checkFoodCollisions(snakeHeadX, snakeY) {
    if(snakeHeadX == food.x && snakeHeadY == food.y) {
        snake.push({
            x: 0,
            y: 0
        });
        snakeLength++;
    }
}

function checkWallCollisions(snakeHeadX, snakeHeadY) {
    if(snakeHeadX * snakeSize >= screenWidth || snakeHeadX < 0) {
        setState("GAME OVER");
    }
}

function checkSnakeCollisions(snakeHeadX, snakeHeadY) {
    for(var index = 1; index < snake.length; index++) {
        if(snakeHeadX == snake[index].x && snakeHeadY == snake[index].y) {
            setState("Game Over");
            return;
        }
    }
}
/* -------------------------------------------------------------------------
 * Game State Handling
 * -------------------------------------------------------------------------
 */

function setState(state) {
    gameState = state;
    showMenu(state);
}

/* ------------------------------------------------------------------------
 * Menu Functions
 * ------------------------------------------------------------------------
 */

function displayMenu(menu) {
    menu.style.visibility = "visible";
}

function hideMenu(menu){
    menu.style.visibility = "hidden";
}

function showMenu(state) {
    if(gameState == "GAME OVER") {
    displayMenu(GameOverMenu);
    }
    else if(set == "PLAY") {
        displayMenu(playHUD);
    }
}

function centerMenuPosition(menu) {
    menu.style.top = (screenHeight / 2) - (menu.offsetHeight / 2) + "px";
    menu.style.left = (screenWidth / 2) - (menu.offsetWidth / 2) + "px";
}

function drawScoreboard() {
    scoreboard.innerHTML = snakeLength;
}