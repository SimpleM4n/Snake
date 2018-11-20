let bSize = 40;
let enemy = {type: "snake", direction: "right", position: [1,3], tail: [[1,2], [1,3]]};
let player = {type: "dot", position: [bSize-2, bSize-2]};
let food = {type: "food", position: []}
let board = new Array(bSize);
for (let i = 0; i < bSize; i++) {
    board[i] = new Array(bSize);
}
let length = 3;

function init() {
    createBoard();
    startPosition();
    putFood();
}

window.addEventListener("keydown", function (event) {
    let box = document.querySelector(".dot");
    switch (event.keyCode) {
        case 37:
            if(!box.previousSibling) {
                box.className = "box";
                box.parentNode.lastChild.className = "dot box";
                player.position[1] = bSize-1;
                break;
            }
            box.className = "box";
            box.previousSibling.className = "dot box";
            player.position[1] -= 1;
            break;
        case 38:
            if(box.parentNode.previousSibling.nodeType != 1) {
                box.className = "box";
                col = Array.from(box.parentNode.children).indexOf(box);
                box.parentNode.parentNode.lastChild.childNodes[col].className = "dot box";
                player.position[0] = bSize-1;
                break;
            }
            box.className = "box";
            col = Array.from(box.parentNode.children).indexOf(box);
            box.parentNode.previousSibling.childNodes[col].className = "dot box";
            player.position[0] -= 1;
            break;
        case 39:
            if(!box.nextSibling) {
                box.className = "box";
                box.parentNode.firstChild.className = "dot box";
                player.position[1] = 0;
                break;
            }
            box.className = "box";
            box.nextSibling.className = "dot box";
            player.position[1] += 1;
            break;
        case 40:
            if(!box.parentNode.nextSibling) {
                box.className = "box";
                col = Array.from(box.parentNode.children).indexOf(box);
                box.parentNode.parentNode.childNodes[1].childNodes[col].className = "dot box";
                player.position[0] = 0;
                break;
            }
            box.className = "box";
            col = Array.from(box.parentNode.children).indexOf(box);
            box.parentNode.nextSibling.childNodes[col].className = "dot box";
            player.position[0] += 1;
            break;
    }
});

function createBoard() {
    let board = document.getElementById('board');
    for (let i = 0; i < bSize; i++) {
        let row = document.createElement('div');
        row.className = 'row';
        for (let j = 0; j < bSize; j++) {
            let square = document.createElement('div');
            square.className = 'box';
            square.setAttribute('id', `r${i}c${j}`);
            row.appendChild(square);
        }
        board.appendChild(row);
    }
}

function startPosition() {
    document.getElementById(`r${bSize-2}c${bSize-2}`).className = "dot box";
    document.querySelector("#r1c3").className = "head-snake box";
    document.querySelector("#r1c1").className = "tail-snake box";
    document.querySelector("#r1c2").className = "bady-snake box";
}

function moveSnake() {
    let snake = document.querySelector(".head-snake");
    let tail = document.querySelector(".tail-snake");
    let vectorP = [player.position[0]-enemy.position[0], player.position[1]-enemy.position[1]];
    let vectorF = [food.position[0]-enemy.position[0], food.position[1]-enemy.position[1]];
    let vector = [];
    let far;

    if((Math.abs(vectorF[0])+Math.abs(vectorF[1])) < (Math.abs(vectorP[0])+Math.abs(vectorP[1]))) {
        vector = vectorF;
        console.log("target => food");
    } else {
        vector = vectorP;
        console.log("target => player");
    }

    if(Math.abs(vector[0]) > Math.abs(vector[1])) far = 0;
    else far = 1;
    console.log(far);

    // stop the snake
    if(!document.querySelector(".dot")) {
        clearInterval(intervalId);
        alert("You Lose!");
    }

    switch (choosePath(vector, far, snake)) {
        case 'left':
            if(snake.previousSibling.className == "food box") grow();
            else {
                tail.className = "box";
                document.querySelector(`#r${enemy.tail[0][0]}c${enemy.tail[0][1]}`).className = "tail-snake box";
                for(let i=0;i<length-2;i++) {
                    enemy.tail[i] = enemy.tail[i+1];
                }
            }
            enemy.tail[length-2] = [enemy.tail[length-2][0], enemy.tail[length-2][1]-1];
            snake.className = "bady-snake box";
            snake.previousSibling.className = "head-snake box";
            enemy.position[1] -= 1;
            break;
        case 'right':
            if(snake.nextSibling.className == "food box") grow();
            else {
                tail.className = "box";
                document.querySelector(`#r${enemy.tail[0][0]}c${enemy.tail[0][1]}`).className = "tail-snake box";
                for(let i=0;i<length-2;i++) {
                    enemy.tail[i] = enemy.tail[i+1];
                }
            }
            enemy.tail[length-2] = [enemy.tail[length-2][0], enemy.tail[length-2][1]+1];
            snake.className = "bady-snake box";
            snake.nextSibling.className = "head-snake box";
            enemy.position[1] += 1;
            break;
        case 'up':
            col = Array.from(snake.parentNode.children).indexOf(snake);
            if(snake.parentNode.previousSibling.childNodes[col].className == "food box") grow();
            else {
                tail.className = "box";
                document.querySelector(`#r${enemy.tail[0][0]}c${enemy.tail[0][1]}`).className = "tail-snake box";
                for(let i=0;i<length-2;i++) {
                    enemy.tail[i] = enemy.tail[i+1];
                }
            }
            enemy.tail[length-2] = [enemy.tail[length-2][0]-1, enemy.tail[length-2][1]];
            snake.className = "bady-snake box";
            snake.parentNode.previousSibling.childNodes[col].className = "head-snake box";
            enemy.position[0] -= 1;
            break;
        case 'down':
            col = Array.from(snake.parentNode.children).indexOf(snake);
            if(snake.parentNode.nextSibling.childNodes[col].className == "food box") grow();
            else {
                tail.className = "box";
                document.querySelector(`#r${enemy.tail[0][0]}c${enemy.tail[0][1]}`).className = "tail-snake box";
                for(let i=0;i<length-2;i++) {
                    enemy.tail[i] = enemy.tail[i+1];
                }
            }
            enemy.tail[length-2] = [enemy.tail[length-2][0]+1, enemy.tail[length-2][1]];
            snake.className = "bady-snake box";
            snake.parentNode.nextSibling.childNodes[col].className = "head-snake box";
            enemy.position[0] += 1;
            break;
        default:
            clearInterval(intervalId);
            alert("You Win!");
    }

    if(!document.querySelector(".food")) {
        putFood();
    }
}

