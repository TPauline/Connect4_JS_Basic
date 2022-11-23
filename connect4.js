document.addEventListener('DOMContentLoaded', () => {
    gameMode = null
    if (localStorage.gameMode) {
        gameMode = localStorage.gameMode
    } else {
        localStorage.gameMode = "computer"
    }
    console.log(gameMode)

    board = document.querySelector("#board")
    const overhead_cicles = document.getElementById('over_board').children;
    board_overlay = document.querySelector("#board_overlay")
    pieces = { red: "url(images/redPiece.png)", yellow: "url(images/yellowPiece.png)" }
    circles = []
    circle = document.querySelector(".circle")
    // console.log(board.offsetLeft, board.offsetTop)

    function shuffle(arr) {
        arr.sort(() => Math.random() - 0.5);
        return arr
    }
    temp = shuffle([pieces.red, pieces.yellow])
    player1 = { numPieces: 24, color: temp[0], turn: true }
    player2 = { numPieces: 24, color: temp[1], turn: false, mode:gameMode }

    function create_GameBoard() {
        board.style.top = board.offsetTop + 120 + "px"


        over_board = document.querySelector("#over_board")

        for (let i = 0; i < 7; i++) {
            let c_over = document.createElement("div")
            c_over.classList.add("circle")
            c_over.style.borderColor = "transparent"
            c_over.style.backgroundColor = "transparent"
            over_board.appendChild(c_over)
        }


        for (let r = 0; r < 6; r++) {
            row = []
            for (let c = 0; c < 7; c++) {
                clone = circle.cloneNode("true")
                board.appendChild(clone)
                row.push(clone)
            }
            circles.push(row)
        }

        board.removeChild(circle)
    }

function drop(row, col, end , color){
    if (color){
        color = false
    }else{
        color =true
    }
    
    console.log(row, color)
    if( row < end ){
        if (color){
            circles[row][col].style.backgroundImage  = player1.color
           
        }else{
            circles[row][col].style.backgroundImage  = "none"
            
            row++
        }

    }else if (row == end){
        circles[row][col].style.backgroundImage  = player1.color
        end--
    }
}

    function setup_board_overlay() {
        console.log(overhead_cicles)

        for (let c = 0; c < 7; c++) {
            let col_ovly = document.createElement("div")
            col_ovly.classList.add("column_overlay")
            col_ovly.addEventListener('mouseover',() =>{
                const circle = overhead_cicles.item(c);
                console.log(circle)
                if (player1.turn){
                    circle.style.backgroundImage  = player1.color
                }else{
                    circle.style.backgroundImage  = player2.color
                }
            })

            col_ovly.addEventListener('mouseout',() =>{
                const circle = overhead_cicles.item(c);
                console.log(circle)
                if (player1.turn){
                    circle.style.backgroundImage  = "none"
                }else{
                    circle.style.backgroundImage  = "none"
                }
            })

            col_ovly.addEventListener('click',() =>{
                const circle = overhead_cicles.item(c);
                console.log(circle)
                if (player1.turn){

                    circle.style.backgroundImage  = "none"
                    row = 0
                    end = 5
                    color = true
                    console.log(circles)
                    console.log("____",circles[0][c])
                    

                    setInterval(() =>{  
                        drop(row,c,end,color);
                    }, 1000)

                    // while ( row < 6  ){ //&& circles[row][c].style.backgroundImage  != player1.color
                    //     console.log(row)
                    //     circles[row][c].style.backgroundImage  = player1.color
                    //     // setTimeout(alert("4 seconds"),1000); 
                    //     // // circles[row][c].style.backgroundImage  ="none"
                    //     // setTimeout(alert("4 seconds"),1000); 
                    //     row++  
                        
                    // }
                    
                }else{
                    
                }
            })


            board_overlay.appendChild(col_ovly)
        }

    }

    create_GameBoard()
    setup_board_overlay()




    // circles[6][0].style.background_color = pieces.red


    // console.log(circles)
    // circles[5][0].style.backgroundImage = pieces.red
    // console.log(circles[5][0])
    // circles[5][6].style.backgroundImage = pieces.yellow
    // console.log(circles[5][5])







    function blah(i, j, c1, c2) {
        if (j % 2 == 0) {
            circles[i][j].style.backgroundImage = c1
        } else {
            circles[i][j].style.backgroundImage = c2
        }
    }
    function setup_toDelete_later() {
        for (let i = 0; i < 6; i++) {

            for (let j = 0; j < 7; j++) {
                if (i % 2 == 0) {
                    blah(i, j, pieces.red, pieces.yellow)
                } else {
                    blah(i, j, pieces.yellow, pieces.red)
                }
            }
        }
    }
    // setup_toDelete_later()


    // document.getElementById("vs_computer").addEventListener("click", () => {
    //     localStorage.gameMode = "computer"
    // });


    // document.getElementById("vs_user").addEventListener("click", () => {
    //     localStorage.gameMode = "user"
    // });


})