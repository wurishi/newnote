#define time (iTime * 0.4)
#define width  iResolution.x
#define height iResolution.y

const float delta  = 0.001;
const float PI	   = 3.14159265;

vec3 rotateX(vec3 pos, float alpha) {				

	return vec3(pos.x, pos.y * cos(alpha) + pos.z * -sin(alpha), pos.y * sin(alpha) + pos.z * cos(alpha));

}



vec3 rotateY(vec3 pos, float alpha) {

	return vec3(pos.x * cos(alpha) + pos.z * sin(alpha), pos.y, pos.x * -sin(alpha) + pos.z * cos(alpha));

}



vec3 translate(vec3 position, vec3 translation) {

	return position - translation;

}





float cube(vec3 pos,float size){

    return max(max(abs(pos.x)-size,abs(pos.y)-size),abs(pos.z)-size) ;//+ 0.17*sin(pos.z*2.2 + mod(time*0.02, 2.0*PI)-PI);

}



float sdTorus( vec3 p, vec2 t )

{

  vec2 q = vec2(length(p.xz)-t.x,p.y);

  return length(q)-t.y;

}



float udRoundBox( vec3 p, vec3 b, float r )

{

  return length(max(abs(p)-b,0.0))-r;

}



float sdSphere( vec3 p, float s )

{

  return length(p)-s;

}





	





float opS( float d1, float d2 )

{

    return max(-d1,d2);

}





	vec3 opRep2( vec3 p, vec3 c )

{

   return mod(p,c)-0.5*c;



}











float opU( float d1, float d2 )

{

    return min(d1,d2);

}







float opDisplace( vec3 p )

{

    float d1 = sdTorus(p, vec2(4.0,2.0));

    float d2 = (sin(p.x*3.0) + sin(p.y*5.0)) *0.2;

    return d1+d2;

}










float sdBox( vec3 p, vec3 b )

{

  vec3  di = abs(p) - b;

  float mc = max(di.x, max(di.y,di.z));

  return min(mc,length(max(di,0.0)));

}



float sdCross( in vec3 p )

{

  float da = udRoundBox(p.xyz,vec3(3.0,0.5,0.5), 0.2);

  float db = udRoundBox(p.yzx,vec3(0.5,3.0,0.5), 0.2);

  float dc = udRoundBox(p.zxy,vec3(0.5,0.5,3.0), 0.2);

  return min(da,min(db,dc));

}

int material = 0;



float opRep( vec3 p, vec3 c )

{

    vec3 q = mod(p,c)-0.5*c;

    return sdSphere( q ,0.1);

}

vec3 lightPosition = vec3(0.0,0.0,-1.5);


float function(vec3 position) {



	vec3 pos = rotateY(rotateX(position,time*0.7),time*0.8)+vec3(-0.6,0.6,-0.6)+vec3(60.0*sin(time*0.1),0.0,0.0);



	float cc = 6.;

	vec3 q = mod(pos,cc)-0.5*cc;

	float b =// udRoundBox(q, vec3(1.0,1.0,1.0), 0.2)

sdCross(q);



vec3 pos2 =rotateY(rotateX(position+vec3(0.0,0.0,0.2),time*1.7),time*1.8);







float a = opS( opRep(pos2, vec3(0.21)),udRoundBox(pos2, vec3(0.4,0.4,0.4), 0.05));



//sphere(position-vec3(0.0,0.0,0.5), 0.7));



float c = udRoundBox(q, vec3(1.0,1.0,1.0), 0.2);



material = 0;

if( c < b)

material = 1;

b= min(b,c);



if(a < b)

material = 2;



b =min(b, a);



;//+0.07*perlin(q*3.0) ;





	//if((mod(pos,cc)-0.5*cc).x> 0.3)

	



	return b;



}











vec3 ray(vec3 start, vec3 direction, float t) {

	return start + t * direction;

}



vec3 gradient(vec3 position) {



	return vec3(function(position + vec3(delta, 0.0, 0.0)) - function(position - vec3(delta, 0.0, 0.0)),

	function(position + vec3(0.0,delta, 0.0)) - function(position - vec3(0.0, delta, 0.0)),

	function(position + vec3(0.0, 0.0, delta)) - function(position - vec3(0.0, 0.0, delta)));



	

}










float aoScale = 0.3; // smaller aoScale = more AO

float computeAO(vec3 position, vec3 normal) {

	

float sum = 0.0;

float stepSize = 0.015;

float t = stepSize;



	for(int i=0; i < 8; i++) {

		position = ray(position, normal, t);

		sum += max(function(position),0.0);

		t+=stepSize;

	}

	return 1.0-clamp(1.0 -(sum * aoScale),0.0, 1.0);

}



