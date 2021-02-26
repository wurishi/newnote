enum ShaderType {
  VERTEX_SHADER = WebGLRenderingContext.VERTEX_SHADER,
  FRAGMENT_SHADER = WebGLRenderingContext.FRAGMENT_SHADER,
}

/**
 * 创建并编译一个着色器
 * @param gl WebGL上下文
 * @param shaderSource GLSL 格式的着色器代码
 * @param shaderType 着色器类型(VERTEX_SHADER / FRAGMENT_SHADER)
 * @return 着色器
 */
export function compileShader(
  gl: WebGLRenderingContext,
  shaderSource: string,
  shaderType: ShaderType
): WebGLShader {
  // 创建着色器程序
  const shader = gl.createShader(shaderType);

  // 设置着色器的源码
  gl.shaderSource(shader, shaderSource);

  // 编译着色器
  gl.compileShader(shader);

  // 检测编译是否成功
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!success) {
    // 编译过程出错, 获取错误信息
    throw new Error('着色器未编译成功: ' + gl.getShaderInfoLog(shader));
  }

  return shader;
}

/**
 * 将2个着色器链接并创建一个着色器程序
 * @param gl WebGL 上下文
 * @param vertexShader 顶点着色器
 * @param fragmentShader 片断着色器
 * @return 着色器程序
 */
export function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram {
  // 创建一个程序
  const program = gl.createProgram();

  // 附上着色器
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  // 链接到程序
  gl.linkProgram(program);

  // 检查链接是否成功
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!success) {
    // 链接过程出现问题
    throw new Error('链接失败: ' + gl.getProgramInfoLog(program));
  }

  return program;
}

/**
 * 用 script 标签的内容创建着色器
 * @param gl WebGL 上下文
 * @param scriptId script标签的id
 * @param opt_shaderType 着色器类型 (如果没有指定, 则使用script标签的type属性)
 */
export function createShaderFromScript(
  gl: WebGLRenderingContext,
  scriptId: string,
  opt_shaderType?: ShaderType
): WebGLShader {
  // 通过 id 找到 script 标签
  const shaderScript = document.getElementById(scriptId) as HTMLScriptElement;
  if (!shaderScript) {
    throw new Error('未找到 script 标签: ' + scriptId);
  }

  // 提取标签内容
  const shaderSource = shaderScript.text;

  // 如果没有指定着色器类型, 就使用标签的 'type' 属性
  if (!opt_shaderType) {
    if (shaderScript.type == 'x-shader/x-vertex') {
      opt_shaderType = WebGLRenderingContext.VERTEX_SHADER;
    } else if (shaderScript.type == 'x-shader/x-fragment') {
      opt_shaderType = WebGLRenderingContext.FRAGMENT_SHADER;
    } else {
      throw new Error('shader 类型没有正确指定');
    }
  }

  return compileShader(gl, shaderSource, opt_shaderType);
}

/**
 * 通过两个 script 标签创建着色器程序
 * @param gl WebGL 上下文
 * @param vertexShaderId 顶点着色器的标签 id
 * @param fragmentShaderId 片断着色器的标签 id
 * @returns 着色器程序
 */
export function createProgramFromScripts(
  gl: WebGLRenderingContext,
  vertexShaderId: string,
  fragmentShaderId: string
) {
  const vertexShader = createShaderFromScript(
    gl,
    vertexShaderId,
    WebGLRenderingContext.VERTEX_SHADER
  );
  const fragmentShader = createShaderFromScript(
    gl,
    fragmentShaderId,
    WebGLRenderingContext.FRAGMENT_SHADER
  );
  return createProgram(gl, vertexShader, fragmentShader);
}

export function resize(canvas: HTMLCanvasElement, pixelRatio:boolean = true): void {
  // 1个CSS像素对应多少个实际像素
  const realToCSSPixels = pixelRatio ? window.devicePixelRatio : 1;

  // 获取浏览器中画布的显示尺寸
  const displayWidth = Math.floor(canvas.clientWidth * realToCSSPixels);
  const displayHeight = Math.floor(canvas.clientHeight * realToCSSPixels);

  // 检测尺寸是否相同
  if (canvas.width != displayWidth || canvas.height != displayHeight) {
    // 设置为相同尺寸
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }
}
