
var Endgame ;
var timeLeave ;
var Marks;
var gameStart = false ;
document.getElementById("gameStart").onclick = function() {

    if (gameStart === true){

        window.location.reload(false) ;

    }else{

        Marks = 0;
        document.getElementById("markValue").innerHTML = Marks ;
        document.getElementById("guideline").innerHTML = "Click on the right answer." ;

        var countLeft = 60;
        document.getElementById("timeLeaveValue").innerHTML = countLeft ;

        show("timeLeave") ;

        hide("gameOver");
        document.getElementById("gameStart").innerHTML = "Reset" ;

        Endgame = setInterval(function(){countLeft-- ; timeLeaveValue.innerHTML = countLeft;},1000);

        timeLeave = setTimeout(gameOver, 60000) ;

        gameStart = true ;

        generateQA() ;
    }
};


function hide(elementId){

    document.getElementById(elementId).style.display = 'none' ;
}
function show(elementId){

    document.getElementById(elementId).style.display = 'block' ;
}

function gameOver(){

    window.clearInterval(Endgame) ;

    hide("timeLeave") ;
    show("gameOver") ;

    document.getElementById("markNumber").innerHTML = Marks ;
    document.getElementById("gameStart").innerHTML = "Game Start" ;
    gameStart = false ;
}

var Right;

function generateQA(){

    var solutions = [] ;
    for (var i =0; i<145; i++){

        solutions.push(i) ;
    }

    var theFirstNum = Math.floor(Math.random()*13) ;

    var TheSecondNum = Math.floor(Math.random()*13) ;

    Right = theFirstNum * TheSecondNum ;

    var RightIndex = solutions.indexOf(Right) ;

    if (RightIndex > -1){

        solutions.splice(RightIndex,1) ;
    }

    function shuffle(array) {

        var IndexNow = array.length, temporaryValue, randomIndex ;

        while (0 !== IndexNow) {


            randomIndex = Math.floor(Math.random() * IndexNow) ;
            IndexNow -= 1 ;


            temporaryValue = array[IndexNow] ;
            array[IndexNow] = array[randomIndex] ;
            array[randomIndex] = temporaryValue ;
        }

        return array ;
    }

    shuffle(solutions);

    var OptionsBox =[Right] ;

    for(var j =0; j<3;j++){
        OptionsBox.push(solutions[j]) ;
    }
    shuffle(OptionsBox) ;

    for(var t =1; t<5; t++) {

        document.getElementById("option"+t).innerHTML = OptionsBox[t -1] ;
    }
    document.getElementById("question").innerHTML = theFirstNum + 'x' + TheSecondNum ;
}



for(g=1; g<5; g++) {

    document.getElementById("option"+g).onclick = function()  {

        if (gameStart === true) {

            if(this.innerHTML == Right)
            {

                Marks++

                document.getElementById("markValue").innerHTML = Marks ;

                show("right")  ;

                setTimeout(function() {

                    hide("right") ;
                },700) ;

                generateQA() ;

            }

            else {

                show ("incorrect");

                setTimeout (function(){
                    hide("incorrect");
                },700);
            }
        }
    };
}

