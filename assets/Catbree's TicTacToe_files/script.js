//Use player to track marker and scoring

const player1 = createPlayer("player1", "X");
const player2 = createPlayer("player2", "O");

function createPlayer(name, marker) {
    const playerName = name;
    const playerMarker = marker;

    let score = 0;
    const getScore = () => score;
    const increaseScore = () => score++;

    const inputCell = () => {
        // let inputCell = prompt(`It is now your turn. Your marker is ${playerMarker}. Which cell do you want to mark?`);
        gameboard.forEach( () => {
            tableGameboardCell.addEventListener("click", () => {
                console.log("clicked!")
            })
        })
        return inputCell
    }

    return { playerName, playerMarker, getScore, increaseScore, inputCell }
}
  

//Use gameboard to keep track of markers

let gameboard = createGameboard();

function createGameboard() {
    let gameboard = [];
    fillGameboardWithCells();

    function createCell(id) {
        let cellId = id;
        let cellMarker = "empty";
        return { cellId, cellMarker }
    }

    function fillGameboardWithCells() {
        for (i=0;i<9;i++) {
            gameboard[i] = createCell(i);
        }
    }

    return gameboard;
}

// Display controller to initiate interface
const displayController = (function() {
    
    const startGameButton = document.querySelector(".startGameButton");
    const tableGameboard = document.querySelector(".tableGameboard");
    const announcement = document.querySelector(".announcement");

    gameboard.forEach( () => {
        const tableGameboardCell = document.createElement("div");
        tableGameboard.appendChild(tableGameboardCell);
        tableGameboardCell.classList.add("gameboardCell");
    })


    startGameButton.addEventListener("click", () => {
        startGameButton.style.display = "none";
        startGame();
    })

    return { announcement }
})();

//Use moderator to facilitate gameplay

const moderator = (function () {
    let turn = 0;

    const playerTurn = () => {

        let inputCell;
        let currentPlayer;

        switch(turn%2) {
            case 0:
                currentPlayer = player1;   
                break;
            case 1:
                currentPlayer = player2;
                break;
            default:
                console.log(`Error: No match found.`)
        }
        displayController.announcement.textContent = `It is now ${currentPlayer.playerName} "${currentPlayer.playerMarker}" turn`;
        inputCell = currentPlayer.inputCell();
        markCell(inputCell,currentPlayer);
        increaseTurn();
    } 
    
    const increaseTurn = () => {
        turn++;
        console.log(`current turn is ${turn}`);

    }

    function markCell(number,player) {
    
        let selectedCell = gameboard[number];
    
        if (selectedCell.cellMarker == "empty") {
            gameboard[number].cellMarker = player.playerMarker;
            console.table(gameboard);
            checkWinCondition(player);
            checkTieCondition();
        } else {
            console.log(`This cell is already occupied.`)
        }
    }


    function checkWinCondition(player) {
        let x = player.playerMarker;
        
        if (gameboard[0].cellMarker == x && 
            gameboard[1].cellMarker == x && 
            gameboard[2].cellMarker == x) {
                return announcePlayerWin(player)
        }

        if (gameboard[3].cellMarker == x && 
            gameboard[4].cellMarker == x && 
            gameboard[5].cellMarker == x) {
                return announcePlayerWin(player)
        }

        if (gameboard[6].cellMarker == x && 
            gameboard[7].cellMarker == x && 
            gameboard[8].cellMarker == x) {
                return announcePlayerWin(player)
        }

        if (gameboard[0].cellMarker == x && 
            gameboard[3].cellMarker == x && 
            gameboard[6].cellMarker == x) {
                return announcePlayerWin(player)
        }

        if (gameboard[1].cellMarker == x && 
            gameboard[4].cellMarker == x && 
            gameboard[7].cellMarker == x) {
                return announcePlayerWin(player)
        }

        if (gameboard[2].cellMarker == x && 
            gameboard[5].cellMarker == x && 
            gameboard[8].cellMarker == x) {
                return announcePlayerWin(player)
        }

        if (gameboard[0].cellMarker == x && 
            gameboard[4].cellMarker == x && 
            gameboard[8].cellMarker == x) {
                return announcePlayerWin(player)
        }

        if (gameboard[6].cellMarker == x && 
            gameboard[4].cellMarker == x && 
            gameboard[2].cellMarker == x) {
                return announcePlayerWin(player)
        }
    }

    function checkTieCondition() {
        let occupiedSpace = 0;
        let tieCondition = false;

        for (i=0;i<9;i++) {
            if(gameboard[i].cellMarker!=='empty') {
                occupiedSpace++;
            }
        }
        if (occupiedSpace==9) {
            tieCondition = true;
            announceTie();
        } else {
            occupiedSpace = 0;
        }

        return tieCondition
    }

    function announcePlayerWin(player) {
        alert(`${player.playerName} has won!`)

    }

    function announceTie() {
        alert(`It's a draw!`)
    }

    return { playerTurn, checkTieCondition }
})();


function startGame() {
    while (moderator.checkTieCondition() == false) {
        moderator.playerTurn();
    }
}