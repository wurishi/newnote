// Created by inigo quilez - iq/2014
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

//----------------------------------------------------------------------------------------
// main instrument
float instrument( float freq, float time )
{
    freq = 440.0*pow(freq/440.0,1.003); // spread
    
    float ph = 1.0;
    ph *= sin(6.2831*freq*time);
    ph *= 0.2+0.8*max(0.0,6.0-0.01*freq);
    ph *= exp(-time*freq*0.2);
    
    float y = 0.0;
    y += 0.70*sin(1.00*6.2831*freq*time+ph)*exp2(-0.7*0.007*freq*time);
    y += 0.20*sin(2.01*6.2831*freq*time+ph)*exp2(-0.7*0.011*freq*time);
    y += 0.20*sin(3.01*6.2831*freq*time+ph)*exp2(-0.7*0.015*freq*time);
    y += 0.16*sin(4.01*6.2831*freq*time+ph)*exp2(-0.7*0.018*freq*time);
    y += 0.13*sin(5.01*6.2831*freq*time+ph)*exp2(-0.7*0.021*freq*time);
    y += 0.10*sin(6.01*6.2831*freq*time+ph)*exp2(-0.7*0.027*freq*time);
    y += 0.09*sin(8.01*6.2831*freq*time+ph)*exp2(-0.7*0.030*freq*time);
    y += 0.07*sin(9.01*6.2831*freq*time+ph)*exp2(-0.7*0.033*freq*time);

    y += 0.45*y*y*y;
       
    y *= 1.0 + 1.5*exp(-8.0*time);
    y *= clamp( time/0.004, 0.0, 1.0 );

    y *= 2.5-1.5*clamp( log2(freq)/10.0,0.0,1.0);
	return y;	
}


// music data
float doChannel1( float soundTime );
float doChannel2( float soundTime );

//----------------------------------------------------------------------------------------
// sound shader entrypoint
//
// input: time in seconds
// ouput: stereo wave valuie at "time"
//----------------------------------------------------------------------------------------

vec2 mainSound( in int samp, float time )
{	
    time = mod( time, 60.0 );
    
    vec2 y = vec2(0.0);
    y += vec2(0.7,0.3)*doChannel1( time ); // main instrument
    y += vec2(0.3,0.7)*doChannel2( time ); // secondary instrument
	y *= 0.1;
    
	return y;
}

//----------------------------------------------------------------------------------------

#define D(a) b+=float(a);if(t>b)x=b;

//----------------------------------------------------------------------------------------

#define tint 0.144

