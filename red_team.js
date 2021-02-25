var websocket;
var accessCode = "0000-V-r3FEwc";

function login() {
    websocket = new WebSocket("wss://ecsrv.orcah.org:443");
  websocket.onopen = function(event) {
    console.log("Connected to server");
    websocket.send(JSON.stringify({api: "Login", operation: "login", accessCode: accessCode}));
  };
}

function labelify(obj) {
  if(!obj) return '';
  icon = obj.purpose == 1 ? 'gamepad' : 'laptop-code';
  return obj.teamNum + '&ensp;<i class="fas fa-' + icon + '"></i>';
}

function upcomingify(obj) {
  for(i=2; i<=obj.length+1; i++) {
    document.querySelector(".queue:nth-child(" + i + ")").innerHTML = labelify(obj[i-2]);
  }
  for(i=obj.length+2; i<=4; i++) {
    document.querySelector(".queue:nth-of-type(" + i + ")").innerHTML = "";
  }
}

function initTriple() {
  login();
  websocket.onmessage = function(event) {
      data = JSON.parse(event.data);
      if (data.api == "Livestream_Match") {
          document.querySelector('#label1').innerHTML = data.red
      }
      else {
          //console.log(data.api)
      }
  };
}
