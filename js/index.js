import {
  getAllCities,
  getCities,
  getCityCookie,
  setCookie,
} from "./utils/cities.js";

const popularCitiesParent = document.querySelector(".main__cities-list .row");
const searchResultCities = document.querySelector(".search-result-cities");
const mainInput = document.querySelector(".main__input");

let allCities = [];

// -------------------------------------------------- choose popular city
const cityHandler = (event, city) => {
  event.preventDefault();

  window.location.href = `http://127.0.0.1:5500/pages/main.html?city=${city}`;
  setCookie(city);
};

// ------------------------------------------------------ show popular cities
const showPopularCities = (cities) => {
  cities.forEach((city) => {
    popularCitiesParent.insertAdjacentHTML(
      "beforeend",
      `
            <div class="col-2 d-flex justify-content-center">
                <li class="main__cities-item">
                    <a class="main__cities-link" href="#" onClick="cityHandler(event , '${city.name}')">${city.name}</a>
                </li>
            </div>
          `
    );
  });
};

// ---------------------------------------- show list seacrh

const showListSearch = (cities) => {
  searchResultCities.innerHTML = "";
  cities.forEach((city) => {
    searchResultCities.insertAdjacentHTML(
      "beforeend",
      `
      <li onclick="searchHandler('${city.name}')">${city.name}</li>
      `
    );
  });
};

// ------------------------------------------------------ choose city in search

const searchHandler = (city) => {
  mainInput.value = city;
};

mainInput.addEventListener("keyup", (event) => {
  let searchesValue = event.target.value;

  if (searchesValue.trim()) {
    let filteredCities = allCities.filter((city) =>
      city.name.startsWith(searchesValue)
    );
    showListSearch(filteredCities);
  }else{
    searchResultCities.classList.remove("active");
  }
});

// ------------------------------------------------ bind
window.cityHandler = cityHandler;
window.searchHandler = searchHandler;

window.addEventListener("load", async () => {
  console.log(getCityCookie());

  // if (getCityCookie()) {
  //   window.location.href = `http://127.0.0.1:5500/pages/main.html?city=${getCityCookie()}`;
  // }

  const cities = await getCities();

  showPopularCities(cities);
  allCities = await getAllCities();

  console.log(allCities[0]);
});

// -------------------------------------------------------- search list
mainInput.addEventListener("click", () => {
  searchResultCities.classList.add("active");
  showListSearch(allCities);
});

mainInput.addEventListener("blur", () => {
  searchResultCities.classList.remove("active");
});
