const createFullScreenCanvas = () => {
    document.body.style.padding = "0";
    document.body.style.margin = "0";
    const canvas = document.createElement("canvas");

    const wView = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const hView = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    canvas.width = wView;
    canvas.height = hView;

    document.body.appendChild(canvas);

    return canvas;
}
window.BullEngine = class {
    constructor(canvas, tileSize) {
        this.canvas = document.getElementById(canvas) ? document.getElementById(canvas) : createFullScreenCanvas();
        this.ctx = this.canvas.getContext("2d");
        this.terrain = [];
        this.grid = [];
        this.tilesX = 25;
        this.tilesY = 25;
        this.tileSize = tileSize || 50;
        this.entities = [];

        this.initGrid();
    }

    setMapSize(x, y) {
        this.tilesX = x;
        this.tilesY = y;
        this.initGrid();
    }

    setTileSize(tileSize) {
        this.tileSize = tileSize;
        this.initGrid();
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    initGrid() {
        for (let y = 0; y < this.tilesY; y++) {
            this.grid[y] = [];
            for (let x = 0; x < this.tilesX; x++) {
                this.grid[y][x] = {
                    x: x * this.tileSize,
                    y: y * this.tileSize
                };
            }
        }
    }

    drawGrid() {
        for (let y = 0; y < this.tilesY; y++) {
            for (let x = 0; x < this.tilesX; x++) {
                this.ctx.strokeStyle = 'black';
                this.ctx.lineWidth = 1;

                this.ctx.strokeRect(
                    this.grid[y][x].x,
                    this.grid[y][x].y,
                    this.tileSize,
                    this.tileSize
                );
            }
        }
    }

    update() {
        for (const entity of this.entities) {
            entity.update();
        }
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawGrid();

        for (const entity of this.entities) {
            entity.render();
        }
    }

    start(fps) {
        console.log("BullEngine Started.");
        // Game loop
        const gameLoop = () => {
            this.update();
            this.render();
            fps ? setTimeout(gameLoop, fps) : requestAnimationFrame(gameLoop);
        };

        gameLoop();
    }
}