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
    throw '着色器未编译成功: ' + gl.getShaderInfoLog(shader);
  }

  return shader;
}

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
    throw '链接失败: ' + gl.getProgramInfoLog(program);
  }

  return program;
}
