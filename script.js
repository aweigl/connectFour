var column = $(".column");
var curPlayer = "tokenYellow";
var slotsInColumn;
var player1;
var player2;
var col;
var row;
var playTime = false;

$(".myButton").on("mouseover", function(e) {
    $(".myButton").effect("shake", { times: 10 }, 1300);
    e.stopPropagation();
});

$(".myButton").on("click", function chooseName() {
    $(".myButton").css("display", "none");
    player1 = prompt("Player 1, insert your name:");
    player2 = prompt("Player 2, insert your name:");
    $("<div class = 'player1'>" + player1 + "</div>").appendTo(".topColumn");
    $("<div class = 'player2'>" + player2 + "</div>").appendTo(".topColumn");
    $("<p>" + player1 + " begins! </p>").appendTo(".modal");
    $(".modal").modal();
    setTimeout(function() {
        $.modal.close();
    }, 1500);
    $(".arrow")
        .children("img")
        .css("display", "block");
    $(".board").on("mousemove", function(e) {
        var arrow = $(".arrow").children("img");
        var half = arrow.outerWidth() / 2;
        console.log(half);
        arrow.css("left", e.pageX - half + "px");
    });
    playTime = true;
});

function playAgain() {
    $("<p> Play again? </p>").appendTo(".modal2");
    $("button").css("display", "block");
    $(".modal2").modal();
    $("#yesButton").on("click", function() {
        location.reload();
    });
    $("#noButton").on("click", function() {
        $(".modal2").html("");
        $("<p> Tough luck, we only have this game. </p>").appendTo(".modal");
        setTimeout(function() {
            location.reload();
        }, 2000);
    });
}

function winner1() {
    $("<p>" + player1 + " wins!</p>").appendTo(".modal3");
    $("audio#pop")[0].play();
    $(".modal3").modal();
}

function winner2() {
    $("<p>" + player2 + " wins!</p>").appendTo(".modal3");
    $("audio#pop")[0].play();
    $(".modal3").modal();
}

function full() {
    $("<p> Please choose another slot. This one is full </p>").appendTo(
        ".modal4"
    );
    $(".modal4").modal();
    setTimeout(function() {
        $.modal.close();
    }, 800);
}

function playerSwap() {
    if (curPlayer == "tokenYellow") {
        curPlayer = "tokenRed";
        $(".player2").css("text-shadow", "2px 2px 5px red");
        $(".player1").css("text-shadow", "");
        $(".redCoin").effect("shake", { times: 1 }, 1000);
    } else {
        curPlayer = "tokenYellow";
        $(".player1").css("text-shadow", "2px 2px 5px yellow");
        $(".player2").css("text-shadow", "");
        $(".yellowCoin").effect("shake", { times: 1 }, 1000);
    }
}

function checkWin(arg) {
    var wins = "";
    for (var i = 0; i < arg.length; i++) {
        if (arg.eq(i).hasClass(curPlayer)) {
            wins += "yes";
        } else {
            wins += "no";
        }
    }
    setTimeout(function() {
        if (wins.includes("yesyesyesyes")) {
            if (curPlayer == "tokenYellow") {
                winner2();
            } else {
                winner1();
            }
            setTimeout(function() {
                playAgain();
            }, 2000);
        }
    }, 200);
}

function checkWinDiag1(row, col) {
    var wins = "";
    var diags = [];

    col = col - 3;
    row = row + 3;

    for (var j = 0; j < 7; j++) {
        diags.push(
            column
                .eq(col)
                .children()
                .eq(row)
        );
        col++;
        row--;
    }

    for (var i = 0; i < diags.length; i++) {
        if (diags[i].hasClass(curPlayer)) {
            wins += "yes";
        } else {
            wins += "no";
        }
    }
    setTimeout(function() {
        if (wins.includes("yesyesyesyes")) {
            if (curPlayer == "tokenYellow") {
                winner2();
            } else {
                winner1();
            }
            setTimeout(function() {
                playAgain();
            }, 2000);
        }
    }, 200);
}

function checkWinDiag2(row, col) {
    var wins = "";
    var diags = [];

    col = col - 3;
    row = row - 3;

    for (var j = 0; j < 7; j++) {
        diags.push(
            column
                .eq(col)
                .children()
                .eq(row)
        );
        col++;
        row++;
    }

    for (var i = 0; i < diags.length; i++) {
        if (diags[i].hasClass(curPlayer)) {
            wins += "yes";
        } else {
            wins += "no";
        }
    }
    setTimeout(function() {
        if (wins.includes("yesyesyesyes")) {
            if (curPlayer == "tokenYellow") {
                winner2();
            } else {
                winner1();
            }
            setTimeout(function() {
                playAgain();
            }, 2000);
        }
    }, 200);
}

column.on("click", function colorChange(e) {
    if (playTime == false) {
        return;
    } else {
        slotsInColumn = $(e.currentTarget).find(".slot");
        for (var i = 5; i < slotsInColumn.length; i--) {
            if (
                !slotsInColumn.eq(i).hasClass("tokenRed") &&
                !slotsInColumn.eq(i).hasClass("tokenYellow")
            ) {
                slotsInColumn.eq(i).addClass(curPlayer);
                break;
            } else if (
                slotsInColumn.eq(0).hasClass("tokenRed") ||
                slotsInColumn.eq(0).hasClass("tokenYellow")
            ) {
                full();
                break;
            }
        }
    }
    col = $(e.currentTarget).index();
    row = i;

    if (checkWin(slotsInColumn)) {
        return;
    } else if (checkWinDiag1(row, col)) {
        return;
    } else if (checkWinDiag2(row, col)) {
        return;
    } else {
        var slotsInRows = $(".row" + i);
        if (checkWin(slotsInRows)) {
            return;
        }
    }

    playerSwap();
});
