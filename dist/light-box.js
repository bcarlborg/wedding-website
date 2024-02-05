console.log('bcarlborg script outer');
document.addEventListener("DOMContentLoaded", () => {
    console.log('bcarlborg script content loaded');

    ////////////////////////////////////////////////////////////////
    // Lighbox state
    ////////////////////////////////////////////////////////////////

    //
    // lightbox dom components
    //
    const imagesContainer = document.querySelector('.image-gallery');
    const lightbox = document.querySelector('.lightbox');

    //
    // lightbox state
    //
    let lightBoxSelectedImageIndex = undefined;

    ////////////////////////////////////////////////////////////////
    // Functions for updating lightbox state
    ////////////////////////////////////////////////////////////////

    const showImageInLightbox = imageNode => {
        lightbox.innerHTML = '<div class="close-lightbox"></div>' + imageNode.outerHTML;
        lightbox.classList.add('show');
    };

    const findImageByGalleryIndex = galleryIndex => {
        const imageWrapper = document.querySelector(`[data-gallery-image-index="${galleryIndex}"]`)
        if (!imageWrapper) return undefined;

        const image = imageWrapper.querySelector('img');
        if (!image) return undefined;

        return image;
    }

    const maybeShowImageWithGalleryIndex = galleryIndex => {
        const image = findImageByGalleryIndex(galleryIndex);
        if (!image) return;
        showImageInLightbox(image);
        lightBoxSelectedImageIndex = parseInt(galleryIndex);
    }

    const maybeUpdateImageInLightBoxOnKeyPress = e => {
        if (!Number.isInteger(lightBoxSelectedImageIndex)) return;

        if (e.key === 'ArrowRight') {
            e.preventDefault();
            const nextIndex = lightBoxSelectedImageIndex < 10 ? lightBoxSelectedImageIndex + 1 : 0;
            maybeShowImageWithGalleryIndex(nextIndex);
        }

        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            const nextIndex = lightBoxSelectedImageIndex > 0 ? lightBoxSelectedImageIndex - 1 : 10;
            maybeShowImageWithGalleryIndex(nextIndex);
        }
    }

    const maybeShowClickedElementInLightBox = e => {
        // try to find an image wrapper around the clicke element
        // if we can't find one, then there is nothing to show in the lightbox
        // for this click
        const imageWrapper = e.target.closest('.image-wrapper');
        if (!imageWrapper) return;

        const imageIndex = imageWrapper.getAttribute('data-gallery-image-index');

        // try to find the image within that image wrapper
        // if we can't find an image, then lets get out of here
        const image = imageWrapper.querySelector('img');
        if (!image) return;

        console.log('clicked image src', imageIndex, image.getAttribute("src"));

        // if we are here, it means we found an image to show based on the mouse event
        // so lets show that image in the light box
        showImageInLightbox(image);
        lightBoxSelectedImageIndex = parseInt(imageIndex);
    };

    const maybeHideLightBoxOnClick = e => {
        // if this click was on a photo, then we don't want to hide the lightbox
        if (e.target.hasAttribute('src')) return;

        // remove the show class on the lightbox
        lightbox.classList.remove('show');
        lightBoxSelectedImageIndex = undefined;
    }
  
    ////////////////////////////////////////////////////////////////
    // Register the event handlers
    ////////////////////////////////////////////////////////////////
    
    imagesContainer.addEventListener('click', maybeShowClickedElementInLightBox);

    lightbox.addEventListener('click', maybeHideLightBoxOnClick);

    document.addEventListener('keydown', maybeUpdateImageInLightBoxOnKeyPress);
});