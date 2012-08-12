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

    base.addEventListener('click', function (event) {
      var rect = event.target.getBoundingClientRect(),
          x = event.clientX - rect.left,
          y = event.clientY - rect.top;
      if (x > base.width / 3 && x < base.width * 2 / 3) {
        if (y > 300 && y < 350) {
          toggleDisplay(doc.getElementById("game"));
        }
      }
    }, true);

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
