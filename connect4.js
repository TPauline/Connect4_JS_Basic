document.addEventListener('DOMContentLoaded', () => {
    board = document.querySelector("#board")
    console.log(board)
    circle = document.querySelector(".circle")
    piecesholder1 = document.querySelector("#piecesholder1")
    piecesholder2 = document.querySelector("#piecesholder2")


    pieces={ red : "url(images/redPiece.png)", yellow : "url(images/yellowPiece.png)" }

    

   for(let i =0; i<11; i++ ){
      img = document.createElement("img")
      img.src = "images/downredPiece.png"
      img.classList.add("downredPiece")
      piecesholder1.appendChild(img)
   }

   for(let i =0; i<11; i++ ){
    img = document.createElement("img")
    img.src = "images/downyellowPiece.png"
    img.classList.add("downyellowPiece")
    piecesholder2.appendChild(img)
 }
    
    rv = 25
    circles = []
    for (let r = 0; r < 6; r++) {
        lv = 0
        row = []
        for (let c = 0; c < 7; c++) {
            clone = circle.cloneNode("true")
            clone.classList.add(".circle")
            document.body.appendChild(clone)
            clone.style.left = "calc((100vw + " + lv + "vh - (590px))/2 )"
            clone.style.top = " calc(" + rv + "vh + 10px)"
            lv += 20
            row.push(clone)
        }
        circles.push(row)
        rv += 10
    }
    document.body.removeChild(circle)

    function setPiece(circle, piece) {
        circle.style.backgroundImage = piece
        circle.style.backgroundSize = "11vh"
        circle.style.backgroundRepeat = "no-repeat"
        circle.style.backgroundPosition = "-11px -11px"
    }

    setPiece(circles[0][0], pieces.red)
    setPiece(circles[1][5], pieces.yellow)
    
})