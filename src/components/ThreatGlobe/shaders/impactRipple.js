// Impact Ripple Shaders - expanding ring with fade out

export const impactRippleVertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const impactRippleFragmentShader = `
uniform vec3 uColor;
uniform float uTime;
uniform float uDuration;
uniform float uRings;
varying vec2 vUv;

void main() {
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(vUv, center) * 2.0;
    
    // Normalized time (0 to 1)
    float t = mod(uTime, uDuration) / uDuration;
    
    // Multiple expanding rings
    float ringWidth = 0.08;
    float alpha = 0.0;
    
    for (float i = 0.0; i < 3.0; i++) {
        float ringOffset = i * 0.15;
        float ringProgress = fract(t + ringOffset);
        float ringRadius = ringProgress;
        
        // Ring shape
        float ring = smoothstep(ringRadius - ringWidth, ringRadius, dist) 
                   - smoothstep(ringRadius, ringRadius + ringWidth, dist);
        
        // Fade out as ring expands
        float ringFade = 1.0 - ringProgress;
        
        alpha += ring * ringFade * 0.6;
    }
    
    // Center glow
    float centerGlow = smoothstep(0.3, 0.0, dist) * 0.4;
    alpha += centerGlow;
    
    if (alpha < 0.01) discard;
    
    gl_FragColor = vec4(uColor, alpha);
}
`
