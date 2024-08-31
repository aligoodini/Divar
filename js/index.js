import {
  getAllCities,
  getAllSocials,
  getCities,
  getCityCookie,
  setCookie,
} from "./utils/cities.js";

const popularCitiesParent = document.querySelector(".main__cities-list .row");
const searchResultCities = document.querySelector(".search-result-cities .row");
const mainInput = document.querySelector(".main__input");
const loadingContainer = document.querySelector("#loading-container");
const footerList = document.querySelector(".footer__list");

console.log(loadingContainer);
let allCities = [];

// -------------------------------------------------- choose popular city
const cityHandler = (event, city) => {
  event.preventDefault();

  window.location.href = `http://127.0.0.1:5500/pages/main.html?city=${city}`;
  setCookie(city);
};

// ------------------------------------------------------ show popular cities
const showPopularCities = (cities) => {
  loadingContainer.style.display = "none";
  cities.forEach((city) => {
    popularCitiesParent.insertAdjacentHTML(
      "beforeend",
      `
            <div class="col-3 d-flex justify-content-center">
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

// ---------------------------------------------- show socials icon

const showSocial = (data) => {
  data.forEach((item) => {
    footerList.insertAdjacentHTML(
      "beforeend",
      `
          <a href="${item.link}" class="sidebar__icon-link">
            <img width="18px" height="18px" alt="${item.name}" src="${item.icon.path}" class="sidebar__icon bi bi-twitter" />
          </a>
      `
    );
  });
  console.log(footerList)
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
  } else {
    searchResultCities.classList.remove("active");
  }
});

// ------------------------------------------------ bind
window.cityHandler = cityHandler;
window.searchHandler = searchHandler;

window.addEventListener("load", async () => {
  // if (getCityCookie()) {
  //   window.location.href = `http://127.0.0.1:5500/pages/main.html?city=${getCityCookie()}`;
  // }

  const socials = await getAllSocials();
  showSocial(socials)

  const cities = await getCities();
  showPopularCities(cities);

  allCities = await getAllCities();
});

// -------------------------------------------------------- search list
mainInput.addEventListener("click", () => {
  searchResultCities.classList.add("active");
  showListSearch(allCities);
});

mainInput.addEventListener("blur", () => {
  searchResultCities.classList.remove("active");
});
