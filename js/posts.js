import {
  getCategories,
  getLocalStorage,
  getOneCityData,
  getSearchParam,
} from "./utils/share.js";
const postsContainer = document.querySelector("#posts-container");
const categoriesContainer = document.querySelector("#categories-container");
const sidebarFilters = document.querySelector("#sidebar-filters");
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

// ------------------------------------------------------------- back button

const backHandler = (e) => {
  location.href = "/pages/posts.html";
};

// -------------------------------------------------------- show categories

const showCategories = (categories) => {
  const urlCategoryId = getSearchParam("categoryID");
  if (urlCategoryId) {
    const choosenCategory = categories.filter(
      (item) => item._id == urlCategoryId
    );
    // console.log(choosenCategory);

    // ---------------------------------------- subcategory level 1
    if (choosenCategory.length) {
      categoriesContainer.insertAdjacentHTML(
        "beforeend",
        `
          <div class="all-categories" onclick="backHandler(event)">
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
    } else {
      const choosenCategoryLevel2 = categories.flatMap((item) => {
        return item.subCategories.filter((elem) => {
          return elem._id == urlCategoryId;
        });
      });

      const showFilterFunc = (array) => {
        console.log(array);
        // ---------------------------------------- filters for subcategory level 2
        array.filters?.map((item) => {
          sidebarFilters.insertAdjacentHTML(
            "afterbegin",
            `
                 ${
                   item.type === "selectbox"
                     ? `
                  <div class="accordion accordion-flush" id="accordionFlushExample">
                    <div class="accordion-item">
                      <h2 class="accordion-header">
                        <button
                          class="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#accordion-${item.slug}"
                          aria-expanded="false"
                          aria-controls="accordion-${item.name}"
                        >
                          <span class="sidebar__filter-title">${
                            item.name
                          }</span>
                        </button>
                      </h2>
                      <div
                        id="accordion-${item.slug}"
                        class="accordion-collapse collapse"
                        aria-labelledby="accordion-${item.name}"
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div class="accordion-body">
                          <select class="selectbox">
                            ${item.options
                              .sort((a, b) => b - a)
                              .map(
                                (option) =>
                                  `<option value='${option}'>${option}</option>`
                              )}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                `
                     : ""
                 }

                 ${
                   item.type === "checkbox"
                     ? `
                        <div class="sidebar__filter">
                          <label class="switch">
                            <input id="exchange_controll" class="icon-controll" type="checkbox" />
                            <span class="slider round"></span>
                          </label>
                          <p>${item.name}</p>
                        </div>
                      `
                     : ""
                 }
              `
          );
        });
      };

      // ---------------------------------------- subcategory level 2
      if (choosenCategoryLevel2.length) {
        choosenCategoryLevel2.forEach((category) => {
          categoriesContainer.insertAdjacentHTML(
            "beforeend",
            `
              <div class="all-categories" onclick="backHandler(event)">
                <p>همه اگهی ها</p>
                <i class="bi bi-arrow-right"></i>
              </div>
  
              <div class="sidebar__category-link active-category" href="#">
                <div class="sidebar__category-link_details">
                  <i class="sidebar__category-icon bi bi-house"></i>
                  <p>${category.title}</p>
                </div>
                <ul class="subCategory-list">
                  ${category.subCategories.map(createSubCategoryHtml).join("")}
                </ul>
              </div>
          
            `
          );
        });

        showFilterFunc(choosenCategoryLevel2[0]);
      }
      // ---------------------------------------- subcategory level 3
      else {
        const choosenCategoryLevel3 = categories.flatMap((item) => {
          return item.subCategories.flatMap((elem) => {
            return elem.subCategories.filter((sscate) => {
              return sscate._id == urlCategoryId;
            });
          });
        });
        const choosenCategoryLevel3Parent = categories.flatMap((item) => {
          return item.subCategories.filter((elem) => {
            return elem._id == choosenCategoryLevel3[0].parent;
          });
        });

        choosenCategoryLevel3Parent.forEach((category) => {
          categoriesContainer.insertAdjacentHTML(
            "beforeend",
            `
              <div class="all-categories" onclick="backHandler(event)">
                <p>همه اگهی ها</p>
                <i class="bi bi-arrow-right"></i>
              </div>

              <div class="sidebar__category-link active-category" href="#">
                <div class="sidebar__category-link_details">
                  <i class="sidebar__category-icon bi bi-house"></i>
                  <p>${category.title}</p>
                </div>
                <ul class="subCategory-list">
                  ${category.subCategories.map(createSubCategoryHtml).join("")}
                </ul>
              </div>
          
            `
          );
        });

        // ---------------------------------------- filters for subcategory level 2

        showFilterFunc(choosenCategoryLevel3[0]);
      }
    }

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
  function createSubCategoryHtml(subCategory) {
    return `
      <li class="${
        urlCategoryId === subCategory._id ? "active-subCategory" : ""
      }"
      onclick="categoryhandler(event , '${subCategory._id}')"
      >
        ${subCategory.title}
      </li>
    `;
  }
};

window.categoryhandler = categoryhandler;
window.backHandler = backHandler;
