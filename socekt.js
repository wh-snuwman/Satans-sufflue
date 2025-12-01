



export function online(){
    window.sc = new WebSocket('ws://localhost:3000')
    const nickname = window.nickname
    const password = window.password
    
    sc.onopen = () => {
        console.log('✅ 서버에 연결 되었습니다!')
    }
    
    
    sc.onmessage = (event) => {
        let msg = JSON.parse(event.data);

        if (msg.code == '0.1.1') {
            console.log(`✅ 로그인성공: ${nickname}`)
        }
    }
     
    sc.onerror = (err) => {
        console.log('‼️ 에러발생:'+ err)
    }
    
    sc.onclose = () => {
        null
    }
    
    sc.addEventListener('open', () => {
        sc.send(JSON.stringify({ 
            nick: nickname,
            code:"0.1",
            pw: password, 
            anonymous:true 
        }));
    });
}

