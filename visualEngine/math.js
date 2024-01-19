class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toNatural(){
        return {
            x: Math.round(this.x),
            y: Math.round(this.y)
        }
    }
}

class Vector3D {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

const Porcent = (num, porcent) => {
    return (num * porcent) / 100;
}

const DegreesToRadians = (degrees) => {
    return degrees * (Math.PI / 180);
}

const Distance2D = (vector1, vector2) => {
    const deltaX = vector2.x - vector1.x;
    const deltaY = vector2.y - vector1.y;

    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

const Distance3D = (vector1, vector2) => {
    const deltaX = vector2.x - vector1.x;
    const deltaY = vector2.y - vector1.y;
    const deltaZ = vector2.z - vector1.z;

    return Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
}
