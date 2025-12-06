
import {PHI} from "/@phi/src/script/PHI.js"

const phi = new PHI("canvas");

export function online(){
    window.sc = new WebSocket('ws://127.0.0.1:3000/')
    window.roomCode = null;

    sc.onopen = () => {
        console.log('✅ 서버에 연결 되었습니다!')
    }
    
    
    sc.onmessage = (event) => {
        let msg = JSON.parse(event.data);

        if (msg.code == '0.1.1') {
            console.log(`✅ 로그인성공: ${window.nickname}`)
            window.login = true
            window.profile = msg.profile
            window.description = msg.description
            window.skin = msg.skin
            window.level = msg.level
            window.rank = msg.rank

            window.players[window.nickname] = {
                nickname:window.nickname,
                profile:window.profile,
                level:window.level,
                rank:window.rank,
                description:window.description
            }


        } else if (msg.code == '0.1.0'){
            console.log(`❌ 로그인실패 TIP: ${msg.tip}`)


        } else if (msg.code == '0.3.0.1') {
            window.roomCode = msg.roomcode
            console.log(`✅ 새로운 룸에 참가했습니다! ${window.roomCode}`)
            window.scene = 'menu-waiting-room'
            window.sceneStartFlag = false


        } else if (msg.code == '0.3.1.0') {
            window.roomCode = msg.roomcode
            console.log(`✅ 룸에 참가했습니다! ${window.roomCode}`)
            window.scene = 'menu-waiting-room'
            window.sceneStartFlag = false

        } else if (msg.code == '0.3.1.1'){
            window.players[msg.nickname] = {
                nickname:msg.nickname,
                profile:msg.profile,
                level:msg.level,
                rank:msg.rank,
                description:msg.description
            }


        } else if (msg.code == '0.3.1.2') {
            window.players[msg.nickname] = {
                nickname:msg.nickname,
                profile:msg.profile,
                level:msg.level,
                rank:msg.rank,
                description:msg.description
            }
        }


    }
     
    sc.onerror = (err) => {
        console.log('‼️ 에러발생:'+ err)
    }
    
    // sc.onclose = () => {
    //     console.log('❗ 서버와의 연결이 종료 되었습니다.')
    //     console.log('❗ 자동새로고침을 실행합니다.')
    //     window.location.reload();
    // }
    
    sc.addEventListener('open', () => {
        window.scene = 'menu-game';
        sc.send(JSON.stringify({ 
            code:"0.1",
            nickname: window.nickname,
            password: window.password, 
            anonymous:true 
        }));
    });
}

