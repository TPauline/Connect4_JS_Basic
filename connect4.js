document.addEventListener('DOMContentLoaded', () => {
    board = document.querySelector("#board")
    board_overlay = document.querySelector("#board_overlay")
    // console.log(board)
    pieces={ red : "url(images/redPiece.png)", yellow : "url(images/yellowPiece.png)" }
    circles = []
    circle = document.querySelector(".circle")
    console.log(board.offsetLeft, board.offsetTop)

    function create_GameBoard(){
        board.style.top = board.offsetTop + 120+ "px"
        

        over_board = document.querySelector("#over_board")

        for (let i = 0; i <7; i++) {
            let c_over = document.createElement("div")
            c_over.classList.add("circle")
            c_over.style.borderColor = "transparent"
            c_over.style.backgroundColor = "transparent"
            over_board.appendChild(c_over)
        }

       
        for (let r = 0; r < 6; r++) {   
                row = []
                for (let c = 0; c <7; c++) {
                    clone = circle.cloneNode("true")
                    board.appendChild(clone)
                    row.push(clone)
                }
                circles.push(row)
        }

        board.removeChild(circle)
    }
    
    

    function setup_board_overlay(){


        for (let c = 0; c <7; c++) {
            let col_ovly = document.createElement("div")
            col_ovly.classList.add("column_overlay")
            board_overlay.appendChild(col_ovly)
            
        }
              
    }

// circles[6][0].style.background_color = pieces.red
    create_GameBoard()
    setup_board_overlay()

    console.log(circles)
    circles[5][0].style.backgroundImage = pieces.red
    console.log(circles[5][0])
    circles[5][6].style.backgroundImage = pieces.yellow
    console.log(circles[5][5])
  


    
})