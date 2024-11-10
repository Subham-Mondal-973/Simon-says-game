let gameSeq = [];
let userSeq = [];
let maxScore = 0;

let btns = ["yellow","red","green","purple"];

let started = false;
let level =0;
let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");


document.addEventListener("keypress",function(){
    if(started==false)
    {
        started = true;
        console.log(started);

        levelUp();
    }
});

function gameFlash(btn){
     btn.classList.add("flash");
     setTimeout(function(){
        btn.classList.remove("flash")
     },250);
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
       btn.classList.remove("userflash")
    },250);
}

function levelUp(){
    userSeq = [];
    level ++;
    h2.innerText = `Level ${level}`;

    //choose random button
    let randIndex = Math.floor(Math.random()*3);
    let randColor = btns[randIndex];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);
     
    gameFlash(randBtn);
}

function checkAns(idx){
    //console.log(level);
    //let idx = level-1;
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp(),1500);  
        }
    } else{
        setHighestScore(level-1);
        h2.innerHTML = `Game Over! Your score is ${level-1} <br> Press any key to start.`
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){      
            document.querySelector("body").style.backgroundColor = "white"
        },150);

        reset();
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns)
{
    btn.addEventListener("click",btnPress);
}
function setHighestScore(score){
    if (maxScore<score){
        maxScore = score;
    }
    h3.innerText = `Highest Score: ${maxScore}`;
}

function reset(){
    level = 0;
    gameSeq = [];
    userSeq = [];
    started = false;
}