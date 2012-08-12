(function (win, doc) {
  // for debug function.
  function fordebug () {
    btn = ["start_btn", "game_btn", "over_btn"]
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
  function toggleDisplay (elem) {
    if (elem.style.display == "block") {
      elem.style.display = "none";
    } else {
      elem.style.display = "block";
    }
  }

  // start ui.
  function start () {
    fordebug();
    base = doc.getElementById("start")
    baseCon = base.getContext("2d");
    baseCon.fillStyle = "rgb(168,168,255)";
    baseCon.fillRect(0,0,base.width,base.height);
    baseCon.beginPath();
    baseCon.strokeStyle = "rgb(255,255,255)";
    baseCon.lineWidth = 4;
    baseCon.rect(200,200,100,100);
    baseCon.stroke();
  }

  win.onload = start;

}(window, document));
