var websocket;
var accessCode = "0000-V-r3FEwc";

function login() {
    websocket = new WebSocket("wss://ecsrv.orcah.org:443");
  websocket.onopen = function(event) {
    console.log("Connected to server");
    websocket.send(JSON.stringify({api: "Login", operation: "login", accessCode: accessCode}));
  };
}


function initTriple() {
  login();
    websocket.onmessage = function (event) {
      data = JSON.parse(event.data);
        if (data.api == "Livestream_Results") {
            console.log(data);
            document.querySelector('#score').innerHTML = data.r_score;
      }
      else {
          console.log(data.api)
      }
  };
}
