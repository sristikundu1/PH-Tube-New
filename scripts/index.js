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
        <button class="btn btn-sm bg-[rgba(37,37,37,0.15)] text-[rgba(37,37,37,0.7)] hover:bg-[var(--color-primary)] hover:text-white">
    ${cat.category}
  </button>
      `;

    //   append the div 
    categoryContainer.appendChild(categorydiv);
  }
}

// convert second to hour-sec-min time formate

function formatTimeAgo(seconds) {
  const totalSeconds = parseInt(seconds);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  return `${hours}hrs ${minutes} min ago`;
}

// fetch card data 
function LoadVideos() {
  fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
  .then(res => res.json())
  .then(data => displayVideos(data.videos))
}

// display videos 

const displayVideos = (videos) => {

  const videoCardContainer = document.getElementById('card-container');

  // loop to show videos in card 
  videos.forEach((video) => {
    // console.log(video.thumbnail)
    const cardDiv = document.createElement('div');
    cardDiv.innerHTML = `
    <div class="card bg-base-100 shadow-sm">
     <figure class="relative">
              <img
              class="w-full h-[200px] object-cover"
                src="${video.thumbnail}"
                alt="image"
              />

              ${video.others.posted_date? `<span class="absolute right-2 bottom-2 bg-[rgba(23,23,23,1)] p-2 rounded-md text-white">${formatTimeAgo(video.others.posted_date)}</span>` :''}
              
              
             
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
    `

    videoCardContainer.appendChild(cardDiv);
  });

}


// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }

LoadVideos();
loadCategory();