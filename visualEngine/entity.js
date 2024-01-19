window.Entity = class {
    constructor(sprite = [], position = new Vector(0, 0), size = { x: 30, y: 30 }) {
        this.sprite = sprite;
        this.countSprite = 0;
        this.cSprite = sprite[this.countSprite];
        this.position = position;
        this.size = size;
        this.collition = {
            collide: true,
            collideWithLayers: ["walls"],
            notCollideWithLayers: ["players"]
        };
        this.isMoving = false;
        this.camera = null;
        this.animation = null;
        this._moveFrom = null;
        this._moveTo = null;
        this.moveInterval = null;
        this.speed = 5;
        this.animSpeed = 1000 / this.speed;
        this.cAnimSpeed = 1000;
        this.lastTick = new Date().getTime();
        this.extraRender = {};
    }

    startAnimation(anim) {
        this.animSpeed = 1000 / this.speed;
        if(this.animation == null) this.animation = setInterval(() => {
            this.updateSprite();
        }, this.animSpeed);
    }

    stopAnimation() {
        clearInterval(this.animation);
        this.animation = null;
        this.cSprite = this.sprite[0];
        this.countSprite = 0;
    }

    updateSprite() {
        this.cSprite = this.sprite[++this.countSprite] ? this.sprite[this.countSprite] : this.sprite[this.countSprite = 0];
    }

    update() {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - this.lastTick;
        this.lastTick = currentTime;
    }

    setToPosition (x = 0 , y = 0) {
        this.position = new Vector(x , y);
    }

    moveTo(targetX, targetY) {
        this.isMoving = true;
        this._moveFrom = new Vector(this.position.x, this.position.y);
        this._moveTo = new Vector(targetX, targetY);
        const deltaX = targetX - this.position.x - this.size.x / 2;
        const deltaY = targetY - this.position.y - this.size.y / 2;

        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);


        const normalizedDeltaX = deltaX / distance;
        const normalizedDeltaY = deltaY / distance;

        const offsetX = normalizedDeltaX * this.speed;
        const offsetY = normalizedDeltaY * this.speed;
        if(this.moveInterval) clearInterval(this.moveInterval);
        this.moveInterval = setInterval(() => {
            this.startAnimation();
            this.position.x += offsetX;
            this.position.y += offsetY;
            if (
                Math.abs(this.position.x + this.size.x / 2 - targetX) < this.speed &&
                Math.abs(this.position.y + this.size.y / 2 - targetY) < this.speed
            ) {
                this.isMoving = false;
                this._moveTo = null;
                this.stopAnimation();
                clearInterval(this.moveInterval);
            }
        }, 33);
    }

    render(ctx) {
        let pos = new Vector(this.position.x, this.position.y);

        if (this.camera) {
            this.camera.follow(this);
            pos = this.camera.adjustToCamera(this.position.x, this.position.y);
        }
        ctx.drawImage(this.cSprite, pos.x, pos.y, this.size.x, this.size.y);
        for(let layer in this.extraRender){
            this.extraRender[layer]();
        }
    }
}
