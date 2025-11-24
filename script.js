import {PHI} from "/@phi/src/script/PHI.js"

let mousePos = [0,0];
let click = false;


(async () => {

    const phi = new PHI("canvas");
    phi.display([innerWidth, innerHeight]);
    const textCanvas = document.getElementById('text-canvas')
    textCanvas.width = innerWidth
    textCanvas.height = innerHeight
    const ctx = textCanvas.getContext('2d')

    const floorImg = await phi.imgLoad('src/img/floor.png');
    const gift0Img = await phi.imgLoad('src/img/gift_0.png');
    const gift1Img = await phi.imgLoad('src/img/gift_1.png');
    const gift2Img = await phi.imgLoad('src/img/gift_2.png');
    const gift3Img = await phi.imgLoad('src/img/gift_3.png');
    const gift4Img = await phi.imgLoad('src/img/gift_4.png');
    const margin =  5;

    const floorVerCoun = 12;
    const floorHorCount = 6;
    let floors = []
    let num = -1;
    for (let j=0; j<floorHorCount; j++){
        for (let i=0; i<floorVerCoun; i++){
            num ++
            floors.push({
                obj: phi.object(floorImg,[i*(floorImg.width+margin),j*(floorImg.height+margin)],null),
                apr_obj: phi.object(floorImg,[i*(floorImg.width+margin),j*(floorImg.height+margin)],null),
                startPos : [i*(floorImg.width+margin),j*(floorImg.height+margin)],
                hor:i,
                ver:j,
                id :num,
                block:{}
            })
        }
    }
    
    let closestFloor = [null,100000000];

    function Text(text=String,pos=Array,color="White",size="20px"){
        ctx.font = size +" Arial";
        ctx.fillStyle = color;
        ctx.fillText(text, pos[0],pos[1]);
    }

    phi.mainLoop(() => {
        ctx.clearRect(0, 0, textCanvas.width, textCanvas.height);
        phi.fill(0.1,0.1,0.1,1)

        if(click){click=false;}

    });

})();


document.addEventListener('mousemove',(e)=>{
    mousePos = [e.offsetX,e.offsetY];
})


document.addEventListener('click',()=>{
    click=true;
})