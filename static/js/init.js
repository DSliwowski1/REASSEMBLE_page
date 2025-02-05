document.addEventListener('DOMContentLoaded', function() {
    const gallery = new GifGallery('gifGallery');
    
    const gifs = [
        {
            filename: '2025-01-09-15-27-49',
            path: './2025-01-09-15-27-49.gif',  // Update with your actual path
            targetUrl: 'https://example.com/1'   // Update with your actual URL
        },
        {
            filename: '2025-01-11-14-04-40',
            path: './2025-01-11-14-04-40.gif',  // Update with your actual path
            targetUrl: 'https://example.com/2'   // Update with your actual URL
        }
    ];
    
    gallery.loadGifs(gifs);
});