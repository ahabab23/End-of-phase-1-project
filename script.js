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
    const countryList = document.querySelector('.countries');
    searchInput.addEventListener('input', () => {
        const filter = searchInput.value.toLowerCase();
        countryList.querySelectorAll(".country_name").forEach(listItem => {
            const countryName = listItem.textContent.toLowerCase();
            listItem.style.display = countryName.includes(filter) ? 'block' : 'none';
        });
    })



}



filterCountries()


