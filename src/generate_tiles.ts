// script.ts
interface GifTile {
    filename: string;
    path: string;
    targetUrl: string;
}

class GifGallery {
    private container: HTMLElement;
    private tiles: GifTile[] = [];

    constructor(containerId: string) {
        const element = document.getElementById(containerId);
        if (!element) {
            throw new Error(`Container with id ${containerId} not found`);
        }
        this.container = element;
        this.container.classList.add('gif-gallery');
    }

    public async loadGifs(directoryPath: string) {
        try {
            // In a real application, you'd probably want to fetch this from an API
            const response = await fetch(directoryPath);
            const files = await response.json();
            
            this.tiles = files
                .filter((file: string) => file.toLowerCase().endsWith('.gif'))
                .map((file: string) => ({
                    filename: file,
                    path: `${directoryPath}/${file}`,
                    targetUrl: `https://example.com/${file}` // Customize this as needed
                }));

            this.renderTiles();
        } catch (error) {
            console.error('Error loading GIFs:', error);
        }
    }

    private createTileElement(tile: GifTile): HTMLElement {
        const tileElement = document.createElement('button');
        tileElement.className = 'gif-tile';
        tileElement.onclick = () => window.location.href = tile.targetUrl;

        const imgContainer = document.createElement('div');
        imgContainer.className = 'gif-container';

        const img = document.createElement('img');
        img.src = tile.path;
        img.alt = tile.filename;
        img.className = 'gif-thumbnail';

        const filename = document.createElement('p');
        filename.textContent = tile.filename;
        filename.className = 'filename';

        imgContainer.appendChild(img);
        tileElement.appendChild(imgContainer);
        tileElement.appendChild(filename);

        return tileElement;
    }

    private renderTiles() {
        this.container.innerHTML = '';
        
        this.tiles.forEach(tile => {
            const tileElement = this.createTileElement(tile);
            this.container.appendChild(tileElement);
        });
    }
}

// Usage example:
// const gallery = new GifGallery('gifGallery');
// gallery.loadGifs('/path/to/gifs');