(function (win, doc) {
  // for debug function.
  function fordebug() {
    var btn = ["start_btn", "game_btn", "over_btn"],
        btnLayer = {
          start_btn: "start",
          game_btn:  "game",
          over_btn:  "over"
    };
    btn.map(function (val, index, array) {
      doc.getElementById(val).onclick = function () {
        toggleDisplay(doc.getElementById(btnLayer[val]));
      }
    });
  }

  // toggle layers style display.
  function toggleDisplay(elem) {
    if (elem.style.display == "block") {
      elem.style.display = "none";
    } else {
      elem.style.display = "block";
    }
  }

  // start ui.
  function startPicture() {
    var base = doc.getElementById("start"),
        baseCon = base.getContext("2d");

    baseCon.fillStyle = "rgb(168, 168, 255)";
    baseCon.fillRect(0,0,base.width,base.height);
    baseCon.beginPath();
    baseCon.strokeStyle = "rgb(0, 0, 0)";
    baseCon.lineWidth = 1;
    baseCon.rect(base.width / 3, 300, base.width / 3, 50);
    baseCon.stroke();

    base.addEventListener("game_start", gamePicture, false);

    base.addEventListener('click', function (event) {
      var rect = event.target.getBoundingClientRect(),
          x = event.clientX - rect.left,
          y = event.clientY - rect.top,
          startGame = doc.createEvent("HTMLEvents");

      startGame.initEvent("game_start", true, false);

      if (x > base.width / 3 && x < base.width * 2 / 3) {
        if (y > 300 && y < 350) {
          this.dispatchEvent(startGame);
          // toggleDisplay(doc.getElementById("game"));
        }
      }
    }, false);

  }

  function gamePicture (event) {
    var game = doc.getElementById("game"),
        level = doc.getElementById("back_num").value,
        famulas = [],
        actual_answer = [],
        answer_check = [],
        i = 0,
        flg_miss = 0,
        l, famula, users_answer, expect;

    toggleDisplay(game);
    famulas = famulas.concat(createEasyFomulas(10));
    for (i, l = famulas.length; i < l; i+=1) {
      if (i < level) {
        famula = famulas[i].first + famulas[i].operator + famulas[i].second;
        answer_check.push(famula);
        actual_answer.push(eval(famula));
        alert(famula + "= ?");
      } else {
        famula = famulas[i].first + famulas[i].operator + famulas[i].second;
        answer_check.push(famula);
        actual_answer.push(eval(famula));
        users_answer = prompt(famula + "= ?");
        answer_check[i - level] += "= " + users_answer;
        expect = actual_answer.shift();
        if (users_answer != expect) {
          flg_miss = 1;
          break;
        }
      }
    }
    console.log(answer_check);
  }

  // make fomulas of the sum or the difference that an answer become 1 column.
  function createEasyFomulas (amount) {
    var fomulas = [], i = 0, x, y, big, small;
    for (; i < amount; i+=1) {
      x = (Math.random() * 10) >> 0;
      y = (Math.random() * 10) >> 0;

      big = x > y ? x : y;
      small = big === y ? x : y;

      if (big + small >= 9) {
        fomulas.push({
          first: big,
          second: small,
          operator: "-"
        });
      } else {
        fomulas.push({
          first: big,
          second: small,
          operator: "+"
        });
      }
    }
    return fomulas;
  }

  function decideBackNum(elems) {
    var back_num = doc.getElementById("back_num");
    elems.map(function (val, index, array) {
      switch (val.id) {
        case "level_up":
          val.onclick = function () {
            if (back_num.value * 1 < 9) {
              back_num.value = back_num.value * 1 + 1;
            }
          };
          break;
        case "level_down":
          val.onclick = function () {
            if (back_num.value * 1 > 0) {
              back_num.value = back_num.value * 1 - 1;
            }
          };
          break;
      }
    });
  }

  function start() {
    fordebug();
    startPicture();
    levelElem = doc.getElementsByClassName("level");
    decideBackNum(Array.prototype.slice.call(levelElem, 0));
  }

  win.onload = start;

}(window, document));
