const form = document.getElementById('vote-form');
var event;

form.addEventListener('submit', e=>{
    
    const choice = document.querySelector('input[name=option]:checked').value;
    const data = {team: choice};

    fetch('http://localhost:3000/poll',{
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
    .catch(err => console.log(err));

    e.preventDefault();
});

fetch("http://localhost:3000/poll")
    .then(res => res.json())
    .then(data => {
        let votes = data.votes;
        let totalVotes = votes.length;
        //document.querySelector('#chartTitle').textContent = `Total Votes: ${totalVotes}`;

        let voteCounts = {
            Barcelona: 0,
            RealMadrid: 0,
            Liverpool: 0,
            Arsenal: 0
        };

        voteCounts = votes.reduce((acc, vote) => (
            (acc[vote.team] = (acc[vote.team] || 0) + parseInt(vote.points)), acc),
            {}
        );

        let dataPoints = [
            { label: 'Barcelona', y: voteCounts.Barcelona },
            { label: 'Real Madrid', y: voteCounts.RealMadrid },
            { label: 'Liverpool', y: voteCounts.Liverpool },
            { label: 'Arsenal', y: voteCounts.Arsenal }
        ];
            
        const chartContainer = document.querySelector('#chartContainer');
        
        if(chartContainer){
            
            const chart = new CanvasJS.Chart('chartContainer', {
                animationEnabled: true,
                theme: 'theme1',
                title: {
                    text: `Total Votes: ${totalVotes}`
                },
                data:[
                    {
                        type: 'column',
                        dataPoints: dataPoints
                    }
                ]
            });
            chart.render();
        
             // Enable pusher logging - don't include this in production
            Pusher.logToConsole = true;
        
            var pusher = new Pusher('989c731db992728b5b90', {
                cluster: 'ap2',
                encrypted: true
            });

            var channel = pusher.subscribe('question-poll');

            channel.bind('question-vote', function(data) {
                dataPoints.forEach((point)=>{
                    if(point.label==data.team)
                    {
                        point.y+=data.points;
                        totalVotes+=data.points;
                        event = new CustomEvent('votesAdded',{detail:{totalVotes:totalVotes}});
                        // Dispatch the event.
                        document.dispatchEvent(event);
                    }
                });
                chart.render();
            });
        }

});