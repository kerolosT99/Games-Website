// takes ui class to display details of selected game
export class GameDetailsModule {
    constructor() {

    }

    async fetchGameDetails(id) {
        
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '7786961b2dmsh8a8a97abd405f7bp1c45aejsnd19d31bfb9c8',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Failed to fetch game details');
            }
            const gameDetails = await response.json();
            return gameDetails;
        } catch (error) {
            console.error('Error fetching game details:', error);
            throw error;
        }
    }
}
