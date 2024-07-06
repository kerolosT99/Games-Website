// takes ui class to display the games of selected category
import { UIModule } from "./ui.module.js"
export class GameModule {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link')
        this.activeCategory = document.querySelector('.nav-link.active').getAttribute('href').slice(1)

        this.selectCategory(this.activeCategory)
    }

    renderActive() {
        this.navLinks.forEach(element => {
            element.addEventListener('click', () => {
                document.querySelector('.nav-link.active').classList.remove('active')
                element.classList.add('active')
                this.activeCategory = document.querySelector('.nav-link.active').getAttribute('href').slice(1)
                this.selectCategory(this.activeCategory)
            }
            )
        })
    }

    async selectCategory(category) {
        document.querySelector('.games-display').innerHTML = '<span class="loader"></span>'
        let API = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
        this.response = await (this.gamesAPI(API))

        const renderUI = new UIModule(this.response)
    }

    async gamesAPI(API) {
        const url = API
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '7786961b2dmsh8a8a97abd405f7bp1c45aejsnd19d31bfb9c8',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            return result
        } catch (error) {
            console.error(error);
        }
    }
}

