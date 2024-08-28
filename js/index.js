import { getCities, getCityCookie, setCookie } from "./utils/cities.js";

const popularCitiesParent = document.querySelector(".main__cities-list .row");

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

window.cityHandler = cityHandler;
window.addEventListener("load", async () => {
  console.log(getCityCookie());

  // if (getCityCookie()) {
  //   window.location.href = `http://127.0.0.1:5500/pages/main.html?city=${getCityCookie()}`;
  // }

  const cities = await getCities();

  showPopularCities(cities);
});
