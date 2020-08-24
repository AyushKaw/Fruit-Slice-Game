var playing = false;
var score;
var trialsleft;
var fruits = ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange', 'peach', 'pear', 'watermelon'];
var step;
var action;
$(function() {
    $("#start-reset").click(function() {
        if(playing == true) {
            location.reload();
        }
        else {
            playing = true;
            score = 0;
            $("#scorevalue").html(score);
            $("#trials-left").show();
            trialsleft = 3;
            addHearts();
            $("#gameover").hide();

            $("#start-reset").html("Reset Game");

            startAction();
        }
    });

$("#fruit1").mouseover(function() {
    
    score++;

    $("#scorevalue").html(score);

    $("#slicesound")[0].play();

    clearInterval(action);
    
    $("#fruit1").hide("explode", 500);

    setTimeout(startAction, 500);
});

function addHearts() {

    $("#trials-left").empty();
    for(i=0; i<trialsleft; i++){
        $("#trials-left").append('<img src ="images/heart.png" class="life">');
    }
}

function startAction() {
    $("#fruit1").show();
    chooseFruits();
    $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50});

    step = 1 + Math.round(5*Math.random());

     
}

function chooseFruits() {
    $("#fruit1").attr('src', 'images/' + fruits[Math.round(7*Math.random())] + '.png');

    action = setInterval(function(){
        $("#fruit1").css('top' , $("#fruit1").position().top + step );

        if($("#fruit1").position().top > $("#fruitsContainer").height()) {
            if(trialsleft > 1) {

                $("#fruit1").show();
                chooseFruits();
                $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50});

                step = 1 + Math.round(5*Math.random());

                trialsleft--;

                addHearts();
            }
            else {
                playing = false;
                $("#start-reset").html("Start Game");
                $("#gameover").show();
                $("#gameover").html('<p>GAME OVER!</p><p>YOUR SCORE IS '+ score +'</p>');
                $("#trials-left").hide();
                stopAction();
            }
        }
    }, 20);
}

function stopAction() {
    clearInterval(action);
    $("#fruit1").hide();
}
});