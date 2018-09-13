var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var topBar = document.querySelector("#topBar");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
    setupModeButtons();
    setupSquares();
    reset();
}

function setupModeButtons(){
    for(var i=0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
            reset();
        });
    }
}

function setupSquares(){
    for(var i=0; i < squares.length; i++){
        //add click listeners to squares
        squares[i].addEventListener("click", function(){
            //grab color of picked square
            var clickedColor = this.style.backgroundColor;
            //compare color to pickedColor
            if(clickedColor === pickedColor){//correct guess
                messageDisplay.textContent = "Correct!";
                changeColor(clickedColor);
                topBar.style.backgroundColor = clickedColor;
                resetButton.textContent = "Play Again?";
            }else{//wrong guess
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        })
    }
}

function reset(){
    colors = generateRandomColors(numSquares);
    //pick a new random color from the array
    pickedColor = pickColor();
    //show the new random color 
    colorDisplay.textContent = pickedColor.toUpperCase();
    //assign all the squares new colors
    for(var i=0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        }else{
            squares[i].style.display = "none";
        }
    }
    topBar.style.backgroundColor = "steelblue";
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";
}

function changeColor(color){
    //loop through all colors
    for(var i=0; i < squares.length; i++){
        //change each color to match given color
        squares[i].style.backgroundColor = color;
    }
}

function pickColor(){
    var randomColor = Math.floor(Math.random() * colors.length);
    return colors[randomColor];
}

function generateRandomColors(num){
    //make an array
    var arr = [];
    //add num random colors to the array
    for(var i=0; i < num; i++){
        arr.push(randomColor());
    }
    //return that array
    return arr;
}

function randomColor(){
    //red band from 0 - 255
    var red = Math.floor(Math.random() * 256);
    //green band from 0 - 255
    var green = Math.floor(Math.random() * 256);
    //blue band from 0 - 255
    var blue = Math.floor(Math.random() * 256);
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}

resetButton.addEventListener("click", function(){
    reset();
});
