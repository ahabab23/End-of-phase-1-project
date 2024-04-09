const countriesUrl = "https://restcountries.com/v3.1/all";
document.addEventListener("DOMContentLoaded", function () {
    fetchData()
    

})


function fetchData() {
    fetch(countriesUrl)
        .then((response) => {
            return response.json();
        }).then((data) => {
            countryInfo(data);

        })

}
function countryInfo(countries) {
    countries.forEach(country => {
        const countriesInfo = document.querySelector(".countries")
        const html = `
        <div class="country">
          <img class="country_img" src="${country.flags.svg}" />
          <div class="country_data">
            <h3 class="country_name">${country.name.common}</h3>
            <h4 class="country_region">${country.region}</h4>
            <p class="country_row"><span>👫</span>${(
                +country.population / 1000000
            ).toFixed(1)} M people</p>
            <p class="country_row"><span>🗣️</span>${Object.values(country.languages)[0]}</p>
            <p class="country_row"><span>💰</span>${Object.values(country.currencies)[0].name}</p>
          </div>
        </div>
        `;
        countriesInfo.insertAdjacentHTML('beforeend', html);
    });

}
function filterCountries() {
    // Add event listener to search input
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', () => {
        let value = searchInput.value.toLowerCase();
        // Filter countries based on search input
        const countries = document.querySelectorAll('.country');
        countries.forEach(country => {
            const countryName = country.querySelector('.country_name').textContent.toLowerCase();
            if (countryName.includes(value)) {
                country.style.display = 'inline-block';
              
            } else {
                country.style.display = 'none';
            }
        });
    });
}






filterCountries()