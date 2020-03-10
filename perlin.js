this.noise.seed(Math.random());
let canvas = document.createElement('canvas');
canvas.width = 1920;
canvas.height = 1080;
let context2D = canvas.getContext('2d');
document.body.appendChild(canvas);

var image = context2D.createImageData(canvas.width, canvas.height);
var data = image.data;
let its = 0;
let scale = 10;
let px = canvas.width/2;
let py = canvas.height/2;
let xvel = 0;
let yvel = 0;
let restartX = canvas.width/2;
let restartY = canvas.height/2;

function doStuff()
{
    for (let q = 0;q<10;q++)
    {
        px = restartX
        py = restartY    
        xvel = 0+(its%500)/100;
        yvel = 0+(its%500)/100;

        if (its%500 === 0)
        {
            restartX = (canvas.width*Math.random());
            restartY = (canvas.height*Math.random());
        }

        for (let i=0;i<500;i++)
        {
            let valueu = noise.perlin2(((px) / canvas.width)*scale, ((py-0.01) / canvas.height)*scale);
            let valued = noise.perlin2(((px) / canvas.width)*scale, ((py+0.01) / canvas.height)*scale);
            let valuel = noise.perlin2(((px-0.01) / canvas.width)*scale, (py / canvas.height)*scale);
            let valuer = noise.perlin2(((px+0.01) / canvas.width)*scale, (py / canvas.height)*scale);

            if (valueu < valued)
                yvel-=0.01;
            else if (valuel > valuer)
                yvel+=0.01
            if (valuel < valuer)
                xvel-=0.01;
            else if (valuel > valuer)
                xvel+=0.01


            xvel -= (x-canvas.width/2)/100000;
            yvel -= (y-canvas.height/2)/100000;

            if (Math.abs(xvel) > 0.2) xvel *= 0.99;
            if (Math.abs(yvel) > 0.2) yvel *= 0.99;
            //if (Math.abs(xvel) < 0.1) xvel *= 1.01;
            //if (Math.abs(yvel) < 0.1) yvel *= 1.01;
            px += xvel;
            py += yvel;

            context2D.fillRect(px, py, 1, 1);
            context2D.globalAlpha = i/1000;
        }
        
        its++;
    }
}

for (var x = 0; x < canvas.width; x++) {
    for (var y = 0; y < canvas.height; y++) {

        let value = noise.perlin2(((x) / canvas.width)*scale, ((y) / canvas.height)*scale);
        value += 1;
        value /= 2;
        value *= 256;

        var cell = (x + y * canvas.width) * 4;
        data[cell] = data[cell + 1] = data[cell + 2] = value;
        data[cell + 3] = 128; // alpha.
    }
}
context2D.putImageData(image, 0, 0);

setInterval(doStuff, 16.67); // test 60 times per second