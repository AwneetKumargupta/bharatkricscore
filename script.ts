document.addEventListener('DOMContentLoaded', function() {
    const liveScoreContainer = document.getElementById('liveScore');
    const upcomingMatchesContainer = document.getElementById('upcomingMatches');
    
    const apiKey = '31315130-e3d7-4785-b737-7537f4da995a'; // Your API key
    const seriesId = 'f53c8d6b-9b8b-4a5a-b35c-1a8286cb171b'; // Series ID for the API
    
    // Function to fetch series info including live cricket scores
    function fetchSeriesInfo() {
        const seriesInfoApiUrl = `https://api.cricapi.com/v1/series_info?apikey=${apiKey}&id=${seriesId}`;

        fetch(seriesInfoApiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                displaySeriesInfo(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                liveScoreContainer.innerHTML = '<p>Failed to load series information. Please try again later.</p>';
                upcomingMatchesContainer.innerHTML = '<p>Failed to load upcoming matches. Please try again later.</p>';
            });
    }

    // Function to display series info (live matches and upcoming matches)
    function displaySeriesInfo(data) {
        if (data && data.data) {
            const seriesData = data.data;
            
            // Display live matches
            liveScoreContainer.innerHTML = ''; // Clear previous content
            if (seriesData.matchList && seriesData.matchList.length > 0) {
                seriesData.matchList.forEach(match => {
                    const matchInfo = `
                        <div class="match">
                            <h3>${match.name}</h3>
                            <p>Status: ${match.status}</p>
                            <p>Score: ${match.score || 'Score not available'}</p>
                        </div>
                    `;
                    liveScoreContainer.innerHTML += matchInfo;
                });
            } else {
                liveScoreContainer.innerHTML = '<p>No live matches available at the moment.</p>';
            }

            // Display upcoming matches
            upcomingMatchesContainer.innerHTML = ''; // Clear previous content
            if (seriesData.upcomingMatches && seriesData.upcomingMatches.length > 0) {
                seriesData.upcomingMatches.forEach(match => {
                    const upcomingMatchInfo = `
                        <div class="upcoming-match">
                            <h3>${match.name}</h3>
                            <p>Date: ${new Date(match.date).toLocaleDateString()}</p>
                            <p>Venue: ${match.venue || 'Venue not available'}</p>
                        </div>
                    `;
                    upcomingMatchesContainer.innerHTML += upcomingMatchInfo;
                });
            } else {
                upcomingMatchesContainer.innerHTML = '<p>No upcoming matches at the moment.</p>';
            }
        } else {
            liveScoreContainer.innerHTML = '<p>Failed to fetch live match data.</p>';
            upcomingMatchesContainer.innerHTML = '<p>Failed to fetch upcoming match data.</p>';
        }
    }

    // Fetch series information on page load
    fetchSeriesInfo();
});
