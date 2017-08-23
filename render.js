var c = document.getElementById("cv");
var ctx = c.getContext('2d');
var bgc = document.getElementById("bg");
var bgctx = bgc.getContext('2d');
var uic = document.getElementById("ui");
var uictx = uic.getContext('2d');
uictx.font = 'small-caps bold 50px Arial Helvetica'

function renderer() {
    ctx.clearRect(0, 0, c.width, c.height);
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

function bgRenderer() {
    bgctx.clearRect(0, 0, c.width, c.height);
    bgctx.fillStyle = mapAttr.backgroundColor;
    bgctx.fillRect(0, 0, c.width, c.height);

    bgctx.strokeStyle = 'rgb(200,200,200)';
    bgctx.lineWidth=10;
    roundedRect(bgctx, (c.width - mapAttr.gameWidth)/2, 
    (c.height - mapAttr.gameWidth)/2, 
    mapAttr.gameWidth, mapAttr.gameWidth, 
    50);
    bgctx.strokeStyle = 'rgb(220,220,220)';
    bgctx.lineWidth=5;
    for (let i = 1; i < mapAttr.blockNumber; i++) {
        line(bgctx, (c.width - mapAttr.gameWidth)/2 + 20, 
        (c.height - mapAttr.gameWidth)/2 + i * mapAttr.gameWidth / mapAttr.blockNumber,
        c.width - (c.width - mapAttr.gameWidth)/2 - 20, 
        (c.height - mapAttr.gameWidth)/2 + i * mapAttr.gameWidth / mapAttr.blockNumber);
        line(bgctx, (c.width - mapAttr.gameWidth)/2 + i * mapAttr.gameWidth / mapAttr.blockNumber, 
        (c.height - mapAttr.gameWidth)/2 + 20, 
        (c.width - mapAttr.gameWidth)/2 + i * mapAttr.gameWidth / mapAttr.blockNumber, 
        c.height - (c.height - mapAttr.gameWidth)/2 - 20);
    }
}

function uiRenderer() {
    uictx.clearRect(0, 0, c.width, c.height);
    if (mapAttr.state === 0) {
        uictx.fillText('SMOVE',210, 100);
        uictx.fillText('START',220, c.height * 0.85);
    }
    else if (mapAttr.state === 1) {
        uictx.fillText('score:' + player.score, 10, 80);
        if (player.score % 10 === 0 && player.score !== 0) {
            uictx.fillText('harder!', 400, 80);
        }   
    }
    else if (mapAttr.state === 2) {
        uictx.fillText('game over', 185, 70);
        uictx.fillText('your score:'+player.score, 160,120);
        uictx.fillText('RESTART', 190, c.height * 0.85);
    }
    
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
