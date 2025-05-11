// Get reference to the main image and color swatches
const mainImage = document.getElementById("mainImage");
const colorSwatches = document.querySelectorAll(".color-swatch");

// Set to keep track of selected color swatches
const selectedColors = new Set();

// Function to change the main product image
function changeImage(src) {
  document.getElementById("mainImage").src = src;
}

// Add click event to all thumbnail images to update the main image
let thumbnails = document.querySelectorAll(".thumbnail-list img");
thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", function () {
    changeImage(this.src);
  });
});

// Function to open the Size Chart modal
function openSizeChartModal() {
  document.getElementById("sizeChartModal").style.display = "flex";
}

// Function to open the Compare Colors modal
function openCompareModal() {
  const swatches = document.getElementById("compareSwatches");
  swatches.innerHTML = ""; // Clear previous swatches

  // Loop through selected colors and generate swatch preview
  selectedColors.forEach((color) => {
    const wrapper = document.createElement("div");
    wrapper.style.textAlign = "center";

    // Create and style image element
    const img = document.createElement("img");
    img.src = `/assets/${color}.webp`;
    img.alt = color;
    img.style.height = "120px";
    img.style.width = "120px";
    img.style.border = "2px solid black";
    img.style.borderRadius = "8px";
    img.style.objectFit = "cover";

    // Add label under the image
    const label = document.createElement("p");
    label.textContent = `${color} cap`;
    label.style.marginTop = "8px";

    // Append image and label to wrapper, then to modal
    wrapper.appendChild(img);
    wrapper.appendChild(label);
    swatches.appendChild(wrapper);
  });

  // Display the modal
  document.getElementById("compareModal").style.display = "flex";
}

// Generic function to close a modal by ID
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

// Handle color swatch selection/deselection
colorSwatches.forEach((swatch) => {
  swatch.addEventListener("click", () => {
    swatch.classList.toggle("selected"); // Toggle selected style
    const color = swatch.dataset.color;

    // Add/remove from selectedColors Set
    if (selectedColors.has(color)) selectedColors.delete(color);
    else selectedColors.add(color);
  });
});

// Close modals with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal("sizeChartModal");
    closeModal("compareModal");
  }
});

// Tab switching function for product details, reviews, etc.
function showTab(id) {
  // Hide all tab content
  document
    .querySelectorAll(".tab-content")
    .forEach((tab) => tab.classList.remove("active"));

  // Show the selected tab
  document.getElementById(id).classList.add("active");
}

// Close modal when clicking outside the content area
window.onclick = function (e) {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }
};
