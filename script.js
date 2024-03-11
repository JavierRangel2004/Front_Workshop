document.addEventListener("DOMContentLoaded", init);

const allImages = {
  portraits: [],
  landscapes: [],
  city: [],
  creativity: [],
};

// Populate image arrays
["portraits", "landscapes", "city", "creativity"].forEach((category) => {
  let limit;
  switch (category) {
    case "portraits":
      limit = 70;
      break;
    case "landscapes":
      limit = 50;
      break;
    case "city":
      limit = 30;
      break;
    case "creativity":
      limit = 22;
      break;
  }
  for (let i = 1; i <= limit; i++) {
    allImages[category].push(`/media/${category}/${category} (${i}).webp`);
  }
});

const loadedImages = {
  portraits: 0,
  landscapes: 0,
  city: 0,
  creativity: 0,
};

let galleryLoading = false;
let msnry; // Masonry instance

function init() {
  if (document.getElementById("featured-photos")) {
    initFeaturedImages();
    handleHorizontalScroll("featured-photos");
  } else {
    initGalleryPage();
  }
}

function handleHorizontalScroll(elementId) {
  document
    .getElementById(elementId)
    .addEventListener("wheel", function (event) {
      if (event.deltaY != 0) {
        event.preventDefault();
        this.scrollLeft += event.deltaY;
      }
    });
}

function initFeaturedImages() {
  const numPhotos = { portraits: 3, landscapes: 3, city: 3, creativity: 3 };
  loadFeaturedImages("featured-photos", allImages, numPhotos);
}

function loadFeaturedImages(sectionId, images, numPhotosPerCategory) {
  ["portraits", "landscapes", "city", "creativity"].forEach((category) => {
    const usedImages = [];
    for (let i = 0; i < numPhotosPerCategory[category]; i++) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * images[category].length);
      } while (usedImages.includes(randomIndex));
      usedImages.push(randomIndex);
      const imageSrc = images[category][randomIndex];
      appendImageToSection(sectionId, imageSrc);
    }
  });
}

function determineCurrentCategory() {
  const categories = ["portraits", "landscapes", "city", "creativity"];
  return (
    categories.find((category) => document.getElementById(category)) || null
  );
}

function appendImageToSection(sectionId, imageSrc) {
  const section = document.getElementById(sectionId);
  const container = document.createElement("div");
  container.className = "img-container fade-in";
  const img = document.createElement("img");
  img.src = imageSrc;
  img.className =
    "rounded shadow-sm m-2 gallery-image img-fluid img-fluid.loaded";
  img.style.objectFit = "contain";
  // Attach event listener for modal
  img.addEventListener("click", () => {
    const modalImage = document.getElementById("modal-image");
    modalImage.src = imageSrc;
    const modalElement = new bootstrap.Modal(
      document.getElementById("imageModal")
    );
    modalElement.show();
  });
  container.appendChild(img);
  section.appendChild(container);
  fadeInImage(img);
}

function fadeInImage(imgElement) {
  let opacity = 0;
  const interval = setInterval(() => {
    opacity += 0.05;
    imgElement.style.opacity = opacity.toString();
    if (opacity >= 1) clearInterval(interval);
  }, 35);
}

function initGalleryPage() {
  const currentCategory = determineCurrentCategory();
  if (currentCategory) {
    loadImagesWithAnimation(currentCategory, 20, true); // Initial load with Masonry initialization
    initInfiniteScroll(currentCategory);
  }
}

function loadImagesWithAnimation(category, count, initializeMasonry = false) {
  if (galleryLoading || loadedImages[category] >= allImages[category].length)
    return;

  galleryLoading = true;
  const end = Math.min(
    loadedImages[category] + count,
    allImages[category].length
  );

  for (let i = loadedImages[category]; i < end; i++) {
    const imageSrc = allImages[category][i];
    const img = new Image();
    img.onload = () => {
      appendImageToSection(category, img.src);
      if (i === end - 1) {
        galleryLoading = false;
        if (initializeMasonry) initializeMasonryLayout(category);
        else if (msnry) msnry.layout();
      }
    };
    img.src = imageSrc;
  }
  loadedImages[category] += count;
}

function initializeMasonryLayout(category) {
  const grid = document.querySelector(`#${category}`);
  msnry = new Masonry(grid, {
    itemSelector: ".img-container",
    percentPosition: true,
  });
}

function initInfiniteScroll(currentCategory) {
  let lastScrollTop = window.scrollY || document.documentElement.scrollTop;
  window.addEventListener(
    "scroll",
    () => {
      let st = window.scrollY || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        // downscroll
        if (
          window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 500 &&
          !galleryLoading
        ) {
          loadImagesWithAnimation(currentCategory, 5); // Load more images on scroll
        }
      }
      lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    },
    false
  );
}
