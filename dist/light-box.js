console.log('bcarlborg script outer');
document.addEventListener("DOMContentLoaded", () => {
  console.log('bcarlborg script content loaded');

  // ===> DOM elements <=== //

  const $imagesContainer = document.querySelector('.image-gallery');
  const $lightbox = document.querySelector('.lightbox');

  // ===> Event listeners and triggers <=== //
  
  // Show lightbox 
  $imagesContainer.addEventListener('click', e => {
      console.log('bcarlborg script images container click');
      const imageWrapper = e.target.closest('.image-wrapper');

      if (imageWrapper) {
          const image = imageWrapper.querySelector('img');
          if (image) {
              $lightbox.innerHTML = '<div class="close-lightbox"></div>' + image.outerHTML;
              $lightbox.classList.add('show');
          }
      }
  });

  // Hide Lightbox
  $lightbox.addEventListener('click', (e) => {
      if (!e.target.hasAttribute('src')) {
          $lightbox.classList.remove('show');
      }
  });
});