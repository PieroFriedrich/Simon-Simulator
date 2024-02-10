let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ["green", "red", "yellow", "blue"];
let level = 0;

function nextSequence() {

    $("h1").text("Level " + level);
    userClickedPattern = [];

    let randomNumber = Math.floor(Math.random() * 4);
    let randomColor = buttonColors[randomNumber];
    $("#" + randomColor).fadeOut(400).fadeIn(400);
    let colorSound = new Audio("./sounds/" + randomColor + ".mp3");
    colorSound.play();
    gamePattern.push(randomColor);
    level++;
}

$(".btn").on("click", (event) => {
    let userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    console.log(userClickedPattern.lastIndexOf(userChosenColor));
    checkAnswer(userClickedPattern.lastIndexOf(userChosenColor));
})

function playSound(name) {
    let colorSound = new Audio("./sounds/" + name + ".mp3");
    colorSound.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

$(document).on("keypress", nextSequence);

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log("success");
        console.log(currentLevel + " " + level);
        if (currentLevel == level - 1) {
            console.log("end");
            setTimeout(nextSequence, 1000);
        }
    } else {
        console.log("wrong");
        let wrongSound = new Audio("./sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }

    function startOver() {
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
    }
}