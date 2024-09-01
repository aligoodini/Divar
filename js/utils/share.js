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
  const reqGetOneCity = await fetch(
    `https://divarapi.liara.run/v1/post/?city=${id}`
  );
  const resOneCity = await reqGetOneCity.json();

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

// ------------------------------------------------------- get search param

const getSearchParam = (myParam)=>{
  const searchParam = new URLSearchParams(location.search)

  console.log()

  return searchParam.get(myParam)
}

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
  getSearchParam
};
