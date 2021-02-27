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
        if (data.api == "Rankings") {
            console.log("here")
            ranks = data.list;
            html = '<tr> <th>Rank</th> <th>Team</th> <th>Win Points</th> <th>Auton Points</th> <th>Skills</th> </tr>'
            for (i = 0; i < Object.keys(ranks).length; i++) {
                teamdata = ranks[i + 1]
                html += '<tr> <td>' + teamdata.rank + '</td> <td>' + teamdata.team + '</td> <td>' + teamdata.wp + '</td> <td>' + teamdata.ap + '</td> <td>' + teamdata.skills + '</td> </tr>'
            }
            document.querySelector("#teamsInQueue").innerHTML = html;
        }
        else {
          console.log(data.api)
        }
  };
}
