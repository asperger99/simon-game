// $("h1").css("color","red");
alert("Let's play simon game & test your memory.")
alert("RULES: Remember the pattern and press the last pattern followed by current pattern.")
var buttonColours = ["red","blue","green","yellow"];

var gamePattern=[];
var userClickedPattern=[];

var level=0,start=0;

function nextSequence(){

  $("h1").text("Level "+level);
  level++;
  var n1=Math.floor(Math.random()*3)+1;
  var randomChosenColour=buttonColours[n1];
  gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

$(document).on("keypress",function(){
  if(start===0){
    start=1;
    nextSequence();
  }
});

$(".btn").click(function(){

  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
    // console.log("success");
    if(userClickedPattern.length==gamePattern.length){
      setTimeout(function () {
          nextSequence();
          userClickedPattern=[];
      }, 1000);
    }
  }
  else{
    $("body").addClass("game-over");
    var audio=new Audio("sounds/wrong.mp3")
    audio.play();
    start=0;
    userClickedPattern=[];
    gamePattern=[];
    level=0;
    $("h1").text("FAILED,press any key to play again");
    setTimeout(function () {
      $("body").removeClass("game-over");
      $(document).on("keypress",function(){
        if(start===0){
          start=1;
          nextSequence();
        }
      });
    }, 1000);
  }
}

function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function () {
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}