let intervalId = setInterval(moveSnake, 100);

function putFood() {
    let row = Math.floor(Math.random() * bSize);
    let col = Math.floor(Math.random() * bSize);
    if (document.querySelector(`#r${row}c${col}`).className[2] == "x") {
        document.querySelector(`#r${row}c${col}`).className = "food box"
        //board[row][col] = {type: 'food'};
        food.position = [row, col];
    } else {
        putFood();
    }
}

function grow() {
    length++;
    enemy.tail.push(enemy.position);
    return;
}

function choosePath(target, pos, head) {
    console.log("current dir => "+enemy.direction);

    let count = 0;

    while(count != 4) {
        if(!pos) {
            if(target[0] > 0) {
                if(nextField("down", head)) return enemy.direction = "down";
                else {
                    count++;
                    switch(count) {
                        case 1:
                            pos = 1;
                            if(target[1] == 0) {
                                target[1] = (bSize/2)-enemy.position[1]-1;
                            }
                            break;
                        case 2:
                            if(enemy.direction == "up") {
                                target[0] *= -1;
                                break;
                            }
                            pos = 1;
                            target[1] *= -1;
                            break;
                        case 3:
                            pos = 1;
                            target[1] *= -1;
                            break;
                    }
                }
            }else {
                if(nextField("up", head)) return enemy.direction = "up";
                else {
                    count++;
                    switch(count) {
                        case 1:
                            pos = 1;
                            if(target[1] == 0) {
                                target[1] = (bSize/2)-enemy.position[1]-1;
                            }
                            break;
                        case 2:
                            if(enemy.direction == "down") {
                                target[0] *= -1;
                                break;
                            }
                            pos = 1;
                            target[1] *= -1;
                            break;
                        case 3:
                            pos = 1;
                            target[1] *= -1;
                            break;
                    }
                }
            }
        }
        else {
            if(target[1] > 0) {
                if(nextField("right", head)) return enemy.direction = "right";
                else {
                    count++;
                    switch(count) {
                        case 1:
                            pos = 0;
                            if(target[0] == 0) {
                                target[0] = (bSize/2)-enemy.position[0]-1;
                            }
                            break;
                        case 2:
                            if(enemy.direction == "left") {
                                target[1] *= -1;
                                break;
                            }
                            pos = 0;
                            target[0] *= -1;
                            break;
                        case 3:
                            pos = 0;
                            target[0] *= -1;
                            break;
                    }
                }
            }else {
                if(nextField("left", head)) return enemy.direction = "left";
                else {
                    count++;
                    switch(count) {
                        case 1:
                            pos = 0;
                            if(target[0] == 0) {
                                target[0] = (bSize/2)-enemy.position[0]-1;
                            }
                            break;
                        case 2:
                            if(enemy.direction == "right") {
                                target[1] *= -1;
                                break;
                            }
                            pos = 0;
                            target[0] *= -1;
                            break;
                        case 3:
                            pos = 0;
                            target[0] *= -1;
                            break;
                    }
                }
            }
        }
    }

    return null;
}

function nextField(direction, box) {
    let col = Array.from(box.parentNode.children).indexOf(box);
    switch(direction) {
        case "left":
            if(box.previousSibling == null || box.previousSibling.className[1] != "o") {
                console.log("left is invalid");
                return false;
            }
            console.log("left is accessable");
            return true;
        case "right":
            if(box.nextSibling == null || box.nextSibling.className[1] != "o") {
                console.log("right is invalid");
                return false;
            }
            console.log("right is accessable");
            return true;
        case "up":
            //let col = Array.from(box.parentNode.children).indexOf(box);
            if(box.parentNode.previousSibling.nodeType != 1 || box.parentNode.previousSibling.childNodes[col].className[1] != "o") {
                console.log("up is invalid");
                return false;
            }
            console.log("up is accessable");
            return true;
        case "down":
            //let col = Array.from(box.parentNode.children).indexOf(box);
            if(box.parentNode.nextSibling == null || box.parentNode.nextSibling.childNodes[col].className[1] != "o") {
                console.log("down is invalid");
                return false;
            }
            console.log("down is accessable");
            return true;
    }
}
