var TEXTURES = {} , SPRITES = {};

const addTexture = (id , src) => {
    TEXTURES[id] = new Image();
    TEXTURES[id].src = src;
}

const addTextureJson = (textures = {}) => {
    for(let t in textures){
        TEXTURES[t] = new Image();
        TEXTURES[t].src = textures[t];
    }
}

const addSprite = (id , sprite = []) => {
    SPRITES[id] = [];
    for(let s of sprite){
        const sp = new Image();
        sp.src = s;
        SPRITES[id].push(sp);
    }
}
