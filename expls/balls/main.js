with(KP)
{
    var Ball = function(x, y, size, vx, vy){
        this.pos = new PVector (x, y);
        this.speed = new PVector (vx, vy);
        this.mass = 1;
        this.size = size;
    };

    var vecSub = function(ball1, ball2){
        return PVector.sub(ball1.pos, ball2.pos);
    };

    var show = function(ball){
        ellipse(ball.pos.x, ball.pos.y, ball.size, ball.size);
    };


    var collision = function(ball1, ball2){
        if(PVector.dist(ball1.pos, ball2.pos) <= ball1.size/2 + ball2.size/2){
            var a1 = ball2.mass*2/(ball1.mass+ball2.mass);
            var b1 = PVector.sub(ball1.speed,ball2.speed).dot(PVector.sub(ball1.pos,ball2.pos));
            var c1 = pow(PVector.sub(ball1.pos,ball2.pos).mag(),2);
            var d1 = PVector.sub(ball1.pos, ball2.pos);
            var e1 = a1*b1/c1;
            var f1 = PVector.mult(d1,e1);
            var vn1 = PVector.sub(ball1.speed, f1);

            var a2 = ball2.mass*2/(ball2.mass+ball1.mass);
            var b2 = PVector.sub(ball2.speed,ball1.speed).dot(PVector.sub(ball2.pos,ball1.pos));
            var c2 = pow(PVector.sub(ball2.pos,ball1.pos).mag(),2);
            var d2 = PVector.sub(ball2.pos, ball1.pos);
            var e2 = a2*b2/c2;
            var f2 = PVector.mult(d2,e2);
            var vn2 = PVector.sub(ball2.speed, f2);


            ball1.speed = vn1;
            ball2.speed = vn2;
        }
    };


    var move = function (a){
        a.pos.x += a.speed.x;
        a.pos.y += a.speed.y;
    };

    var edges = function (a){
        if (a.pos.x >= 400-a.size/2){
            a.speed.x = -Math.abs(a.speed.x);
        } else if ( a.pos.x <= 0+a.size/2){
            a.speed.x = Math.abs(a.speed.x);
        } else if (a.pos.y >= 400-a.size/2){
            a.speed.y = -Math.abs(a.speed.y);
        } else if (a.pos.y <= 0+a.size/2){
            a.speed.y = Math.abs(a.speed.y);
        }
    };

    var balls = [];

    for (var i = 0; i < 3; i++){
        for (var j = 0; j <3; j++){
            balls.push(new Ball(50 + i * 70,50 + j * 70, 40, random(-2, 2), random(-2, 2)));
        }
    }

    draw = function() {

        background(255, 255, 255);

        for (var i = 0; i < balls.length; i++){
            show(balls[i]);
            move(balls[i]);
            edges(balls[i]);
            for (var j = i + 1; j < balls.length; j++){
                collision(balls[i], balls[j]);
            }
        }
    };

}