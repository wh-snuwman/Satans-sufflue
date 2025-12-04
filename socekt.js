



export function online(){
    window.sc = new WebSocket('ws://localhost:3000')
    window.roomCode = null;

    sc.onopen = () => {
        console.log('✅ 서버에 연결 되었습니다!')
    }
    
    
    sc.onmessage = (event) => {
        let msg = JSON.parse(event.data);

        if (msg.code == '0.1.1') {
            console.log(`✅ 로그인성공: ${window.nickname}`)
            console.log(`✅ 비밀번호: ${window.password} **주의** 타인에게 노출하지 마시오. 현재 개발모드 입니다.`)
            window.login = true
            window.profile = msg.profile
            window.description = msg.description
            window.skin = msg.skin
            window.level = msg.level
            window.rank = msg.rank


        } else if (msg.code == '0.1.0'){
            console.log(`❌ 로그인실패 TIP: ${msg.tip}`)


        } else if (msg.code == '0.3.0.1') {
            window.roomCode = msg.roomcode
            console.log(`✅ 새로운 룸에 참가했습니다! ${window.roomCode}`)
            window.scene = 'menu-waiting-room'

        } else if (msg.code == '0.3.1.0') {
            window.roomCode = msg.roomcode
            console.log(`✅ 룸에 참가했습니다! ${window.roomCode}`)
            window.scene = 'menu-waiting-room'

        }


    }
     
    sc.onerror = (err) => {
        console.log('‼️ 에러발생:'+ err)
    }
    
    sc.onclose = () => {
        console.log('❗ 서버와의 연결이 종료 되었습니다.')
        console.log('❗ 자동새로고침을 실행합니다.')

        window.location.reload();
    }
    
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

