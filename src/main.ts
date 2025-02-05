// Import all CSS files
import '../static/css/bulma.min.css'
import '../static/css/bulma-carousel.min.css'
import '../static/css/bulma-slider.min.css'
import '../static/css/fontawesome.all.min.css'
import '../static/css/index.css'
import '../static/css/gallery.css'

// Import all JavaScript files
import '../static/js/fontawesome.all.min.js'
import '../static/js/bulma-carousel.min.js'
import '../static/js/bulma-slider.min.js'
import '../static/js/index.js'
import '../static/js/audioPlayer.js'
import '../static/js/gallery.js'

// Declare types for external libraries
declare global {
  interface Window {
    bulmaCarousel: {
      attach: (selector: string, options: any) => any;
    };
  }
  class GifGallery {
    constructor(containerId: string);
    loadGifs(gifs: Array<{
      filename: string;
      path: string;
      targetUrl: string;
    }>): void;
  }
}

// Wait for both DOM and all resources to be loaded
window.addEventListener('load', () => {
  try {
    // Initialize GIF Gallery if the element exists
    const galleryElement = document.getElementById('gifGallery');
    if (galleryElement) {
      const gallery = new GifGallery('gifGallery');
      const gifs = [
        {
            filename: '2025-01-11-14-04-40',
            path: './2025-01-11-14-04-40.gif',  // Path to your preview GIF
            targetUrl: `viewer.html?file=2025-01-11-14-04-40.rrd`
        },
        {
            filename: '2025-01-09-15-27-49',
            path: './2025-01-09-15-27-49.gif',  // Path to your preview GIF
            targetUrl: `viewer.html?file=2025-01-09-15-27-49.rrd`
        }
    ];
      gallery.loadGifs(gifs);
    }

    // Initialize Bulma Carousel if it exists
    const carouselElement = document.querySelector('.carousel');
    if (carouselElement && window.bulmaCarousel) {
      window.bulmaCarousel.attach('.carousel', {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true
      });
    }
  } catch (error) {
    console.error('Error during initialization:', error);
  }
});

// Export any functions or variables that need to be accessible
export {}