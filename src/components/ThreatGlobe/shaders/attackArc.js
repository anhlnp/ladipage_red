// Attack Arc Shaders with graduated trail effect

export const attackArcVertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const attackArcFragmentShader = `
uniform vec3 uColor;
uniform float uProgress;
uniform float uTime;
uniform float uSpawnOffset;
varying vec2 vUv;

void main() {
    float visible = step(vUv.x, uProgress);
    
    // Graduated trail - stronger at head, fading toward tail
    float headDistance = uProgress - vUv.x;
    float trailLength = 0.4;
    float trailFade = 1.0 - smoothstep(0.0, trailLength, headDistance);
    
    // Add glow intensity at the head
    float headGlow = smoothstep(0.05, 0.0, headDistance) * 0.5;
    
    // Fade in over 1 second after spawn
    float fadeIn = clamp(uTime + uSpawnOffset, 0.0, 1.0);
    
    if (visible < 0.5) discard;
    
    // Final opacity: base + trail gradient + head glow
    float alpha = (0.2 + trailFade * 0.6 + headGlow) * fadeIn;
    
    // Slight color boost at head
    vec3 finalColor = uColor + headGlow * 0.3;
    
    gl_FragColor = vec4(finalColor, alpha);
}
`
