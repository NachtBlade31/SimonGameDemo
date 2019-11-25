var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var gameStatus=0;

$("body").keydown(function(event)
{
  if((event.key==="a") && (gameStatus===0))
  {
      nextSequence();
      gameStatus=1;
      $("#level-title").text("Level " + level);
  }
});

function nextSequence()
{
  userClickedPattern = [];
  level=level+1;
  $("#level-title").text("Level "+level);
  var randomNumber=Math.random();
  randomNumber=Math.floor(randomNumber*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

$(".btn").on('click',function(event)
{
  var userChosenColour=event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(chosenColour)
{
  var newSrc="sounds/"+ chosenColour+".mp3";
  var audio=new Audio(newSrc);
  audio.play();
}

function animatePress(currentColour)
{
  $("#"+currentColour).addClass("pressed");
  setTimeout(function() {
  $("#"+currentColour).removeClass("pressed");
}, 100);
}

function checkAnswer(currentLevel)
{
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else
   {
     playSound("wrong");
     $("body").addClass("game-over");
     setTimeout(function () {
      $("body").removeClass("game-over");
      }, 1000);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      $("body").keydown(function(event){
        startOver();
        $("#level-title").text("Press A Key to Start");
      });

 }
}

function startOver()
{
  level=0;
  gamePattern=[];
  gameStatus=0;
}