float doChannel1( float t )
{
  float x = 0.0;
  float y = 0.0;
  float b = 0.0;
  t /= tint;

  // F2
  x = t; b = 0.0;
  D(36)D(2)D(2)D(20)D(2)D(16)D(6)D(2)D(226)
  y += instrument( 174.0, tint*(t-x) );

  // G2
  x = t; b = 0.0;
  D(53)D(208)
  y += instrument( 195.0, tint*(t-x) );

  // A2
  x = t; b = 0.0;
  D(34)D(2)D(2)D(2)D(1)D(7)D(2)D(2)D(2)D(1)D(3)D(8)D(2)D(8)D(2)D(4)D(2)D(2)D(2)D(1)
  D(31)D(2)D(4)D(138)D(46)D(2)
  y += instrument( 220.0, tint*(t-x) );

  // A#2
  x = t; b = 0.0;
  D(42)D(2)D(2)D(14)D(2)D(2)D(1)D(25)D(2)D(16)D(2)D(2)
  y += instrument( 233.0, tint*(t-x) );

  // B2
  x = t; b = 0.0;
  D(125)
  y += instrument( 246.0, tint*(t-x) );

  // C3
  x = t; b = 0.0;
  D(35)D(6)D(7)D(2)D(3)D(1)D(5)D(7)D(2)D(2)D(1)D(1)D(2)D(3)D(6)D(199)D(2)D(2)D(2)D(1)
  y += instrument( 261.0, tint*(t-x) );

  // C#3
  x = t; b = 0.0;
  D(120)D(2)D(4)D(132)D(1)D(5)D(42)D(2)
  y += instrument( 277.0, tint*(t-x) );

  // D3
  x = t; b = 0.0;
  D(0)D(2)D(1)D(2)D(1)D(2)D(1)D(1)D(1)D(1)D(2)D(1)D(2)D(1)D(2)D(1)D(1)D(1)D(1)D(2)
  D(1)D(2)D(1)D(2)D(1)D(3)D(2)D(2)D(2)D(2)D(2)D(1)D(5)D(3)D(5)D(2)D(2)D(12)D(2)D(6)
  D(2)D(2)D(2)D(2)D(2)D(1)D(1)D(2)D(5)D(3)D(2)D(2)D(2)D(3)D(3)D(6)D(1)D(136)D(9)D(2)
  D(2)D(2)D(1)D(17)D(2)D(2)D(2)D(1)D(11)
  y += instrument( 293.0, tint*(t-x) );

  // E3
  x = t; b = 0.0;
  D(41)D(7)D(2)D(15)D(7)D(2)D(27)D(6)D(13)D(2)D(4)D(132)D(1)D(23)D(2)D(2)D(2)D(18)D(4)
  y += instrument( 329.0, tint*(t-x) );

  // F3
  x = t; b = 0.0;
  D(42)D(2)D(2)D(20)D(2)D(2)D(19)D(11)D(2)D(6)D(2)D(4)D(5)D(5)D(8)D(2)D(2)D(20)D(2)D(16)
  D(6)D(2)D(82)D(4)D(2)D(2)D(2)D(2)D(1)D(12)D(5)D(2)D(2)D(2)D(1)D(7)
  y += instrument( 349.0, tint*(t-x) );

  // G3
  x = t; b = 0.0;
  D(47)D(24)D(19)D(2)D(2)D(2)D(2)D(3)D(11)D(37)D(120)D(13)D(2)D(2)D(2)D(18)
  y += instrument( 391.0, tint*(t-x) );

  // A3
  x = t; b = 0.0;
  D(95)D(5)D(2)D(12)D(16)D(2)D(2)D(2)D(1)D(7)D(2)D(2)D(2)D(1)D(3)D(8)D(2)D(8)D(2)D(4)
  D(2)D(2)D(2)D(1)D(31)D(2)D(4)D(2)D(2)D(12)D(1)D(1)D(30)D(2)D(2)D(3)D(12)D(5)D(2)D(2)
  D(3)
  y += instrument( 440.0, tint*(t-x) );

  // A#3
  x = t; b = 0.0;
  D(96)D(2)D(40)D(2)D(2)D(14)D(2)D(2)D(1)D(25)D(2)D(16)D(2)D(2)D(24)D(18)D(1)D(1)D(24)D(24)
  y += instrument( 466.0, tint*(t-x) );

  // C4
  x = t; b = 0.0;
  D(131)D(6)D(7)D(2)D(3)D(1)D(5)D(7)D(2)D(2)D(1)D(1)D(2)D(3)D(6)D(47)D(2)
  y += instrument( 523.0, tint*(t-x) );

  // C#4
  x = t; b = 0.0;
  D(216)D(2)D(3)
  y += instrument( 554.0, tint*(t-x) );

  // D4
  x = t; b = 0.0;
  D(132)D(2)D(2)D(2)D(2)D(2)D(1)D(5)D(3)D(5)D(2)D(2)D(12)D(2)D(6)D(2)D(2)D(2)D(2)D(2)
  D(1)D(1)D(2)D(5)D(3)D(2)D(2)D(2)D(3)D(3)D(6)D(2)D(2)D(4)D(4)D(2)D(5)D(7)D(5)
  y += instrument( 587.0, tint*(t-x) );

  // E4
  x = t; b = 0.0;
  D(137)D(7)D(2)D(15)D(7)D(2)D(27)D(6)D(13)D(2)D(8)
  y += instrument( 659.0, tint*(t-x) );

  // F4
  x = t; b = 0.0;
  D(138)D(2)D(2)D(20)D(2)D(2)D(19)D(11)D(2)D(6)D(2)D(4)D(5)D(13)D(2)D(1)D(4)D(3)
  y += instrument( 698.0, tint*(t-x) );

  // G4
  x = t; b = 0.0;
  D(143)D(24)D(19)D(2)D(2)D(2)D(2)D(3)D(11)D(24)D(14)D(4)
  y += instrument( 783.0, tint*(t-x) );

  // A4
  x = t; b = 0.0;
  D(191)D(5)D(2)D(12)D(24)
  y += instrument( 880.0, tint*(t-x) );

  // A#4
  x = t; b = 0.0;
  D(192)D(2)D(52)
  y += instrument( 932.0, tint*(t-x) );

  // C5
  x = t; b = 0.0;
  y += instrument( 1046.0, tint*(t-x) );
  return y;
}

