document.addEventListener('DOMContentLoaded', () => {
    gameMode = "computer"
    if (localStorage.gameMode) {
        gameMode = localStorage.gameMode
    } else {
        localStorage.gameMode = "computer"
    }
    console.log(gameMode)

    pieces = { redUrl: "url(images/redPiece.png)", yellowUrl: "url(images/yellowPiece.png)" }
    board = document.querySelector("#board")
    board_overlay = document.querySelector("#board_overlay")
    playerInfo1 = document.querySelector("#playerInfo1")
    playerInfo2 = document.querySelector("#playerInfo2")
    circles = []
    circle = document.querySelector(".circle")
    const overhead_cicles = document.getElementById('over_board').children;

    function shuffle(arr) {
        arr.sort(() => Math.random() - 0.5);
        return arr
    }
    temp = shuffle([{ url: "url(images/redPiece.png)", class: "redPiece" }, { url: "url(images/yellowPiece.png)", class: "yellowPiece" }])
    player1 = { numPieces: 24, url: temp[0].url, class: temp[0].class, turn: true }
    player2 = { numPieces: 24, url: temp[1].url, class: temp[1].class, turn: false }
    const overlay_cols = []

    function playerInfo_setup(playerInfo, player, n) {
        let c_over = document.createElement("div")
        let label = document.createElement("button")
        label.id = "label"
        label.innerText = "Player" + n
        c_over.classList.add("circle")
        c_over.classList.add(player.class)
        playerInfo.appendChild(c_over)
        playerInfo.appendChild(label)
    }

    function playerInfo_update(playerInfo, player, n) {

        let label = playerInfo.querySelector("button")
        // console.log(">>>", gameMode)

        if (player.turn) {
            if (gameMode == "computer" && player == player2) {
                label.innerText = "Computer's Turn"
            } else {
                label.innerText = "Player" + n + "'s Turn"
            }

        } else {
            if (gameMode == "computer" && player == player2) {
                label.innerText = "Computer"
            } else {
                label.innerText = "Player" + n
            }

        }

    }


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

        let num = 0;
        for (let r = 0; r < 6; r++) {
            row = []
            for (let c = 0; c < 7; c++) {
                if (num < 42) {
                    clone = circle.cloneNode("true")
                    board.appendChild(clone)
                    row.push(clone)
                }

            }
            circles.push(row)
            num++
        }


        board.removeChild(circle)

    }

    function setup_board_overlay() {
        // console.log(overhead_cicles)

        for (let c = 0; c < 7; c++) {
            col_ovly = document.createElement("div")
            col_ovly.classList.add("column_overlay")
            col_ovly.addEventListener('mouseover', () => {
                const circle = overhead_cicles.item(c);
                // console.log(circle)
                if (player1.turn) {
                    circle.style.backgroundImage = player1.url
                } else {
                    circle.style.backgroundImage = player2.url
                }
            })

            col_ovly.addEventListener('mouseout', () => {
                const circle = overhead_cicles.item(c);
                // console.log(circle)
                if (player1.turn) {
                    circle.style.backgroundImage = "none"
                } else {
                    circle.style.backgroundImage = "none"
                }
            })
            board_overlay.appendChild(col_ovly)
        }


        let idx = 0
        for (const element of document.getElementById('board_overlay').children) {
            overlay_cols.push({ column: element, index: idx, columnList: [], shouldColor: 6 },)
            colobj = overlay_cols[overlay_cols.length - 1]
            for (let j = 0; j < 6; j++) {
                // console.log("jjjjjj", colobj.index)
                colobj.columnList.push(circles[j][colobj.index])
            }
            idx++
        }
    }

    function colClicks() {
        for (const colobj of overlay_cols) {
            // {column:element, index:0, columnList:[]}
            colobj.column.addEventListener('click', () => {
                player = null
                if (player1.turn) {
                    player = player1
                } else {
                    player = player2
                }

                if (gameMode == "computer" && player == player2) {
                    alert("Computer's  Turn")

                } else {

                    console.log("jjjjjj", colobj.index, colobj.shouldColor)
                    colobj.shouldColor--;
                    if (colobj.shouldColor >= 0 && !colobj.columnList[colobj.shouldColor].classList.contains(player.class)) {
                        colobj.columnList[colobj.shouldColor].classList.add(player.class)
                    }
                    player.numPieces--
                    player1.turn = !player1.turn
                    player2.turn = !player2.turn
                }
            })
        }
    }

    create_GameBoard()
    setup_board_overlay()
    playerInfo_setup(playerInfo1, player1, 1)
    playerInfo_setup(playerInfo2, player2, 2)



    setInterval(() => {

        playerInfo_update(playerInfo1, player1, 1)
        playerInfo_update(playerInfo2, player2, 2)


    }, 100)

    setInterval(() => {

        if (gameMode == "computer" && player2.turn) {

            alert("****Computer's  Turn******")

            if( player2.turn){

                let pos = Math.floor(Math.random() * 7)
                console.log(pos)
                const colobj = overlay_cols[pos];
                console.log(colobj,player2.class)
                if (colobj.shouldColor >= 0 && !colobj.columnList[colobj.pos].classList.contains(player2.class)
                && !colobj.columnList[colobj.shouldColor].classList.contains(player1.class)) {
                    colobj.columnList[colobj.shouldColor].classList.add(player2.class)
                    player1.turn = !player1.turn
                    player2.turn = !player2.turn
                }else{
                    console.log("computer is trying again")
                }
                player2.numPieces--
            }


            
          
        }

    }, 1000)



    colClicks()

    // function blah(i, j, c1, c2) {
    //     if (j % 2 == 0) {
    //         circles[i][j].style.backgroundImage = c1
    //     } else {
    //         circles[i][j].style.backgroundImage = c2
    //     }
    // }

    // function setup_toDelete_later() {
    //     for (let i = 0; i < 6; i++) {

    //         for (let j = 0; j < 7; j++) {
    //             if (i % 2 == 0) {
    //                 blah(i, j, pieces.redUrl, pieces.yellowUrl)
    //             } else {
    //                 blah(i, j, pieces.yellowUrl, pieces.redUrl)
    //             }
    //         }
    //     }
    // }
})