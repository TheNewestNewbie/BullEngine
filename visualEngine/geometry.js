window.Geometry = {
    circle: (ctx, x, y, radius, opts = {}) => {
        const angle = opts.angle || 0;
        ctx.beginPath();
        ctx.arc(x, y, radius, angle, angle + 2 * Math.PI);
        if (opts.image) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, radius, angle, angle + 2 * Math.PI);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(opts.image, x - radius, y - radius, radius * 2, radius * 2);

            ctx.restore();
        } else {
            if (opts.type === "stroke") {
                ctx.strokeStyle = opts.color || "black";
                ctx.lineWidth = opts.lineWidth || 1;
                ctx.stroke();
            } else {
                ctx.fillStyle = opts.color || "black";
                ctx.fill();
            }
        }

        ctx.closePath();
    },
    rectangle: (ctx, x, y, width, height, opts = {}) => {
        const angle = opts.angle || 0;
        ctx.save();
        ctx.translate(x + width / 2, y + height / 2);
        ctx.rotate(angle);
        ctx.translate(-width / 2, -height / 2);

        ctx.beginPath();
        ctx.rect(0, 0, width, height);

        if (opts.image) {
            ctx.save();
            ctx.clip();
            ctx.drawImage(opts.image, 0, 0, width, height);
            ctx.restore();
        } else {
            if (opts.type === "stroke") {
                ctx.strokeStyle = opts.color || "black";
                ctx.lineWidth = opts.lineWidth || 1;
                ctx.stroke();
            } else {
                ctx.fillStyle = opts.color || "black";
                ctx.fill();
            }
        }
        ctx.restore();
        ctx.closePath();
    },
    triangle: (ctx, x, y, sideLength, opts = {}) => {
        const angle = opts.angle || 0;
        const x1 = opts.x1 !== undefined ? opts.x1 : x - sideLength / 2;
        const y1 = opts.y1 !== undefined ? opts.y1 : y + (Math.sqrt(3) / 2) * sideLength / 2;
        const x2 = opts.x2 !== undefined ? opts.x2 : x + sideLength / 2;
        const y2 = opts.y2 !== undefined ? opts.y2 : y + (Math.sqrt(3) / 2) * sideLength / 2;
        const x3 = opts.x3 !== undefined ? opts.x3 : x;
        const y3 = opts.y3 !== undefined ? opts.y3 : y - (Math.sqrt(3) / 2) * sideLength / 2;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.translate(-x, -y);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath();

        if (opts.image) {
            ctx.save();
            ctx.clip();
            ctx.drawImage(opts.image, Math.min(x1, x2, x3), Math.min(y1, y2, y3), Math.max(x1, x2, x3) - Math.min(x1, x2, x3), Math.max(y1, y2, y3) - Math.min(y1, y2, y3));
            ctx.restore();
        } else {
            if (opts.type === "stroke") {
                ctx.strokeStyle = opts.color || "black";
                ctx.lineWidth = opts.lineWidth || 1;
                ctx.stroke();
            } else {
                ctx.fillStyle = opts.color || "black";
                ctx.fill();
            }
        }
        ctx.restore();
        ctx.closePath();
    },
    star: (ctx, x, y, outerRadius, innerRadius, points, opts = {}) => {
        const angle = opts.angle || 0;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.translate(-x, -y);

        ctx.beginPath();
        const angleStep = (Math.PI * 2) / (points * 2);
        let angleStar = -Math.PI / 2;

        for (let i = 0; i < points * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const pointX = x + Math.cos(angleStar) * radius;
            const pointY = y + Math.sin(angleStar) * radius;

            if (i === 0) {
                ctx.moveTo(pointX, pointY);
            } else {
                ctx.lineTo(pointX, pointY);
            }

            angleStar += angleStep;
        }

        ctx.closePath();

        if (opts.image) {
            ctx.save();
            ctx.clip();
            ctx.drawImage(opts.image, x - outerRadius, y - outerRadius, outerRadius * 2, outerRadius * 2);
            ctx.restore();
        } else {
            if (opts.type === "stroke") {
                ctx.strokeStyle = opts.color || "black";
                ctx.lineWidth = opts.lineWidth || 1;
                ctx.stroke();
            } else {
                ctx.fillStyle = opts.color || "black";
                ctx.fill();
            }
        }
        ctx.restore();
    },
    cross: (ctx, x, y, armLength, opts = {}) => {
        const angle = opts.angle || 0;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.translate(-x, -y);

        ctx.beginPath();
        const armAngle = Math.PI / 4;
        const armX1 = x - Math.cos(armAngle) * armLength;
        const armY1 = y - Math.sin(armAngle) * armLength;
        const armX2 = x + Math.cos(armAngle) * armLength;
        const armY2 = y + Math.sin(armAngle) * armLength;

        ctx.moveTo(armX1, armY1);
        ctx.lineTo(armX2, armY2);

        const armX3 = x - Math.cos(armAngle) * armLength;
        const armY3 = y + Math.sin(armAngle) * armLength;
        const armX4 = x + Math.cos(armAngle) * armLength;
        const armY4 = y - Math.sin(armAngle) * armLength;

        ctx.moveTo(armX3, armY3);
        ctx.lineTo(armX4, armY4);

        ctx.closePath();


        ctx.strokeStyle = opts.color || "black";
        ctx.lineWidth = opts.lineWidth || 1;
        ctx.stroke();


        ctx.restore();
    }
};
