import Papa from 'papaparse';

// Simplified actions based on your description
type SimplifiedAction = 'Pick' | 'Insert' | 'Place' | 'Remove';

interface DataPoint {
    x: number;
    y: number;
    action: string;  // Full action from the CSV
    simplifiedAction: SimplifiedAction;
}

interface CSVRow {
    action: string;  // Full action
    simp: SimplifiedAction;  // Simplified action
    x: unknown;
    y: unknown;
}

export class InteractiveScatterPlot {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private data: DataPoint[];
    private filteredData: DataPoint[];
    private width: number;
    private height: number;
    private margin: number = 50;
    private activeFilters: SimplifiedAction[] = ['Pick', 'Insert', 'Place', 'Remove'];
    private colorMap: { [key in SimplifiedAction]: string } = {
        'Insert': '#33A1FD',
        'Pick': '#F79824', 
        'Place': '#DB5461',
        'Remove': '#57A773'
    };

    constructor(canvasId: string, data: DataPoint[]) {
        const canvas = document.getElementById(canvasId);
        if (!(canvas instanceof HTMLCanvasElement)) {
            throw new Error(`Canvas with id ${canvasId} not found`);
        }
        
        this.canvas = canvas;
        
        // Ensure canvas matches its display size
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        
        this.ctx = this.canvas.getContext('2d')!;
        this.data = data;
        this.filteredData = [...data];
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        this.setupEventListeners();
        this.createFilterControls();
        this.draw();
    }

    private setupEventListeners() {
        // Add any interactive event listeners if needed
    }

    private createFilterControls() {
        const filterContainer = document.createElement('div');
        filterContainer.id = 'filter-container';
        filterContainer.style.marginBottom = '10px';

        // Create checkboxes for simplified actions
        this.activeFilters.forEach(action => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `filter-${action}`;
            checkbox.checked = true;
            checkbox.addEventListener('change', () => this.toggleFilter(action));

            const label = document.createElement('label');
            label.htmlFor = `filter-${action}`;
            label.style.color = this.colorMap[action];
            label.style.marginRight = '10px';
            label.textContent = action;

            filterContainer.appendChild(checkbox);
            filterContainer.appendChild(label);
        });

