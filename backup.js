tabsContainer.addEventListener("click", (event) => {
  let userTarget = event.target;
  let clickedTab = userTarget.closest(".tabs-container button");
  if (!clickedTab) {
    return;
  }
  const index = Array.from(tabs).indexOf(clickedTab);

  console.log(index);
});

//Check for input n forms
forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const input = form.querySelector(".search-inputBar");
    let userInput = input.value;
    console.log(userInput);

    form.reset();
  });
});

// Function for Search Form Validation
function searchInputValidation(formIndex) {
  searchInputBars.forEach((searchInputBar, index) => {
    if (index === formIndex) {
      if (searchInputBar.value.trim() === "") {
        errorValidationTexts[index].textContent = "Enter a search item";
        return false;
      } else {
        errorValidationTexts[index].textContent = "";
        return true;
      }
    }
  });
}
