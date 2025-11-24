

# PHI.JS

phi.js는 webgl2 기반 렌더링 엔진입니다.
한별중학교 dev팀을 위해 개발되었었으며 재학생이라면 누구든지
무료로 사용가능합니다.

재학생이 아닐경우 허가후 사용가능 합니다.
# 라이선스
© 2025 wh-snuwman. All rights reserved.


# 사용법

기본적인 베이스는 아래와 같습니다

---

```javascript
import { PHI } from "/PHI.js"

  

(async () => {

    const phi = new PHI("canvas");

    phi.display([innerWidth, innerHeight]);

  

    const img = await phi.imgLoad("./src/img/c.png");

    const object = phi.object(img1,[200,300],null);

  

    phi.mainLoop(() => {

        phi.fill(0.1,0.1,0.1,1);

        phi.blit(obj_1__);

    });

  

})();
```

---

```javascript
import { PHI } from "/src/script/PHI.js"
```

먼저 PHI가 있는 디렉토리에서 PHI.js를 불러옵니다.

---

```javascript
    const phi = new PHI("canvas");
    phi.display([innerWidth, innerHeight]);
```

이후 PHI를 사용해 객체를 생성하고 canvas의 크기를 초기화 하기위해
display함수를 사용합니다. 

---

```javascript
	const img = await phi.imgLoad("./src/img/c.png");
    const object = phi.object(img1,[200,300],null);
```

이루 이미지를 imgLoad를 사용해 로드합니다.
그후 PHI.js 고유의 시스템 **오브젝트** 를 선언합니다.

---

```javascript
	phi.mainLoop(() => {
	
	phi.fill(0.1,0.1,0.1,1);
	
	phi.blit(obj_1__);

```

이후 내장 되어 있는 mainLoop함수를 위와 같이 사용해
루프를 사용할 수 있습니다. 
내장코드에 requestAnimationFrame이 사용 되어있습니다.

---

# 주의점

1. 모든코드는 async 비동기 함수안에서 진행되어야 합니다.(import 제외)
2. display 함수는 배열을 입력값으로 합니다.
3. `move()`함수는 이미지가 회전해도 x,y를 기준으로 움직이게 할 수 있습니다.
	만일 `obj.x += 1` 라고 코드를 작성하면, 이미지의 회전과 움직임이 
	동기화 되지 않아 올바르게 코드가 동작하지 않을수도 있습니다.


# 함수

##### 내장함수의 입력값을 설명합니다.

- `imgLoad( 이미지 경로 )`
- `display( 크기=[가로,세로] )` 
- `object( 이미지객체, 좌표, 크기(선택), 버텍스정점(선택) )`
- `blit( 오브젝트 객체)`
- `mainLoop( 함수 )`
- `fill( RGBA )`
- `distanceGetObj( 오브젝트1, 오브젝트2, 기준(선택) )`
- `isEncounterObj( 오브젝트1, 오브젝트2 )`
- `random( 최소값, 최대값 )`
- `randomFloat( 최소값, 최대값 )`
- `rotate( 오브젝트, 각고, 기준점(선택) )`
- `reSize( 오브젝트, 비율, 기준(선택) )`
- `move( 오브젝트, x증가량, y증가량)`
+ ` moveX( 오브젝트, x증가량 )`
- `moveY( 오브젝트, y증가량 )`
- `Goto( 오브젝트, 좌표(배열) )
- `flip( 오브젝트, 어떻게반전할지("hor","ver") )`

---

##### 내장함수의 사용법을 설명합니다.

- `imgLoad` 이미지를 로드합니다.
- `display` 화면의 사이즈를 정합니다.
- `object` 오브젝트를 생성합니다.
- `blit` 오브젝트를 그립니다.
- `mainLoop` 계속해서 실행되는 반복문을 정의합니다.
- `fill` 화면은 단일 색상으로 채웁니다.
- `distanceGetObj` 두 오브젝트사이의 거리를 구합니다.
- `isEncounterObj` 오브젝트와 한좌표 사이의 거리를 구합니다.
- `random` 범위내에서 무작위 숫자를 생섭합니다.(정수) 
- `randomFloat` 범위내에서 무작위 숫자를 생섭합니다.(실수)
- `rotate` 오브젝트를 회전시킵니다.
- `reSize` 오브젝트의 크기를 변화합니다.
- `move` 오브젝트를 이동시킵니다.
+ `moveX` 오브젝트의 x좌표를 변화시킵니다.
- `moveY` 오브젝트의 y좌표를 변화시킵니다.
- `Goto` 오브젝트의를 특정 위치로 이동시킵니다.(순간이동) 
- `flip` 오브젝트의 좌우,상하를 반전시킵니다.

