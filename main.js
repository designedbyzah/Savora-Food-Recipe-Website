const tabs = document.querySelectorAll(".tabs-container button");
const resultContainers = document.querySelectorAll(".recipe-result-container");
const headerSearchBar = document.getElementById("header-search-input");
const headerSearchIconBtn = document.getElementById("header-search-icon-btn");
const searchInput = querySelectorAll(".search-inputBar");

// Function to switch between Breakfast tabs
function switchTabs() {
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      resultContainers.forEach((resultContainer) => {
        resultContainer.classList.remove("recipe-result-container-active");
      });
      tabs.forEach((tab) => {
        tab.classList.remove("tab-active");
      });

      tabs[index].classList.add("tab-active");
      resultContainers[index].classList.add("recipe-result-container-active");
    });
  });
}
switchTabs();

//Expand and Close header Search bar
headerSearchIconBtn.addEventListener("click", () => {
  headerSearchIconBtn.style.display = "none";
  if (headerSearchIconBtn) {
    headerSearchIconBtn.style.display = "none";
    headerSearchBar.style.display = "grid";
  } else if (headerSearchBar) {
    headerSearchIconBtn.style.display = "flex";
    headerSearchBar.style.display = "none";
  }
});

//Collect User value/query
