// Import all CSS files
import './static/css/bulma.min.css'
import './static/css/bulma-carousel.min.css'
import './static/css/bulma-slider.min.css'
import './static/css/fontawesome.all.min.css'
import './static/css/index.css'
import './static/css/gallery.css'

// Import all JavaScript files
import './static/js/fontawesome.all.min.js'
import './static/js/bulma-carousel.min.js'
import './static/js/bulma-slider.min.js'
import './static/js/index.js'
import './static/js/audioPlayer.js'
import './static/js/gallery.js'

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

// Initialize everything after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize GIF Gallery
  const gallery = new GifGallery('gifGallery');
  const gifs = [
    {
      filename: 'Sample 1',
      path: '/static/videos/sample1.gif',  // Update with your actual path
      targetUrl: 'viewer.html?sample=1'    // Update with your actual target URL
    },
    {
      filename: 'Sample 2',
      path: '/static/videos/sample2.gif',  // Update with your actual path
      targetUrl: 'viewer.html?sample=2'    // Update with your actual target URL
    }
  ];
  gallery.loadGifs(gifs);

  // Initialize Bulma Carousel
  if (window.bulmaCarousel) {
    window.bulmaCarousel.attach('.carousel', {
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      autoplay: true
    });
  }
});