        this.canvas.parentElement?.insertBefore(filterContainer, this.canvas);
    }

    private toggleFilter(action: SimplifiedAction) {
        const index = this.activeFilters.indexOf(action);
        if (index > -1) {
            this.activeFilters.splice(index, 1);
        } else {
            this.activeFilters.push(action);
        }

        // If no filters are selected, show all data
        if (this.activeFilters.length === 0) {
            this.filteredData = this.data;
        } else {
            this.filteredData = this.data.filter(point => 
                this.activeFilters.includes(point.simplifiedAction)
            );
        }

        this.draw();
    }

    private draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.width, this.height);

        // If no data, return early
        if (this.filteredData.length === 0) return;

        // Calculate data bounds
        const xValues = this.filteredData.map(p => p.x);
        const yValues = this.filteredData.map(p => p.y);
        const xMin = Math.min(...xValues);
        const xMax = Math.max(...xValues);
        const yMin = Math.min(...yValues);
        const yMax = Math.max(...yValues);

        // Add more aggressive padding to spread out points
        const xRange = xMax - xMin;
        const yRange = yMax - yMin;
        const xPadding = Math.max(xRange * 0.2, 0.01); // Ensure at least 0.01m padding
        const yPadding = Math.max(yRange * 0.2, 0.01);

        // Adjusted bounds with padding
        const xMinPadded = xMin - xPadding;
        const xMaxPadded = xMax + xPadding;
        const yMinPadded = yMin - yPadding;
        const yMaxPadded = yMax + yPadding;

        // Scale and transform
        const plotWidth = this.width - 2 * this.margin;
        const plotHeight = this.height - 2 * this.margin;
        const xScale = plotWidth / (xMaxPadded - xMinPadded);
        const yScale = plotHeight / (yMaxPadded - yMinPadded);

        // Draw axes
        this.ctx.beginPath();
        this.ctx.moveTo(this.margin, this.margin);
        this.ctx.lineTo(this.margin, this.height - this.margin);
        this.ctx.lineTo(this.width - this.margin, this.height - this.margin);
        this.ctx.strokeStyle = 'black';
        this.ctx.stroke();

        // Draw tick marks and labels
        this.drawTicks(xMin, xMax, yMin, yMax, xScale, yScale, xMinPadded, yMinPadded);

        // Draw data points
        this.filteredData.forEach(point => {
            const x = this.margin + (point.x - xMinPadded) * xScale;
            const y = this.height - this.margin - (point.y - yMinPadded) * yScale;

            this.ctx.beginPath();
            this.ctx.arc(x, y, 4, 0, Math.PI * 2);
            this.ctx.fillStyle = this.colorMap[point.simplifiedAction];
            this.ctx.fill();
        });
    }

    private drawTicks(
        xMin: number, 
        xMax: number, 
        yMin: number, 
        yMax: number, 
        xScale: number, 
        yScale: number, 
        xMinPadded: number, 
        yMinPadded: number
    ) {
        this.ctx.fillStyle = 'black';
        this.ctx.font = '12px Arial';

        // X-axis ticks
        const xTickCount = 5;
        const xRange = xMax - xMin;
        for (let i = 0; i <= xTickCount; i++) {
            const xValue = xMin + xRange * (i / xTickCount);
            const x = this.margin + (xValue - xMinPadded) * xScale;
            
            // Tick line
            this.ctx.beginPath();
            this.ctx.moveTo(x, this.height - this.margin);
            this.ctx.lineTo(x, this.height - this.margin + 5);
            this.ctx.strokeStyle = 'black';
            this.ctx.stroke();

            // Tick label
            this.ctx.fillText(xValue.toFixed(2), x - 15, this.height - this.margin + 20);
        }

        // Y-axis ticks
        const yTickCount = 5;
        const yRange = yMax - yMin;
        for (let i = 0; i <= yTickCount; i++) {
            const yValue = yMin + yRange * (i / yTickCount);
            const y = this.height - this.margin - (yValue - yMinPadded) * yScale;
            
            // Tick line
            this.ctx.beginPath();
            this.ctx.moveTo(this.margin - 5, y);
            this.ctx.lineTo(this.margin, y);
            this.ctx.strokeStyle = 'black';
            this.ctx.stroke();

            // Tick label
            this.ctx.fillText(yValue.toFixed(2), this.margin - 40, y + 5);
        }

        // Axis labels
        this.ctx.fillText('x [m]', this.width - this.margin, this.height - this.margin / 2);
        this.ctx.save();
        this.ctx.rotate(-Math.PI / 2);
        this.ctx.fillText('y [m]', -this.height / 2, this.margin / 2);
        this.ctx.restore();
    }

    static async loadFromCSV(file: File): Promise<DataPoint[]> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
    
            reader.onload = (event) => {
                if (!event.target?.result) {
                    reject(new Error("Failed to read file"));
                    return;
                }
    
                Papa.parse<CSVRow>(event.target.result as string, {
                    header: true,
                    dynamicTyping: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        try {
                            // Validate simplified actions 
                            const validSimplifiedActions: SimplifiedAction[] = ['Pick', 'Insert', 'Place', 'Remove'];

                            const parsedData = results.data
                                .map(row => {
                                    // Ensure simplified action is valid
                                    const simplifiedAction = validSimplifiedActions.includes(row.simp as SimplifiedAction) 
                                        ? row.simp as SimplifiedAction 
                                        : 'Insert';

                                    return {
                                        x: typeof row.x === 'number' ? row.x : parseFloat(String(row.x)),
                                        y: typeof row.y === 'number' ? row.y : parseFloat(String(row.y)),
                                        action: row.action || 'Unknown Action',
                                        simplifiedAction: simplifiedAction
                                    };
                                })
                                .filter(point => !isNaN(point.x) && !isNaN(point.y)) as DataPoint[];
    
                            resolve(parsedData);
                        } catch (error) {
                            reject(error);
                        }
                    },
                    error: (error: Error) => {
                        reject(error);
                    }
                });
            };
    
            reader.onerror = () => reject(new Error("File reading error"));
            reader.readAsText(file);
        });
    }    
}

export async function createScatterPlot(canvasId: string, file: File) {
    try {
        // Load data from CSV file
        const data = await InteractiveScatterPlot.loadFromCSV(file);

        // Create scatter plot
        return new InteractiveScatterPlot(canvasId, data);
    } catch (error) {
        console.error('Error creating scatter plot:', error);
        throw error;
    }
}