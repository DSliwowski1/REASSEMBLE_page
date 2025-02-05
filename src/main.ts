// Import your styles and scripts
import '../static/css/bulma.min.css'
import '../static/css/bulma-carousel.min.css'
import '../static/css/bulma-slider.min.css'
import '../static/css/fontawesome.all.min.css'
import '../static/css/index.css'
import '../static/css/gallery.css'

// Import JavaScript files
import '../static/js/fontawesome.all.min.js'
import '../static/js/index.js'
import '../static/js/audioPlayer.js'
import '../static/js/gallery.js'

// Declare types for external libraries
declare global {
    interface Window {
        GifGallery: any;
        bulmaCarousel: any;
    }
}

// Function to load external script
function loadScript(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
        document.body.appendChild(script);
    });
}

// Initialize everything after DOM is loaded
window.addEventListener('load', async () => {
    console.log('Initializing components...');

    // Load Bulma Carousel script dynamically
    try {
        await loadScript('../static/js/bulma-carousel.min.js');
        console.log('Bulma Carousel loaded');
        
        // Initialize carousels if they exist
        if (window.bulmaCarousel) {
            window.bulmaCarousel.attach('.carousel', {
                slidesToShow: 1,
                slidesToScroll: 1
            });
        }
    } catch (error) {
        console.error('Error loading Bulma Carousel:', error);
    }

    // Initialize GIF Gallery
    try {
        const gallery = new window.GifGallery('gifGallery');
        const gifs = [
            {
                filename: '2025-01-11-14-04-40',
                path: '../static/videos/preview1.gif',
                targetUrl: `viewer.html?file=2025-01-11-14-04-40.rrd`
            },
            {
                filename: '2025-01-09-15-27-49',
                path: '../static/videos/preview2.gif',
                targetUrl: `viewer.html?file=2025-01-09-15-27-49.rrd`
            }
        ];

        console.log('Loading gifs:', gifs);
        gallery.loadGifs(gifs);
    } catch (error) {
        console.error('Error initializing gallery:', error);
    }
});

// Export empty object to make TypeScript happy
export {};