/* Gaspar — campo de linhas onduladas no hero.
   WebGL2 puro, sem dependências e sem interação com o mouse.
   Decorativo: o canvas é aria-hidden e não captura ponteiro. */

(function () {
  'use strict';

  var VERTEX = `#version 300 es
precision highp float;
const vec2 corners[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
void main() {
  gl_Position = vec4(corners[gl_VertexID], 0.0, 1.0);
}`;

  var FRAGMENT = `#version 300 es
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform float uLines;
uniform float uWidth;
uniform float uOpacity;
uniform float uRotation;
uniform float uWarp;
uniform float uScale;
uniform float uEdge;
uniform float uCycle;
uniform float uReveal;
uniform float uHighlight;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
out vec4 fragColor;

mat2 rot(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

/* Paleta que gira devagar entre as tres cores do campo. */
vec3 palette(float x) {
  x = fract(x) * 3.0;
  if (x < 1.0) return mix(uColor1, uColor2, smoothstep(0.0, 1.0, x));
  if (x < 2.0) return mix(uColor2, uColor3, smoothstep(1.0, 2.0, x));
  return mix(uColor3, uColor1, smoothstep(2.0, 3.0, x));
}

/* Faixa de destaque: um caminho suave que atravessa o campo e acende as
   linhas por onde passa. */
float highlightBand(vec2 p, float y, float t) {
  float path = 0.06 * sin(p.x * 1.7 - t * 0.33) + 0.03 * sin(p.x * 3.3 + t * 0.21);
  float center = path + 0.05 * sin(t * 0.19);
  float d = (y - center) / 0.42;
  return exp(-d * d);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float aspect = uResolution.x / uResolution.y;
  vec2 p = rot(uRotation) * ((gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y);

  float t = uTime;

  /* Ondulacao do campo: tres senoides em escalas diferentes. A amplitude e
     pequena de proposito — as linhas devem parecer uma gravura de relatorio,
     nao um mar. */
  vec2 q = p * 2.0 / uScale;
  float w = 0.60 * sin(q.x * 0.55 + t * 0.10 + 0.6 * sin(q.y * 0.9 - t * 0.07));
  w += 0.21 * sin(q.x * 1.30 - t * 0.08 + q.y * 0.8 + 1.3);
  w += 0.12 * sin(q.y * 2.30 + q.x * 0.9 - t * 0.09 + 0.4);
  float y = p.y + w * uWarp * uScale * 0.30;

  /* Fase da linha e distancia ate o centro da linha mais proxima, em pixels. */
  float phase = y * uLines;
  float d = abs(fract(phase + 0.5) - 0.5);
  float fw = max(fwidth(phase), 1e-5);
  float distPx = d / fw;
  float halfW = uWidth * 0.5;
  float line = 1.0 - smoothstep(halfW, halfW + 0.75, distPx);

  /* Variacao por linha: cada hachura tem o proprio peso. */
  float index = floor(phase + 0.5);
  float thread = mix(1.0, 0.58 + 0.42 * hash21(vec2(index, 7.3)), 0.38);

  /* A faixa de destaque acende as linhas por onde passa. Ampla e suave:
     o campo inteiro respira, sem uma diagonal a mais. */
  float lit = highlightBand(p, y, t);
  float light = mix(1.0, 0.55 + 0.45 * lit, uHighlight);

  /* Deriva de matiz ao longo do campo e ao longo do tempo. */
  vec3 tint = palette(y * 0.3 + p.x * 0.2 + uCycle);
  float lum = dot(tint, vec3(0.2126, 0.7152, 0.0722));
  vec3 ink = tint * (0.11 / max(lum, 0.03));

  /* Esmaecimento nas bordas: o campo se dissolve em vez de ser cortado. */
  float ex = min(uv.x, 1.0 - uv.x) * aspect;
  float ey = min(uv.y, 1.0 - uv.y);
  float edge = smoothstep(0.0, uEdge * 0.5, ex) * smoothstep(0.0, uEdge * 0.5, ey);

  /* Varredura de entrada, da esquerda para a direita. */
  float span = 0.5 * sqrt(aspect * aspect + 1.0);
  float sweep = -span + (2.0 * span + 0.6) * uReveal;
  float reveal = 1.0 - smoothstep(sweep - 0.6, sweep, p.x);

  float alpha = clamp(line * thread * light * uOpacity * reveal * edge, 0.0, 1.0);
  fragColor = vec4(ink * alpha, alpha);
}`;

  /* Limite de pixels e de densidade: evita GPU fraca travar a dobra.
     O campo e uma textura de fundo — nao precisa de resoluicao nativa.
     O teto e o que mantem a animacao barata mesmo em GPU por software. */
  var PIXEL_BUDGET = 1.1e6;
  var MAX_RATIO = 1;

  var CONFIG = {
    color1: '#cfe9ff',
    color2: '#7cc0ff',
    color3: '#eef8ff',
    lines: 53,
    width: 3.1,
    opacity: 0.045,
    rotation: -33,
    warp: 1,
    scale: 0.75,
    edge: 0.13,
    highlight: 1,
    speed: 0.6,
    cycleSpeed: 0.0075,
    revealDuration: 1.8,
    /* ~24fps. O movimento e lento demais para perceber a diferenca, e o
       custo por frame cai a um terco. */
    frameInterval: 42
  };

  function parseColor(value) {
    var hex = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(value || '').trim());
    if (!hex) return [0, 0, 0];
    var full = hex[1].length === 3
      ? hex[1].replace(/./g, function (d) { return d + d; })
      : hex[1];
    return [0, 2, 4].map(function (i) {
      return parseInt(full.slice(i, i + 2), 16) / 255;
    });
  }

  function compile(gl, type, source) {
    var shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      if (window.console) console.error(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  function link(gl) {
    var vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
    var fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vertex || !fragment) {
      if (vertex) gl.deleteShader(vertex);
      if (fragment) gl.deleteShader(fragment);
      return null;
    }
    var program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      if (window.console) console.error(gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
    var uniforms = {};
    var count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (var i = 0; i < count; i++) {
      var info = gl.getActiveUniform(program, i);
      if (info) {
        uniforms[info.name.replace(/\[0\]$/, '')] = gl.getUniformLocation(program, info.name);
      }
    }
    return { program: program, uniforms: uniforms };
  }

  function start(canvas, reduced) {
    var gl = canvas.getContext('webgl2', {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      depth: false,
      stencil: false,
      powerPreference: 'low-power'
    });
    if (!gl) return false;

    var shader = link(gl);
    if (!shader) return false;

    gl.useProgram(shader.program);

    var colors = [parseColor(CONFIG.color1), parseColor(CONFIG.color2), parseColor(CONFIG.color3)];
    gl.uniform3f(shader.uniforms.uColor1, colors[0][0], colors[0][1], colors[0][2]);
    gl.uniform3f(shader.uniforms.uColor2, colors[1][0], colors[1][1], colors[1][2]);
    gl.uniform3f(shader.uniforms.uColor3, colors[2][0], colors[2][1], colors[2][2]);
    gl.uniform1f(shader.uniforms.uLines, CONFIG.lines);
    gl.uniform1f(shader.uniforms.uWidth, CONFIG.width);
    gl.uniform1f(shader.uniforms.uOpacity, CONFIG.opacity);
    gl.uniform1f(shader.uniforms.uRotation, CONFIG.rotation * Math.PI / 180);
    gl.uniform1f(shader.uniforms.uWarp, CONFIG.warp);
    gl.uniform1f(shader.uniforms.uScale, CONFIG.scale);
    gl.uniform1f(shader.uniforms.uEdge, CONFIG.edge);
    gl.uniform1f(shader.uniforms.uHighlight, CONFIG.highlight);

    var vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    var resizePending = false;

    function applyResize() {
      var rect = canvas.getBoundingClientRect();
      var cssWidth = Math.max(1, rect.width);
      var cssHeight = Math.max(1, rect.height);
      var ratio = Math.min(
        window.devicePixelRatio || 1,
        MAX_RATIO,
        Math.sqrt(PIXEL_BUDGET / (cssWidth * cssHeight))
      );
      var width = Math.max(1, Math.round(cssWidth * ratio));
      var height = Math.max(1, Math.round(cssHeight * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    }

    function draw(time, cycle, reveal) {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(shader.uniforms.uResolution, canvas.width, canvas.height);
      gl.uniform1f(shader.uniforms.uTime, time);
      gl.uniform1f(shader.uniforms.uCycle, cycle);
      gl.uniform1f(shader.uniforms.uReveal, reveal);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    var time = 0;
    var cycle = 0;
    var reveal = 0;
    var raf = 0;
    var last = 0;
    var ultimoDesenho = 0;
    var visible = true;
    var pageVisible = document.visibilityState !== 'hidden';

    function frame(now) {
      raf = 0;
      if (resizePending) {
        resizePending = false;
        applyResize();
      }
      var dt = Math.min(Math.max((now - last) / 1000 || 0, 0), 0.05);
      last = now;
      time += dt * CONFIG.speed;
      cycle += dt * CONFIG.cycleSpeed;
      if (reveal < 1) reveal = Math.min(1, reveal + dt / CONFIG.revealDuration);

      /* O campo e lento por definicao: redesenhar a 60fps nao compra nada
         visivel e satura a CPU. Fixa-se o passo e desenha so quando passa. */
      if (now - ultimoDesenho >= CONFIG.frameInterval) {
        ultimoDesenho = now;
        draw(time, cycle, reveal);
      }

      if (visible && pageVisible) raf = requestAnimationFrame(frame);
    }

    function wake() {
      if (raf || !visible || !pageVisible) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }

    applyResize();

    if (reduced) {
      /* Sem movimento reduzido: um unico frame estatico, e para. */
      draw(0, 0, 1);
      return true;
    }

    draw(0, 0, 0);
    wake();

    if ('ResizeObserver' in window) {
      new ResizeObserver(function () {
        resizePending = true;
        wake();
      }).observe(canvas);
    } else {
      window.addEventListener('resize', function () {
        resizePending = true;
        wake();
      });
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries.some(function (entry) { return entry.isIntersecting; });
        wake();
      }).observe(canvas);
    }

    document.addEventListener('visibilitychange', function () {
      pageVisible = document.visibilityState !== 'hidden';
      wake();
    });

    return true;
  }

  function init() {
    var canvas = document.querySelector('[data-waves]');
    if (!canvas) return;

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var ok = false;

    try {
      ok = start(canvas, reduced);
    } catch (erro) {
      if (window.console) console.error('waves:', erro);
    }

    /* Sem WebGL2 o hero fica como papel liso — nada some da pagina. */
    if (!ok) canvas.remove();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
