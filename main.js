var player = new GameObject(
    function() {
        this.x = c.width/2;
        this.y = c.height/2;
        this.color = 'rgba(220, 220, 220, 1)';
        this.a = 1;
        this.desx = this.x;
        this.desy = this.y;
        this.moving = false;
        this.speed = 5;
        this.score = 0;
    },
    function() {
        this.moving = Math.abs(this.desx - this.x) + Math.abs(this.desy - this.y) >= this.speed;
        if (Math.abs(this.desx - this.x) + Math.abs(this.desy - this.y) <= this.speed) {
            this.x = this.desx;
            this.y = this.desy;
        }
        else {
            this.x += (this.desx - this.x) / (Math.abs(this.desx - this.x) + Math.abs(this.desy - this.y)) * this.speed;
            this.y += (this.desy - this.y) / (Math.abs(this.desx - this.x) + Math.abs(this.desy - this.y)) * this.speed;
        }
        
        if (mapAttr.lose) {
            if(this.size <= 80)
                this.size += 2;
            if(this.a > 0) {
                this.a -= 0.08;
                this.color = 'rgba(220, 220, 220,' + this.a + ')';
            }
        }

        if (!mapAttr.lose && !player.moving) {
            switch(controlQueue.shift()) {
                case 'KeyW': player.desy -= (player.desy <= mapAttr.toGrid(0,true) + 1 ?
                    0 : mapAttr.gameWidth / mapAttr.blockNumber); break;
                case 'KeyS': player.desy += (player.desy >= mapAttr.toGrid(mapAttr.blockNumber - 1,true) - 1 ?
                    0 : mapAttr.gameWidth / mapAttr.blockNumber); break;
                case 'KeyA': player.desx -= (player.desx <= mapAttr.toGrid(0) + 1 ?
                    0 : mapAttr.gameWidth / mapAttr.blockNumber); break;
                case 'KeyD': player.desx += (player.desx >= mapAttr.toGrid(mapAttr.blockNumber - 1) - 1 ?
                    0 : mapAttr.gameWidth / mapAttr.blockNumber); break;
            }
        }
    }
);
objectCollection.add(player);

var controller = new GameObject(
    function(){ 
        this.shape = 'empty';
    },
    function(){
        var i = 0;
        return function () {            
            if (i++ % 120 === 1) {
                objectCollection.add(Enemy());
            }
            if (i % 300 === 100 && !this.haveFood && !mapAttr.lose) {
                objectCollection.add(Food());
                this.haveFood = true;
            }
        }
    }()
)
objectCollection.add(controller);

var controlQueue = [];
window.onkeydown = function(event){
    if (controlQueue.length <= 2)
        controlQueue.push(event.code);
}

globalUpdate();