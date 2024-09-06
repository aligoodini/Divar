const globalSearchInput = document.querySelector("#global_search_input");
const removeSearchValueIcon = document.querySelector(
  "#remove-search-value-icon"
);

const getAllCities = async () => {
  const getCities = await fetch(`https://divarapi.liara.run/v1/location/`);
  const allCities = await getCities.json();

  return allCities.data.provinces;
};

const getCities = async () => {
  const citiesData = await fetch("https://divarapi.liara.run/v1/location/");
  const cities = await citiesData.json();
  let filteredCities = cities.data.cities.filter(
    (item) => item.popular == true
  );

  return filteredCities;
};

// ---------------------------------- get one city

const getOneCityData = async (id) => {
  let url = `https://divarapi.liara.run/v1/post/?city=${id}`;
  if (getSearchParam("categoryID")) {
    url += `&categoryId=${getSearchParam("categoryID")}`;
  }
  if (getSearchParam("q")) {
    url += `&search=${getSearchParam("q")}`;
  }

  // console.log(url)
  const reqGetOneCity = await fetch(url);
  const resOneCity = await reqGetOneCity.json();

  // console.log(resOneCity)

  return resOneCity;
};

// ------------------------------------- get categories

const getCategories = async () => {
  const req = await fetch(`https://divarapi.liara.run/v1/category/`);
  const res = await req.json();

  return res.data.categories;
};
// ------------------------------------------------------------ cookie
const setCookie = (city) => {
  document.cookie = `city=${city};path=/`;
};

const getCityCookie = () => {
  const getAllCoolie = document.cookie.split("; ");

  let myCity = null;
  getAllCoolie.forEach((item) => {
    if (item.includes("city=")) {
      myCity = item.substring(5);
    }
  });

  return myCity;
};

// ------------------------------------------------------------ localStorage
const setLocalStorage = (array) => {
  localStorage.setItem("cities", JSON.stringify(array));
};
const getLocalStorage = () => {
  const cities = localStorage.getItem("cities");

  return JSON.parse(cities);
};

const getAllSocials = async () => {
  const reqSocials = await fetch(`https://divarapi.liara.run/v1/social/`);
  const resArr = await reqSocials.json();

  return resArr.data.socials;
};

// ------------------------------------------------------- remove search param

const removeSearchParam = (myParam) => {
  const url = new URL(location.href);

  const params = new URLSearchParams(url.search);

  console.log(params);
  params.delete(myParam);

  url.search = params.toString();

  location.href = url.toString();
};

// ------------------------------------------------------- get search param

const getSearchParam = (myParam) => {
  const searchParam = new URLSearchParams(location.search);

  return searchParam.get(myParam);
};

// ---------------------------------------------------------- search

globalSearchInput?.addEventListener("keyup", (e) => {
  e.preventDefault();
  console.log(location.href);
  if (e.key == "Enter") {
    if (e.target.value.trim()) {
      // const Myurl = new URL(`?q=${e.target.value.trim()}`, location.href);

      // location.href = Myurl;
      location.href = location.href + `&q=${e.target.value.trim()}`;

      // location.href = `http://127.0.0.1:5500/pages/posts.html?q=${e.target.value.trim()}`
    }
  }
});

if (getSearchParam("q")) {
  globalSearchInput.value = getSearchParam("q");
  removeSearchValueIcon.style.display = "block";
}

removeSearchValueIcon?.addEventListener("click", () => {
  removeSearchParam("q");
});

export {
  getCities,
  setCookie,
  getCityCookie,
  getAllCities,
  getAllSocials,
  setLocalStorage,
  getLocalStorage,
  getOneCityData,
  getCategories,
  getSearchParam,
};
