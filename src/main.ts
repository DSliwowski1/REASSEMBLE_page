// Import your styles and scripts
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
        GifGallery: any;
        bulmaCarousel: {
            attach: (selector: string, options: any) => any;
        };
    }
}

// Initialize everything after DOM is loaded
window.addEventListener('load', () => {
    console.log('Initializing gallery...'); // Debug log

    // Initialize GIF Gallery
    const galleryElement = document.getElementById('gifGallery');
    if (!galleryElement) {
        console.error('Gallery element not found!');
        return;
    }

    try {
        const gallery = new window.GifGallery('gifGallery');
        const gifs = [
            {
                filename: '2025-01-11-14-04-40',
                path: './2025-01-11-14-04-40.gif', // Update path to your actual preview GIF
                targetUrl: `viewer.html?file=2025-01-11-14-04-40.rrd`
            },
            {
                filename: '2025-01-09-15-27-49',
                path: './2025-01-11-14-04-40.gif', // Update path to your actual preview GIF
                targetUrl: `viewer.html?file=2025-01-09-15-27-49.rrd`
            }
        ];

        console.log('Loading gifs:', gifs); // Debug log
        gallery.loadGifs(gifs);
    } catch (error) {
        console.error('Error initializing gallery:', error);
    }

    // Initialize other components as needed
});

// Export empty object to make TypeScript happy
export {};