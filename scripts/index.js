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

loadCategory();

// category
// :
// "Music"
// category_id
// :
// "1001"
