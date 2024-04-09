const countriesUrl = "https://restcountries.com/v3.1/all";
document.addEventListener("DOMContentLoaded", function () {

    fetchData()
     filterCountries()
    

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



const countriesInfo = document.querySelector(".countries")
countriesInfo.addEventListener('click',function countryClick(countries){
    const container=document.querySelector(".container")
    const countriesData = document.querySelector(".country-info")
    container.style.display='none'
    countriesData.style.display='block'

    // countries.forEach(country => {
      
    //     const html = `
    //     <<h2>${country.name.common}}</h2>
    //     <img class="table-flag" src="${country.flags.svg}" alt="country flag">
    //         <div class="table-data">
    //             <div class="properties">
    //                 <h3>NAMES</h3>
    //                 <table>
    //                     <tr>
    //                         <th>Common</th>
    //                         <td>.....</td>
                            
    //                     </tr>
    //                     <tr>
    //                         <th>Official</th>
    //                         <td>......</td>

    //                     </tr>
    //                     <tr>
    //                         <th>Common(Native)</th>
    //                         <td>.......</td>

    //                     </tr>
    //                     <tr>
    //                         <th>Official(Native)</th>
    //                         <td>.......</td>

    //                     </tr>
    //                     <tr>
    //                         <th>Alternative Spellings</th>
    //                         <td>.......</td>
    //                     </tr>
    //                 </table>
    //             </div>
    //             <div class="properties">
    //                 <h3>LANGUAGES</h3>
    //                 <table>
    //                     <tr>
    //                         <th>Native Language</th>
    //                         <td>...........</td>
    //                     </tr>
  
    //                     <tr class="lang">
                            
    //                     </tr> 
    //                 </table>


    //             </div>
    //         </div>
    //         <div class="table-data">
    //             <div class="properties">
    //                 <h3>CODES</h3>
    //                 <table>
    //                     <tr>
    //                         <th>ISO 3166-1 alpha-2</th>
    //                         <td>......</td>
    //                     </tr>
    //                     <tr>
    //                         <th>ISO 3166-1 alpha-3</th>
    //                         <td>.......</td>
    //                     </tr>
    //                     <tr>
    //                         <th>ISO 3166-1 numeric</th>
    //                         <td>......</td>
    //                     </tr>
    //                     <tr>
    //                         <th>International calling code</th>
    //                         <td>.......</td>
    //                     </tr>
    //                     <tr>
    //                         <th>ISO 4217 currency code</th>
    //                         <td>.......</td>
    //                     </tr>
    //                     <tr>
    //                         <th>Top level domain</th>
    //                         <td>.........</td>
    //                     </tr>
    //                 </table>
                    
    //             </div>
    //             <div class="properties">
    //                 <h3>GEOGRAPHY</h3>
    //                 <table>
    //                     <tr>
    //                         <th>Region</th>
    //                         <td>.......</td>
    //                     </tr>
    //                     <tr>
    //                         <th>Capital</th>
    //                         <td>.....</td>
    //                     </tr>
    //                     <tr>
    //                         <th>Demonym</th>
    //                         <td>.......</td>
    //                     </tr>
    //                     <tr>
    //                         <th>Lat/Lng</th>
    //                         <td>.........</td>
    //                     </tr>
    //                     <tr>
    //                         <th>Area</th>
    //                         <td>.......</td>
    //                     </tr>
    //                     <tr>
    //                         <th>Land borders</th>
    //                         <th>...........</th>
    //                     </tr>
    //                 </table>
    //             </div>
    //         </div>


    //     `;
    //     // countriesData.insertAdjacentHTML('beforeend', html);
    // });
})
