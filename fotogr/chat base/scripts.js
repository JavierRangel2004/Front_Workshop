// Replace these with the actual paths to your image files
const portraitImages = ['Portrait (1).jpg', 'Portrait (2).jpg', 'Portrait (3).jpg', 'Portrait (4).jpg', 'Portrait (5).jpg', 'Portrait (6).jpg', 'Portrait (7).jpg', 'Portrait (8).jpg', 'Portrait (9).jpg', 'Portrait (10).jpg', 'Portrait (11).jpg', 'Portrait (12).jpg', 'Portrait (13).jpg', 'Portrait (14).jpg', 'Portrait (15).jpg', 'Portrait (16).jpg', 'Portrait (17).jpg', 'Portrait (18).jpg', 'Portrait (19).jpg', 'Portrait (20).jpg', 'Portrait (21).jpg', 'Portrait (22).jpg', 'Portrait (23).jpg', 'Portrait (24).jpg', 'Portrait (25).jpg'];
const landscapeImages = ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'];

let portraitIndex = 0;
let landscapeIndex = 0;

window.onload = function() {
    // Load initial images on Home and Gallery pages
    loadRandomImages();
    loadMorePortraits();
    loadMoreLandscapes();

    // Add event listeners to "Load More" buttons
    const loadMorePortraitsButton = document.getElementById('load-more-portraits');
    const loadMoreLandscapesButton = document.getElementById('load-more-landscapes');

    if (loadMorePortraitsButton) {
        loadMorePortraitsButton.addEventListener('click', loadMorePortraits);
    }

    if (loadMoreLandscapesButton) {
        loadMoreLandscapesButton.addEventListener('click', loadMoreLandscapes);
    }

    // Add event listener to contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', sendEmail);
    }
}

function loadRandomImages() {
    const randomPhotosSection = document.getElementById('random-photos');
    if (!randomPhotosSection) return;

    // Clear section
    randomPhotosSection.innerHTML = '';

    // Add random portraits and landscapes
    for (let i = 0; i < 3; i++) {
        addImage(randomPhotosSection, portraitImages[i]);
        addImage(randomPhotosSection, landscapeImages[i]);
    }
}

function loadMorePortraits() {
    const portraitsSection = document.getElementById('portraits');
    if (!portraitsSection) return;

    for (let i = 0; i < 3 && portraitIndex < portraitImages.length; i++) {
        addImage(portraitsSection, portraitImages[portraitIndex]);
        portraitIndex++;
    }
}

function loadMoreLandscapes() {
    const landscapesSection = document.getElementById('landscapes');
    if (!landscapesSection) return;

    for (let i = 0; i < 3 && landscapeIndex < landscapeImages.length; i++) {
        addImage(landscapesSection, landscapeImages[landscapeIndex]);
        landscapeIndex++;
    }
}

function addImage(section, src) {
    const img = document.createElement('img');
    img.src = src;
    section.appendChild(img);
}

function sendEmail(e) {
    e.preventDefault();

    const name= document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Simulate sending email
    console.log(`Sending email...
    From: ${name}
    Email: ${email}
    Message: ${message}`);
    
    alert('Email sent!');

    // Clear the form
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
}
