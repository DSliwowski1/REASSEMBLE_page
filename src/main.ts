// Import your styles and scripts
import '/static/css/bulma.min.css'
import '/static/css/bulma-carousel.min.css'
import '/static/css/bulma-slider.min.css'
import '/static/css/fontawesome.all.min.css'
import '/static/css/index.css'
import '/static/css/gallery.css'

// Import JavaScript files
import '/static/js/fontawesome.all.min.js'
import '/static/js/index.js'
import '/static/js/gallery.js'
import '/static/js/bulma-slider.min.js'
import '/static/js/bulma-carousel.min.js'

// Declare types for external libraries
declare global {
    interface Window {
        GifGallery: any;
        bulmaCarousel: any;
    }
}

// Function to get base URL for GitHub Pages
function getBaseUrl(): string {
    return import.meta.env.PROD ? '/REASSEMBLE_page' : '';
}

// Function to load external script
function loadScript(url: string): Promise<void> {
    const baseUrl = getBaseUrl();
    const fullUrl = `${baseUrl}${url}`;
    
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
    const baseUrl = getBaseUrl();

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
                path: `${baseUrl}/2025-01-09-15-27-49.gif`,
                targetUrl: `${baseUrl}/viewer.html?file=2025-01-11-14-04-40.rrd`
            },
            {
                filename: '2025-01-09-15-27-49',
                path: `${baseUrl}/2025-01-09-15-27-49.gif`,
                targetUrl: `${baseUrl}/viewer.html?file=2025-01-09-15-27-49.rrd`
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