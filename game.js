//alert("hello")


let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

var started = false;
var level = 0;
$(document).on("keydown", function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
})


$(".btn").on("click", function(){
    let userChosenColour = $(this).attr("id");
    // console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    // console.log(userClickedPattern);
   
    checkAnswer(userClickedPattern.length-1);
})



function playSound(name){

    let audio = new Audio("./sounds/" + name + ".mp3")
    audio.play();

}


function animatePress(currentColour){


    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}




function checkAnswer(currentLevel){
       
     if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        // console.log("success");


        if(userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence()
            }, 1000);
        }
     }
     else{
        // console.log("wrong");
        let sound = new Audio("./sounds/wrong.mp3");
        sound.play();

        $("body").addClass("game-over");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart")

        startOver();
     }
}



function startOver(){
     gamePattern = [];
     started = false;
     level = 0;
}

function nextSequence(){

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.random();
    randomNumber = randomNumber * 4;
    randomNumber = Math.floor(randomNumber);
    let randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);


    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100)

    let audio = new Audio("./sounds/" + randomChosenColour + ".mp3")
    audio.play();
    
    
   
}


