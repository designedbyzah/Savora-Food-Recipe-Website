tabsContainer.addEventListener("click", (event) => {
  let userTarget = event.target;
  let clickedTab = userTarget.closest(".tabs-container button");
  if (!clickedTab) {
    return;
  }
  const index = Array.from(tabs).indexOf(clickedTab);

  console.log(index);
});
