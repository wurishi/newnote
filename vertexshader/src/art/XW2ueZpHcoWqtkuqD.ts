export default {
    name: 'lorenz attractor',
    mode: WebGLRenderingContext.POINTS,
    num: 6079,
    text: `
    const float PI = 3.14159265;
float hash( float n ) { return fract(sin(n)*753.5453123); }
vec3 project(vec3 p) { return vec3(p.xy / p.z, p.z); }

void main()
{
  float id = float(vertexId)/7602.;
  
  vec3 p = vec3(.1);
  //Lorenz attractor
  if(vertexId>2000.)
  {
  float snd = texture2D(sound, vec2(1./128.,.0)).a;
  float	a = -0.966918-snd,b = 2.879879+pow(snd,4.),c = 0.765145,d = 0.744728;
    for(int i=2000; i<7000; i++)
    {
        if(i<int(vertexId))
        {
          float x = sin(p.y*b) + c*sin(p.x*b);
          float y = sin(p.x*a) + d*sin(p.y*a);
          p.x = x;
          p.y = y;
        }
    }
    p *= .3;
  	v_color = vec4(cos(snd*30.)*.5+.5, sin(vertexId)*.3+.5, cos(vertexId*2.)*.2+.2, 1)*2.;
  	gl_Position = vec4((p), 1);
  	gl_PointSize=length(p.xy)*8.+.2;
  }
  else //Starfield
  {
    p.x = hash(vertexId)*4.-2.;
    p.y = hash(vertexId*.5)*4.-2.;
    p.z = -mod( hash(vertexId*.25)*10.-time*hash(vertexId*.25), 10.);
    p = project(p);
  	v_color = vec4(cos(vertexId)*.3+.7, sin(vertexId)*.2+.5, cos(vertexId*2.)*.1+.1, 1)*.5;
  	gl_Position = vec4(p.xy,0., 1);
  	gl_PointSize=1./pow(p.z,1.2)+3.*pow(length(p.xy),2.)*5.;
  }
  
}

`,
};