export default function effect(canv1: HTMLCanvasElement, canv2: HTMLCanvasElement)
{
    const canvas1 = canv1.getContext('2d');
    const canvas2 = canv2.getContext('2d');
    const width: number = 50;
    const height: number = window.innerHeight;
    // const charArr: string[] = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    const charArr: string[] = ['1','0'];
    // maxCharCount = 100;
    const fallingCharArr: PointType[] = [];
    const fontSize = 20;
    const maxColumns = width/fontSize;
    canv1!.width = canv2!.width = width;
    canv1!.height = canv2!.height = height;


    type PointType = {
        x: number,
        y: number,
        draw: (canvas: CanvasRenderingContext2D) => void;
    }

    type PointTypeConstructor = {
        (this: PointType, x: number, y: number): void; 
        new(x: number, y: number): PointType;
    }

    const Point = (function Point(this: PointType, x: number, y: number) { 
        this.x = x;
        this.y = y;
    }) as PointTypeConstructor;

    Point.prototype.draw = function(canvas: CanvasRenderingContext2D){

        this.value = charArr[randomInt(0,charArr.length-1)];
        this.speed = randomFloat(1,5);
        // console.log(this.x);
        
    
    
        canvas2!.fillStyle = "rgba(255,255,255,0.8)";
        canvas2!.font = fontSize+"px san-serif";
        canvas2!.fillText(this.value,this.x,this.y);
    
        canvas.fillStyle = "#0F0";
        canvas.font = fontSize+"px san-serif";
        canvas.fillText(this.value,this.x,this.y);
    
    
    
        this.y += this.speed;
        if(this.y > height)
        {            
            this.y = randomFloat(-100,0);
            this.speed = randomFloat(1,2);
        }
    }
    

    for(let i = 0; i < maxColumns ; i++) {      
        console.log(i*fontSize);
                  
        const pointer = new Point(i*fontSize,randomFloat(-500,0))
        fallingCharArr.push(pointer);
    }

    const update = function() {

        canvas1!.fillStyle = "rgba(255,255,255,0.05)";
        canvas1!.fillRect(0,0,width,height);

        canvas2!.clearRect(0,0,width,height);

        let i = fallingCharArr.length;        

        while (i--) {            
            fallingCharArr[i].draw(canvas1!);
        }

        requestAnimationFrame(update);
    }

    update();
}

function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max-min) + min);
}

function randomFloat(min: number, max: number) {
    return Math.random() * (max-min) + min
}