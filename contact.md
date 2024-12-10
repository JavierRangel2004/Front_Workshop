---
layout: page
title: Contact
---
<form id="form" class="mb-5">
  <div class="mb-3">
    <label for="name" class="form-label">Name</label>
    <input type="text" class="form-control" id="name" placeholder="Your Name" />
  </div>
  <div class="mb-3">
    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" id="email" placeholder="name@example.com" />
  </div>
  <div class="mb-3">
    <label for="message" class="form-label">Message</label>
    <textarea class="form-control" id="message" rows="3"></textarea>
  </div>
  <button type="submit" class="btn btn-outline-light rounded-pill">Send</button>
</form>

<h2 class="mt-5 mb-3">Why us?</h2>
<div class="accordion my-4" id="faqAccordion">
  <!-- Accordion items remain as is -->
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingWhyChooseMe">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWhyChooseMe"
        aria-expanded="false" aria-controls="collapseWhyChooseMe">
        Why Choose JRMGraphy?
      </button>
    </h2>
    <div id="collapseWhyChooseMe" class="accordion-collapse collapse show" aria-labelledby="headingWhyChooseMe"
      data-bs-parent="#faqAccordion">
      <div class="accordion-body">
        With a keen eye for capturing the essence of the moment, my photography is about creating art, not just snapshots. My dedication to quality and creativity sets me apart.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingServicesOffered">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
        data-bs-target="#collapseServicesOffered" aria-expanded="false" aria-controls="collapseServicesOffered">
        What Services Do I Offer?
      </button>
    </h2>
    <div id="collapseServicesOffered" class="accordion-collapse collapse" aria-labelledby="headingServicesOffered"
      data-bs-parent="#faqAccordion">
      <div class="accordion-body">
        I offer a range of photography services including portraits, landscapes, event coverage, and bespoke projects tailored to your specific needs.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingBookingProcess">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
        data-bs-target="#collapseBookingProcess" aria-expanded="false" aria-controls="collapseBookingProcess">
        How Does the Booking Process Work?
      </button>
    </h2>
    <div id="collapseBookingProcess" class="accordion-collapse collapse" aria-labelledby="headingBookingProcess"
      data-bs-parent="#faqAccordion">
      <div class="accordion-body">
        Booking is simple. Contact me through any listed method, discuss your project or event, and we'll set a date and time. A deposit may be required for larger projects.
      </div>
    </div>
  </div>
</div>
