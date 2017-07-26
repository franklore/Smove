function Enemy() {
    start = function() {
        this.way = Math.floor(Math.random() * mapAttr.blockNumber);
        this.direction = Math.round(Math.random());
        this.position = Math.round(Math.random()); 
        this.speed = 1.5;
        this.color = "#200";

        if (this.position) {
            this.x = mapAttr.toGrid(this.way);
            this.y = c.height * this.direction;
        }
        else {
        this.x = c.width * this.direction;
        this.y = mapAttr.toGrid(this.way, true);
        }
    }
    update = function() {
        if (this.position) {
            this.direction ? this.y-=this.speed : this.y+=this.speed;
        }
        else {
            this.direction ? this.x-=this.speed : this.x+=this.speed;
        }
        if (this.x > c.width + 100 || this.x < - 100) {
            objectCollection.objectList.splice(objectCollection.objectList.indexOf(this), 1);
        }
        if (Math.sqrt((this.x - player.x) * (this.x - player.x) + (this.y - player.y) * (this.y - player.y)) <
        (this.size + player.size) ) {
            mapAttr.lose = 1;
        }
    }
    return new GameObject(start, update);
}

function Food() {
    function start() {
        this.gridx = Math.floor(Math.random() * mapAttr.blockNumber);
        this.gridy = Math.floor(Math.random() * mapAttr.blockNumber);
        this.x = mapAttr.toGrid(this.gridx);
        this.y = mapAttr.toGrid(this.gridy, true);
        this.rotation = 30;
        this.size = 45;
        this.shape = 'rectangle';
        this.color = '#077';
    }
    function update() {
        this.rotation += 1;
        if (Math.sqrt((this.x - player.x) * (this.x - player.x) + (this.y - player.y) * (this.y - player.y)) <
        (this.size + player.size) ) {
            player.score += 1;
            controller.haveFood = false;
            objectCollection.objectList.splice(objectCollection.objectList.indexOf(this), 1);
        }
    }
    return new GameObject(start, update);
}