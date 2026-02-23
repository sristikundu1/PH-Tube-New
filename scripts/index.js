// remove previous active button 
function removeActiveClass() {
  const activeClass = document.getElementsByClassName("active");

  for (let btn of activeClass) {
    btn.classList.remove("active");
  }
}


// convert second to hour-sec-min time formate

function formatTimeAgo(seconds) {
  const totalSeconds = parseInt(seconds);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  return `${hours}hrs ${minutes} min ago`;
}

function loadCategory() {
  // fetch the category data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json()) //convert it json data
    .then((data) => displayCategory(data.categories));
}

function displayCategory(categories) {
  const categoryContainer = document.getElementById("categories-container");

  for (let cat of categories) {
    // create the div
    const categorydiv = document.createElement("div");

    //   show data in button
    categorydiv.innerHTML = `
        <button id="btn-${cat.category_id}" onclick='loadCategoriesVideo( ${cat.category_id})' class="btn btn-sm bg-[rgba(37,37,37,0.15)] text-[rgba(37,37,37,0.7)] hover:bg-[var(--color-primary)] hover:text-white">
    ${cat.category}
  </button>
      `;

    //   append the div
    categoryContainer.appendChild(categorydiv);
  }
}



// fetch card data
function LoadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      document.getElementById('btn-all').classList.add("active");        //all button active class add
      displayVideos(data.videos)});
}

// display videos

const displayVideos = (videos) => {
  const videoCardContainer = document.getElementById("card-container");

  videoCardContainer.innerHTML = "";

  if (videos.length == 0) {
    videoCardContainer.innerHTML = `
    <div class="col-span-full flex flex-col justify-center items-center gap-3">
          <img class="w-32 h-32" src="./Icon.png" alt="no-data" />
          <h1
            class="text-[rgba(23,23,23,1)] font-bold text-2xl leading-[44px] text-center"
          >
            Oops!! Sorry, There is no content here
          </h1>
        </div>
    `;
  }

  // loop to show videos in card
  videos.forEach((video) => {
    // console.log(video.thumbnail)
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
    <div class="card bg-base-100 shadow-sm">
     <figure class="relative">
              <img
              class="w-full h-[200px] object-cover"
                src="${video.thumbnail}"
                alt="image"
              />

              ${video.others.posted_date ? `<span class="absolute right-2 bottom-2 bg-[rgba(23,23,23,1)] p-2 rounded-md text-white">${formatTimeAgo(video.others.posted_date)}</span>` : ""}
              
              
             
            </figure>
            <div class="flex justify-start items-center gap-4 p-2">
              <div class="avatar">
                <div
                  class="ring-primary ring-offset-base-100 w-10 rounded-full"
                >
                  <img
                    src="${video.authors[0].profile_picture}"
                  />
                </div>
              </div>

              <div>
                <h1 class="text-gray-900 font-bold leading-7 text-left">
                   ${video.title}
                </h1>
                <div class="flex justify-start items-center gap-2 my-1">
                  <p
                    class="text-[rgba(23,23,23,0.7)] text-sm font-normal leading-4 text-left"
                  >
                    ${video.authors[0].profile_name}
                  </p>
                  <img
                    class="w-5 h-5"
                    src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000"
                    alt="verify"
                  />
                </div>
                <p
                  class="text-[rgba(23,23,23,0.7)] text-sm font-normal leading-4 text-left"
                >
                  ${video.others.views} views
                </p>
              </div>
            </div>
            </div>
    `;

    videoCardContainer.appendChild(cardDiv);
  });
};

// show card according to category button
const loadCategoriesVideo = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();                  //remove previous active class
      const clickedButton = document.getElementById(`btn-${id}`);
      clickedButton.classList.add("active");              // add active class

      displayVideos(data.category);
    });
};

// by default all button remain active 
document.addEventListener("DOMContentLoaded", function () {
  LoadVideos();
});
loadCategory();
