window.Camera = class {
    constructor(x = 0 , y = 0 , scale = 1){
        this.x = x;
        this.y = y;
        this.width = 600;
        this.height = 600;
        this.scale = scale;
    }

    adjustToCamera(x = 0 , y = 0){
        const ax= x - this.x;
        const ay = y - this.y;
        return new Vector(ax ,ay);
    }

    adjustTouchToCamera(x = 0, y = 0){

        const ax =(x - this.width / 2);
        const ay = (y - this.height / 2);
        return new Vector(ax ,ay);
    }

    setSize(width = 0 , height = 0){
        this.width = width;
        this.height = height;
    }

    setPosition(x = 0 , y = 0){
        this.x = x;
        this.y = y;
    }

    follow(entity = null) {
        if(!entity) throw new Error("Cannot follow null entity");
        const centerX = (entity.position.x + entity.size.x / 2) - this.width / 2;
        const centerY = (entity.position.y + entity.size.y / 2) - this.height / 2;
        entity.camera = this;
        this.setPosition(centerX, centerY);
    }
}