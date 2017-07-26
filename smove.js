var mapAttr = {
    gameWidth: 300,
    backgroundColor: 'rgb(20,60,100)',
    blockNumber: 3,
    lose: 0,
    toGrid: function(grid, axisY) {
        if (!axisY) {
            return (c.width - this.gameWidth) / 2 + this.gameWidth / this.blockNumber * (grid + 0.5);
        }
        else {
            return (c.height - this.gameWidth) / 2 + this.gameWidth / this.blockNumber * (grid + 0.5);
        }
    }
}

var objectCollection = {
    objectList: [],
    add: function(ob) {
        this.objectList = this.objectList.concat(ob);
        ob.start();
    }
};

function renderer() {
    ctx.clearRect(0, 0, c.width, c.height);
    var gradient = ctx.createLinearGradient(0, 0, 0, 500);
    gradient.addColorStop(0, 'rgb(10,60,90)');
    gradient.addColorStop(0.5, 'rgb(60,120,150)');
    gradient.addColorStop(1, 'rgb(10,60,90)');
    ctx.fillStyle = mapAttr.backgroundColor;
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.strokeStyle = 'rgb(200,200,200)';
    ctx.lineWidth=10;
    roundedRect(ctx, (c.width - mapAttr.gameWidth)/2, 
    (c.height - mapAttr.gameWidth)/2, 
    mapAttr.gameWidth, mapAttr.gameWidth, 
    50);
    ctx.strokeStyle = 'rgb(220,220,220)';
    ctx.lineWidth=5;
    for (let i = 1; i < mapAttr.blockNumber; i++) {
        line(ctx, (c.width - mapAttr.gameWidth)/2 + 20, 
        (c.height - mapAttr.gameWidth)/2 + i * mapAttr.gameWidth / mapAttr.blockNumber,
        c.width - (c.width - mapAttr.gameWidth)/2 - 20, 
        (c.height - mapAttr.gameWidth)/2 + i * mapAttr.gameWidth / mapAttr.blockNumber);
        line(ctx, (c.width - mapAttr.gameWidth)/2 + i * mapAttr.gameWidth / mapAttr.blockNumber, 
        (c.height - mapAttr.gameWidth)/2 + 20, 
        (c.width - mapAttr.gameWidth)/2 + i * mapAttr.gameWidth / mapAttr.blockNumber, 
        c.height - (c.height - mapAttr.gameWidth)/2 - 20);
    }
    for (let k of objectCollection.objectList) {
        if (k.shape === 'empty')
            continue;
        ctx.beginPath();
        ctx.save();
        ctx.translate(k.x, k.y);
        ctx.rotate(k.rotation * Math.PI / 180);
        if (k.shape === 'circle') {
            ctx.arc(0, 0, k.size, 0, 2 * Math.PI);
            ctx.fillStyle = k.color;
            ctx.fill();
        }
        else if (k.shape === 'rectangle') {
            ctx.fillStyle = k.color;
            ctx.fillRect(-k.size / 2, -k.size / 2, k.size, k.size);
        }
        ctx.restore();
    }
}

function globalUpdate() {
    for (let k of objectCollection.objectList) {
        k.update();
    }
    renderer();
    window.requestAnimationFrame(globalUpdate);
}

function roundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.arc(x + radius, y + radius, radius, Math.PI, 1.5 * Math.PI);
    ctx.lineTo(x + width - radius, y);
    ctx.arc(x + width - radius, y + radius, radius, 1.5 * Math.PI, 0);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arc(x + width - radius, y + height - radius, radius, 0, 0.5 * Math.PI);
    ctx.lineTo(x + radius, y + height);
    ctx.arc(x + radius, y + height - radius, radius, 0.5 * Math.PI, Math.PI);
    ctx.lineTo(x, y + radius);
    ctx.stroke();
}

function line(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function GameObject(start, update) {
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    this.size = 30;
    this.shape = 'circle';
    this.color = 'white';
    this.start = start || function(){};
    this.update = update || function(){};
}