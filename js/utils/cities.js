const getCities = async () => {
  const citiesData = await fetch("http://localhost:4000/api/cities/popular");
  const cities = await citiesData.json();

  return cities;
};

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

export { getCities, setCookie, getCityCookie };
