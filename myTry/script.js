const allImages = {
    portraits: [],
    landscapes: [],
    objects: [],
  };
  
  for (let i = 1; i <= 70; i++) {
    allImages.portraits.push(`/media/port/Portrait (${i}).webp`);
  }
  
  for (let i = 1; i <= 50; i++) {
    allImages.landscapes.push(`/media/land/Landscape (${i}).webp`);
  }
  
  for (let i = 1; i <= 22; i++) {
    allImages.objects.push(`/media/obj/Object (${i}).webp`);
  }
  
  const loadedImages = {
    portraits: 0,
    landscapes: 0,
    objects: 0,
  };
  
  document.addEventListener("DOMContentLoaded", () => {
    const numPhotos = {
      portraits: 3,
      landscapes: 3,
      objects: 3,
    };
  
    loadFeaturedImages("featured-photos", allImages, numPhotos);
    initGalleryLoadMore();
  
    // Setup for the custom close button
    document.querySelector('.close-btn').addEventListener('click', function() {
      let modalEl = document.getElementById('modal');
      let modalInstance = bootstrap.Modal.getInstance(modalEl); // Get the modal instance
      modalInstance.hide(); // Hide the modal
    });
  });
  
  function loadFeaturedImages(sectionId, images, numPhotosPerCategory) {
    ["portraits", "landscapes", "objects"].forEach((category) => {
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
  
  function initGalleryLoadMore() {
    document.querySelectorAll("[data-category]").forEach((button) => {
      button.addEventListener("click", function () {
        const category = this.getAttribute("data-category");
        loadMoreImages(category);
      });
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
  
    const img = document.createElement("img");
    img.src = imageSrc;
    img.classList.add("img-fluid", "rounded", "shadow-sm", "m-2", "grow-on-hover");
    img.style.objectFit = "contain";
    img.addEventListener("click", () => {
      const modalImage = document.getElementById('modal-image');
      modalImage.src = imageSrc; // Set the source of the modal image to the clicked image
      const modalElement = new bootstrap.Modal(document.getElementById('imageModal'));
      modalElement.show(); // Show the modal
    });
  
    container.appendChild(img);
    section.appendChild(container);
  }
  
  
    function openModal(imageSrc) {
        const modalImage = document.getElementById('modal-image');
        modalImage.src = imageSrc;
        const modalElement = new bootstrap.Modal(document.getElementById('modal'));
        modalElement.show();
        }
  
  document.getElementById('featured-photos').addEventListener('wheel', function(event) {
    if (event.deltaY != 0) { // If
        event.preventDefault();
        this.scrollLeft += event.deltaY;
        }
    }
    );
// Path: myTry/index.html
// Compare this snippet from BuddyTry/index.html:
//     <!DOCTYPE html>