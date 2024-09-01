import {
  getCategories,
  getLocalStorage,
  getOneCityData,
  getSearchParam,
} from "./utils/share.js";
const postsContainer = document.querySelector("#posts-container");
const categoriesContainer = document.querySelector("#categories-container");
let choosenCity = [];

window.addEventListener("load", async () => {
  choosenCity = getLocalStorage();
  const onCityData = await getOneCityData(choosenCity.id);
  showAddvertises(onCityData.data.posts);

  const categories = await getCategories();
  showCategories(categories);
});

// ---------------------------------------------- make time difference

const makeTimeDifference = (oldTime) => {
  const newTime = new Date();
  const createdTime = new Date(oldTime);

  const DiffTime = newTime - createdTime;

  let mytime = null;

  // ---------------------------- convert to hour and day

  if (DiffTime / (60 * 60 * 1000) > 24) {
    return (mytime =
      Math.floor(DiffTime / (60 * 60 * 1000 * 24)) + " " + "روز پیش");
  } else if (DiffTime / (60 * 60 * 1000) > 24) {
    return (mytime =
      Math.floor(DiffTime / (60 * 60 * 1000)) + " " + "ساعت پیش");
  } else if (DiffTime / (60 * 60 * 1000) < 1) {
    return (mytime = "به تازگی");
  }
};

// -------------------------------------------------------------- show Adds
const showAddvertises = (Adds) => {
  if (Adds.length) {
    Adds.forEach((Add) => {
      const timeDifference = makeTimeDifference(Add.createdAt);
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
                          <span class="product-card__time">${timeDifference}</span>
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

// ------------------------------------------------------------- category url

const categoryhandler = (event, Id) => {
  console.log(Id);

  // way 1
  // const url = new URL(window.location.href)

  // const searchParams = url.searchParams

  // searchParams.set("categoryID" , Id)

  // url.search = searchParams.toString()
  // location.href = url.toString()

  // way 2
  const myUrl = new URL(`?categoryID=${Id}`, location.href);

  location.href = myUrl;
};

// -------------------------------------------------------- show categories

const showCategories = (categories) => {
  const urlCategoryId = getSearchParam("categoryID");
  if (urlCategoryId) {
    const choosenCategory = categories.filter(
      (item) => item._id == urlCategoryId
    );
    console.log(choosenCategory[0]);

    categoriesContainer.insertAdjacentHTML(
      "beforeend",
      `
        <div class="all-categories">
          <p>همه اگهی ها</p>
          <i class="bi bi-arrow-right"></i>
        </div>

        <div class="sidebar__category-link active-category" href="#">
          <div class="sidebar__category-link_details">
            <i class="sidebar__category-icon bi bi-house"></i>
            <p>${choosenCategory[0].title}</p>
          </div>
          <ul class="subCategory-list">
            ${choosenCategory[0].subCategories
              .map(createSubCategoryHtml)
              .join("")}

          </ul>
        </div>
    
      `
    );

    // --------------------------------------- show main categories
  } else {
    categories.forEach((category) => {
      categoriesContainer.insertAdjacentHTML(
        "beforeend",
        `
        <div class="sidebar__category-link" id="category-${category._id}" onclick="categoryhandler(event , '${category._id}')">
          <div class="sidebar__category-link_details">
            <i class="sidebar__category-icon bi bi-house"></i>
            <p>${category.title}</p>
          </div>
        </div>
        `
      );
    });
  }

  // -------------------------------------------------------- show subcategory
  function createSubCategoryHtml (subCategory) {
    return `
      <li class="${urlCategoryId === subCategory._id ? "active-subCategory" : ""}">
        ${subCategory.title}
      </li>
    `;
  };
};



window.categoryhandler = categoryhandler;
