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
    constructor(canvas, tileSize, mode = "d" || "p") {
        this.canvas = document.getElementById(canvas) ? document.getElementById(canvas) : createFullScreenCanvas();
        this.ctx = this.canvas.getContext("2d");
        this.mode = mode;
        this.gridLines = true;
        this.camera = null;
        this.grid = [];
        this.tilesX = 25;
        this.tilesY = 25;
        this.tileSize = tileSize || 50;
        this.entities = [];
        this.defaultTexture = "g1";
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

    setCamera(camera){
        this.camera = camera;
        this.initGrid();
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    initGrid(map) {
        if(this.camera) this.camera.setSize(this.canvas.width , this.canvas.height);

        for (let y = 0; y < this.tilesY; y++) {
            this.grid[y] = [];
            for (let x = 0; x < this.tilesX; x++) {
                if (map && map[y] && map[y][x]) {
                    this.grid[y][x] = map[y][x];
                    this.grid[y][x].x = x * this.tileSize;
                    this.grid[y][x].y = y * this.tileSize;
                } else {
                    this.grid[y][x] = {
                        t: this.defaultTexture,
                        x: x * this.tileSize,
                        y: y * this.tileSize
                    };
                }
            }
        }
    }

    drawGrid() {
        for (let y = 0; y < this.tilesY; y++) {
            for (let x = 0; x < this.tilesX; x++) {
                const block = this.grid[y][x];
                let pos = {x: block.x , y: block.y};
                if(this.camera) pos = this.camera.adjustToCamera(pos.x , pos.y);
                if (block.t) this.ctx.drawImage(TEXTURES[block.t], pos.x, pos.y, this.tileSize, this.tileSize);
                if (block.o) this.ctx.drawImage(TEXTURES[block.o], pos.x, pos.y, this.tileSize, this.tileSize);
                if (this.mode == "d" && this.gridLines) {
                    this.ctx.strokeStyle = 'black';
                    this.ctx.lineWidth = 1;
                    this.ctx.strokeRect(
                        pos.x,
                        pos.y,
                        this.tileSize,
                        this.tileSize
                    );
                }
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
            entity.render(this.ctx);
        }
    }

    start(fps) {
        console.log("BullEngine Started.");
        // Game loop
        const gameLoop = () => {
            this.update();
            this.render();
            fps ? setTimeout(gameLoop, 1000 / fps) : requestAnimationFrame(gameLoop);
        };

        gameLoop();
    }
}