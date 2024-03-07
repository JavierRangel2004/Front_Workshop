const portraits = [];
for (let i = 1; i <= 20; i++) {
  portraits.push(`/media/port/Portrait (${i}).webp`);
}

const landscapes = [];
for (let i = 1; i <= 20; i++) {
  landscapes.push(`/media/land/Landscape (${i}).webp`);
}

const objects = [];
for (let i = 1; i <= 20; i++) {
  objects.push(`/media/obj/Object (${i}).webp`);
}

const allImages = { portraits, landscapes, objects };

const loadedImages = { portraits: 0, landscapes: 0, objects: 0 };

document.addEventListener('DOMContentLoaded', () => {
    // Load initial images on home page
    loadInitialImages('featured-photos', allImages);
  
    // Load initial images in gallery and set up "load more" buttons
    ['portraits', 'landscapes', 'objects'].forEach(category => {
      if (document.getElementById(category)) {
        loadMoreImages(category);
      }
      setupLoadMoreListener(category);
    });
  
    // Adjust modal to work with Bootstrap's modal
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', (event) => {
        const imageSrc = event.target.getAttribute('src');
        openModal(imageSrc);
      });
    });
  });
  
  function loadInitialImages(sectionId, images) {
    if (document.getElementById(sectionId)) {
      loadRandomImages(sectionId, images.portraits, 1);
      loadRandomImages(sectionId, images.landscapes, 1);
      loadRandomImages(sectionId, images.objects, 1);
    }
  }
  
  function setupLoadMoreListener(category) {
    const buttonId = `loadMore${category.charAt(0).toUpperCase() + category.slice(1)}`;
    const button = document.getElementById(buttonId);
    if (button) {
      button.addEventListener('click', () => loadMoreImages(category));
    }
  }
  
  function loadImages(sectionId, images) {
    const section = document.getElementById(sectionId);
    images.forEach((image, index) => {
      const img = document.createElement('img');
      img.classList.add('gallery-item', 'img-fluid', 'rounded');
      img.setAttribute('data-bs-toggle', 'modal');
      img.setAttribute('data-bs-target', '#modal');
      img.src = image;
      section.appendChild(img);
    });
  }
  
  function loadMoreImages(category) {
    const start = loadedImages[category];
    const end = start + 4;
    const images = allImages[category].slice(start, end);
    loadImages(category, images);
    loadedImages[category] = end;
  }
  
  function openModal(imageSrc) {
    const modalImage = document.getElementById('modal-image');
    modalImage.src = imageSrc;
    const modalElement = new bootstrap.Modal(document.getElementById('modal'));
    modalElement.show();
  }
  
  function loadRandomImages(sectionId, images, count) {
    const section = document.getElementById(sectionId);
    const randomImages = getRandomImages(images, count);
    randomImages.forEach(image => {
      const img = document.createElement('img');
      img.classList.add('gallery-item', 'img-fluid', 'rounded');
      img.setAttribute('data-bs-toggle', 'modal');
      img.setAttribute('data-bs-target', '#modal');
      img.src = image;
      section.appendChild(img);
    });
  }
  
  function getRandomImages(images, count) {
    const randomImages = [];
    const usedIndices = new Set();
  
    while (randomImages.length < count) {
      const randomIndex = Math.floor(Math.random() * images.length);
      if (!usedIndices.has(randomIndex)) {
        usedIndices.add(randomIndex);
        randomImages.push(images[randomIndex]);
      }
    }
  
    return randomImages;
  }