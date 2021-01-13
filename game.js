
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClick = [];

var level = 0;
var start = false;

// make sure user wants to start 
$(document).keypress(function(){
    if (!start){
        $("#level-title").text("Level" + level);
        nexSequence();
        start = true;
    }
});

// user input
$(".btn").click(function(){
    var userColor = $(this).attr("id");
    userClick.push(userColor);

    playSound(userColor);
    animatePress(userColor);

    checkAnswer(userClick.length-1);

})

// to pregress the game
function nexSequence(){

    userClick = [];
    // move to the next leve
    level++; 

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4 );
    var randomChosenColor = buttonColors[randomNumber];

    // plave pattern in empty array
    gamePattern.push(randomChosenColor);

    // show pattern to user
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);        
}

// to make a sound
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// show what the user pressed
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// check users awnser
function checkAnswer(currentlevel){
    
    if (gamePattern[currentlevel] === userClick[currentlevel]) {
        if (userClick.length === gamePattern.length){
            setTimeout(function(){
                nexSequence();
            }, 1000);
        }
    } else {
        gameOver();
        startOver();
    }
           
}


// when its game over
function gameOver(){

    $("body").addClass("game-over");
    setTimeout(function(){
    $("body").removeClass("game-over")
    }, 200);
    $("#level-title").text("Game Over. Please press any key to restart");
    start = false;
}

// reset the game
function startOver(){
    level = 0;
    gamePattern = [];
    start = fales;
}




