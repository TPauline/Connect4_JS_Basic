document.addEventListener('DOMContentLoaded', () => {
    board = document.querySelector("#board")
    console.log(board)
 
    circle = document.querySelector(".circle")
    pieces={ red : "url(images/redPiece.png)", yellow : "url(images/yellowPiece.png)" }
    circles = []

    for (let r = 0; r < 7; r++) {   
            row = []
            for (let c = 0; c <7; c++) {
                clone = circle.cloneNode("true")
                clone.classList.add(".circle")
                board.appendChild(clone)
                row.push(clone)
            }
            circles.push(row)
    }
    board.removeChild(circle)

    // rv = 25
    // circles = []
    // for (let r = 0; r < 6; r++) {
    //     lv = 5
    //     row = []
    //     for (let c = 0; c < 7; c++) {
    //         clone = circle.cloneNode("true")
    //         clone.classList.add(".circle")
    //         document.body.appendChild(clone)
    //         clone.style.left = "calc((100vw + " + lv + "vh - (590px))/2 )"
    //         clone.style.top = " calc(" + rv + "vh + 10px)"
    //         lv += 23
    //         row.push(clone)
    //     }
    //     circles.push(row)
    //     rv += 10
    // }
    console.log(circles)

    // function setPiece(circle, piece) {
    //     circle.style.backgroundImage = piece
    //     circle.style.backgroundSize = "11vh"
    //     circle.style.backgroundRepeat = "no-repeat"
    //     circle.style.backgroundPosition = "-11px -11px"
    // }

    // setPiece(circles[0][0], pieces.red)
    // setPiece(circles[1][5], pieces.yellow)
    
})