float doChannel2( float t )
{
  float x = 0.0;
  float y = 0.0;
  float b = 0.0;
  t /= tint;

  // D0
  x = t; b = 0.0;
  D(24)D(6)D(3)
  y += instrument( 36.0, tint*(t-x) );

  // F0
  x = t; b = 0.0;
  D(66)D(2)D(1)D(2)D(91)D(2)D(1)D(2)
  y += instrument( 43.0, tint*(t-x) );

  // G0
  x = t; b = 0.0;
  D(96)D(2)D(1)D(2)D(91)D(2)D(1)D(2)D(49)D(2)D(1)D(2)D(1)D(2)D(1)D(2)
  y += instrument( 48.0, tint*(t-x) );

  // A0
  x = t; b = 0.0;
  D(48)D(2)D(1)D(2)D(22)D(2)D(43)D(2)D(1)D(2)D(1)D(2)D(1)D(2)D(13)D(2)D(1)D(2)D(22)D(2)
  D(43)D(2)D(1)D(2)D(13)D(2)D(1)D(2)D(1)D(2)D(1)D(2)D(13)D(2)D(1)D(2)D(1)D(2)D(1)D(2)
  D(37)D(2)D(1)D(2)
  y += instrument( 55.0, tint*(t-x) );

  // A#0
  x = t; b = 0.0;
  D(42)D(2)D(1)D(2)D(13)D(2)D(1)D(2)D(25)D(2)D(1)D(2)D(13)D(2)D(1)D(2)D(25)D(2)D(1)D(2)
  D(13)D(2)D(1)D(2)D(25)D(2)D(1)D(2)D(13)D(2)D(1)D(2)D(23)
  y += instrument( 58.0, tint*(t-x) );

  // C1
  x = t; b = 0.0;
  D(41)D(31)D(2)D(63)D(31)D(2)D(56)D(2)D(2)D(52)D(2)D(1)D(2)
  y += instrument( 65.0, tint*(t-x) );

  // D1
  x = t; b = 0.0;
  D(24)D(6)D(3)D(3)D(2)D(1)D(15)D(2)D(1)D(2)D(19)D(2)D(1)D(2)D(1)D(2)D(1)D(2)D(13)D(2)
  D(1)D(2)D(7)D(2)D(1)D(2)D(13)D(2)D(1)D(15)D(2)D(1)D(2)D(19)D(2)D(1)D(2)D(1)D(2)D(1)
  D(2)D(13)D(2)D(1)D(2)D(7)D(2)D(1)D(2)D(7)D(2)D(46)D(2)D(1)D(2)D(1)D(2)D(1)D(1)D(1)
  D(13)D(2)D(1)D(2)D(1)D(2)D(1)D(1)D(1)D(7)
  y += instrument( 73.0, tint*(t-x) );

  // F1
  x = t; b = 0.0;
  D(66)D(2)D(1)D(2)D(91)D(2)D(1)D(2)D(121)D(2)D(1)D(1)D(1)
  y += instrument( 87.0, tint*(t-x) );

  // G1
  x = t; b = 0.0;
  D(96)D(2)D(1)D(2)D(91)D(2)D(1)D(2)D(49)D(2)D(1)D(2)D(1)D(2)D(1)D(2)
  y += instrument( 97.0, tint*(t-x) );

  // A1
  x = t; b = 0.0;
  D(48)D(2)D(1)D(2)D(22)D(2)D(43)D(2)D(1)D(2)D(1)D(2)D(1)D(2)D(13)D(2)D(1)D(2)D(22)D(2)
  D(43)D(2)D(1)D(2)D(13)D(2)D(1)D(2)D(1)D(2)D(1)D(2)D(13)D(2)D(1)D(2)D(1)D(2)D(1)D(2)
  D(37)D(2)D(1)D(2)
  y += instrument( 110.0, tint*(t-x) );

  // A#1
  x = t; b = 0.0;
  D(42)D(2)D(1)D(2)D(13)D(2)D(1)D(2)D(25)D(2)D(1)D(2)D(13)D(2)D(1)D(2)D(25)D(2)D(1)D(2)
  D(13)D(2)D(1)D(2)D(25)D(2)D(1)D(2)D(13)D(2)D(1)D(2)D(23)
  y += instrument( 116.0, tint*(t-x) );

  // C2
  x = t; b = 0.0;
  D(41)D(31)D(2)D(63)D(31)D(2)D(56)D(2)D(2)D(52)D(2)D(1)D(2)
  y += instrument( 130.0, tint*(t-x) );

  // D2
  x = t; b = 0.0;
  D(36)D(2)D(1)D(15)D(2)D(1)D(2)D(19)D(2)D(1)D(2)D(1)D(2)D(1)D(2)D(13)D(2)D(1)D(2)D(7)
  D(2)D(1)D(2)D(13)D(2)D(1)D(15)D(2)D(1)D(2)D(19)D(2)D(1)D(2)D(1)D(2)D(1)D(2)D(13)D(2)
  D(1)D(2)D(7)D(2)D(1)D(2)D(7)D(2)D(46)D(2)D(1)D(2)D(1)D(2)D(1)D(1)D(1)D(13)D(2)D(1)
  D(2)D(1)D(2)D(1)D(1)D(1)D(7)
  y += instrument( 146.0, tint*(t-x) );

  // F2
  x = t; b = 0.0;
  D(288)D(2)D(1)D(1)D(1)
  y += instrument( 174.0, tint*(t-x) );
  return y;
}

