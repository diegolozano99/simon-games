var colors = ["blue", "red", "yellow", "green"]; 
var gamePattern = [];
var userPattern = [];
var level = 0;
var game = true; 
var points = 0; 

function nextSequence() { 
    userPattern = [];
    level++;
    $("#level-title").text("level " + level);
    var number = Math.random() *4; 
    number = Math.floor(number);
    var randomChosenColor = colors[number]; 
    gamePattern.push(randomChosenColor); 
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
} 

$(".btn").click(function(event){
    var userChosenColor = event.target.id; 
    userPattern.push(userChosenColor);
    playSound(userChosenColor); 
    animatePress(userChosenColor);
    checkAnswer(userPattern.length - 1);
});

function playSound(name){
    var colorAudio = new Audio('sounds/' + name + '.mp3'); 
    colorAudio.play(); 
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }
  



$(document).keydown(function(){
    if(game){
        $("#level-title").text("level 0"); 
        nextSequence();
        game = false; 
    }
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userPattern[currentLevel]){
        if (gamePattern.length === userPattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        var incorrectAudio = new Audio("sounds/wrong.mp3");
        incorrectAudio.play();
        $("body").addClass("game-over"); 
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        highestScore(); 
        startOver();
    }
    
}

function startOver() {
    level = 0;
    gamePattern = []; 
    userPattern = []; 
    game = true; 
}

function highestScore(){
    if (level > points){
        $(".scoreboard").text("Highest Score: " + level);
    }
    points = level; 
}





