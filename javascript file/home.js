// Event listener for name submission
document.getElementById("#enter").addEventListener("click", function () {
  // Get the entered name
  const Name = document.querySelector("#username").value;
  // Display the entered name
  document.querySelector("#namedisplay").textContent = Name;
  // Store the name in local storage
  localStorage.setItem("#username", Name);
});

// Get all the h3 elements for category selection
const h3Elements = document.querySelectorAll("#btn");
// Loop through each h3 element and add click event listener
h3Elements.forEach((h3) => {
  h3.addEventListener("click", function () {
    // Get the URL of the selected category
    const url = this.querySelector("a").getAttribute("href");
    // Navigate to the selected category page
    window.location.href = url;
  });
});
