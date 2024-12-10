document.addEventListener("DOMContentLoaded", function() {
  console.log("Script loaded!");
  
  const categories = window.categories || [];
  
  // Convert categories to have a generated image list
  categories.forEach(cat => {
    cat.images = generateImageList(cat.prefix, cat.start, cat.count);
  });

  // HOME PAGE
  const featuredPhotos = document.getElementById('featured-photos');
  if (featuredPhotos && categories.length > 0) {
    initFeaturedImages(categories, featuredPhotos);
    handleHorizontalScroll('featured-photos');
    addCarouselArrows(featuredPhotos.parentElement, featuredPhotos);
  }

  // CATEGORY PAGE
  const bodyCategory = document.body.getAttribute('data-category');
  if (bodyCategory) {
    initInfiniteGallery(bodyCategory, categories);
  }

  // CONTACT FORM
  if (document.getElementById('form')) {
    contactFormSubmit();
  }
});

function generateImageList(prefix, start, count) {
  let arr = [];
  for (let i = start; i <= count; i++) {
    arr.push(`${prefix} (${i}).webp`);
  }
  return arr;
}

// From the old working code: handleHorizontalScroll
function handleHorizontalScroll(elementId) {
  const el = document.getElementById(elementId);
  el.addEventListener("wheel", function (event) {
    if (event.deltaY != 0) {
      event.preventDefault();
      this.scrollLeft += event.deltaY;
    }
  });
}

// Initialize featured images (5 random images per category, total 20 images max)
function initFeaturedImages(categories, container) {
  container.innerHTML = '';
  const numPhotos = { portraits: 3, nature: 3, city: 3, creativity: 3 }; 
  // user asked for 5 images per category previously, let's increase to 5 each:
  numPhotos.portraits = 5; 
  numPhotos.nature = 5;
  numPhotos.city = 5;
  numPhotos.creativity = 5;

  loadFeaturedImages(container, categories, numPhotos);
}

// loadFeaturedImages with fade-in on each image
function loadFeaturedImages(container, categories, numPhotosPerCategory) {
  ["portraits", "nature", "city", "creativity"].forEach(category => {
    const cat = categories.find(c => c.name === category);
    if (!cat) return;
    if (!cat.images || cat.images.length === 0) return;

    const usedImages = [];
    for (let i = 0; i < numPhotosPerCategory[category]; i++) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * cat.images.length);
      } while (usedImages.includes(randomIndex));
      usedImages.push(randomIndex);
      const imageSrc = `/assets/images/${category}/${cat.images[randomIndex]}`;
      appendImageToCarousel(container, imageSrc);
    }
  });
}

// append images to carousel with fade-in
function appendImageToCarousel(container, src) {
  const imgContainer = document.createElement('div');
  imgContainer.className = 'img-container';
  const img = document.createElement('img');
  img.src = src;
  img.className = 'gallery-image';
  img.setAttribute('loading', 'lazy');
  img.style.objectFit = 'cover';
  img.addEventListener('click', () => openModal(src));
  img.onload = () => {
    imgContainer.classList.add('loaded'); // triggers fade-in
  };
  container.appendChild(imgContainer);
  imgContainer.appendChild(img);
}

// Add arrows to carousel
function addCarouselArrows(wrapper, container) {
  const leftArrow = document.createElement('div');
  leftArrow.className = 'carousel-arrow left';
  leftArrow.innerHTML = '<i class="fas fa-chevron-left"></i>';

  const rightArrow = document.createElement('div');
  rightArrow.className = 'carousel-arrow right';
  rightArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';

  wrapper.appendChild(leftArrow);
  wrapper.appendChild(rightArrow);

  leftArrow.addEventListener('click', () => {
    container.scrollBy({ left: -200, behavior: 'smooth' });
  });
  rightArrow.addEventListener('click', () => {
    container.scrollBy({ left: 200, behavior: 'smooth' });
  });
}

// Initialize infinite gallery loading
function initInfiniteGallery(categoryName, categories) {
  const cat = categories.find(c => c.name === categoryName);
  if (!cat) return;

  const galleryContainer = document.querySelector('.gallery');
  if (!galleryContainer) return;

  let startIndex = 0;
  const batchSize = 20; 
  const total = cat.images.length;

  function loadBatch() {
    const end = Math.min(startIndex + batchSize, total);
    for (let i = startIndex; i < end; i++) {
      const imgSrc = `/assets/images/${cat.name}/${cat.images[i]}`;
      const imgContainer = document.createElement('div');
      imgContainer.className = 'img-container';
      const img = document.createElement('img');
      img.src = imgSrc;
      img.className = 'gallery-image';
      img.setAttribute('loading', 'lazy');
      img.style.width = '100%';
      img.style.height = 'auto';
      img.style.objectFit = 'cover';
      img.addEventListener('click', () => openModal(imgSrc));
      img.onload = () => {
        imgContainer.classList.add('loaded'); // fade-in on load
      };
      imgContainer.appendChild(img);
      galleryContainer.appendChild(imgContainer);
    }
    startIndex = end;
  }

  loadBatch();

  // On scroll load more
  window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 300) {
      if (startIndex < total) {
        loadBatch();
      }
    }
  });
}

function openModal(imgSrc) {
  const modalImage = document.getElementById('modal-image');
  if (modalImage) {
    modalImage.src = imgSrc;
    const modalElement = new bootstrap.Modal(document.getElementById('imageModal'));
    modalElement.show();
  }
}

function contactFormSubmit() {
  document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name) { alert('Please enter your name.'); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { alert('Please enter a valid email.'); return; }
    if (!message) { alert('Please enter a message.'); return; }

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxPUxuIUanbvIPtkfz53iYKlQJdzNksDRfWZpfN7_S_yeA9yaYYIltFd8IsBXYX4KUg/exec';
    fetch(scriptURL, {
      method: "POST",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ "name": name, "email": email, "message": message })
    })
    .then(response => response.text())
    .then(text => {
      if (text === 'Success!') {
        alert('Thank you for contacting us, have an excellent day!!');
        document.getElementById('form').reset();
      } else {
        alert('An error occurred. Please try again later.');
      }
    })
    .catch(error => console.error(error));
  });
}
