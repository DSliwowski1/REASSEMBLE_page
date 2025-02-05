// Import your styles and scripts
import '/REASSEMBLE_page/static/css/bulma.min.css'
import '/REASSEMBLE_page/static/css/bulma-carousel.min.css'
import '/REASSEMBLE_page/static/css/bulma-slider.min.css'
import '/REASSEMBLE_page/static/css/fontawesome.all.min.css'
import '/REASSEMBLE_page/static/css/index.css'
import '/REASSEMBLE_page/static/css/gallery.css'

// Import JavaScript files
import '/REASSEMBLE_page/static/js/fontawesome.all.min.js'
import '/REASSEMBLE_page/static/js/index.js'
import '/REASSEMBLE_page/static/js/audioPlayer.js'
import '/REASSEMBLE_page/static/js/gallery.js'

// Declare types for external libraries
declare global {
    interface Window {
        GifGallery: any;
        bulmaCarousel: any;
    }
}

// Function to load external script with correct path
function loadScript(url: string): Promise<void> {
    // Add repository name to path
    const fullUrl = `/REASSEMBLE_page${url}`;
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = fullUrl;
        script.onload = () => resolve();
        script.onerror = (e) => {
            console.error(`Failed to load script: ${fullUrl}`, e);
            reject(new Error(`Failed to load script: ${fullUrl}`));
        };
        document.body.appendChild(script);
    });
}

// Initialize everything after DOM is loaded
window.addEventListener('load', async () => {
    console.log('Initializing components...');

    // Load Bulma Carousel script dynamically
    try {
        await loadScript('/static/js/bulma-carousel.min.js');
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
                path: '/REASSEMBLE_page/2025-01-11-14-04-40.gif',
                targetUrl: `/REASSEMBLE_page/viewer.html?file=2025-01-11-14-04-40.rrd`
            },
            {
                filename: '2025-01-09-15-27-49',
                path: '/REASSEMBLE_page/2025-01-09-15-27-49.gif',
                targetUrl: `/REASSEMBLE_page/viewer.html?file=2025-01-09-15-27-49.rrd`
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