float computeShadow(vec3 pos) {



	float t = 0.0;

	float distance;

vec3 position;

float res = 1.0;

float k = 10.0;

	for(int i=0; i < 64; i++) {

		position = ray(pos,normalize(lightPosition-pos) , t);

		distance = function(position);



		if(distance < 0.007) {

			break;



		}

		res = min(res, k*distance/t);	

		t = t + distance ;

	}

	if(length(pos - lightPosition)+0.0 < t) return res;

	return 0.0;

}



vec4 computeReflection(vec3 pos, vec3 viewDirection) {

	float t = 0.0;

	float distance;

	vec3 position;

       vec3 cameraPosition = pos;

	vec4 color = vec4(0.0,0.0,0.0,1.0);//vec4(0.0,0.2,0.0,1);

	vec3 normal;

	vec3 up = normalize(vec3(-0.0, 1.0,0.0));

	

	for(int i=0; i < 35; i++) {

		position = ray(cameraPosition,	viewDirection, t);

		distance = function(position);

		

	

		

		if(distance < 0.04) break;

	

		

			t = t + distance;

	}

								  

	normal = normalize(gradient(position));

			



		

			float ambient = max(dot(normal, normalize(lightPosition-position)),0.0) ;

		

			//specular

			vec3 E = normalize(cameraPosition - position);

			vec3 R = reflect(-normalize(lightPosition-position), normal);



			

			float specular = pow( max(dot(R, E), 0.0), 

		                 8.0);



						float alpha = 1.0-clamp( pow(length(position-vec3(0.0,0.0,1.0)),2.0)*0.0016,0.0, 1.0);





			

			vec3 mycolor = vec3(0.9, 0.4, 0.4);



			if(material == 1)

				mycolor = vec3(0.4, 0.9, 0.4);

			

			color = vec4((  0.6* mycolor)*(0.3+ambient*0.7),1.0);

			color += vec4(vec3(1.0)*1.0*specular, 1.0);



			color = color * alpha + vec4(0.0,0.0,0.0,1.0) *(1.0 -alpha);							  

	return color;								  

}

#define pi 3.14159265





void mainImage( out vec4 fragColor, in vec2 fragCoord )

{	

	vec3 cameraPosition = vec3(0.0, 0.0, -1.2);

	

	float aspect = 360.0/640.0;

	vec3 nearPlanePosition = vec3(((fragCoord.x/width)-0.5),

							      ((fragCoord.y/height)-0.5)*aspect,

							       -1.0);

							  

	vec3 viewDirection = normalize(nearPlanePosition - cameraPosition);

	float t = 0.0;

float l=length(nearPlanePosition - cameraPosition);

	

	 t =l;

	float distance;

	vec3 position;

	vec4 color =vec4(0.0,0.0,0.0,1.0);

	vec3 normal;

	vec3 up = normalize(vec3(-0.0, 1.0,0.0));

	

	for(int i=0; i < 64; i++) {

		position = ray(cameraPosition,	viewDirection, t);

		distance = function(position);

		

	

		

		if(distance < 0.009)break;

			



	





			t = t + distance;

	}

		

	

			normal = normalize(gradient(position));

			



		

			float ambient = max(dot(normal, normalize(lightPosition-position)),0.0) ;

		

			//specular

			vec3 E = normalize(cameraPosition - position);

			vec3 R = reflect(-normalize(lightPosition-position), normal);



			

			float specular = pow( max(dot(R, E), 0.0), 

		                 6.0);



			float alpha = 1.0-clamp( pow(length(position-vec3(0.0,0.0,1.0)),2.0)*0.0016,0.0, 1.0);





			vec3 mycolor = vec3(255.0/255.0,127.0/255.0,36.0/255.0);



			if(material == 1) mycolor = vec3(0.45, 0.9, 0.45);

			if(material == 2) mycolor = vec3(0.8, 0.8, 1.0) ;

			vec4 refl = computeReflection(position+normal *0.04, reflect(viewDirection, normal));

						float shad = 1.0;//computeShadow(position+normalize(lightPosition-position)*0.008);

			color = vec4(( refl.xyz*0.5 + 0.6* mycolor)*(0.4+ambient*0.7)*shad,1.0);



			color += vec4(vec3(0.7)*1.0*specular, 1.0);

	

			color = color * alpha + vec4(0.0,0.0,0.0,1.0) *(1.0 -alpha);

									  

								  

	fragColor = vec4(vec3(((color-0.5)*1.7+0.5)+0.2),1.0); 

	//discard;
}