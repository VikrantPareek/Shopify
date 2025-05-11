const mainImage = document.getElementById("mainImage");
const colorSwatches = document.querySelectorAll(".color-swatch");
const selectedColors = new Set();

function changeImage(src) {
  document.getElementById("mainImage").src = src;
}

let thumbnails = document.querySelectorAll(".thumbnail-list img");
thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", function () {
    changeImage(this.src);
  });
})

function openSizeChartModal() {
  document.getElementById("sizeChartModal").style.display = "flex";
}

function openCompareModal() {
  const swatches = document.getElementById("compareSwatches");
  swatches.innerHTML = "";

  selectedColors.forEach((color) => {
    const wrapper = document.createElement("div");
    wrapper.style.textAlign = "center";

    const img = document.createElement("img");
    img.src = `/assets/${color}.webp`; // make sure you have red.avif, blue.avif etc.
    img.alt = color;
    img.style.height = "120px";
    img.style.width = "120px";
    img.style.border = "2px solid black";
    img.style.borderRadius = "8px";
    img.style.objectFit = "cover";

    const label = document.createElement("p");
    label.textContent = `${color} cap`;
    label.style.marginTop = "8px";

    wrapper.appendChild(img);
    wrapper.appendChild(label);
    swatches.appendChild(wrapper);
  });

  document.getElementById("compareModal").style.display = "flex";
}


function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

colorSwatches.forEach((swatch) => {
  swatch.addEventListener("click", () => {
    swatch.classList.toggle("selected");
    const color = swatch.dataset.color;
    if (selectedColors.has(color)) selectedColors.delete(color);
    else selectedColors.add(color);
    localStorage.setItem("selectedColor", color);
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal("sizeChartModal");
    closeModal("compareModal");
  }
});

function showTab(id) {
  document
    .querySelectorAll(".tab-content")
    .forEach((tab) => tab.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

window.onclick = function (e) {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }
};

window.onload = () => {
  const storedColor = localStorage.getItem("selectedColor");
  if (storedColor) {
    document.querySelectorAll(".color-swatch").forEach((s) => {
      if (s.dataset.color === storedColor) s.classList.add("selected");
    });
  }
};
