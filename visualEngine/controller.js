window.Controller = class {
    constructor(entity, surface, camera, opts = {}) {
        this.entity = entity;
        this.surface = surface;
        this.ctx = this.surface.getContext("2d");
        this.camera = camera;
        this.controlType = "touch";
        this.gotoPointer = opts.gotoPointer || true;
        this.gotoPointerType = opts.gotoPointerType || "cross";
        this.gotoPointerSize = opts.gotoPointerSize || 5;
        this.surface.addEventListener('pointerdown', this._handlePointerDown.bind(this));
        this.surface.addEventListener('pointermove', this._handlePointerMove.bind(this));
        this.surface.addEventListener('pointerup', this._handlePointerUp.bind(this));
        this.onPointerDown = null;
        this.onPointerMove = null;
        this.onPointerUp = null;
        this._onTouchMove = null;

        if (opts.controlType) this.setControlType(opts.controlType);
    }

    setControlType(type = "touch" || "joystick") {
        switch (type) {
            case "touch":
                this.type = type;
                this._onTouchMove = this.onTouchMove;
                break;
            case "joystick":
                this.type = type;
                break;
            default:
                this.type = "touch";

        }
    }

    onTouchMove(touch) {
        let pos = touch;
        if (this.camera) pos = this.camera.adjustTouchToCamera(pos.x, pos.y);
        this.entity.moveTo((this.entity.position.x + this.entity.size.x / 2) + pos.x, (this.entity.position.y + this.entity.size.y / 2) + pos.y);
        if (this.gotoPointer === true) {
            this.entity.extraRender.gotoPointer = () => {
                if (this.entity._moveTo) {
                    let cp = this.camera.adjustToCamera(this.entity._moveTo.x , this.entity._moveTo.y + this.entity.size.y / 2);
                    Geometry[this.gotoPointerType](this.ctx, cp.x, cp.y, this.entity.size.x / 5 , {lineWidth: 3 , color: "red"});
                }else{
                    delete this.entity.extraRender.gotoPointer;
                }
            }
        }
    }

    _handlePointerDown(event) {
        let touch = new Vector(event.clientX, event.clientY);
        if (this._onTouchMove) this._onTouchMove(touch);
    }

    _handlePointerMove(event) {
        let touch = new Vector(event.clientX, event.clientY);
    }

    _handlePointerUp(event) {
        let touch = new Vector(event.clientX, event.clientY);
    }


}