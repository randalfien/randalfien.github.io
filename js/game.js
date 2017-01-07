window.onload = function() {

    var isChrome = !!window.chrome && !!window.chrome.webstore;
    if( ! isChrome ){
        return;
    }

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    const CH = window.innerHeight;
    const CW = window.innerWidth;
    canvas.width = Math.min(450,CW);
    canvas.height = CH;

    const W = 8;
    const TW = 330;
    const COLORS= ["#FF0000","#49DB24","#4013F4","#FFCC1A","#FA30BE",
        "#2BD5FF","#D81FB4","#FCB347","#DAFE45","#FC2E58","#D94848",
        "#3CE6C4","#36EB48","#63A4BE"];

    var body = document.getElementById('body');

    function randClr(){
        return COLORS[Math.floor(Math.random()*COLORS.length)];
    };


    const INVADER_BLOCKS = [
            0, 0, 7, 0, 1, -1, 6, -1,
            2, -2, 3, -2, 4, -2, 5, -2,
            1, -3, 3, -3, 4, -3, 6, -3,
            1, -4, 2, -4, 3, -4, 4, -4, 5, -4, 6, -4,
            2, -5, 3, -5, 4, -5, 5, -5, 3, -6, 4, -6
        ];

    const SHIP_BLOCKS = [0,0,1,0,2,0,3,0,4,0,5,0,6,0,0,1,1,1,2,1,3,1,4,1,5,1,6,1,3,-1];

    var ship = {pos:{x:20,y:CH-40},blocks:[]};
    psAr(SHIP_BLOCKS, ship.blocks, "#333333" );

    var invader;
    var now = Date.now();
    var delta = 0;
    var then = now;
    var score = [];

    var rays = [];
    var missiles = [];
    var numDiscarded = 0;
    var cur = null;

    body.addEventListener('mousemove', function(evt) {
        if( evt.clientX < 360 ) {
            if( Date.now()-now > 8000) {
                then = Date.now();
                body.removeEventListener('mousemove', arguments.callee);
                start();
            }
        }
    }, false);

    function start() {
        invader = newInv();
        console.log("START");
        body.addEventListener('mousemove', function (evt) {
            ship.pos.x = Math.max(0, Math.min(evt.clientX - 3 * W, TW));
            if (evt.clientX < 360) {
                draw();
            }
        }, false);

        body.addEventListener('click', function (evt) {
            missiles.push(addRay(ship.pos.x + 3 * W, ship.pos.y - W, "#333333"));
        }, false);

        update();
    }


    function draw() {


        now = Date.now();
        delta = (now - then) / 1000; // Converts to seconds (optional)
        then = now;

        canvas.width = canvas.width;


        cur = ship;
        ship.blocks.forEach(drawRay);

        cur = invader;
        invader.blocks.forEach(drawRay);
        cur = {pos:{x:0,y:0}};
        missiles.forEach(drawRay)



        missiles.forEach(function(o){
            if(o.dead)return;
            o.y -= CH*delta*0.3;
            if( isin(o.y,invader.pos.y-5*W,invader.pos.y) && isin( o.x,invader.pos.x-W,invader.pos.x+7*W ) ){
                crAl();
                o.dead = true;
            }
            if(o.y < 50){
                o.dead = true;
            }
        });

        invader.pos.x += 75 * ( invader.right ? delta : -delta );
        if( ! isin ( invader.pos.x, 0, TW ) ) {
            invader.right = !invader.right;
            invader.pos.x += invader.right ? 5 : -5 ;
        }
        invader.pos.y += 2*W*delta;


        if( invader.pos.y >= ship.pos.y ){
            crAl();
            score = [];
        }

        rays.forEach(drawRayR);
        rays.forEach(function(o){
            if(o.dead ) return;
            o.a -= 2*delta;
            o.x += (o.vx+Math.random()*2-1)*30*delta*(o.a+0.2);
            o.y += (o.vy+Math.random()*7-3)*30*delta*(o.a+0.2);
            o.vr += 3*delta*(1- o.a);
            if(o.a <= 0 ) o.dead = true;
        });

        score.forEach(drawRay);

    }

    function crAl(){
        invader.blocks.forEach(function(r){
            r.vx = r.x/W-4;
            r.vy = r.y/W+4;
            r.x += invader.pos.x;
            r.y += invader.pos.y;
            r.clr = randClr();
            r.vr = 0;
            rays.push(r);
        });
        invader = newInv();
        score.push( addRay(score.length*W,CH-W,"#000000"));
        if( rays.length > 500){
            cleanrays();
        }
    }

    function drawRayR(o){
        if(o.dead ) return;
        context.save();
        context.translate(o.x, o.y);
        context.rotate(o.vr);
        context.scale(o.a*1.5, o.a*1.5)
        context.beginPath();
        context.rect( -W/2,-W/2, W, W);
        context.fillStyle = o.clr;
        context.fill();
        context.restore();
    }

    function drawRay(o){
        if(o.dead ) return;
        context.beginPath();
        context.rect( Math.floor(cur.pos.x+o.x), Math.floor(cur.pos.y+o.y), W, W);
        context.fillStyle = o.clr;
        context.fill();
    }


    function update(){
        draw();
        requestAnimationFrame(update);
    }

    function isin(x, min, max){
        if( x < min || x > max )return false;
        return true;
    }

    function cleanrays(){
        var tmp = [];
        rays.forEach( function(o) {
            if ( o.dead == false ) tmp.push(o);
        });
        numDiscarded = 0;
        rays = tmp;
    }

    function addRay(kx,ky,clr){
        return {x:kx,y:ky,a:1,clr:clr,dead:false};
    }

    function psAr( vp, ar, clr){
        for( var i = 0; i < vp.length; i+=2){
            ar.push( addRay(vp[i]*W,vp[i+1]*W,clr));
        }
    }

    function newInv() {
        var res = {pos:{x:Math.floor(30+Math.random()*300), y:150},blocks:[], right:true};
        psAr(INVADER_BLOCKS, res.blocks, randClr());
        return res;
    };

}



