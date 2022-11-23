// Created by pawan kumavat

window.addEventListener("load", () => {
    let circleTurn = true; // true = circle; false = cross;
    const game = document.querySelector(".game");
    const cells = document.querySelectorAll(".cell");
    const main = document.querySelector("main");
    const popup = document.querySelector(".result-overlay");
    const btn_single = document.querySelector(".single");
    const btn_multiplayer = document.querySelector(".multiplayer");
    
    const mainmenu = document.querySelector(".mainmenu");
    const result_caption = document.querySelector(".result-caption");
    

    let difficulty = 0;
    let fieldSize = 3;
    let filledCells = 0;

    document.querySelector(".confirm").addEventListener("click", ()=>{
        document.querySelector(".notice").style.display = 'none';
    })

    btn_single.addEventListener("click", ()=> {
        difficulty = 0;
        restartGame();
    })
    
    btn_multiplayer.addEventListener("click", ()=> {
        difficulty = 1;
        restartGame();
    })

    const restartGame = () => {
        filledCells = 0;
        circleTurn = true;
        mainmenu.classList.add("closed");
        cells.forEach(cell => {
            cell.classList.remove("circle");
            cell.classList.remove("cross");
        })
        game.style.pointerEvents = "all";
        popup.classList.remove("show");

    }

    const openMainMenu = () => {
        mainmenu.classList.remove("closed");
        popup.classList.remove("show");

    }
    const changeTheme = () => {
        main.classList.toggle("dark");

    }
    const endGame = (winner) => {
        //console.log(winner)
        game.style.pointerEvents = "none";
        if (winner == "draw") {
            result_caption.innerHTML = "It's a draw.";
        } else {
            if (difficulty == 0){
                if (winner == "crosses") {
                    result_caption.innerHTML = "You lost :(";
                } else if (winner == "circles") {
                    result_caption.innerHTML = "You win!";
                }
            }
            else if (difficulty == 1){
                if (winner == "crosses") {
                    result_caption.innerHTML = "X's win!";
                } else if (winner == "circles") {
                    result_caption.innerHTML = "O's win!";
                }
            }
        }
        popup.classList.add("show");
    }

    const checkGameState = (fieldSize) => {
        
        let counter = 0;
        //console.log("Checking Circles Horizontal:")
        for (let i = 0; i < fieldSize; i++) {
            //console.log("i="+i);
            for (let j = i * fieldSize; j < i * fieldSize + fieldSize; j++) {
                //console.log("j="+j);
                if ((cells[j].classList.contains("circle"))) {
                    //console.log("Counter Increased")
                    counter++;
                }
            }
            if (counter == 3) {
                //console.log("Game Ended")
                endGame("circles");
                return 1;
                
                

            }
            //console.log("Counter has been reset")
            counter = 0;
        }


        //console.log("Checking Circles Vertical:")
        for (let i = 0; i < fieldSize; i++) {
            //console.log("i="+i);
            for (let j = 0; j < fieldSize * 2 + 1; j += fieldSize) {
                //console.log("j="+j);
                //console.log("i+j="+parseInt(j+i));
                //console.log("checkup:: "+i+" "+j);
                if ((cells[j + i].classList.contains("circle"))) {
                    //console.log("Counter Increased")
                    //console.log("increasing $counter because cells["+j+"]' classList contains circle.")
                    counter++;

                }
            }
            if (counter == 3) {
                //console.log("Game Ended")
                endGame("circles");
                return 1;
            }
            //console.log("Counter has been reset")
            counter = 0;
            //console.log("counterRESET; counter:: "+ counter)
        }
        //console.log("Checking Circles Diagonal:")
        if (fieldSize == 3) {
            if (((cells[0].classList.contains("circle")) && (cells[4].classList.contains("circle")) && (cells[8].classList.contains("circle"))) || ((cells[2].classList.contains("circle")) && (cells[4].classList.contains("circle")) && (cells[6].classList.contains("circle")))) {
                endGame("circles");
                //console.log("Game Ended")
                return 1;

            }
        }


       // console.log("Checking Crosses Horizontal:")
        for (let i = 0; i < fieldSize; i++) {
           // console.log("i="+i);
            for (let j = i * fieldSize; j < i * fieldSize + fieldSize; j++) {
               // console.log("j="+j);
                if ((cells[j].classList.contains("cross"))) {
                  //  console.log("Counter Increased")
                    counter++;
                }
            }
            if (counter == 3) {
                endGame("crosses");
               // console.log("Game Ended")
                return 1;
            }
            counter = 0;
           // console.log("Counter Increased")
        }
       // console.log("Checking Crosses Vertical:")
        for (let i = 0; i < fieldSize; i++) {
            //console.log("i="+i);
            for (let j = 0; j < fieldSize * 2 + 1; j += fieldSize) {
                //console.log("j="+j);
               // console.log("i+j="+parseInt(j+i));
                if ((cells[j + i].classList.contains("cross"))) {
                    //console.log("increasing $counter because cells["+j+"]' classList contains cross.")
                    //console.log("Counter Increased")
                    counter++;

                }
            }
            if (counter == 3) {
                endGame("crosses");
               // console.log("Game Ended")
                return 1;
            }
            counter = 0;
           // console.log("Counter has been reset")
            //console.log("counterRESET; counter:: "+ counter)
        }
        //console.log("Checking Crosses Diagonal:")
        if (fieldSize == 3) {
            if (((cells[0].classList.contains("cross")) && (cells[4].classList.contains("cross")) && (cells[8].classList.contains("cross"))) || ((cells[2].classList.contains("cross")) && (cells[4].classList.contains("cross")) && (cells[6].classList.contains("cross")))) {
                endGame("crosses");
                //console.log("Game Ended")
                return 1;
            }
        }
        //console.log("Checking Done. 1");
    }

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            if (!cell.classList.contains("circle") && !cell.classList.contains("cross")) {
                if (circleTurn) {
                    //console.log("added to "+cell)
                    cell.classList.add("circle");
                    filledCells++;
                }

                if (!circleTurn&&difficulty) {
                   // console.log("added to "+cell)
                    cell.classList.add("cross");
                    filledCells++;
                }
                //console.log("FILLEDCELLS="+filledCells)
/*
                if(checkGameState(fieldSize)){
                    console.log("Circles Win")
                    endGame("circles");
                    return 0;
                }
*/
                circleTurn = !circleTurn;
               // console.log(index);
                if (difficulty == 0) {
                    randomTile = Math.round(Math.random() * 8);
                    while (cells[randomTile].classList.contains("circle") || cells[randomTile].classList.contains("cross")) {
                        randomTile = Math.round(Math.random() * 8);
                        if (filledCells >= fieldSize * fieldSize) {
                            break;
                        }
                    }

                    if (filledCells >= fieldSize * fieldSize) {
                        if(!checkGameState(fieldSize)){
                           // console.log("Draw")
                            endGame("draw");
                            return 0;
                        }
                        
                        


                    } else {
                        cells[randomTile].classList.add("cross");
                        if (game.style.pointerEvents != "none") {
                            checkGameState(fieldSize);
                        }
                    }

                    filledCells++;
                   // console.log(randomTile)
                }
                else if (difficulty==1){
                    if (filledCells >= fieldSize * fieldSize) {
                        if(!checkGameState(fieldSize)){
                          //  console.log("Draw")
                            endGame("draw");
                            return 0;
                        }
                    }

                    checkGameState(fieldSize);
                    circleTurn = !circleTurn;

                }
                circleTurn = !circleTurn;

            }

        })
    })

    document.querySelectorAll(".dark-btn").forEach(button => {
        button.addEventListener("click", () => {
            changeTheme();
            
        })
    })

    document.querySelectorAll(".restart").forEach(button => {
        button.addEventListener("click", () => {
             restartGame();
        })
    })
    document.querySelectorAll(".back").forEach(button => {
        button.addEventListener("click", () => {
            openMainMenu();
        })
    })
})