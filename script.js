document.addEventListener('DOMContentLoaded', function () {
    let searchButton = document.getElementById('search');
    let searchBox = document.querySelector('.search-box');
    let moviesSection = document.querySelector('.movies-section');
  
    searchButton.addEventListener('click', function () {
      const searchTerm = searchBox.value.trim();
  
      if (searchTerm !== '') {
        moviesSection.innerHTML = '';
  
        fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
          .then(response => response.json())
          .then(data => {
            displayShows(data);
          })
          .catch(error => console.error('Error fetching data:', error));
      }
    });
  
    function displayShows(shows) {
      shows.forEach(show => {
        let movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
  
        movieCard.innerHTML = `
          <div class="movie-image">
            <img src="${show.show.image ? show.show.image.medium : 'placeholder-image-url'}" alt="${show.show.name}" />
          </div>
          <h3 class="movie-heading">${show.show.name}</h3>
          <div class="details">
            <div class="rating">
              <img src="https://pngimg.com/d/star_PNG41474.png" height="15"/>
              <h3>${show.show.rating.average || 'N/A'}</h3>
            </div>
            <p>${show.show.genres.join(' | ')}</p>
          </div>
          <button class="button" onclick="window.open('${show.show.url}', '_blank')">Website</button>
        `;
  
        moviesSection.appendChild(movieCard);
      });
    }
  });
  