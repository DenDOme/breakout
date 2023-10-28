const grid = document.querySelector('.grid');
const scoreDisp = document.querySelector('.score');
let timerId;
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560; 
const boardHeight = 300;
const ballDiam = 20;

let score = 0;

let xDir = 2;
let yDir = 2;

const userStart = [230,10];
let currPos =  userStart;

const ballStart = [230, 40];
let ballcurrPos = ballStart;

class Block{
    constructor(xAxis, yAxis){
        this.bottomLeft = [xAxis,yAxis]
        this.bottomRight = [xAxis+blockWidth , yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}
const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),
]
function addBlock(){
    for(let i = 0 ; i < blocks.length;i++){
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block);
    }
}
addBlock();

function drawUser(){
    user.style.left = currPos[0] + 'px'
    user.style.bottom = currPos[1] + 'px'
}
const user = document.createElement('div');
user.classList.add('user');
user.style.left = currPos[0] + 'px';
user.style.bottom = currPos[1] + 'px';
grid.appendChild(user);

function moveUser(e){
    switch(e.key){
        case 'ArrowLeft':
            if(currPos[0] > 0){
                currPos[0] -= 10
                drawUser()
            }
            break;
        case 'ArrowRight':
            if(currPos[0] < (boardWidth - blockWidth)){
                currPos[0] += 10
                drawUser()
            }
            break;
        }
}
document.addEventListener('keydown', moveUser)

const ball = document.createElement('div');
ball.classList.add('ball');
grid.appendChild(ball);

function drawBall(){
    ball.style.left = ballcurrPos[0] + 'px'
    ball.style.bottom = ballcurrPos[1] + 'px'
}

function moveBall(){
    ballcurrPos[0] += xDir;
    ballcurrPos[1] += yDir;
    drawBall();
    checkForColl();
}
timerId = setInterval(moveBall, 30);

function checkForColl(){
    for(let i = 0 ; i < blocks.length ; i++){
        if((ballcurrPos[0] > blocks[i].bottomLeft[0] && ballcurrPos[0] < blocks[i].bottomRight[0]) && ((ballcurrPos[1] + ballDiam) > blocks[i].bottomLeft[1] && ballcurrPos[1] < blocks[i].topLeft[1])){
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDir()
            score++;
            scoreDisp.innerHTML = score;
            if(blocks.length === 0){
                scoreDisp.innerHTML = 'win';
                document.removeEventListener('keydown', moveUser);
                clearInterval(timerId);
            }

        }
    }

    if(ballcurrPos[0] >= (boardWidth - ballDiam) || ballcurrPos[1] >= (boardHeight - ballDiam)|| ballcurrPos[0] <= 0){
        changeDir()
    }
    if((ballcurrPos[0] > currPos[0] && ballcurrPos[0] < currPos[0] + blockWidth) && (ballcurrPos[1] > currPos[1] && ballcurrPos[1] < currPos[1] +  blockHeight)){
        changeDir()
    }
    if(ballcurrPos[1] <= 0){
        clearInterval(timerId);
        scoreDisp.innerHTML = 'lose'
        document.removeEventListener('keydown', moveUser) 
    }
}

function changeDir(){
    if(xDir === 2 && yDir === 2){
        yDir = -2
        return
    }
    if(xDir === 2 && yDir === -2){
        xDir = -2
        return
    }
    if(xDir === -2 && yDir === -2){
        yDir = 2
        return
    }
    if(xDir === -2 && yDir === 2){
        xDir = 2
        return
    }
}