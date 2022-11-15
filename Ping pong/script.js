import Paddle from './paddle.js'
// import ball from './ball.js';
import Ball from './ball.js';
const ball = new Ball(document.getElementById("ball"))
let lastTime;
let player = new Paddle(document.getElementById("player-paddle"));
let computer = new Paddle(document.getElementById("computer-paddle"));

let playerScore = document.getElementById("playerScore");
let computerScore = document.getElementById("computerScore");


let winner = document.getElementById("winner");

let p="Player Won!";
let c = "Computer Won!";
let again = document.getElementById("again");

let b = document.getElementById("ball");

 
start.onclick=()=>{
    ball.reset();
    computer.reset();
    start.style.display="none";
    pause.style.display="flex";
    function update(time){


    if(parseInt(playerScore.innerText)<10&&parseInt(computerScore.innerText)<10){

        
        if(lastTime!=null){
            const delta=time-lastTime
            ball.update(delta,[player.rect(),computer.rect()]);
            
            computer.update(delta,ball.y);
            const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"));
            document.documentElement.style.setProperty("--hue",hue+delta*0.01);
            
            if (isLose()){
                handleLost();
            }
            
        }
    }

        else if(parseInt(playerScore.innerText)>=10||parseInt(computerScore.innerText)>=10){
            b.style.display="none";
            score.style.display="none";
            if(parseInt(playerScore.innerText)===10){
                winner.style.visibility="visible";
                winner.innerText=p;
                // playerScore.innerText='0';
                // computerScore.innerText='0';
                again.style.display="flex";
                
            }else if(parseInt(computerScore.innerText)===10){
                winner.style.visibility="visible";
                winner.innerText=c;
                // playerScore.innerText='0';
                // computerScore.innerText='0';
                again.style.display="flex";
            }
        }

            lastTime=time;
    // console.log(delta);

            window.requestAnimationFrame(update);


    }
window.requestAnimationFrame(update);
}

    const isLose=()=>{
        const rect = ball.rect();

        return (rect.right>=window.innerWidth||rect.left<=0)
    }

    const handleLost=()=>{
        const rect = ball.rect();

        if(rect.right>=window.innerWidth){
            playerScore.innerText=parseInt(playerScore.innerText)+1;
            console.log("Player.");

        }
        else if(rect.left<=0){
            computerScore.innerText= parseInt(computerScore.innerText)+1;
            console.log("COmputer");
        }

        ball.reset();
        computer.reset();
    }

    document.addEventListener("mousemove",(e)=>{
        player.position=(e.y/window.innerHeight)*100;
    })



    again.addEventListener("click",()=>{
        computer.reset();
        ball.reset();
        b.style.display="block";
        score.style.display="flex";
        computerScore.innerText='0';
        playerScore.innerText='0';
        again.style.display="none";
        winner.style.visibility="hidden"
    })
