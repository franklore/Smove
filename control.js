var mapAttr = {
    gameWidth: 300,
    backgroundColor: 'rgb(20,60,100)',
    blockNumber: 3,
    state: 0, // 0:start 1:playing 2:gameover
    toGrid: function(grid, axisY) {
        if (!axisY) {
            return (c.width - this.gameWidth) / 2 + this.gameWidth / this.blockNumber * (grid + 0.5);
        }
        else {
            return (c.height - this.gameWidth) / 2 + this.gameWidth / this.blockNumber * (grid + 0.5);
        }
    }
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

var objectCollection = {
    objectList: [],
    add: function(ob) {
        this.objectList = this.objectList.concat(ob);
        ob.start();
    },
    clear: function() {
        this.objectList = [];
    },
};

var controlQueue = [];
window.onkeydown = function(event) {
    if (controlQueue.length <= 2)
        controlQueue.push(event.code);
}

var mouseControlX, mouseControlY;
window.onmousedown = function(event) {
    if (mapAttr.state === 0 || mapAttr.state === 2) {
        var x = event.pageX - c.getBoundingClientRect().left;
        var y = event.pageY - c.getBoundingClientRect().top;
        if (x > 190 && x < 410 && y > 470 && y < 510) {
            if (mapAttr.state === 2) {
                objectCollection.clear();
                player.size = 30;
                controlQueue = [];
                controller.haveFood = false;
            }
            objectCollection.add(player);
            objectCollection.add(controller);
            mapAttr.state = 1;
            uiRenderer();
        }
    }
    else if (mapAttr.state === 1) {
        mouseControlX = event.pageX;
        mouseControlY = event.pageY;
    }
}

window.onmouseup = function(event) {
    if (mapAttr.state === 1) {
        mouseControlX = event.pageX - mouseControlX;
        mouseControlY = event.pageY - mouseControlY;
        if (mouseControlX > 2 * Math.abs(mouseControlY) && mouseControlX > 50) {
            controlQueue.push("KeyD");
        }
        else if (mouseControlX < -2 * Math.abs(mouseControlY) && mouseControlX < -50) {
            controlQueue.push("KeyA");
        }
        else if (mouseControlY > 2 * Math.abs(mouseControlX) && mouseControlY > 50) {
            controlQueue.push("KeyS");
        }
        else if (mouseControlY < -2 * Math.abs(mouseControlX) && mouseControlY < -50) {
            controlQueue.push("KeyW");
        }
    }
}

function globalUpdate() {
    for (let k of objectCollection.objectList) {
        k.update();
    }
    renderer();
    window.requestAnimationFrame(globalUpdate);
}