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
    document.getElementById('scheduleForm').addEventListener('submit', function (event) {
        event.preventDefault();
    
        const teamName1 = document.querySelector('.teamName').value;
        const matchDate1 = document.querySelector('.matchDate').value;
    
        const data = {
            matchInfoArray: [[teamName1, matchDate1]],
        };
    
        fetch('/schedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
    

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
