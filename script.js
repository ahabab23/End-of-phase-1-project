const countriesUrl = "https://restcountries.com/v3.1/all";

document.addEventListener("DOMContentLoaded", function () {
    //Fetch data from API
    fetchData()
    // Filter countries from fetched data
    filterCountries()
    // Further filter countries by region
    filterCountriesByRegion()

})


// Function to fetch data from the API
function fetchData() {
    // Send a request to the API endpoint
    fetch(countriesUrl)
        .then((response) => {
            return response.json();
        }).then((data) => {
            // Once the data is parsed, pass it to the countryInfo function
            countryInfo(data);
        })

}

// Display country information
function countryInfo(countries) {
    countries.forEach(country => {
        const countriesInfo = document.querySelector(".countries")
        const language = country.languages ? Object.values(country.languages)[0] : 'N/A';
        const currency = country.currencies ? Object.values(country.currencies)[0].name : 'N/A';

        const html = `
        <div class="country">
          <img class="country_img" src="${country.flags.svg}" />
          <div class="country_data">
            <h3 class="country_name">${country.name.common}</h3>
            <h4 class="country_region">${country.region}</h4>
            <p class="country_row"><span>👫</span>${(
                +country.population / 1000000
            ).toFixed(1)} M people</p>
            <p class="country_row"><span>🗣️</span>${language}</p>
            <p class="country_row"><span>💰</span>${currency}</p>
          </div>
        </div>
        `;
        

        countriesInfo.insertAdjacentHTML('beforeend', html);
        // Add click event listener to each country element
        const countryElement = countriesInfo.lastElementChild;
        countryElement.addEventListener('click', () => {
        countriesInfo.style.display = 'none';
        document.querySelector("header").style.display='none'
            displayCountryInfo(country);
        });

    });

}

// Filter countries by search input
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


// display more information about a particuler country upon clicking
function displayCountryInfo(country) {
    const countryInfoSection = document.querySelector(".country-info");
    
    // Update the country info section with detailed data
    const language = country.languages ? Object.values(country.languages)[0] : 'N/A';
   
    countryInfoSection.innerHTML = `
     <button class="goBackBtn">Go back</button>
       <h2>${country.name.common}</h2>
        <img class="table-flag" src="${country.flags.svg}" alt="country flag">
        <div class="table-data">
            <div class="properties">
                <h3>Names</h3>
                <table>
                    <tr>
                        <th>Common</th>
                        <td>${country.name.common}</td>
                    </tr>
                    <tr>
                        <th>Official</th>
                        <td>${country.name.official}</td>
                    </tr>
                    <tr>
                          <th>Common(Native)</th>
                           <td>${country.name.nativeName[Object.keys(country.name.nativeName)[0]].common}</td>
    
                     </tr>
                     <tr>
                            <th>Official(Native)</th>
                            <td>${country.name.nativeName[Object.keys(country.name.nativeName)[0]].official}</td>
    
                    </tr>
                    <tr>
                             <th>Alternative Spellings</th>
                             <td>${country.altSpellings.join(", ")}</td>
                    </tr>
                    
                </table>
            </div>
            <div class="properties">
            <h3>LANGUAGES</h3>
            <table>
                <tr>
                    <th>Native Language</th>
                    <td>${language}</td>
                </tr>

                <tr class="lang">
                         <th>Languages</th>
                         <td>${Object.values(country.languages).join(', ')}</td>
                </tr>
                   
                    
                </tr> 
            </table>

             </div>
             <div class="properties">
                            <h3>CODES</h3>
                            <table>
                                <tr>
                                    <th>ISO 3166-1 alpha-2</th>
                                    <td>${country.cca2}</td>
                                </tr>
                                <tr>
                                    <th>ISO 3166-1 alpha-3</th>
                                    <td>${country.cca3}</td>
                                </tr>
                                <tr>
                                    <th>ISO 3166-1 numeric</th>
                                    <td>${country.ccn3}</td>
                                </tr>

                                <tr>
                                    <th>ISO 4217 currency code</th>
                                    <td>${Object.keys(country.currencies)}</td>
                                </tr>
                                <tr>
                                    <th>Top level domain</th>
                                    <td>${country.tld}</td>
                                </tr>
                            </table>
                            
                        </div>
                        <div class="properties">
                        <h3>GEOGRAPHY</h3>
                        <table>
                            <tr>
                                <th>Region</th>
                                <td>${country.region}</td>
                            </tr>
                            <tr>
                            <th>Subregion</th>
                            <td>${country.subregion}</td>
                             </tr>
                            <tr>
                                <th>Capital</th>
                                <td>${country.capital}</td>
                            </tr>
                            <tr>
                                <th>Demonym</th>
                                <td>${Object.keys(country.demonyms)[0]}</td>
                            </tr>
                            <tr>
                                <th>Lat/Lng</th>
                                <td>${country.latlng}</td>
                            </tr>
                            <tr>
                                <th>Area</th>
                                <td>${country.area} Km2</td>
                            </tr>
                            <tr>
                                <th>Land borders</th>
                                <th>${country.borders}</th>
                            </tr>
                        </table>
                    </div>


        </div>
    `;

    // Show the country info section
    countryInfoSection.style.display = 'block';
    // Adds event listener to go back button
    const goBackBtn=document.querySelector(".goBackBtn")
    const countriesInfo = document.querySelector(".countries")
    goBackBtn.addEventListener("click",function(){
        countryInfoSection.style.display = 'none';
        document.querySelector("header").style.display='block'

        countriesInfo.style.display = 'inline-block';
        
    })


}

// Filter countries by region
function filterCountriesByRegion(){
    const options=document.querySelector("#region")
    options.addEventListener('change',function(e){
        let value=e.target.value.toLowerCase()
        const countries=document.querySelectorAll(".country")
        countries.forEach(country=>{
            const countryRegion=country.querySelector(".country_region").textContent.toLowerCase()
            if(countryRegion.includes(value)){
                country.style.display = 'inline-block';

            }else{
                country.style.display = 'none';

            }
        })
         
    })

   
}
