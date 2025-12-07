export class easyWebgl2 {
    constructor(canvas) {
        this.gl = canvas.getContext("webgl2");
        if (!this.gl) throw new Error("WebGL2를 지원하지 않는 브라우저입니다.");

        const gl = this.gl;
        gl.enable(gl.BLEND);

        // 알파 블렌딩 방식을 설정 (일반적인 방식)
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        // WebGL은 화면에 뭘 그릴 때, "정점(Vertex)"과 "프래그먼트(Fragment)" 셰이더를 사용함.
        // 여기선 이미지를 그냥 2D로 그릴거니까, 아주 단순한 셰이더를 만든다.
        const vertexShaderSource = `
            attribute vec2 a_position;
            attribute vec2 a_texcoord;
            uniform vec2 u_resolution;
            varying vec2 v_texcoord;

            void main() {
                // 픽셀 좌표를 클립공간(-1~1)으로 바꿔주는 계산
                vec2 zeroToOne = a_position / u_resolution;
                vec2 zeroToTwo = zeroToOne * 2.0;
                vec2 clipSpace = zeroToTwo - 1.0;

                // Y축 뒤집기 (WebGL은 좌하단이 (0,0)이라서)
                gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
                v_texcoord = a_texcoord;
            }
        `;

        const fragmentShaderSource = `
            precision mediump float;
            varying vec2 v_texcoord;
            uniform sampler2D u_texture;
            void main() {
                vec2 coord = clamp(v_texcoord, 0.0, 1.0);
                gl_FragColor = texture2D(u_texture, v_texcoord);
            }
        `;

        // 셰이더를 실제로 GPU에 컴파일하고 연결
        const vertexShader = this._compileShader(gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = this._compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
        this.program = this._createProgram(vertexShader, fragmentShader);
        gl.useProgram(this.program);

        // 셰이더에 연결될 위치(포인터)를 미리 가져옴
        this.positionLocation = gl.getAttribLocation(this.program, "a_position");
        this.texcoordLocation = gl.getAttribLocation(this.program, "a_texcoord");
        this.resolutionLocation = gl.getUniformLocation(this.program, "u_resolution");

        // 버퍼(정점 데이터 저장용)
        this.positionBuffer = gl.createBuffer();
        this.texcoordBuffer = gl.createBuffer();

        // 이미지(텍스처) 목록
        this.images = [];

    }

     _compileShader(type, source) {
        const gl = this.gl;
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            throw new Error(gl.getShaderInfoLog(shader));
        }
        return shader;
    }

    _createProgram(vs, fs) {
        const gl = this.gl;
        const program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw new Error(gl.getProgramInfoLog(program));
        }
        return program;
    }

    async loadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;

            img.onload = async () => {
                try {
                    await img.decode(); // 이미지 완전히 디코딩될 때까지 기다림

                    const texture = this.gl.createTexture();
                    const gl = this.gl;
                    
                    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

                    gl.bindTexture(gl.TEXTURE_2D, texture);
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

                    // 이미지 객체 생성 후 저장
                    const imageObj = { texture, width: img.width, height: img.height };
                    this.images.push(imageObj);

                    resolve(imageObj); // ✅ 완전히 로드된 이미지를 반환

                } catch (e) {
                    reject(e); // 디코딩 실패 시 reject
                }
            };

            img.onerror = (e) => reject(e); // 다운로드 실패 시 reject
        });
    }



    drawImage(image, x, y, w, h,vertex_=null,texcoord_=null) {
        const gl = this.gl;

        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);


        if (vertex_ == null){
            const x1 = x;
            const y1 = y;
            const x2 = x + w;
            const y2 = y + h;
            vertex_ = [x1, y1,x2, y1,x1, y2,x1, y2,x2, y1,x2, y2]  
        }

        const positions = new Float32Array(vertex_)
      

        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);

        gl.enableVertexAttribArray(this.positionLocation);
        gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, 0, 0);

        // 텍스처 좌표 (0~1)
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);


        
        if (texcoord_ == null){
            const u1 = 0.0;       // 왼쪽
            const v1 = 0.0;       // 위
            const u2 = 1.0;       // 오른쪽
            const v2 = 1.0;       // 아래

            // 삼각형 두 개로 사각형 구성
            texcoord_ = [
                u1, v1,
                u2, v1,
                u1, v2,
                u1, v2,
                u2, v1,
                u2, v2
            ];
        }


        const texcoords = new Float32Array(texcoord_)

        gl.bufferData(gl.ARRAY_BUFFER, texcoords, gl.STATIC_DRAW);

        gl.enableVertexAttribArray(this.texcoordLocation);
        gl.vertexAttribPointer(this.texcoordLocation, 2, gl.FLOAT, false, 0, 0);

        // 실제 렌더링
        gl.uniform2f(this.resolutionLocation, gl.canvas.width, gl.canvas.height);
        gl.bindTexture(gl.TEXTURE_2D, image.texture);
        gl.drawArrays(gl.TRIANGLES, 0, (vertex_.length / 2));
    }

    clear(r = 0, g = 0, b = 0, a = 1) {
        const gl = this.gl;
        gl.clearColor(r, g, b, a);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }

    update(callback) {
        const loop = () => {
            callback();
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }


    resizeCanvas() {
        const dpr = window.devicePixelRatio || 1
        const displayWidth  = Math.floor(this.gl.canvas.clientWidth  * dpr)
        const displayHeight = Math.floor(this.gl.canvas.clientHeight * dpr)
        if (this.gl.canvas.width !== displayWidth || this.gl.canvas.height !== displayHeight) {
            this.gl.canvas.width  = displayWidth
            this.gl.canvas.height = displayHeight
            this.gl.viewport(0, 0, displayWidth, displayHeight)
        }
    }


}



