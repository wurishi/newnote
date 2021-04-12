import { GUI } from 'dat.gui';
import { createCanvas, iSub, PRECISION_MEDIUMP, WEBGL_2 } from '../libs';
import * as webglUtils from '../webgl-utils';

const fragment = `
#define PI 3.14159265358979323846264338327950288419716939937510582
#define TAU (2.*PI)

//#define iDate (iDate*5000.)

const float[10] seg0 = float[](1., 0., 1., 1., 0., 1., 1., 1., 1., 1.);
const float[10] seg1 = float[](1., 0., 0., 0., 1., 1., 1., 0., 1., 1.);
const float[10] seg2 = float[](1., 1., 1., 1., 1., 0., 0., 1., 1., 1.);
const float[10] seg3 = float[](0., 0., 1., 1., 1., 1., 1., 0., 1., 1.);
const float[10] seg4 = float[](1., 0., 1., 0., 0., 0., 1., 0., 1., 0.);
const float[10] seg5 = float[](1., 1., 0., 1., 1., 1., 1., 1., 1., 1.);
const float[10] seg6 = float[](1., 0., 1., 1., 0., 1., 1., 0., 1., 1.);



float SDF_lineseg (vec2 p, vec2 a, vec2 b) {
    // https://youtu.be/PMltMdi1Wzg
    // tho i couldve derived a less efficient (yet still accurate)
    // formula myself, i didnt want to take the time
    float t = clamp(dot(p-a, b-a)/dot(b-a, b-a), 0., 1.);
    return length(p-a-(b-a)*t)-.1;
}

#define SDF_plane(p, c, n) ( dot(normalize(p-c), n)*length(p-c) )

float DE_seg (vec2 p, vec2 a, float rot) {
    p -= a;
    p.xy = p.xy*(1.-rot)+p.yx*rot;
    //return SDF_lineseg(p, vec2(0.), vec2(1., 0.));
    #define segw .12
    #define segt -.02
    float SDFp = -1e9;
    SDFp = max( SDFp, (    SDF_plane(p, vec2(0.), normalize(vec2(-1., -1.)) )       - segt ));
    SDFp = max( SDFp, (    SDF_plane(p, vec2(0.), normalize(vec2(-1., 1.)) )        - segt ));
    SDFp = max( SDFp, (    SDF_plane(p, vec2(0., -segw), normalize(vec2(0., -1.)) ) - segt ));
    SDFp = max( SDFp, (    SDF_plane(p, vec2(0., segw), normalize(vec2(0., 1.)) )   - segt ));
    SDFp = max( SDFp, (    SDF_plane(p, vec2(1., 0.), normalize(vec2(1., -1.)) )    - segt ));
    SDFp = max( SDFp, (    SDF_plane(p, vec2(1., 0.), normalize(vec2(1., 1.)) )     - segt ));
    return SDFp;
}

float DE_7seg (vec2 p, float id) {
    float SDFp = 1e9;
    //
    #if 0
    float[10] seg0 = float[](1., 0., 1., 1., 0., 1., 1., 1., 1., 1.);
    float[10] seg1 = float[](1., 0., 0., 0., 1., 1., 1., 0., 1., 1.);
    float[10] seg2 = float[](1., 1., 1., 1., 1., 0., 0., 1., 1., 1.);
    float[10] seg3 = float[](0., 0., 1., 1., 1., 1., 1., 0., 1., 1.);
    float[10] seg4 = float[](1., 0., 1., 0., 0., 0., 1., 0., 1., 0.);
    float[10] seg5 = float[](1., 1., 0., 1., 1., 1., 1., 1., 1., 1.);
    float[10] seg6 = float[](1., 0., 1., 1., 0., 1., 1., 0., 1., 1.);
    #endif
    //
    //
    //
    // top
    SDFp = min(SDFp, DE_seg(p, vec2(0., 0.), 0.)+(1.-seg0[int(id)])*1e9 );
    // top left
    SDFp = min(SDFp, DE_seg(p, vec2(0., 0.), 1.)+(1.-seg1[int(id)])*1e9 );
    // top right
    SDFp = min(SDFp, DE_seg(p, vec2(1., 0.), 1.)+(1.-seg2[int(id)])*1e9 );
    // middle
    SDFp = min(SDFp, DE_seg(p, vec2(0., 1.), 0.)+(1.-seg3[int(id)])*1e9 );
    // bottom left
    SDFp = min(SDFp, DE_seg(p, vec2(0., 1.), 1.)+(1.-seg4[int(id)])*1e9 );
    // bottom right
    SDFp = min(SDFp, DE_seg(p, vec2(1., 1.), 1.)+(1.-seg5[int(id)])*1e9 );
    // bottom
    SDFp = min(SDFp, DE_seg(p, vec2(0., 2.), 0.)+(1.-seg6[int(id)])*1e9 );
    //
    return SDFp;
}

void mainImage (out vec4 fragColor, in vec2 fragCoord) {
    vec3 finalCol = vec3(0.);
    #define spp 1.
    #define samplei 0.
    //for (float samplei=0.; samplei<spp; ++samplei) {
        vec2 p = (fragCoord.xy-iResolution.xy/2.)/iResolution.y;
        //
        p *= 5.;
        p.y = -p.y;
        p.x -= .5;
        p.y -= -1.;
        //
        //#define iDate vec4(vec3(0.), iTime*60.*18.)
        //
        #define minute floor(iDate.w/60.)
        float hour = floor(iDate.w/60./60.);
    if (hour > 12.) { hour -= 12.; }
        //
        //
        //vec3 retina = vec3(0., 0., 100./255.)*mod(floor(p.x*1.)+floor(p.y*1.), 2.);
        vec3 retina;
        //
        float SDFp = 1e9;
        SDFp = min(SDFp, DE_7seg(p-vec2(2., 0.), mod(minute, 10.) ));
        SDFp = min(SDFp, DE_7seg(p-vec2(0., 0.), mod(floor(minute/10.), 6.) ));
        #if 1
        SDFp = min(SDFp, DE_7seg(p-vec2(-2, 0.), mod(hour, 10.) ));
        SDFp = min(SDFp, DE_7seg(p-vec2(-4, 0.), mod(floor(hour/10.), 2.) ));
        //
        //SDFp = min(SDFp, length(p-vec2(sin(float(iFrame)*PI/60.), 3.)) < .1 ? 1. : 0);
        SDFp = min(SDFp, length(p-vec2(-.5, 0.5))-.05  +1e9*floor(mod(iTime, 2.)) );
        SDFp = min(SDFp, length(p-vec2(-.5, 1.5))-.05  +1e9*floor(mod(iTime, 2.)) );
        #endif
        //
        if (SDFp > 0.) {
            retina = mix(
                vec3(0., 0., 100./255.),
                vec3(0., 1., 1.),
                1./(1.+pow(SDFp, 1.)*3. )
            );
        }
        else {
            retina = vec3(1.);
        }
        finalCol = retina;
    //}
    //
    fragColor = vec4(finalCol/spp, 1.);
}





/*
// Old code for: "the worlds best raymarcher..."
// Created: 2019-11-03
// Tags: raymarching
// Description: "I'm so happy I can make analytically rigorous 3D grapics :)"

const vec3 origin = vec3(0., 0., 0.);

const vec3 lightcol = vec3(1., 1., 1.);

float lerp (float a, float b, float t) {
    float p = a+(b-a)*t;
    p = 3.*p*p-2.*p*p*p;
    return p;
}

vec3 hadamard (vec3 a, vec3 b) {
    return vec3(a.x*b.x, a.y*b.y, a.z*b.z);
}

float planeSDF (vec3 p) {
    return p.y+2.;
}

float sphereSDF (vec3 p) {
    float s = 5.;
    p = vec3(mod(p.x+iTime, s)-s/2., p.y, p.z);
    return max(length(p-vec3(0., 0., 2.))-2., 0.-length(p-vec3(0., 0., 1.9)));
}

float sphere1 (vec3 p) {
    float s = 1e5;
    s = min(s, length(p-vec3(0., 0., 2.))-2.);
    return s;
}

float sphere2 (vec3 p) {
    return length(p-vec3(5., 0., 2.))-2.;
}

float sphere3 (vec3 p) {
    return length(p-vec3(10., 0., 2.))-2.;
}

float SDF (vec3 p) {
    float SDFp = planeSDF(p);
    SDFp = min(sphere1(p), SDFp);
    SDFp = min(sphere2(p), SDFp);
    SDFp = min(sphere3(p), SDFp);
    return SDFp;
}

vec3 RFX (vec3 p) {
    float SDFp = SDF(p);
    return normalize(
        vec3(
            SDF(vec3(p.x+1e-4, p.y, p.z))-SDFp,
            SDF(vec3(p.x, p.y+1e-4, p.z))-SDFp,
            SDF(vec3(p.x, p.y, p.z+1e-4))-SDFp
        )
    );
}

vec3 TEXcolor (vec3 p, vec3 incidentd) {
    vec3 RFXp = RFX(p);
    vec3 headingd = reflect(incidentd, RFXp);
    // lightning that gets obsorbed
    float lightness = 0.;
    // diffuse light
        // point light
        vec3 light1p = vec3(0., 2., 0.);
        vec3 light1d = normalize(light1p-p);
        // directional light
        light1d = normalize(vec3(cos(iTime), 1., sin(iTime)));
    	float diff = 0.;
    	diff = dot(light1d, RFXp);
        // diff = dot(light1d, headingd);
    	// float light1dzx = atan(light1d.z, light1d.x);
    	// float headingdzx = atan(headingd.z, headingd.x);
    	// float headingdzxr = sqrt(headingd.z*headingd.z+headingd.x*headingd.x);
    	// headingd.x = headingdzxr*cos(headingdzx-light1dzx);
    	// headingd.z = headingdzxr*sin(headingdzx-light1dzx);
    	// float light1dyx = atan(light1d.y, light1d.x);
    	// float headingdyx = atan(headingd.y, headingd.x);
    	// float headingdyxr = sqrt(headingd.y*headingd.y+headingd.x*headingd.x);;
    	// headingd.x = headingdyxr*cos(headingdyx+3.141/2.-light1dyx);
    	// headingd.y = headingdyxr*sin(headingdyx+3.141/2.-light1dyx);
    	// diff = acos(headingd.y)/3.14159;
    	// diff = clamp(headingd.y, 0., 1.);
    	// diff = 1.-acos(diff)/3.14159;
    	diff = clamp(diff/2.+1., 0., 1.);
    lightness += diff;
    // ambient light
    // lightness = 0.3+0.7*lightness;
    // lightness = clamp(lightness, 0., 1.);
    
    // texture that absorbs tje light just like in real life
    float czk = mod(floor(p.x)+floor(p.z)+floor(p.y), 2.);
    // czk = mod(floor(p.x*3.)+floor(p.y*3.), 2.)/2.;
    czk = 1.;
    vec3 col = vec3(.2)+vec3(0., czk*.5, czk*.5);
    if (planeSDF(p) < 1e-2) {
        czk = mod(floor(p.x)+floor(p.z), 2.);
        col = vec3(.2)+vec3(0., czk*.5, 0.);
    }
    // combined them to get a thing 'sumcol'
    vec3 sumcol = hadamard(lightcol*lightness, col);
    // then add specular wich reflects all the light that hits it
    // from major light sources
    float specular = 0.;
    specular = clamp(dot(light1d, headingd), 0., 1.);
    specular = pow(specular, 10.);
    sumcol += specular;
    return sumcol;
}

float TEXrindex (vec3 p) {
    if (planeSDF(p)<1e-2) {
        return .5;
    }
    if (sphere1(p)<1e-2) {
        return .3;
    }
    return 0.;
}

vec3 bg (vec3 direction) {
    vec3 lightd = normalize(vec3(cos(iTime), 1., sin(iTime)));
    float ind = clamp(dot(normalize(direction), lightd), 0., 1.);
    // return vec3(0., 0., 100./255.)+pow(ind, 306.)*3.;
    return lightcol*(.5+pow(ind, 306.)*3.);
}

vec3 march (vec3 origin, vec3 direction) {
    bool hit = false;
    float compoundedd = 0.;
    float closestDE = 1e10;
    float rcount = 0.;
    // usina number as an array of digits =D
    float rarray = 0.;
    vec3 finalTX = vec3(1.);
    for (int i=0; i<200; ++i) {
        if ((compoundedd>200. || origin.y>16.) && rcount == 0.) {
            return bg(direction);
        }
        float SDFp = SDF(origin);
        float DE = SDF(origin);
        if (DE > .1 && DE < 100.) {
            DE *= .9;
        }
        if (SDFp < 1e-2) {
            origin += direction*(SDFp-1e-4);
            vec3 objcol = TEXcolor(origin, direction);
            float shiny = TEXrindex(origin);
            // if (shiny == 0. && rcount == 0.) {
            	return objcol;
            // }
            return objcol*(1.-shiny)+bg(origin)*shiny;
        }
        origin += direction*DE;
        compoundedd += DE;
    }
    return bg(direction);
}

void mainImage (out vec4 fragColor, in vec2 fragCoord) {
    vec2 maus = iMouse.xy;
    if (maus.x == 0.) {
        maus.x = iResolution.x/2.;
    }
    if (maus.y == 0.) {
        maus.y = iResolution.y/2.;
    }
    vec2 screen = (fragCoord*2.-iResolution.xy)/iResolution.x;
    vec3 dir1 = vec3(screen.x, screen.y, 1.);
    dir1 = normalize(dir1);
    float dir1zytheta = atan(dir1.z, dir1.y);
    float dir1zyr = sqrt(dir1.z*dir1.z+dir1.y*dir1.y);
    float dir2phi = dir1zytheta+clamp((maus.y-iResolution.y/2.)/iReso
lution.x*10.+0., -3.14/4.,3.14/2.);
    dir1.y = dir1zyr*cos(dir2phi);
    dir1.z = dir1zyr*sin(dir2phi);
    float dir1zxtheta = atan(dir1.z, dir1.x);
    float dir1zxr = sqrt(dir1.z*dir1.z+dir1.x*dir1.x);
    float dir2theta = dir1zxtheta+(maus.x-iResolution.x/2.)/iResolution.x*10./2.*2.;
    dir1.x = dir1zxr*cos(dir2theta);
    dir1.z = dir1zxr*sin(dir2theta);
    
    vec3 retina = march(vec3(5., 0., iTime*0.-7.), dir1);
    fragColor = vec4(retina, 1.);
}
/**/











`;

export default class implements iSub {
  key(): string {
    return '3dtSRj';
  }
  name(): string {
    return '7 segment display (wip)';
  }
  sort() {
    return 277;
  }
  webgl() {
    return WEBGL_2;
  }
  tags?(): string[] {
    return [];
  }
  main(): HTMLCanvasElement {
    return createCanvas({ width: '600px' });
  }
  userFragment(): string {
    return fragment;
  }
  fragmentPrecision?(): string {
    return PRECISION_MEDIUMP;
  }
  destory(): void {}
  initial?(gl: WebGLRenderingContext, program: WebGLProgram): Function {
    return () => {};
  }
}
