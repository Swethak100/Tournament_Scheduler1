function schedule() {
    const startDate = new Date(document.getElementById('mydate').value);
    const teams = document.querySelectorAll('.t');

    for (let i = 0; i < teams.length; i++) {
        const matchDate = new Date(startDate);
        matchDate.setDate(startDate.getDate() + i);

        const teamName = teams[i].querySelector('h4').textContent;
        const scheduleElement = teams[i].querySelector('.schedule');

        const matchDateString = formatDate(matchDate);
        const matchInfo = `Match scheduled for ${teamName} on ${matchDateString}.`;
        scheduleElement.textContent = matchInfo;
    }
}

function formatDate(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString(undefined, options);
}
