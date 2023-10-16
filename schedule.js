const { Client } = require('pg');
function schedule() {
    const startDate = new Date(document.getElementById('mydate').value);
    const teams = document.querySelectorAll('.t');
    const matchInfoArray = [];

    for (let i = 0; i < teams.length; i++) {
        const matchDate = new Date(startDate);
        matchDate.setDate(startDate.getDate() + i);

        const teamName = teams[i].querySelector('h4').textContent;
        const matchDateString = formatDate(matchDate);
        matchInfoArray.push([teamName, matchDateString]);
    }
    myFunction();
    document.getElementById('sbutton2').addEventListener('click', function () {
        window.location.href = 'match_info.html';
        sessionStorage.setItem('matchInfoArray', JSON.stringify(matchInfoArray));
    });
  

    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'teams', // Replace with your database name
        password: '1002',
        port: 5432, // Default PostgreSQL port
    });

    client.connect();

    for (const [teamName, matchDateString] of matchInfoArray) {
        const query = {
            text: 'INSERT INTO teamdetail(teamname, date) VALUES($1, $2)',
            values: [teamName, matchDateString],
        };

        client.query(query, (err, res) => {
            if (err) {
                console.error('Error executing query', err);
            }
        });
    }

    client.end();
    console.log(matchInfoArray);
}

function formatDate(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString(undefined, options);
}
function myFunction() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
