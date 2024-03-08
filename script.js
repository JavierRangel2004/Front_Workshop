const allImages = {
  portraits: [],
  landscapes: [],
  city: [],
  creativity: [],
};

for (let i = 1; i <= 70; i++) {
  allImages.portraits.push(`/media/port/Portrait (${i}).webp`);
}

for (let i = 1; i <= 50; i++) {
  allImages.landscapes.push(`/media/land/Landscape (${i}).webp`);
}

for (let i = 1; i <= 22; i++) {
  allImages.creativity.push(`/media/creat/Object (${i}).webp`);
}

for (let i = 1; i <= 30; i++) {
  allImages.city.push(`/media/city/City (${i}).webp`);
}

const loadedImages = {
  portraits: 0,
  landscapes: 0,
  city: 0,
  creativity: 0,
};

let galleryLoading = false;

function init() {
  if (document.getElementById("featured-photos")) {
    initFeaturedImages();
    document
      .getElementById("featured-photos")
      .addEventListener("wheel", function (event) {
        if (event.deltaY != 0) {
          event.preventDefault();
          this.scrollLeft += event.deltaY;
        }
      });
  } else {
    initGalleryPage();
  }
}

function initFeaturedImages() {
  const numPhotos = { portraits: 3, landscapes: 3, city: 3, creativity: 3 };
  loadFeaturedImages("featured-photos", allImages, numPhotos);
}

function initGalleryPage() {
  const currentCategory = determineCurrentCategory();
  if (currentCategory) {
    loadImagesWithAnimation(currentCategory, 15);
    window.addEventListener("load", function () {
      const galleryImages = document.querySelectorAll(".gallery-image");

      galleryImages.forEach((image) => {
        // Create an image object to measure the natural size
        const img = new Image();
        img.src = image.src;

        img.onload = () => {
          // Calculate the aspect ratio of the image
          const aspectRatio = img.naturalHeight / img.naturalWidth;
          // Based on the aspectRatio, span more rows for taller images
          const rowSpan = Math.ceil(aspectRatio * 2); // *2 because of the default 2-row span
          image.style.gridRowEnd = `span ${rowSpan}`;
        };
      });
    });

    loadMoreImages(currentCategory); // Pass the currentCategory as argument
    initInfiniteScroll();
  }
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

function loadMoreImages(category) {
  const start = loadedImages[category];
  const end = start + 4;
  const imagesToLoad = allImages[category].slice(start, end);
  imagesToLoad.forEach((imageSrc) => {
    appendImageToSection(category, imageSrc);
  });
  loadedImages[category] += imagesToLoad.length;
}

function appendImageToSection(sectionId, imageSrc) {
  const section = document.getElementById(sectionId);
  const container = document.createElement("div");
  container.classList.add("img-container");

  // Create an image element that's already loaded
  const img = document.createElement("img");
  img.src = imageSrc;
  // Start with image invisible for fade-in
  img.style.opacity = 0;

  // Check the sectionId and apply specific classes for each gallery
  if (sectionId === "portraits") {
    img.classList.add("gallery-image", "portrait");
  } else if (sectionId === "city") {
    img.classList.add("gallery-image", "cityscape");
  } // Continue with else if for other sections...

  // The common classes for all images
  img.classList.add(
    "img-fluid",
    "rounded",
    "shadow-sm",
    "m-2",
    "grow-on-hover"
  );
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

  // Instead of fading in here, we fade in after appending to ensure a smooth animation
  fadeInImage(img);
}

function determineCurrentCategory() {
  const categories = ["portraits", "landscapes", "city", "creativity"];
  for (const category of categories) {
    if (document.getElementById(category)) {
      return category;
    }
  }
  return null;
}

function loadImagesWithAnimation(category, count) {
  if (loadedImages[category] >= allImages[category].length) {
    galleryLoading = false;
    return;
  }

  galleryLoading = true;
  const end = Math.min(
    loadedImages[category] + count,
    allImages[category].length
  );

  for (let i = loadedImages[category]; i < end; i++) {
    const imageSrc = allImages[category][i];
    const img = new Image();
    img.onload = function () {
      appendImageToSection(category, this.src);
      fadeInImage(this);
      if (i === end - 1) {
        galleryLoading = false;
      }
    };
    img.src = imageSrc;
  }
  loadedImages[category] += count;
}

function fadeInImage(imgElement) {
  imgElement.style.opacity = 0;
  let opacity = 0;
  const interval = setInterval(() => {
    if (opacity < 1) {
      opacity += 0.05;
      imgElement.style.opacity = opacity;
    } else {
      clearInterval(interval);
    }
  }, 35);
}

function initInfiniteScroll() {
  window.addEventListener("scroll", () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !galleryLoading
    ) {
      const currentCategory = determineCurrentCategory();
      if (currentCategory) {
        galleryLoading = true;
        loadImagesWithAnimation(currentCategory, 3);
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
