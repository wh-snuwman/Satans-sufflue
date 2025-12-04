import {PHI} from "/@phi/src/script/PHI.js"
import {online} from '/socekt.js'


let mousePos = [0,0];
let click = false;
let downKey = null;
const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

(async () => {
    const phi = new PHI("canvas");
    const textCanvas = document.getElementById('text-canvas')
    textCanvas.width = innerWidth
    textCanvas.height = innerHeight
    const ctx = textCanvas.getContext('2d')
    const font = new FontFace('PF스타더스트', 'url(/src/font/PF스타더스트.ttf)');
    await font.load();
    document.fonts.add(font);

    function Text(text,pos,size='20px',color='white',font='basic'){
        if (font == 'basic'){
            ctx.font = `${size} PF스타더스트`;
        }
        ctx.fillStyle = color
        ctx.fillText(text, pos[0],pos[1]);
    }



    phi.display([innerWidth,innerHeight]);
    const deck = {
        BACK:await phi.imgLoad('/src/img/deck/BACK.png'),
        TEST:await phi.imgLoad('/src/img/deck/TEST.png'),

        C1:await phi.imgLoad('/src/img/deck/C1.png'),
        C2:await phi.imgLoad('/src/img/deck/C2.png'),
        C3:await phi.imgLoad('/src/img/deck/C3.png'),
        C4:await phi.imgLoad('/src/img/deck/C4.png'),
        C5:await phi.imgLoad('/src/img/deck/C5.png'),
        C6:await phi.imgLoad('/src/img/deck/C6.png'),
        C7:await phi.imgLoad('/src/img/deck/C7.png'),
        C8:await phi.imgLoad('/src/img/deck/C8.png'),
        C9:await phi.imgLoad('/src/img/deck/C9.png'),
        C10:await phi.imgLoad('/src/img/deck/C10.png'),
        CJ:await phi.imgLoad('/src/img/deck/CJ.png'),
        CQ:await phi.imgLoad('/src/img/deck/CQ.png'),
        CK:await phi.imgLoad('/src/img/deck/CK.png'),
        CA:await phi.imgLoad('/src/img/deck/CA.png'),


        H1:await phi.imgLoad('/src/img/deck/H1.png'),
        H2:await phi.imgLoad('/src/img/deck/H2.png'),
        H3:await phi.imgLoad('/src/img/deck/H3.png'),
        H4:await phi.imgLoad('/src/img/deck/H4.png'),
        H5:await phi.imgLoad('/src/img/deck/H5.png'),
        H6:await phi.imgLoad('/src/img/deck/H6.png'),
        H7:await phi.imgLoad('/src/img/deck/H7.png'),
        H8:await phi.imgLoad('/src/img/deck/H8.png'),
        H9:await phi.imgLoad('/src/img/deck/H9.png'),
        H10:await phi.imgLoad('/src/img/deck/H10.png'),
        HJ:await phi.imgLoad('/src/img/deck/HJ.png'),
        HQ:await phi.imgLoad('/src/img/deck/HQ.png'),
        HK:await phi.imgLoad('/src/img/deck/HK.png'),
        HA:await phi.imgLoad('/src/img/deck/HA.png'),

        D1:await phi.imgLoad('/src/img/deck/D1.png'),
        D2:await phi.imgLoad('/src/img/deck/D2.png'),
        D3:await phi.imgLoad('/src/img/deck/D3.png'),
        D4:await phi.imgLoad('/src/img/deck/D4.png'),
        D5:await phi.imgLoad('/src/img/deck/D5.png'),
        D6:await phi.imgLoad('/src/img/deck/D6.png'),
        D7:await phi.imgLoad('/src/img/deck/D7.png'),
        D8:await phi.imgLoad('/src/img/deck/D8.png'),
        D9:await phi.imgLoad('/src/img/deck/D9.png'),
        D10:await phi.imgLoad('/src/img/deck/D10.png'),
        DJ:await phi.imgLoad('/src/img/deck/DJ.png'),
        DQ:await phi.imgLoad('/src/img/deck/DQ.png'),
        DK:await phi.imgLoad('/src/img/deck/DK.png'),
        DA:await phi.imgLoad('/src/img/deck/DA.png'),

        S1:await phi.imgLoad('/src/img/deck/S1.png'),
        S2:await phi.imgLoad('/src/img/deck/S2.png'),
        S3:await phi.imgLoad('/src/img/deck/S3.png'),
        S4:await phi.imgLoad('/src/img/deck/S4.png'),
        S5:await phi.imgLoad('/src/img/deck/S5.png'),
        S6:await phi.imgLoad('/src/img/deck/S6.png'),
        S7:await phi.imgLoad('/src/img/deck/S7.png'),
        S8:await phi.imgLoad('/src/img/deck/S8.png'),
        S9:await phi.imgLoad('/src/img/deck/S9.png'),
        S10:await phi.imgLoad('/src/img/deck/S10.png'),
        SJ:await phi.imgLoad('/src/img/deck/SJ.png'),
        SQ:await phi.imgLoad('/src/img/deck/SQ.png'),
        SK:await phi.imgLoad('/src/img/deck/SK.png'),
        SA:await phi.imgLoad('/src/img/deck/SA.png'),

    }

    const skinImg = [
        await phi.imgLoad('/src/img/skin/0.png'),
        await phi.imgLoad('/src/img/skin/1.png'),
        await phi.imgLoad('/src/img/skin/2.png'),
    ]

    const skin = {
        'test0':{
            nomarl:phi.object(skinImg[0],[180,230],null),
            speak:phi.object(skinImg[0],[0,0],null),
        },
        'test1':{
            nomarl:phi.object(skinImg[1],[870,130],null),
            speak:phi.object(skinImg[1],[0,0],null),
        },
        'test2':{
            nomarl:phi.object(skinImg[2],[1530,230],null),
            speak:phi.object(skinImg[2],[0,0],null),
        },
    }


    const profileImg = {
        'noplayer':await phi.imgLoad('/src/img/profile/noplayer.png'),
        'test0':await phi.imgLoad('/src/img/profile/test0.png'),
        'test1':await phi.imgLoad('/src/img/profile/test1.png'),
        'test2':await phi.imgLoad('/src/img/profile/test2.png'),
        'test3':await phi.imgLoad('/src/img/profile/test3.png'),
    }

    // const profileObj = []
    // for (let i of profileImg){
    //     profileObj[i] = phi.object(profileObj[profileImg[i]],[0,0],[100,100])
    // }

    const uiImg = {
        back_box : await phi.imgLoad('/src/img/ui/back_box.png'),
        char_box : await phi.imgLoad('/src/img/ui/char_box.png'),
        long_bar: await phi.imgLoad('/src/img/ui/long_bar.png'),
        main_menu_btn : await phi.imgLoad('/src/img/ui/main_menu_btn.png'),
        make_room_btn : await phi.imgLoad('/src/img/ui/make_room_btn.png'),
        join_btn : await phi.imgLoad('/src/img/ui/join_btn.png'),
        rect : await phi.imgLoad('/src/img/ui/rect.png'),
        dev_inf_btn : await phi.imgLoad('/src/img/ui/dev_inf_btn.png'),
        short_bar : await phi.imgLoad('/src/img/ui/short_bar.png'),
    }

    const mainMenuBtnMargin = 40;
    const uiSet = {
        gameMenuUI : {
            back_box : phi.object(uiImg.back_box,[(innerWidth-uiImg.back_box.width)/2,(innerHeight-uiImg.back_box.height)/2],null),
            long_bar : phi.object(uiImg.long_bar,[(innerWidth-uiImg.long_bar.width)/2,300],null),
            join_btn : phi.object(uiImg.join_btn,[(innerWidth-uiImg.join_btn.width)/2 - uiImg.join_btn.width*1.5 - mainMenuBtnMargin*1.5,400],null),
            make_room_btn : phi.object(uiImg.make_room_btn,[(innerWidth-uiImg.make_room_btn.width)/2 - uiImg.make_room_btn.width*0.5 - mainMenuBtnMargin/2,400],null),
            dev_inf_btn : phi.object(uiImg.dev_inf_btn,[(innerWidth-uiImg.dev_inf_btn.width)/2 + uiImg.dev_inf_btn.width*0.5 + mainMenuBtnMargin/2,400],null),
            main_menu_btn : phi.object(uiImg.main_menu_btn,[(innerWidth-uiImg.main_menu_btn.width)/2 + uiImg.main_menu_btn.width*1.5 + mainMenuBtnMargin*1.5,400],null),
        },
        waitingRoomUI:{
            back_box : phi.object(uiImg.back_box,[(innerWidth-uiImg.back_box.width)/2,(innerHeight-uiImg.back_box.height)/2],null),
            // make_room_btn : phi.object(uiImg.make_room_btn,[(innerWidth-uiImg.make_room_btn.width)/2 - 405,500],null),
            // dev_inf_btn : phi.object(uiImg.dev_inf_btn,[(innerWidth-uiImg.dev_inf_btn.width)/2 - 405,600],null),
            // main_menu_btn : phi.object(uiImg.main_menu_btn,[(innerWidth-uiImg.main_menu_btn.width)/2 - 405,700],null),
            char_box : phi.object(uiImg.char_box,[(innerWidth-uiImg.char_box.width)/2 - 80,(innerHeight-uiImg.char_box.height)/2 + 45],null),
            user_profile_0 : phi.object(uiImg.rect,[(innerWidth-uiImg.rect.width)/2 + 110,400],null),
            user_profile_1 : phi.object(uiImg.rect,[(innerWidth-uiImg.rect.width)/2 + 110,500],null),
            user_profile_2 : phi.object(uiImg.rect,[(innerWidth-uiImg.rect.width)/2 + 110,600],null),
            user_profile_3 : phi.object(uiImg.rect,[(innerWidth-uiImg.rect.width)/2 + 110,700],null),
            
            user_infbar_0 : phi.object(uiImg.short_bar,[(innerWidth-uiImg.short_bar.width)/2 + 365,400],null),
            user_infbar_1 : phi.object(uiImg.short_bar,[(innerWidth-uiImg.short_bar.width)/2 + 365,500],null),
            user_infbar_2 : phi.object(uiImg.short_bar,[(innerWidth-uiImg.short_bar.width)/2 + 365,600],null),
            user_infbar_3 : phi.object(uiImg.short_bar,[(innerWidth-uiImg.short_bar.width)/2 + 365,700],null),
            
        }
    }



    

    window.rank = [];
    const res = await fetch("rank.json")
    const data = await res.json()
    window.rank = [...data.rank]
    const deckSizeRatio = 0.5
    const cardSize = [deck.BACK.width*deckSizeRatio,deck.BACK.height*deckSizeRatio]
    window.cardsInf = []
    for (let i = 0; i<52; i++){
        cardsInf.push({
            obj : phi.object(deck.TEST,[(innerWidth - cardSize[0])/2,(innerHeight - cardSize[1])/2],cardSize),
            aprObj : phi.object(deck[window.rank[i]],[(innerWidth - cardSize[0])/2,(innerHeight - cardSize[1])/2],cardSize),
            isSelect: false,
            posFixFlag:false,
            pos1:[0,0],
            pos2:[0,0],
            rank:window.rank[i],
            show:true,
            owner:null,
            preClick:false,
        })
    }

    window.players = {
        'p0':{},
        'p1':{},
        'p2':{},
        'p3':{},

    }

    let playersDeck = {
        // 'p0':[],
        // 'p1':[],
        // 'p2':[],
        // 'p3':[],
    }
    // playersDeck = {
    //     'p0':['SA','SK','SQ','SJ','S10','S9'],
    //     'p1':['DA','DK','DQ','DJ','D10','D9'],
    //     'p2':['HA','HK','HQ','HJ','H10'],
    //     'p3':['CA','CK','CQ','CJ','C10'],
    //     // 중복카드가 있으면 오류남. 주의! 
    // }
    let posList = {
        'p0':[innerWidth/2,innerHeight-((cardSize[1]/2)*3)],
        'p1':[300,500],
        'p2':[innerWidth/2,400],
        'p3':[innerWidth-300,500],
    }
    const centerDeckPos = [(innerWidth - cardSize[0])/2 - 75,(innerHeight - cardSize[1])/2 + 150]
    const ver_line = phi.object(deck.TEST,[innerWidth/2,0],[1,innerHeight])
    let selectCard = null; 
    let lastCard = ''
    window.scrollTo({
        top:1512,
        behavior:'smooth'
    });


    window.nickname = `USER${phi.random(0,200)}`;
    window.password = '0000';
    window.login = false;
    window.profile = null;
    window.description = null;
    window.skin = null;
    window.level = null;
    window.rank = null;
    
    
    online();

    let selectFlag = false
    let selectUI = null;


    let selectDelay = 0
    let selectLock = false

    let codeInputSelect = false;
    let codeInput = '';
    let resetFixPos = false

    let cusorDelay = 0;
    let cusor = '';

    
    function addCard(player,card){
        resetFixPos = true
        playersDeck[player].push(card)
    }

    window.scene = 'ofline';
    phi.mainLoop(() => {
        ctx.clearRect(0, 0, textCanvas.width, textCanvas.height);
        phi.fill(0.1,0.1,0.1,1)
        phi.blit(ver_line)
        // Text('안녕하세요 이건 게임입니다!! 1234567890 @#*(*(!!)$#&',[0,50],'50px')

        if (window.scene == 'ingmae-onecard'){
            for(let pName in window.players){
                let playerInf = window.players[pName]
                const nickname = playerInf.nickname
                const profile = playerInf.profile
                const description = playerInf.description
                const playerSkin = playerInf.skin
                const level = playerInf.level
                const playerRank = playerInf.rank
                
                if (nickname){
                    if (pName !== 'p0'){
                        phi.blit(skin[playerSkin].nomarl)
                    }
                }
                
            }
            for (let inf of window.cardsInf){
                let obj = inf.obj
                let apr_obj = inf.aprObj
                let rank = inf.rank
                let owner = inf.owner
                let show = inf.show
    
                // console.log(playersDeck['p0'])
    
                for (let pName in playersDeck){
                    const myDeck = playersDeck[pName]
                    
                    if (myDeck.includes(rank)){
                        const cardNumber = myDeck.indexOf(rank)
    
                        if (pName !== 'p0'){
                            phi.Goto(obj,
                                [(posList[pName][0] - (myDeck.length * cardSize[0])/3.25) + cardNumber * cardSize[0]/2, 
                                posList[pName][1]]
                            )
                            phi.rotate(obj,20- obj.angle)
                            
                        } else {
                            // console.log(myDeck)
    
                            phi.Goto(obj,
                                [(posList[pName][0] - (myDeck.length * cardSize[0])/2)+ cardNumber * cardSize[0], 
                                posList[pName][1]]
                            )
                            phi.rotate(obj,10- obj.angle)
    
    
    
                            if (!inf.posFixFlag){
                                inf.pos1 = [obj.x,obj.y]
                                inf.posFixFlag = true
                            }
    
                            if (resetFixPos){
                                inf.posFixFlag = false
                            }
                        }
    
                        owner = pName
                    }
    
                    if (owner == 'p0' && (phi.isEncounterPos(obj,mousePos) && click)){
                        inf.isSelect  = !inf.isSelect
                        if (inf.isSelect){
                            selectCard = rank
                        }
                    }
    
                    if (owner == 'p0'){
                        if (selectCard == rank){
                            phi.Goto(obj,[inf.pos1[0],inf.pos1[1]-40])
                        } else {
                            phi.Goto(obj,[inf.pos1[0],inf.pos1[1]])
                            
                        }
                    }
    
                    
                    if (owner !== 'p0'){
                        show = false
                    } else {
                        show = true
                    }
    
                    if (owner == null){
                        if (lastCard == rank){
                            phi.Goto(obj,
                                [centerDeckPos[0]+cardSize[0]*1.5,centerDeckPos[1]]
                            )
                            show = true
                        } else {
                            phi.Goto(obj,
                                centerDeckPos
                            )
                        }
                    }
    
                    
                }
    
                phi.moveX(apr_obj,((obj.x) - apr_obj.x) / 7)
                phi.moveY(apr_obj,((obj.y) - apr_obj.y) / 7)
                phi.rotate(apr_obj,((obj.angle) - apr_obj.angle) / 7)
                Text(rank+' '+owner,[obj.x,obj.y+30])
                if (show){
                    phi.blit(apr_obj)
                } else {
                    const obj_ = {...apr_obj}
                    obj_.img = deck.BACK
                    phi.blit(obj_)
                }
                // phi.blit(obj)
    
            }
        } else if (window.scene == 'menu-game'){
            for(let name in uiSet.gameMenuUI){
                const ui = uiSet.gameMenuUI[name]
                if (name !== 'back_box'){
                    let fixObj = phi.object(ui.img,[ui.startX,ui.startY],null)
                    if (phi.isEncounterPos(fixObj,mousePos)){
                        phi.moveY(ui,(ui.startY-10 -ui.y)/7)
                        if (name == 'make_room_btn'){
                            if (click && !selectLock){
                                if (!selectFlag){
                                    selectDelay = Date.now() + 300;
                                    selectFlag = true;
                                    selectLock = true;
                                    selectUI = name
                                    phi.moveY(ui,5)
                                }
                            }

                        } else if (name == 'long_bar'){
                            if (click && !selectLock){
                                phi.moveY(ui,5)
                                codeInputSelect = true
                            }
                        
                        } else if (name == 'join_btn'){
                            if (click && !selectLock){
                                if (!selectFlag){
                                    selectDelay = Date.now() + 300;
                                    selectFlag = true;
                                    selectLock = true;
                                    selectUI = name
                                    phi.moveY(ui,5)
                                }
                            }
                        }


                    } else {
                        phi.moveY(ui,(ui.startY -ui.y)/10)
                    }
                    
                    
                }
                phi.blit(ui)
            }
            


            if (selectUI == 'make_room_btn'){
                if (selectFlag && (selectDelay < Date.now())){
                    window.sc.send(JSON.stringify({
                        code:'0.3.0',
                    }))
                    selectFlag = false;
                    selectLock = false;
                }
            } else if (selectUI == 'join_btn'){
                if (selectFlag && (selectDelay < Date.now())){
                    if (codeInput.length == 5){
                        window.sc.send(JSON.stringify({
                            code:'0.3.1',
                            roomcode:codeInput.toUpperCase()
                        }))
                        console.log('⭐ 방에 참가요청을 보냄')
                        selectFlag = false;
                        selectLock = false;
                        
                    } else {
                        alert('룸코드는 5자리여야 합니다.')
                        selectFlag = false;
                        selectLock = false;
                        
                    }
                }
            
            } else if (selectUI == 'long_bar'){
                if (!phi.isEncounterPos(fixObj,mousePos) && click){
                    codeInputSelect = false
                }
            }

            if (codeInputSelect && downKey){
                if (downKey  == 'Backspace'){
                    codeInput = codeInput.slice(0,-1)
                    phi.moveY(uiSet.gameMenuUI['long_bar'],4)
                } else if (alphabet.includes(downKey) && codeInput.length < 5){
                    codeInput = codeInput + downKey
                    codeInput.toUpperCase()
                    phi.moveY(uiSet.gameMenuUI['long_bar'],-4)

                }
            }


            if (codeInputSelect){
                if (cusorDelay < Date.now()){
                    cusorDelay = Date.now() + 500
                    if (cusor){
                        cusor = '';
                    } else {
                        cusor = '|'
                    }
                    if (codeInput.length == 5){
                        cusor = ''
                    }
                }
            } else {
               cusor = ''
            }

            Text('룸코드:' + codeInput.toUpperCase() + cusor, [(uiSet.gameMenuUI['long_bar'].x + 400),uiSet.gameMenuUI['long_bar'].y+52], '50px', 'black')



        } else if (window.scene == 'menu-waiting-room'){
            for(let name in uiSet.waitingRoomUI){
                const ui = uiSet.waitingRoomUI[name]
                phi.blit(ui)
                if (name !== 'back_box'){
                    let fixObj = phi.object(ui.img,[ui.startX,ui.startY],null)
                    if (phi.isEncounterPos(fixObj,mousePos)){
                        phi.moveY(ui,(ui.startY-10 -ui.y)/7)
                        // phi.blit(profileImg['test0'],[ui.x,ui.y],[ui.width,ui.height])
                        
                        
                    } else {
                        phi.moveY(ui,(ui.startY -ui.y)/10)
                    }
                    
                    for(let strNum of ['0','1','2','3']){
                        if (name == `user_infbar_${strNum}`){
                            if (players[`p${strNum}`].description){
                                let text = players[`p${strNum}`].nickname
                                Text(text,[ui.x+30,ui.y+30],'24px','black')
                                
                                text = players[`p${strNum}`].level
                                Text('레벨:'+text,[ui.x+300,ui.y+30],'20px','orange')

                                text = players[`p${strNum}`].rank
                                Text('랭크:'+text,[ui.x+300,ui.y+55],'20px','red')


                                text = players[`p${strNum}`].description
                                Text(text,[ui.x+25,ui.y+55],'17px','black')



                                
                            } else {
                                Text('[플레이어 없음]',[ui.x+15,ui.y+44],'30px','black')
                            }
                        }
                        if (name == `user_profile_${strNum}`){
                            if (players[`p${strNum}`].profileObj){
                                const obj = players[`p${strNum}`].profileObj
                                phi.Goto(obj,[ui.x,ui.y])
                                phi.reSizeBy(obj,ui.width/obj.width)
                                phi.blit(obj)
                            
                            } else {
                                const obj = phi.object(profileImg['noplayer'],[ui.x,ui.y],null)
                                phi.reSizeBy(obj,ui.width/obj.width)
                                phi.blit(obj)
                                
                            }
                        }
                    }

                    


                }
            }
        }


        if(downKey){downKey=null}
        if(click){click=false;}
        if(resetFixPos){resetFixPos=false;}


    });

})();


document.addEventListener('mousemove',(e)=>{
    mousePos = [e.offsetX,e.offsetY];
})


document.addEventListener('click',()=>{
    click=true;
})


document.addEventListener('keydown',(e)=>{
    downKey = e.key
})

