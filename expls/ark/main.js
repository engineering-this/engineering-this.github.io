with(KP)
{
    var ballX = 200,
        ballY = 124,
        ballFi = 16,
        angle = 0,
        speed = 5,
        rectX = 100,
        rectY = 380,
        rectSize = 80,
        rectHeight = 16,
        lives = 3,
        score = 0,
        ready = false;

    frameRate(60);

    var Block = function(x, y){
        this.xx = x;
        this.yy = y;
        this.width = 32;
        this.height = 16;
        this.collision = function() {
            var condition1 = (ballX > this.xx && ballX < this.xx + this.width) && (ballY - ballFi / 2 < this.yy + this.height && ballY + ballFi / 2 > this.yy);
            var condition2 = (ballY > this.yy && ballY < this.yy + this.height) && (ballX - ballFi / 2 < this.xx + this.width && ballX + ballFi / 2 > this.xx);
            var index = blocks.findIndex (x=>x==this);
            if (condition1){
                blocks.splice(index, 1);
                score += 1;
                angle = 180 - angle;
            } else if (condition2){
                blocks.splice(index, 1);
                score += 1;
                angle = 360 - angle;
            }
        };
        this.show = function(){
            rect(this.xx, this.yy, this.width, this.height);
        };
    };

    var checkEdges = function() {
        if (ballY >= 400 - ballFi/2){
            angle = 180 - angle;
            lives -= 1;
        }
        if (ballX >= 400 - ballFi/2){
            angle = 360 - angle;
        }
        if (ballY <= 0 + ballFi/2){
            angle = 180 - angle;
        }
        if (ballX <= 0 + ballFi/2){
            angle = 360 - angle;
        }
    };

    var ball = function(){
        ellipse(ballX, ballY, ballFi, ballFi);
        ballX += sin(angle)*speed;
        ballY += cos(angle)*speed;
    };

    var rocket = function(){
        rect(rectX, rectY, rectSize, rectHeight);
        rectX = mouseX - rectSize/2;

        if (ballY >= rectY-ballFi/2){
            if ((ballX >= rectX) && (ballX <= rectX+rectSize)){
                angle = 255 - 150 * (ballX - rectX)/rectSize;
            }
        }
    };

    var hud = function(){
        background (255, 255, 255);
        fill(0, 0, 0);
        textSize(12);
        text("LIVES: " + lives, 350, 15);
        text("SCORE: " + score, 5, 15);
        fill(255, 255, 255);
    };

    var start = function() {
        fill(255, 255, 255);
        rect(100, 150, 200, 100);
        fill(0, 0, 0);
        textSize(60);
        text("START", 106, 221);
        if (mouseX > 100 && mouseX < 300) {
            if (mouseY > 150 && mouseY < 250) {
                mouseClicked = function () {
                    if (ready){
                        return
                    }
                    ready = true;
                    lives = 3;
                    score = 0;
                    blocks = [];
                    populateBlocks();
                }
            }
        }
    };

    var over = function(){
        background (255, 255, 255);
        fill(255, 0, 0);
        textSize(36);
        text("GAME OVER", 88, 200);
        fill(0, 0, 0);
        textSize(20);
        text("SCORE: " + score, 147, 235);
    };

    var win = function(){
        background (255, 255, 255);
        fill(255, 0, 0);
        textSize(36);
        text("YOU WON!", 88, 200);
        fill(0, 0, 0);
        textSize(20);
        text("SCORE: " + score, 147, 235);
    }

    var blocks = [];

    var populateBlocks = function() {
        if (!blocks.length) {
            for (var i = 1; i < 12; i++) {
                blocks.push(new Block(i * 36 - 32, 20));
                blocks.push(new Block(i * 36 - 32, 60));
            }
            for (var i = 1; i < 11; i++) {
                blocks.push(new Block(i * 36 - 16, 40));
                blocks.push(new Block(i * 36 - 16, 80));
            }
        }
    };

    draw = function() {
        console.log(ready);
        if (!ready){
            start();
        } else {
            if (!blocks.length){
                win();
            } else if (lives){
                hud();
                checkEdges();
                ball();
                rocket();
                for (var i = 0 ; i < blocks.length ; i++){
                    blocks[i].show();
                    blocks[i].collision();
                }
            } else {
                over();
            }
        }
    };
}