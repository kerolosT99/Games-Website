// 2 functions to display data, display games and display details
import { GameDetailsModule } from "./details.module.js"
export class UIModule {
  constructor(category) {
    this.category = category
    this.gameDetailsModule = new GameDetailsModule()
    this.displayCategory()
  }

  displayCategory() {
   
    let renderBox = ``
    for (let i = 0; i < this.category.length; i++) {
      renderBox += `<div class="col-md-3">
            <div class="card" id="${this.category[i].id}">
              <img src="${this.category[i].thumbnail}" class="card-img-top img-fluid">
              <div class="card-body">
                <div class="title-access d-flex justify-content-between">
                  <h5 class="card-title title-font">${this.category[i].title}</h5>
                  <span class="badge text-bg-primary p-2">Free</span>
                </div>
    
                <p class="card-text small text-center text-white-50">${this.category[i].short_description.split(" ").splice(0, 15).join(" ")}.</p>
              </div>
              <div class="card-footer small hstack justify-content-between">
                <span class="badge badge-color">${this.category[i].genre}</span>
                <span class="badge badge-color">${this.category[i].platform}</span>
              </div>
            </div>
          </div>`
    }
    let categoriesBox = document.querySelector('.games-display')
    categoriesBox.innerHTML = renderBox
    this.displayDetails()
  }
  displayDetails() {
    document.querySelectorAll('.card').forEach(element => {
      element.addEventListener('click', async () => {
        let gameID = element.getAttribute('id');
        try {
          const gameDetails = await this.gameDetailsModule.fetchGameDetails(gameID);
          this.selectGame(gameDetails);
        } catch (error) {
          console.error('Error fetching game details:', error);
        }
      });
    });
  }

  selectGame(gameDetails) {
    this.gamesCategory = document.querySelector('.display-games');
    this.gamesCategory.classList.add('d-none');
    this.showDetails = document.querySelector('.display-details');
    this.showDetails.classList.replace('d-none', 'd-block');
    this.showDetails.innerHTML = '<span class="loader"></span>'
    console.log(gameDetails);
    let renderBox = `
      <div class="container">
      <div class="title-control d-flex justify-content-between align-items-end">
      <h1 class="title-font">Game Details</h1>
      <button class="btn-close btn-close-white" id="btnClose"></button>
    </div>
        <div class="row details-info">
          <div class="col-md-3">
            <img src="${gameDetails.thumbnail}" class="w-100" alt="${gameDetails.title}">
          </div>
          <div class="col-md-9">
            <h3 class="title-font">Title: ${gameDetails.title}</h3>
            <p class="text-white">Category: <span class="badge text-bg-info text-black text-uppercase">${gameDetails.genre}</span></p>
            <p class="text-white">Platform: <span class="badge text-bg-info text-black">${gameDetails.platform}</span></p>
            <p class="text-white">Status: <span class="badge text-bg-info text-black">${gameDetails.status}</span></p>
            <p class="text-white small">${gameDetails.description}</p>
            <button class="show-game btn btn-outline-warning text-white fw-bolder")">Show Game</button>
          </div>
        </div>
      </div>`;

    this.showDetails.innerHTML = renderBox;
    const showGameButton = document.querySelector('.show-game')
    showGameButton.addEventListener('click', () => {
      window.open(gameDetails.game_url, `_blank`)
    })
    const closeGameButton = document.querySelector('#btnClose')
    closeGameButton.addEventListener('click', () => {
      this.showDetails.classList.replace('d-block', 'd-none')
      this.gamesCategory.classList.replace('d-none', 'd-block');
    })
  }
}
