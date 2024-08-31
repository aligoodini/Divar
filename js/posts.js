import { getLocalStorage, getOneCityData } from "./utils/cities.js";
const postsContainer = document.querySelector("#posts-container");
let choosenCity = [];

window.addEventListener("load", async () => {
  choosenCity = getLocalStorage();

  console.log(choosenCity);
  const onCityData = await getOneCityData(choosenCity.id);

  console.log(onCityData.data.posts);
  console.log(onCityData.data.posts[0]);
  showAddvertises(onCityData.data.posts);
});

const showAddvertises = (Adds) => {
  if (Adds.length) {
    Adds.forEach((Add) => {
      postsContainer.insertAdjacentHTML(
        "beforeend",
        `
              <div class="col-4">
                    <a href="post.html/id=${Add._id}" class="product-card">
                      <div class="product-card__right">
                        <div class="product-card__right-top">
                          <p class="product-card__link">${Add.title}</p>
                        </div>
                        <div class="product-card__right-bottom">
                          <span class="product-card__condition">${
                            Add.dynamicFields[0].data
                          }</span>
                          <span class="product-card__price">
                            ${
                              Add.price === 0
                                ? "توافقی"
                                : Add.price.toLocaleString() + " تومان"
                            }
                          </span>
                          <span class="product-card__time">Date</span>
                        </div>
                      </div>
                      <div class="product-card__left">
                      ${
                        Add.pics.length
                          ? `
                            <img
                              class="product-card__img img-fluid"
                              src="https://divarapi.liara.run/${Add.pics[0].path}"
                            />`
                          : `
                            <img
                              class="product-card__img img-fluid"
                              src="/public/images/main/noPicture.PNG"
                            />`
                      }
                        
                      </div>
                    </a>
                  </div>
                  
                  `
      );
    });
  } else {
    postsContainer.insertAdjacentHTML(
      "beforeend",
      `<p class="empty">آگهی یافت نشد</p>`
    );
  }
};
