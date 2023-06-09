import { GUI } from 'dat.gui';
import { createCanvas, iSub, PRECISION_MEDIUMP, WEBGL_2 } from '../libs';
import * as webglUtils from '../webgl-utils';

const buffA = `
/*

(06/11/16)

Some instructions on how to play:

Space: Used to start the game and restarting on Game Over.
Arrows: Move around the player character.
1-4: Change the render buffer resolution to get a
     big speedup (1 - 100%, 2 - 75%, 3 - 50%, 4 - 25%).

--------------------------------------

Known Issues:

- Some drivers might take long to compile the shader, we're currently looking into this.
- You might find that the player moves weirdly when jumping
  on water tiles, we'll try to figure out a better way to handle those cases.

Potential Issues:

- We haven't battle tested the shader on other GPUs than NVIDIA,
  so we don't know if they'll work at all.

*/

// =============================================================================
// START OF SHARED CODE
// =============================================================================

// -- Constants ----------------------------------------------------------------

// State constants.

const float kStateTitle      = 0.0;
const float kStateInGame     = 1.0;
const float kStateGameOver   = 2.0;
const float kStateRestarting = 3.0;

// Scene constants.

const float kSceneWidth         = 5.0;
const float kSceneMinTileSpeed  = 2.0;
const float kSceneMaxTileSpeed  = 2.0;

const float kSceneNumChunks     = 3.0;     // Number of pre-defined chunks in the scene.
const float kSceneChunkTiles    = 5.0;     // Number of tiles per chunk.
const float kSceneInvChunkTiles = 0.2;     // Inverse number of tiles per chunk.

const float kSceneTileSnow      = 0.0;     // Id of the snow tile.
const float kSceneTileIceRoad   = 1.0;     // Id of the ice road tile.
const float kSceneTileWater     = 2.0;     // Id of the water tile.

const float kBehavGround        = 0.0;
const float kBehavWater         = 1.0;
const float kBehavObstacle      = 2.0;
const float kBehavHazard        = 3.0;
const float kBehavOutOfScreen   = 4.0;

// Player motion constants.

const float kPlayerSpeed      = 5.0;
const float kPlayerJumpHeight = 0.3;

// State coordinates.

const vec2 kTexState1 = vec2(0.0, 0.0); // x   = Current state,  y  = State time, w = Init
const vec2 kTexState2 = vec2(1.0, 0.0); // xy  = Current coords, zw = Next coords
const vec2 kTexState3 = vec2(2.0, 0.0); // x   = Motion time, y = Rotation, z = NextRotation, w = Scale
const vec2 kTexState4 = vec2(3.0, 0.0); // xyz = Coordinates, w = Rotation
const vec2 kTexState5 = vec2(4.0, 0.0); // x   = Death cause, y = Death time, z = Score, w = Fb. Scale

// Misc constants.

const float kPi = 3.14159265359;
const float kOneOverPi = 0.31830988618;
const float kOmega = 1e20;

// -- Global values ------------------------------------------------------------

float gGameState;
float gGameStateTime;
float gGameInit;
float gGameSeed;
vec2  gPlayerCoords;
vec2  gPlayerNextCoords;
float gPlayerMotionTimer;
float gPlayerRotation;
float gPlayerNextRotation;
float gPlayerScale;
vec3  gPlayerVisualCoords;
float gPlayerVisualRotation;
float gPlayerDeathCause;
float gPlayerDeathTime;
float gScore;
float gFbScale;

// -- State functions ----------------------------------------------------------

float IsInside(vec2 p, vec2 c)
{
    vec2 d = abs(p - 0.5 - c) - 0.5;
    return -max(d.x, d.y);
}

vec4 LoadValue(vec2 st)
{
    return texture(iChannel0, (0.5 + st) / iChannelResolution[0].xy, -100.0);
}

void StoreValue(vec2 st, vec4 value, inout vec4 fragColor, in vec2 fragCoord)
{
    fragColor = (IsInside(fragCoord, st) > 0.0 )? value : fragColor;
}

void LoadState()
{
    vec4 state1 = LoadValue(kTexState1);
    vec4 state2 = LoadValue(kTexState2);
    vec4 state3 = LoadValue(kTexState3);
    vec4 state4 = LoadValue(kTexState4);
    vec4 state5 = LoadValue(kTexState5);
    
    gGameState            = state1.x;
    gGameStateTime        = state1.y;
    gGameSeed             = state1.z;
    gGameInit             = state1.w;
    gPlayerCoords         = state2.xy; 
    gPlayerNextCoords     = state2.zw;
    gPlayerMotionTimer    = state3.x;
    gPlayerRotation       = state3.y;
    gPlayerNextRotation   = state3.z;
    gPlayerScale          = state3.w;
    gPlayerVisualCoords   = state4.xyz;
    gPlayerVisualRotation = state4.w;
    gPlayerDeathCause     = state5.x;
    gPlayerDeathTime      = state5.y;
    gScore                = state5.z;
    gFbScale              = state5.w;
}

void StoreState(inout vec4 fragColor, in vec2 fragCoord)
{
    vec4 state1 = vec4(gGameState, gGameStateTime, gGameSeed, gGameInit);
    vec4 state2 = vec4(gPlayerCoords, gPlayerNextCoords);
    vec4 state3 = vec4(gPlayerMotionTimer, gPlayerRotation, gPlayerNextRotation, gPlayerScale);
    vec4 state4 = vec4(gPlayerVisualCoords, gPlayerVisualRotation);
    vec4 state5 = vec4(gPlayerDeathCause, gPlayerDeathTime, gScore, gFbScale);
    
    StoreValue(kTexState1, state1, fragColor, fragCoord);
    StoreValue(kTexState2, state2, fragColor, fragCoord);
    StoreValue(kTexState3, state3, fragColor, fragCoord);
    StoreValue(kTexState4, state4, fragColor, fragCoord);
    StoreValue(kTexState5, state5, fragColor, fragCoord);
}

// -- Hashing functions --------------------------------------------------------

vec4 Hash(float p)
{
    vec2 h = vec2(p) * vec2(1.271,3.117) + gGameSeed;
    return texture(iChannel3, h / iChannelResolution[3].xy, -100.0);
}

vec4 Hash(vec2 p)
{
    vec2 h = p.xy * vec2(1.271,3.117) + gGameSeed;
    return texture(iChannel3, h / iChannelResolution[3].xy, -100.0);
}

vec4 Hash(vec3 p)
{
    vec2 h = p.xy * vec2(1.271,3.117) + p.z * vec2(1.833,4.192) + gGameSeed;
    return texture(iChannel3, h / iChannelResolution[3].xy, -100.0);
}

// -- Scene tile functions -----------------------------------------------------

// Procedural tile management.

float GetSceneTileIndex(float z)
{
    // The scene is separated into chunks of 5 consecutive tiles, where
    // each chunk is simply a predefined set of tiles.
    
    // First, determine the chunk index and it's type, based on that index.
    float chunkIndex = floor(z * kSceneInvChunkTiles);
    float chunkType  = floor(kSceneNumChunks * Hash(chunkIndex).x) * step(1.0, chunkIndex);
        
   	// Second, determine the tile number we're referring to inside the chunk.
	float tileNum = floor(kSceneChunkTiles * (z * kSceneInvChunkTiles - chunkIndex));
    
    // Finally, depending upon the chunk type, determine which tile occupies
    // that location.
	float tileIdx = 0.0;
	
	if (chunkType == 0.0)
	{
		tileIdx = kSceneTileSnow;
	}
	else if (chunkType == 1.0)
	{
		tileIdx = mix(kSceneTileIceRoad, kSceneTileSnow, step(1.5, tileNum));
		tileIdx = mix(tileIdx, kSceneTileIceRoad,        step(2.5, tileNum));
	}
	else if (chunkType == 2.0)
	{
		tileIdx = mix(kSceneTileSnow, kSceneTileWater, step(0.5, tileNum));
		tileIdx = mix(tileIdx, kSceneTileSnow,         step(2.5, tileNum));
	}
	
	return tileIdx;
}

// Snow tile management.

float GetSceneSnowTileTreeChance(float coords, float treeIdx)
{
    return step(0.5, Hash(vec2(coords, treeIdx)).x) * step(0.5, coords);
}

float GetSceneSnowTileTreeCoord(float coords, float treeIdx)
{
    return floor(-kSceneWidth + 2.0 * kSceneWidth * Hash(vec2(coords, treeIdx)).y);
}

// Water and ice tiles common management.

vec4 GetSceneTileVSS(float coords, float minWidth, float maxWidth, float playerCoef)
{
    vec4 t;
    vec3 h = Hash(coords).xyz;
    t.x = (kSceneMinTileSpeed + floor(kSceneMaxTileSpeed * h.x)) * (2.0 * step(0.5, h.y) - 1.0);
    t.y = floor(mix(minWidth, maxWidth, h.z));
    t.z = 2.0 * t.y;
    t.w = playerCoef;
    return t;
}

vec4 GetSceneTileVss(vec3 coordsTile)
{
    vec4 vss = vec4(0.0);
    
    if (coordsTile.z == kSceneTileWater)
        vss = GetSceneTileVSS(coordsTile.y, 3.0, 6.0, 1.0);

    if (coordsTile.z == kSceneTileIceRoad)
		vss = GetSceneTileVSS(coordsTile.y, 3.0, 8.0, 0.0);
    
    return vss;
}

// -- Scene gameplay functions -------------------------------------------------

// Tile gameplay management.

vec3 GetSceneCoordsTile(vec2 loc)
{
    return vec3(floor(loc), GetSceneTileIndex(loc.y));
}

float GetSceneTileLocalSpaceLoc(float loc, vec4 vss)
{
    loc = loc - iTime * vss.x;
    return vss.z * fract(loc / vss.z);
}

vec4 GetSceneTileVss(vec2 loc)
{
    vec3 coordsTile = GetSceneCoordsTile(loc);
    return GetSceneTileVss(coordsTile);
}

float GetSceneTileBehaviour(vec2 loc)
{
    vec3 coordsTile = GetSceneCoordsTile(loc);
    vec4 vss = GetSceneTileVss(coordsTile);
    
    // Anything below or above the scene width is an obstacle.
	float isObstacle = max(step(1.0, -coordsTile.y), step(kSceneWidth + 0.5, abs(coordsTile.x)));
	float isWater = 0.0;
    float isHazard = 0.0;
    float isOutOfScreen = 0.0;
    
    // Check for each tile case.
    if (coordsTile.z == kSceneTileSnow)
    {
        for (int i = 0; i < 5; i++)
        {
            float treeChance = GetSceneSnowTileTreeChance(coordsTile.y, float(i));
            float treeCoord = GetSceneSnowTileTreeCoord(coordsTile.y, float(i));
            
            isObstacle = max(isObstacle, treeChance * (1.0 - step(0.5, abs(coordsTile.x - treeCoord))));
        }
    }
    else if (coordsTile.z == kSceneTileWater)
    {
        isOutOfScreen = isObstacle;
        isObstacle = 0.0;
        
        float l = GetSceneTileLocalSpaceLoc(loc.x, vss);        
        if (l > vss.y) isWater = 1.0;
    }
    else if (coordsTile.z == kSceneTileIceRoad)
    {
        float l = GetSceneTileLocalSpaceLoc(loc.x, vss);
        if (l < 2.0) isHazard = 1.0;
    }
    
    float behav = kBehavGround;
    behav = mix(behav, kBehavWater, isWater);
    behav = mix(behav, kBehavHazard, isHazard);
    behav = mix(behav, kBehavObstacle, isObstacle);
    behav = mix(behav, kBehavOutOfScreen, isOutOfScreen);
    
    return behav;
}

vec2 GetNextCoordinates(vec2 loc)
{
    float behav = GetSceneTileBehaviour(loc);
    vec4 vss = GetSceneTileVss(loc);
    
    float lsloc = vss.w == 0.0 && behav != kBehavWater? loc.x : GetSceneTileLocalSpaceLoc(loc.x, vss);
    float lsloc0 = floor(lsloc) + 0.5;
    
    loc.y = floor(loc.y) + 0.5;
    loc.x += (lsloc0 - lsloc);    
    return loc;
}

// =============================================================================
// END OF SHARED CODE
// =============================================================================

// -- Constants ----------------------------------------------------------------

// Key constants.

const float kKeyLeft  = 37.5 / 256.0;
const float kKeyUp    = 38.5 / 256.0;
const float kKeyRight = 39.5 / 256.0;
const float kKeyDown  = 40.5 / 256.0;
const float kKeySpace = 32.5 / 256.0;
const float kKey1     = 49.5 / 256.0;
const float kKey2     = 50.5 / 256.0;
const float kKey3     = 51.5 / 256.0;
const float kKey4     = 52.5 / 256.0;

// -- Aux functions ------------------------------------------------------------

float MixAngle(float a, float b, float t)
{
    float d = (b - a);
    d -= floor(d * 0.5 * kOneOverPi) * 2.0 * kPi;
    
    if (d > kPi)
        d -= 2.0 * kPi;
    
    return a + d * t;
}

float JumpCurve(float x)
{
    return 1.0 - 4.0 * (x - 0.5) * (x - 0.5);
}

// -- IO functions -------------------------------------------------------------

float SampleKey(float key)
{
	return step(0.5, texture(iChannel1, vec2(key, 0.25)).x);
}

vec2 SampleAxes()
{
    vec2 axes;
    axes.x = SampleKey(kKeyRight) - SampleKey(kKeyLeft);
    axes.y = (axes.x == 0.0)? SampleKey(kKeyUp) - SampleKey(kKeyDown) : 0.0;
    return axes;
}

// -- State functions ----------------------------------------------------------

void GameSetState(float state)
{
    gGameState     = state;
    gGameStateTime = 0.0;
}

void GameRestart(float state)
{
    GameSetState(state);
    gGameSeed             = iTime;
    gPlayerCoords         = vec2(0.5, 0.5);
    gPlayerNextCoords     = vec2(0.5, 0.5);
    gPlayerMotionTimer    = 0.0;
    gPlayerRotation       = 0.0;
    gPlayerNextRotation   = 0.0;
    gPlayerScale          = 1.0;
    gPlayerVisualCoords   = vec3(gPlayerCoords, 0.0).xzy;
    gPlayerVisualRotation = 0.0;
    gPlayerDeathCause     = 0.0;
    gScore                = 1.0;
}

void GameUpdate()
{
    float behav = GetSceneTileBehaviour(gPlayerNextCoords);
    
    if (behav == kBehavObstacle)
    {
        GameSetState(kStateGameOver);
        gPlayerDeathCause = behav;
        gPlayerDeathTime = iTime;
    }
    else if (gPlayerMotionTimer >= 1.0 && gGameState != kStateGameOver)
    {       
        gPlayerCoords = gPlayerNextCoords;
        gPlayerRotation = gPlayerNextRotation;
        
        if (behav != kBehavGround)
        {
            GameSetState(kStateGameOver);
            gPlayerDeathCause = behav;
            gPlayerDeathTime = iTime;
        }
        else
        {       
            vec2 axes = SampleAxes();

            if (dot(axes, axes) > 0.0)
            {
                vec2 nextCoords = GetNextCoordinates(gPlayerCoords + axes);

                if (GetSceneTileBehaviour(nextCoords) != kBehavObstacle)
                {
                    gPlayerNextCoords = nextCoords;
                    gPlayerMotionTimer = 0.0;
                    gPlayerNextRotation = atan(axes.x, axes.y);
					gScore = max(gScore, floor(nextCoords.y));
                }
            }
        }
    }
    else
    {
        gPlayerMotionTimer += iTimeDelta * kPlayerSpeed;
    }
        
    vec4 coordsVss = GetSceneTileVss(gPlayerCoords);
    vec4 nextCoordsVss = GetSceneTileVss(gPlayerNextCoords);
    gPlayerCoords.x += coordsVss.x * coordsVss.w * iTimeDelta;
    gPlayerNextCoords.x += nextCoordsVss.x * nextCoordsVss.w * iTimeDelta;
    gPlayerVisualCoords.xz = mix(gPlayerCoords, gPlayerNextCoords, clamp(gPlayerMotionTimer, 0.0, 1.0));
    gPlayerVisualCoords.y  = kPlayerJumpHeight * JumpCurve(min(1.0, gPlayerMotionTimer));
    gPlayerVisualRotation  = MixAngle(gPlayerRotation, gPlayerNextRotation, clamp(gPlayerMotionTimer, 0.0, 1.0));
    gPlayerScale = 1.0 + 0.1 * JumpCurve(min(1.0, gPlayerMotionTimer));
    
    if (gGameState == kStateGameOver)
    {
         if (gPlayerDeathCause == kBehavWater)
             gPlayerVisualCoords.y = kPlayerJumpHeight * JumpCurve(gPlayerMotionTimer);
    }
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    if (fragCoord.x > 14.0 || fragCoord.y > 14.0)
        discard;

    LoadState();
       
    if (gGameInit == 0.0)
    {
		GameRestart(kStateTitle);
        gFbScale = 1.0;
        gGameInit = 1.0;
    }
    else if (gGameState == kStateTitle)
    {
        if (SampleKey(kKeySpace) == 1.0)
            GameSetState(kStateInGame);
    }
    else if (gGameState == kStateInGame)
    {
        GameUpdate();
    }
    else if (gGameState == kStateGameOver)
    {
        GameUpdate();
        
        if (SampleKey(kKeySpace) == 1.0)
            GameSetState(kStateRestarting);
    }
    else
    {
        if (gGameStateTime > 1.0)
            GameRestart(kStateTitle);
    }
 
    if (SampleKey(kKey1) == 1.0)
        gFbScale = 1.0;
    
    if (SampleKey(kKey2) == 1.0)
        gFbScale = 0.75;
    
    if (SampleKey(kKey3) == 1.0)
        gFbScale = 0.5;
    
    if (SampleKey(kKey4) == 1.0)
        gFbScale = 0.25;
    
   	gGameStateTime += iTimeDelta;
    StoreState(fragColor, fragCoord);
}
`;

const buffB = `
/*

(06/11/16)

Some instructions on how to play:

Space: Used to start the game and restarting on Game Over.
Arrows: Move around the player character.
1-4: Change the render buffer resolution to get a
     big speedup (1 - 100%, 2 - 75%, 3 - 50%, 4 - 25%).

--------------------------------------

Known Issues:

- Some drivers might take long to compile the shader, we're currently looking into this.
- You might find that the player moves weirdly when jumping
  on water tiles, we'll try to figure out a better way to handle those cases.

Potential Issues:

- We haven't battle tested the shader on other GPUs than NVIDIA,
  so we don't know if they'll work at all.

*/

// =============================================================================
// START OF SHARED CODE
// =============================================================================

// -- Constants ----------------------------------------------------------------

// State constants.

const float kStateTitle      = 0.0;
const float kStateInGame     = 1.0;
const float kStateGameOver   = 2.0;
const float kStateRestarting = 3.0;

// Scene constants.

const float kSceneWidth         = 5.0;
const float kSceneMinTileSpeed  = 2.0;
const float kSceneMaxTileSpeed  = 2.0;

const float kSceneNumChunks     = 3.0;     // Number of pre-defined chunks in the scene.
const float kSceneChunkTiles    = 5.0;     // Number of tiles per chunk.
const float kSceneInvChunkTiles = 0.2;     // Inverse number of tiles per chunk.

const float kSceneTileSnow      = 0.0;     // Id of the snow tile.
const float kSceneTileIceRoad   = 1.0;     // Id of the ice road tile.
const float kSceneTileWater     = 2.0;     // Id of the water tile.

const float kBehavGround        = 0.0;
const float kBehavWater         = 1.0;
const float kBehavObstacle      = 2.0;
const float kBehavHazard        = 3.0;
const float kBehavOutOfScreen   = 4.0;

// Player motion constants.

const float kPlayerSpeed      = 5.0;
const float kPlayerJumpHeight = 0.3;

// State coordinates.

const vec2 kTexState1 = vec2(0.0, 0.0); // x   = Current state,  y  = State time, w = Init
const vec2 kTexState2 = vec2(1.0, 0.0); // xy  = Current coords, zw = Next coords
const vec2 kTexState3 = vec2(2.0, 0.0); // x   = Motion time, y = Rotation, z = NextRotation, w = Scale
const vec2 kTexState4 = vec2(3.0, 0.0); // xyz = Coordinates, w = Rotation
const vec2 kTexState5 = vec2(4.0, 0.0); // x   = Death cause, y = Death time, z = Score, w = Fb. Scale

// Misc constants.

const float kPi = 3.14159265359;
const float kOneOverPi = 0.31830988618;
const float kOmega = 1e20;

// -- Global values ------------------------------------------------------------

float gGameState;
float gGameStateTime;
float gGameInit;
float gGameSeed;
vec2  gPlayerCoords;
vec2  gPlayerNextCoords;
float gPlayerMotionTimer;
float gPlayerRotation;
float gPlayerNextRotation;
float gPlayerScale;
vec3  gPlayerVisualCoords;
float gPlayerVisualRotation;
float gPlayerDeathCause;
float gPlayerDeathTime;
float gScore;
float gFbScale;

// -- State functions ----------------------------------------------------------

float IsInside(vec2 p, vec2 c)
{
    vec2 d = abs(p - 0.5 - c) - 0.5;
    return -max(d.x, d.y);
}

vec4 LoadValue(vec2 st)
{ 
    return texture(iChannel0, (0.5 + st) / iChannelResolution[0].xy, -100.0);
}

void LoadState()
{
    vec4 state1 = LoadValue(kTexState1);
    vec4 state2 = LoadValue(kTexState2);
    vec4 state3 = LoadValue(kTexState3);
    vec4 state4 = LoadValue(kTexState4);
    vec4 state5 = LoadValue(kTexState5);
    
    gGameState            = state1.x;
    gGameStateTime        = state1.y;
    gGameSeed             = state1.z;
    gGameInit             = state1.w;
    gPlayerCoords         = state2.xy;
    gPlayerNextCoords     = state2.zw;
    gPlayerMotionTimer    = state3.x;
    gPlayerRotation       = state3.y;
    gPlayerNextRotation   = state3.z;
    gPlayerScale          = state3.w;
    gPlayerVisualCoords   = state4.xyz;
    gPlayerVisualRotation = state4.w;
    gPlayerDeathCause     = state5.x;
    gPlayerDeathTime      = state5.y;
    gScore                = state5.z;
    gFbScale              = state5.w;
}

// -- Hashing functions --------------------------------------------------------

vec4 Hash(float p)
{
    vec2 h = vec2(p) * vec2(1.271,3.117) + gGameSeed;
    return texture(iChannel3, h / iChannelResolution[3].xy, -100.0);
}

vec4 Hash(vec2 p)
{
    vec2 h = p.xy * vec2(1.271,3.117) + gGameSeed;
    return texture(iChannel3, h / iChannelResolution[3].xy, -100.0);
}

vec4 Hash(vec3 p)
{
    vec2 h = p.xy * vec2(1.271,3.117) + p.z * vec2(1.833,4.192) + gGameSeed;
    return texture(iChannel3, h / iChannelResolution[3].xy, -100.0);
}

// -- Scene tile functions -----------------------------------------------------

// Procedural tile management.

float GetSceneTileIndex(float z)
{
    // The scene is separated into chunks of 5 consecutive tiles, where
    // each chunk is simply a predefined set of tiles.
    
    // First, determine the chunk index and it's type, based on that index.
    float chunkIndex = floor(z * kSceneInvChunkTiles);
    float chunkType  = floor(kSceneNumChunks * Hash(chunkIndex).x) * step(1.0, chunkIndex);
        
   	// Second, determine the tile number we're referring to inside the chunk.
	float tileNum = floor(kSceneChunkTiles * (z * kSceneInvChunkTiles - chunkIndex));
    
    // Finally, depending upon the chunk type, determine which tile occupies
    // that location.
	float tileIdx = 0.0;
	
	if (chunkType == 0.0)
	{
		tileIdx = kSceneTileSnow;
	}
	else if (chunkType == 1.0)
	{
		tileIdx = mix(kSceneTileIceRoad, kSceneTileSnow, step(1.5, tileNum));
		tileIdx = mix(tileIdx, kSceneTileIceRoad,        step(2.5, tileNum));
	}
	else if (chunkType == 2.0)
	{
		tileIdx = mix(kSceneTileSnow, kSceneTileWater, step(0.5, tileNum));
		tileIdx = mix(tileIdx, kSceneTileSnow,         step(2.5, tileNum));
	}
	
	return tileIdx;
}

// Snow tile management.

float GetSceneSnowTileTreeChance(float coords, float treeIdx)
{
    return step(0.5, Hash(vec2(coords, treeIdx)).x) * step(0.5, coords);
}

float GetSceneSnowTileTreeCoord(float coords, float treeIdx)
{
    return floor(-kSceneWidth + 2.0 * kSceneWidth * Hash(vec2(coords, treeIdx)).y);
}

// Water and ice tiles common management.

vec4 GetSceneTileVSS(float coords, float minWidth, float maxWidth, float playerCoef)
{
    vec4 t;
    vec3 h = Hash(coords).xyz;
    t.x = (kSceneMinTileSpeed + floor(kSceneMaxTileSpeed * h.x)) * (2.0 * step(0.5, h.y) - 1.0);
    t.y = floor(mix(minWidth, maxWidth, h.z));
    t.z = 2.0 * t.y;
    t.w = playerCoef;
    return t;
}

vec4 GetSceneTileVss(vec3 coordsTile)
{
    vec4 vss = vec4(0.0);
    
    if (coordsTile.z == kSceneTileWater)
        vss = GetSceneTileVSS(coordsTile.y, 3.0, 6.0, 1.0);

    if (coordsTile.z == kSceneTileIceRoad)
		vss = GetSceneTileVSS(coordsTile.y, 3.0, 8.0, 0.0);
    
    return vss;
}

// -- Scene gameplay functions -------------------------------------------------

// Tile gameplay management.

vec3 GetSceneCoordsTile(vec2 loc)
{
    return vec3(floor(loc), GetSceneTileIndex(loc.y));
}

float GetSceneTileLocalSpaceLoc(float loc, vec4 vss)
{
    loc = loc - iTime * vss.x;
    return vss.z * fract(loc / vss.z);
}

vec4 GetSceneTileVss(vec2 loc)
{
    vec3 coordsTile = GetSceneCoordsTile(loc);
    return GetSceneTileVss(coordsTile);
}

float GetSceneTileBehaviour(vec2 loc)
{
    vec3 coordsTile = GetSceneCoordsTile(loc);
    vec4 vss = GetSceneTileVss(coordsTile);
    
    // Anything below or above the scene width is an obstacle.
	float isObstacle = max(step(1.0, -coordsTile.y), step(kSceneWidth + 0.5, abs(coordsTile.x)));
	float isWater = 0.0;
    float isHazard = 0.0;
    float isOutOfScreen = 0.0;
    
    // Check for each tile case.
    if (coordsTile.z == kSceneTileSnow)
    {
        for (int i = 0; i < 5; i++)
        {
            float treeChance = GetSceneSnowTileTreeChance(coordsTile.y, float(i));
            float treeCoord = GetSceneSnowTileTreeCoord(coordsTile.y, float(i));
            
            isObstacle = max(isObstacle, treeChance * (1.0 - step(0.5, abs(coordsTile.x - treeCoord))));
        }
    }
    else if (coordsTile.z == kSceneTileWater)
    {
        isOutOfScreen = isObstacle;
        isObstacle = 0.0;
        
        float l = GetSceneTileLocalSpaceLoc(loc.x, vss);        
        if (l > vss.y) isWater = 1.0;
    }
    else if (coordsTile.z == kSceneTileIceRoad)
    {
        float l = GetSceneTileLocalSpaceLoc(loc.x, vss);
        if (l < 2.0) isHazard = 1.0;
    }
    
    float behav = kBehavGround;
    behav = mix(behav, kBehavWater, isWater);
    behav = mix(behav, kBehavHazard, isHazard);
    behav = mix(behav, kBehavObstacle, isObstacle);
    behav = mix(behav, kBehavOutOfScreen, isOutOfScreen);
    
    return behav;
}

// =============================================================================
// END OF SHARED CODE
// =============================================================================

// =============================================================================
// START OF RENDER CODE
// =============================================================================

// -- Constants ----------------------------------------------------------------

// RayMarching constants

const int   kMaxSteps          = 30;    // Max number of raymarching steps
const float kStepRatio         = 1.0;
const float kMaxDistance       = 50.0;  // Max raymarching distance
const float kMinDistance       = 13.0;  // Max raymarching distance
const float kBias              = 0.05;  // Bias offset for normal estimation
const float kParallelThreshold = 1e-5;
const float kNoHit             = -1.0;  // No intersection distance.
        
// Material constants.
const float kMaterialNone                 = 0.0;
const float kMaterialPenguinBlackFeathers = 1.0;
const float kMaterialPenguinWhiteFeathers = 2.0;
const float kMaterialPenguinEyes          = 3.0;
const float kMaterialPenguinBeak          = 4.0;
const float kMaterialSledMetal            = 5.0;
const float kMaterialSled                 = 6.0;
const float kMaterialMonsterSkinGreen     = 7.0;
const float kMaterialMonsterSkinWhite     = 8.0;
const float kMaterialEnvironmentSnow      = 9.0;
const float kMaterialEnvironmentIce       = 10.0;
const float kMaterialEnvironmentWater     = 11.0;
const float kMaterialTreeWood             = 12.0;
const float kMaterialTreeLeaves           = 9.0;
const float kMaterialRiderSkin            = 14.0;
const float kMaterialRiderCloth1          = 15.0;
const float kMaterialRiderCloth2          = 16.0;

// Other constants

const vec3 kOnes = vec3(1.0, -1.0, 0.0);               // Helper vector with ones.

// -- Global values ------------------------------------------------------------

vec3 gCameraPosition;
vec4 gCameraRotation;

// -- Structures ---------------------------------------------------------------

struct Ray
{
    vec3 origin;
    vec3 direction;
};

struct RayHit
{
    float time;
    float material;
};

struct DistSample
{
    float dist;
    float stepRatio;
    float material;
};

    
// --- Math funcs --------------------------------------------------------------

vec4 QMul(vec4 q1, vec4 q2)
{
    vec4 res;
    res.w = q1.w * q2.w - dot(q1.xyz, q2.xyz);
    res.xyz = q1.w * q2.xyz + q2.w * q1.xyz + cross(q1.xyz, q2.xyz);
    return res;
}

vec4 QAxisAngle(vec3 axis, float angle)
{
    float theta = 0.5 * angle;
    float sine = sin(theta);
    return vec4(sin(theta) * axis, cos(theta));
}

vec4 QConjugate(vec4 q)
{
    return vec4(q.xyz, -q.w);
}

vec3 QTransform(vec3 v, vec4 q)
{
    vec3 t = 2.0 * cross(q.xyz, v);
    return v + q.w * t + cross(q.xyz, t);
}

vec4 QEuler(vec3 angles)
{
    vec4 qx = QAxisAngle(vec3(1.0, 0.0, 0.0), angles.x);
    vec4 qy = QAxisAngle(vec3(0.0, 1.0, 0.0), angles.y);
    vec4 qz = QAxisAngle(vec3(0.0, 0.0, 1.0), angles.z);
    return QMul(qz, QMul(qy, qx));
}

// -- Misc. functions ----------------------------------------------------------

vec3 HSV(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float smin(float a, float b, float k)
{
    //float h = clamp( 0.5+0.5*(b-a)/k, 0.0, 1.0 );
    //return mix(b, a, h) - k*h*(1.0-h);
    float h = clamp((b - a)/k, -1.0, 1.0);
    return mix(b, a, smoothstep(-1.0, 1.0, h));
}


// -- Noise functions ----------------------------------------------------------

float Perlin(vec2 p)
{    
    vec4 i;
    i.xy = floor(p);
    i.zw = i.xy + vec2(1.0, 1.0);
    
    vec2 f = fract(p);  
    vec2 u = smoothstep(0.0, 1.0, f);
    
    float f00 = mix(Hash(i.xy).x, Hash(i.zy).x, u.x);
    float f01 = mix(Hash(i.xw).x, Hash(i.zw).x, u.x);
    float f1 = mix(f00, f01, u.y);
    
    return f1;
}

float Cellular(vec3 p, float k)
{
    vec3 i = floor(p);
	float d = 1.0;
	
	for (int x = -1; x <= 1; x++)
	for (int y = -1; y <= 1; y++)
    for (int z = -1; z <= 1; z++)
	{
		vec3 q = i + vec3(x, y, z);
		q += Hash(q).xyz - p;
		d = smin(d, dot(q, q), k);
	}

    return sqrt(d);
}

// -- Ray funcs ----------------------------------------------------------------

Ray MakeRay(vec3 ro, vec3 rd)
{
	Ray ray;
	ray.origin = ro;
	ray.direction = rd;
	return ray;
}

RayHit MakeRayHit(float t, float m)
{
    RayHit h;
    h.time = t;
    h.material = m;
    return h;
}

DistSample MakeDistSample(float d, float s, float m)
{
    DistSample h;
    h.dist = d;
    h.stepRatio = s;
    h.material = m;
    return h;
}

// -- SDF CGS funcs ------------------------------------------------------------

DistSample OpU(DistSample d1, DistSample d2)
{
    if (d1.dist < d2.dist) return d1; return d2;
}

DistSample OpS(DistSample d1, DistSample d2)
{
    d2.dist = -d2.dist;
    if (d1.dist > d2.dist) return d1; return d2;
}

DistSample OpI(DistSample d1, DistSample d2)
{
    if (d1.dist > d2.dist) return d1; return d2;
}

// -- Transform funcs ----------------------------------------------------------

vec3 Tx(vec3 p, vec3 tx)
{
    return (p - tx);
}

vec3 Tx(vec3 p, vec3 tx, vec3 s)
{
    p -= tx;
    p /= s;
    return p;
}

vec3 Tx(vec3 p, vec3 tx, vec4 q)
{
    p -= tx;
    return QTransform(p, QConjugate(q));
}

vec3 Tx(vec3 p, vec3 tx, vec4 q, vec3 s)
{
    p -= tx;
    p = QTransform(p, QConjugate(q));
    p /= s;    
    return p;
}

vec3 Tx(vec3 p, vec3 tx, vec3 axis, float angle)
{
    return Tx(p, tx, QAxisAngle(axis, angle));
}

vec3 Tx(vec3 p, vec3 tx, vec3 axis, float angle, vec3 s)
{
    return Tx(p, tx, QAxisAngle(axis, angle), s);
}

// -- SDF funcs ----------------------------------------------------------------

DistSample SdfBox(vec3 p, vec3 b, float mat)
{
  vec3 d = abs(p) - b;
  return MakeDistSample(min(max(d.x,max(d.y,d.z)),0.0) +
         length(max(d,0.0)), 1.0, mat);
}

DistSample SdfPenguin(vec3 p)
{
    DistSample result = SdfBox(p, vec3(0.75), kMaterialNone);
    
    if (result.dist < 0.5)
    {
        if (gGameState == kStateGameOver && gPlayerDeathCause == kBehavHazard)
        {
            DistSample result = SdfBox(Tx(p, vec3(0, 0.047, -0.082)), vec3(0.2799999, 0.04, 0.1204678), kMaterialPenguinBlackFeathers);
            result = OpU(result, SdfBox(Tx(p, vec3(0, 0.107, 0.038)), vec3(0.28, 0.02, 0.24), kMaterialPenguinBlackFeathers));
            result = OpU(result, SdfBox(Tx(p, vec3(0, 0.047, 0.158)), vec3(0.28, 0.04, 0.12), kMaterialPenguinWhiteFeathers));
            result = OpU(result, SdfBox(Tx(p, vec3(0, 0.031, -0.282)), vec3(0.28, 0.024, 0.08000001), kMaterialPenguinBlackFeathers));
            result = OpU(result, SdfBox(Tx(p, vec3(0, 0.095, 0.29)), vec3(0.12, 0.008, 0.08000001), kMaterialPenguinBeak));
            result = OpU(result, SdfBox(Tx(p, vec3(-0.152, -0.001, -0.022)), vec3(0.048, 0.01, 0.06000001), kMaterialPenguinBeak));
            result = OpU(result, SdfBox(Tx(p, vec3(0.152, -0.001, -0.022)), vec3(0.048, 0.01, 0.06000001), kMaterialPenguinBeak));
            result = OpU(result, SdfBox(Tx(p, vec3(0.152, -0.009, 0.01)), vec3(0.112, 0.004, 0.16), kMaterialPenguinBeak));
            result = OpU(result, SdfBox(Tx(p, vec3(-0.152, -0.009, 0.01)), vec3(0.112, 0.004, 0.16), kMaterialPenguinBeak));
            result = OpU(result, SdfBox(Tx(p, vec3(0.136, 0.111, 0.29)), vec3(0.032, 0.006000001, 0.012), kMaterialPenguinEyes));
            result = OpU(result, SdfBox(Tx(p, vec3(-0.136, 0.111, 0.29)), vec3(0.032, 0.006000001, 0.012), kMaterialPenguinEyes));
            result = OpU(result, SdfBox(Tx(p, vec3(0.323, 0.037, -0.002), vec4(0, 0, 0.1736482, 0.9848078)), vec3(0.05, 0.028, 0.12), kMaterialPenguinBlackFeathers));
            result = OpU(result, SdfBox(Tx(p, vec3(-0.342, 0.045, -0.002), vec4(0, 0, -0.1736482, 0.9848078)), vec3(0.04999999, 0.028, 0.12), kMaterialPenguinBlackFeathers));
            return result;

        }
        else
        {
            result = SdfBox(Tx(p, vec3(0, 0.296, -0.0855)), vec3(0.14, 0.2, 0.06023391), kMaterialPenguinBlackFeathers);
            result = OpU(result, SdfBox(Tx(p, vec3(0, 0.596, -0.0255)), vec3(0.14, 0.1, 0.12), kMaterialPenguinBlackFeathers));
            result = OpU(result, SdfBox(Tx(p, vec3(0, 0.296, 0.0345)), vec3(0.14, 0.2, 0.06000001), kMaterialPenguinWhiteFeathers));
            result = OpU(result, SdfBox(Tx(p, vec3(0, 0.216, -0.1855)), vec3(0.14, 0.12, 0.04), kMaterialPenguinBlackFeathers));
            result = OpU(result, SdfBox(Tx(p, vec3(0, 0.536, 0.1005)), vec3(0.06, 0.04, 0.04), kMaterialPenguinBeak));
            result = OpU(result, SdfBox(Tx(p, vec3(-0.076, 0.056, -0.0555)), vec3(0.024, 0.05, 0.03), kMaterialPenguinBeak));
            result = OpU(result, SdfBox(Tx(p, vec3(0.076, 0.056, -0.0555)), vec3(0.024, 0.05, 0.03), kMaterialPenguinBeak));
            result = OpU(result, SdfBox(Tx(p, vec3(0.076, 0.016, -0.0395)), vec3(0.056, 0.02, 0.08000001), kMaterialPenguinBeak));
            result = OpU(result, SdfBox(Tx(p, vec3(-0.076, 0.016, -0.0395)), vec3(0.056, 0.02, 0.08000001), kMaterialPenguinBeak));
            result = OpU(result, SdfBox(Tx(p, vec3(0.068, 0.616, 0.1005)), vec3(0.016, 0.03, 0.006000001), kMaterialPenguinEyes));
            result = OpU(result, SdfBox(Tx(p, vec3(-0.068, 0.616, 0.1005)), vec3(0.016, 0.03, 0.006000001), kMaterialPenguinEyes));
            result = OpU(result, SdfBox(Tx(p, vec3(0.18, 0.316, -0.0455), vec4(0, 0, 0.1736482, 0.9848078)), vec3(0.025, 0.14, 0.06000001), kMaterialPenguinBlackFeathers));
            result = OpU(result, SdfBox(Tx(p, vec3(-0.18, 0.316, -0.0455), vec4(0, 0, -0.1736482, 0.9848078)), vec3(0.025, 0.14, 0.06000001), kMaterialPenguinBlackFeathers));
        }
    }
    return result;
}

DistSample SdfSled(vec3 p)
{
    DistSample result = SdfBox(Tx(p, vec3(0, 0.241, 0.1725)), vec3(0.294, 0.07, 0.49), kMaterialSled);
    result = OpU(result, SdfBox(Tx(p, vec3(0, 0.42, -0.5625)), vec3(0.294, 0.25, 0.245), kMaterialSled));
    result = OpU(result, SdfBox(Tx(p, vec3(0.168, 0.136, -0.5625)), vec3(0.0336, 0.07, 0.049), kMaterialSledMetal));
    result = OpU(result, SdfBox(Tx(p, vec3(-0.168, 0.136, -0.5625)), vec3(0.0336, 0.07, 0.049), kMaterialSledMetal));
    result = OpU(result, SdfBox(Tx(p, vec3(0.168, 0.136, 0.07450002)), vec3(0.0336, 0.07, 0.049), kMaterialSledMetal));
    result = OpU(result, SdfBox(Tx(p, vec3(-0.168, 0.136, 0.07450002)), vec3(0.0336, 0.07, 0.049), kMaterialSledMetal));
    result = OpU(result, SdfBox(Tx(p, vec3(0.168, 0.031, 0.07450002)), vec3(0.0336, 0.028, 0.833), kMaterialSledMetal));
    result = OpU(result, SdfBox(Tx(p, vec3(-0.168, 0.031, 0.07450002)), vec3(0.0336, 0.028, 0.833), kMaterialSledMetal));
    result = OpU(result, SdfBox(Tx(p, vec3(0.269, 0.374, 0.1725)), vec3(0.025, 0.07, 0.49), kMaterialSled));
    result = OpU(result, SdfBox(Tx(p, vec3(-0.269, 0.374, 0.1725)), vec3(0.025, 0.07, 0.49), kMaterialSled));
    result = OpU(result, SdfBox(Tx(p, vec3(0, 0.407, 0.562)), vec3(0.294, 0.1, 0.1), kMaterialSled));
    result = OpU(result, SdfBox(Tx(p, vec3(0, 0.554, -0.152)), vec3(0.15, 0.225, 0.115), kMaterialRiderCloth2));
    result = OpU(result, SdfBox(Tx(p, vec3(0.119, 0.389, 0.033)), vec3(0.08, 0.06599999, 0.3), kMaterialRiderCloth1));
    result = OpU(result, SdfBox(Tx(p, vec3(-0.119, 0.389, 0.033)), vec3(0.08, 0.06599999, 0.3), kMaterialRiderCloth1));
    result = OpU(result, SdfBox(Tx(p, vec3(-0.162, 0.549, 0.005), vec4(0.3420202, 0, 0, 0.9396926)), vec3(0.032, 0.06599999, 0.25), kMaterialRiderCloth2));
    result = OpU(result, SdfBox(Tx(p, vec3(0.162, 0.549, 0.005), vec4(0.3420202, 0, 0, 0.9396926)), vec3(0.032, 0.06599999, 0.25), kMaterialRiderCloth2));
    result = OpU(result, SdfBox(Tx(p, vec3(0, 0.871, -0.128)), vec3(0.15, 0.1, 0.125), kMaterialRiderSkin));
    result = OpU(result, SdfBox(Tx(p, vec3(0, 1.02, -0.128)), vec3(0.15, 0.05, 0.125), kMaterialRiderCloth1));
    return result;    
}

DistSample SdfTree(vec3 p)
{
    DistSample result = SdfBox(p, vec3(1.0), kMaterialNone);
    
    if (result.dist < 1.0)
    {
		DistSample result = SdfBox(Tx(p, vec3(0.5, 0.589, 0.5)), vec3(0.08700001, 0.6, 0.087), kMaterialTreeWood);
		result = OpU(result, SdfBox(Tx(p, vec3(0.5, 0.591, 0.5)), vec3(0.348, 0.19575, 0.348), kMaterialTreeLeaves));
        result = OpU(result, SdfBox(Tx(p, vec3(0.5, 0.985, 0.5)), vec3(0.261, 0.1305, 0.261), kMaterialTreeLeaves));
        result = OpU(result, SdfBox(Tx(p, vec3(0.5, 1.281, 0.5)), vec3(0.174, 0.1044, 0.174), kMaterialTreeLeaves));
        return result;
    }
    
    return result;
}

DistSample SdfTreeGroup(vec3 p)
{
    p.x = clamp(p.x, -10.0, 10.0);
    p.x = mod(p.x + 1.0, 2.0) - 1.0;
    return SdfTree(p);
}

DistSample SdfSnowTile(vec3 p, vec3 coordsTile, vec4 vss)
{
    DistSample result = SdfBox(Tx(p, vec3(0.0, -0.5, 0.5)), vec3(30, 0.5, 0.5), kMaterialEnvironmentSnow);
    
    for (int i = 0; i < 5; i++)
    {
        float treeChance = GetSceneSnowTileTreeChance(coordsTile.y, float(i));
        float treeCoord = GetSceneSnowTileTreeCoord(coordsTile.y, float(i));

        if (treeChance > 0.0)
            result = OpU(result, SdfTree(Tx(p, vec3(treeCoord, 0.0, 0.0))));
    }
    
    float offset = step(0.5, fract(coordsTile.y * 0.5));
    result = OpU(result, SdfTreeGroup(Tx(p, vec3(-kSceneWidth - 10.0 + offset, 0.0, 0.0))));
    result = OpU(result, SdfTreeGroup(Tx(p, vec3(kSceneWidth + 11.0 + offset, 0.0, 0.0))));
	return result;
}

DistSample SdfIceTile(vec3 p, vec3 coordsTile, vec4 vss)
{
    DistSample result = SdfBox(Tx(p, vec3(0.0, -0.6, 0.5)), vec3(30, 0.5, 0.5), kMaterialEnvironmentIce);
    
    p.x = GetSceneTileLocalSpaceLoc(p.x, vss);
    result = OpU(result, SdfSled(Tx(p, vec3(1.0, 0.0, 0.5), vec3(0.0, 1.0, 0.0), (-0.5 + step(0.0, vss.x)) * kPi)));
   
	return result;
}

DistSample SdfWaterTile(vec3 p, vec3 coordsTile, vec4 vss)
{   
    DistSample result = SdfBox(Tx(p, vec3(0.0, -0.7, 0.5)), vec3(30, 0.5, 0.5), kMaterialEnvironmentWater);
    
    p.x = GetSceneTileLocalSpaceLoc(p.x, vss);
    result = OpU(result, SdfBox(Tx(p, vec3(0.5 * vss.y, -0.5, 0.5)), vec3(0.5 * vss.y - 0.25, 0.5, 0.25), kMaterialEnvironmentIce));
   
	return result;
}

DistSample SdfEnvironment(vec3 p, vec3 coordsTile, vec4 vss)
{
    p = Tx(p, vec3(0.0, 0.0, coordsTile.y));
    
    if (coordsTile.z == kSceneTileSnow)         return SdfSnowTile(p, coordsTile, vss);
    else if (coordsTile.z == kSceneTileIceRoad) return SdfIceTile(p, coordsTile, vss);
    else                                        return SdfWaterTile(p, coordsTile, vss);
}

DistSample SdfEnvironment(vec3 p)
{
	vec3 coordsTile = GetSceneCoordsTile(p.xz);
	vec4 vss = GetSceneTileVss(coordsTile);
    return SdfEnvironment(p, coordsTile, vss);
}

// --- Scene funcs -------------------------------------------------------------

DistSample Scene(vec3 p)
{
    DistSample result;
    result = SdfPenguin(Tx(p, gPlayerVisualCoords, vec3(0, 1, 0), gPlayerVisualRotation, vec2(gPlayerScale, 1.0 / gPlayerScale).yxy));
    result = OpU(result, SdfEnvironment(p));
    return result;
}

vec3 SceneNormal(vec3 position)
{
    vec2 offset = vec2(0.05, 0.0);
    float d = Scene(position - offset.xyy).dist;
    
    return normalize(vec3
    (
        Scene(position + offset.xyy).dist - d,
        Scene(position + offset.yxy).dist - d,
        Scene(position + offset.yyx).dist - d
    ));
}

RayHit Raymarch(Ray ray, float tmin, float tmax)
{
    // We need to use a bit of an special raymarcher,
    // as we're sampling the distance field in tiles.
        
    DistSample d;

    float t = tmin;
    vec3  p = ray.origin + ray.direction * t;
    vec3  s = vec3(ray.direction.xy / ray.direction.z, 1.0);
    
    for (int i = 0; i < kMaxSteps; i++)
    {
        // Sample scene distance field.
        d = Scene(p);
        
        // Determine the current step distance.
        float td = d.dist * d.stepRatio * kStepRatio;

        // If the ray is not parallel to the Z axis,
        // ensure we're stopping by the axis.
        if (abs(ray.direction.z) > kParallelThreshold)
        {
            // Perform slope-based intersection.
            float dz = floor(p.z) - p.z + (ray.direction.z < 0.0? -kBias : 1.0 + kBias);
			td = min(td, distance(p, p + s * dz));
        }

        p += ray.direction * td;
        t += td;
        
        if (abs(d.dist) < 1e-2 || (t >= tmax))
            break;
    }
    
    if (t < kMaxDistance)
        return MakeRayHit(t, d.material);
    
    return MakeRayHit(kNoHit, kMaterialNone);
}


void Material(float material, vec3 position, out vec3 albedo, out float specular, out float shininess)
{
    if (material == kMaterialPenguinBlackFeathers)
    {
        albedo = vec3(0.35, 0.27, 0.82);
        specular = 0.3;
        shininess = 256.0;
    }
    else if (material == kMaterialPenguinWhiteFeathers)
    {
        albedo = vec3(1, 1, 1);
        specular = 0.3;
        shininess = 256.0;
    }   
    else if (material == kMaterialPenguinEyes)
    {
        albedo = vec3(0.1, 0.1, 0.1);
        specular = 0.3;
        shininess = 256.0;
    }   
    else if (material == kMaterialPenguinBeak)
    {
        albedo = vec3(1.0, 0.26, 0.055225);
        specular = 0.3;
        shininess = 256.0;
    }   
    else if (material == kMaterialMonsterSkinGreen)
    {
        albedo = vec3(0.0484, 0.8836, 0.0576);
        specular = 0.3;
        shininess = 1024.0;
    }
    else if (material == kMaterialEnvironmentSnow)
    {
        albedo = vec3(0.81, 0.9025, 1.0);
        specular = 0.0;
        shininess = 1024.0;
    }
    else if (material == kMaterialEnvironmentIce)
    {
        vec2 p = position.xz * vec2(1.0, 16.0);
        
        float texture = (1.0 / 56.0) * (32.0 * Perlin(p) + 16.0 * Perlin(p * 4.0) + 8.0 * Perlin(p * 8.0));
        texture *= texture;
        texture *= texture;
        
        albedo = mix(vec3(0.6, 0.8, 1.0), vec3(0.4), texture);
        specular = 0.3;
        shininess = 256.0;
    }
    else if (material == kMaterialEnvironmentWater)
    {
        vec3 p = position * 2.0 + vec3(iTime * 1.0, iTime * 0.7, 0.0);

        float texture = Cellular(p, 0.1);
        texture *= texture;
        texture *= texture;
        texture *= texture;
        texture = max(texture, smoothstep(0.75, 0.0, abs(abs(position.x) - kSceneWidth)) * (0.3 + Perlin(p.xz * 5.0)));
        
        albedo = mix(vec3(0.12, 0.4, 0.7), vec3(1.0), texture);
        specular = 1.0;
        shininess = 8.0;
    }
    else if (material == kMaterialTreeWood)
    {
        albedo = vec3(0.36, 0.08, 0.0);
        specular = 0.3;
        shininess = 256.0;
    }
    else if (material == kMaterialSledMetal)
    {
        albedo = vec3(0.5476, 0.5476, 0.5476);
        specular = 0.3;
        shininess = 256.0;
    }    
    else if (material == kMaterialSled)
    {
        float hash = Hash(GetSceneCoordsTile(position.xz).y * 20.0).x;
        albedo = HSV(vec3(hash, 0.8, 1.0));
        specular = 0.3;
        shininess = 256.0;
    }
    else if (material == kMaterialRiderSkin)
    {
        albedo = vec3(0.9231064975, 0.537777, 0.34142);
        specular = 0.3;
        shininess = 256.0;
    }
    else if (material == kMaterialRiderCloth1)
    {
        float hash = Hash(GetSceneCoordsTile(position.xz).y * 40.0).z;
        albedo = HSV(vec3(hash, 0.8, 0.5));
        albedo *= albedo;
        specular = 0.3;
        shininess = 256.0;
    }
    if (material == kMaterialRiderCloth2)
    {
        float hash = Hash(GetSceneCoordsTile(position.xz).y * 80.0).y;
        albedo = HSV(vec3(hash, 0.2, 0.7));
        albedo *= albedo;
        specular = 0.3;
        shininess = 256.0;
    }
}

float LightingShadow(vec3 o, vec3 d, float minDist, float maxDist)
{
    float t = minDist;
        
    for (int i = 0; i < 24; i++)
    {
		float h = Scene(o + d * t).dist;
        t += h;
        
        if (h < 0.005) 
            return 0.0;
        
        if (t > maxDist)
            break;
    }
	
    return 1.0;
}

float LightingAmbientOcclusion(vec3 p, vec3 n)
{
	float ao = 0.0;
    float sca = 1.0;
	
    for (int i = 0; i < 5; i++)
    {
        float hr = 0.01 + 0.12 * float(i) / 4.0;
        float dd = Scene(n * hr + p).dist;
        ao += -(dd - hr) * sca;
        sca *= 0.95;
    }
	
    return clamp(1.0 - 3.0 * ao, 0.0, 1.0);    
}

vec3 LightingIndirect(vec3 n, vec3 albedo, vec3 sky, vec3 ground)
{
    float a = clamp(0.5 + 0.5 * n.y, 0.0, 1.0);
    return albedo * mix(ground, sky, a);
}

vec3 LightingDirect(vec3 l, vec3 v, vec3 p, vec3 n, vec3 albedo, float specular, float shininess)
{  
    vec3 h = normalize(l + v);
    float LdotN = max(0.0, dot(l, n));
	float HdotN	= max(0.0, dot(h, n));
    float shadow = LightingShadow(p + n * kBias, l, 0.02, 8.0);
    return shadow * LdotN * (albedo + vec3(specular) * pow(HdotN, shininess));
}

vec3 SkyColor(vec3 n)
{
    return vec3(0.1, 0.1, 0.1);
}

// --- Camera funcs ------------------------------------------------------------

Ray OrthographicCamera(float size, vec2 uv, vec3 offs, vec4 rot)
{
    uv.x = -uv.x;
    
    Ray ray;
    ray.direction = QTransform(vec3(0.0, 0.0, -1.0), rot);
    ray.origin = offs + size * (QTransform(vec3(1.0, 0.0, 0.0), rot) * uv.x + QTransform(vec3(0.0, 1.0, 0.0), rot) * uv.y);
    
    return ray;
}

// =============================================================================
// END OF RENDER CODE
// =============================================================================

// --- Main --------------------------------------------------------------------

vec3 DebugColor(vec2 loc)
{   
    // Compute tile beneath the location and output the corresponding
    // debug color.
    vec3 coordsTile = GetSceneCoordsTile(loc);
	vec3 color = HSV(vec3(coordsTile.z / 3.0, 1.0, 1.0));
    
    float behav = GetSceneTileBehaviour(loc);
    
    if (behav == kBehavObstacle) color = vec3(1.0, 0.5, 0.0);
    if (behav == kBehavWater)    color = vec3(0.0, 1.0, 0.5);
    if (behav == kBehavHazard)   color = vec3(1.0, 0.0, 0.5);
    
    // Display grid (visual aid).
	float grid = 0.5 + 0.5 * step(0.1, fract(loc.x)) * step(0.1, fract(loc.y));
	grid *= 0.25 + 0.75 * step(0.05, fract(loc.y * kSceneInvChunkTiles));
    color *= 0.5 + 0.5 * grid;
    
    // Display penguin's location.
    color = mix(color, vec3(1.0), smoothstep(0.4, 0.35, distance(loc, gPlayerVisualCoords.xz)));
    
    return color;
}

void RenderScene(inout vec4 fragColor, vec2 fragCoord, vec2 uv)
{
    // Setup camera.
	gCameraRotation = QEuler(radians(vec3(-45.0, 160.0, 0.0)));
    gCameraPosition = vec3(gPlayerVisualCoords.xz, 0.0).xzy;
    gCameraPosition.x = clamp(gCameraPosition.x, -kSceneWidth * 0.4, kSceneWidth * 0.4);
    gCameraPosition.z = max(gCameraPosition.z, kSceneWidth * 0.75);
    gCameraPosition += QTransform(vec3(0.0, 0.0, 20.0), gCameraRotation);
                                     
    // Generate first ray and raymarch along scene.
 	Ray ray = OrthographicCamera(4.0, uv, gCameraPosition, gCameraRotation);
    RayHit hit = Raymarch(ray, kMinDistance, kMaxDistance);

	// Initialize color to sky.
	fragColor.rgb = SkyColor(ray.direction);
    
    // If there was an intersection, compute normal and the hit surface color.
    if (hit.material != kMaterialNone)
    {
        vec3 p = ray.direction * hit.time + ray.origin;
        vec3 n = SceneNormal(p);
        vec3 v = normalize(gCameraPosition - p);

        vec3 albedo;
        float shininess;
        float specular;
        Material(hit.material, p, albedo, specular, shininess);
        
        vec3 l = normalize(vec3(-0.6, 0.7, -0.5));
        
        float ao = LightingAmbientOcclusion(p, n);
        fragColor.rgb = vec3(1.00, 0.85, 0.55) * LightingDirect(l, v, p, n, albedo, specular, shininess);
        fragColor.rgb += ao * LightingIndirect(n, albedo, vec3(0.50, 0.70, 1.00), vec3(0.0, 0.0, 0.0));
    }
    
    // Convert to gamma space and apply vignetting effect.
    fragColor.rgb = sqrt(fragColor.rgb);
    fragColor.rgb -= fragColor.rgb * 0.1 * dot(uv, uv);
}

void RenderSceneDebug(inout vec4 fragColor, vec2 fragCoord, vec2 uv)
{
	vec2 loc = uv * 10.0 + gPlayerVisualCoords.xz;
	fragColor.rgb = DebugColor(loc);
	fragColor.a = 1.0;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    LoadState();
    
    // Compute aspect ratio.
    float aspect = iResolution.x / iResolution.y;
    
    // Compute uv coords.
    vec2 uv = fragCoord.xy / (gFbScale * iResolution.xy);
    
    if (max(uv.x, uv.y) > 1.0)
        discard;

    uv = 2.0 * uv - 1.0;
    uv.x *= aspect;
    
    // Render scene.
	//RenderSceneDebug(fragColor, fragCoord, uv * 0.75);
    RenderScene(fragColor, fragCoord, uv);
}
`;

const fragment = `
/*

(06/11/16)

Some instructions on how to play:

Space: Used to start the game and restarting on Game Over.
Arrows: Move around the player character.
1-4: Change the render buffer resolution to get a
     big speedup (1 - 100%, 2 - 75%, 3 - 50%, 4 - 25%).

--------------------------------------

Known Issues:

- Some drivers might take long to compile the shader, we're currently looking into this.
- You might find that the player moves weirdly when jumping
  on water tiles, we'll try to figure out a better way to handle those cases.

Potential Issues:

- We haven't battle tested the shader on other GPUs than NVIDIA,
  so we don't know if they'll work at all.

*/

// =============================================================================
// START OF SHARED CODE
// =============================================================================

// -- Constants ----------------------------------------------------------------

// State constants.

const float kStateTitle      = 0.0;
const float kStateInGame     = 1.0;
const float kStateGameOver   = 2.0;
const float kStateRestarting = 3.0;

// Scene constants.

const float kSceneWidth         = 5.0;
const float kSceneMinTileSpeed  = 2.0;
const float kSceneMaxTileSpeed  = 2.0;

const float kSceneNumChunks     = 3.0;     // Number of pre-defined chunks in the scene.
const float kSceneChunkTiles    = 5.0;     // Number of tiles per chunk.
const float kSceneInvChunkTiles = 0.2;     // Inverse number of tiles per chunk.

const float kSceneTileSnow      = 0.0;     // Id of the snow tile.
const float kSceneTileIceRoad   = 1.0;     // Id of the ice road tile.
const float kSceneTileWater     = 2.0;     // Id of the water tile.

const float kBehavGround        = 0.0;
const float kBehavWater         = 1.0;
const float kBehavObstacle      = 2.0;
const float kBehavHazard        = 3.0;
const float kBehavOutOfScreen   = 4.0;

// Player motion constants.

const float kPlayerSpeed      = 5.0;
const float kPlayerJumpHeight = 0.3;

// State coordinates.

const vec2 kTexState1 = vec2(0.0, 0.0); // x   = Current state,  y  = State time, w = Init
const vec2 kTexState2 = vec2(1.0, 0.0); // xy  = Current coords, zw = Next coords
const vec2 kTexState3 = vec2(2.0, 0.0); // x   = Motion time, y = Rotation, z = NextRotation, w = Scale
const vec2 kTexState4 = vec2(3.0, 0.0); // xyz = Coordinates, w = Rotation
const vec2 kTexState5 = vec2(4.0, 0.0); // x   = Death cause, y = Death time, z = Score, w = Fb. Scale

// Misc constants.

const float kPi = 3.14159265359;
const float kOneOverPi = 0.31830988618;
const float kOmega = 1e20;

// -- Global values ------------------------------------------------------------

float gGameState;
float gGameStateTime;
float gGameInit;
float gGameSeed;
vec2  gPlayerCoords;
vec2  gPlayerNextCoords;
float gPlayerMotionTimer;
float gPlayerRotation;
float gPlayerNextRotation;
float gPlayerScale;
vec3  gPlayerVisualCoords;
float gPlayerVisualRotation;
float gPlayerDeathCause;
float gPlayerDeathTime;
float gScore;
float gFbScale;

// -- State functions ----------------------------------------------------------

float IsInside(vec2 p, vec2 c)
{
    vec2 d = abs(p - 0.5 - c) - 0.5;
    return -max(d.x, d.y);
}

vec4 LoadValue(vec2 st)
{
    return texture(iChannel0, (0.5 + st) / iChannelResolution[0].xy, -100.0);
}

void StoreValue(vec2 st, vec4 value, inout vec4 fragColor, in vec2 fragCoord)
{
    fragColor = (IsInside(fragCoord, st) > 0.0 )? value : fragColor;
}

void LoadState()
{
    vec4 state1 = LoadValue(kTexState1);
    vec4 state2 = LoadValue(kTexState2);
    vec4 state3 = LoadValue(kTexState3);
    vec4 state4 = LoadValue(kTexState4);
    vec4 state5 = LoadValue(kTexState5);
    
    gGameState            = state1.x;
    gGameStateTime        = state1.y;
    gGameSeed             = state1.z;
    gGameInit             = state1.w;
    gPlayerCoords         = state2.xy;
    gPlayerNextCoords     = state2.zw;
    gPlayerMotionTimer    = state3.x;
    gPlayerRotation       = state3.y;
    gPlayerNextRotation   = state3.z;
    gPlayerScale          = state3.w;
    gPlayerVisualCoords   = state4.xyz;
    gPlayerVisualRotation = state4.w;
    gPlayerDeathCause     = state5.x;
    gPlayerDeathTime      = state5.y;
    gScore                = state5.z;
    gFbScale              = state5.w;
}

void StoreState(inout vec4 fragColor, in vec2 fragCoord)
{
    vec4 state1 = vec4(gGameState, gGameStateTime, gGameSeed, gGameInit);
    vec4 state2 = vec4(gPlayerCoords, gPlayerNextCoords);
    vec4 state3 = vec4(gPlayerMotionTimer, gPlayerRotation, gPlayerNextRotation, gPlayerScale);
    vec4 state4 = vec4(gPlayerVisualCoords, gPlayerVisualRotation);
    vec4 state5 = vec4(gPlayerDeathCause, gPlayerDeathTime, gScore, gFbScale);
    
    StoreValue(kTexState1, state1, fragColor, fragCoord);
    StoreValue(kTexState2, state2, fragColor, fragCoord);
    StoreValue(kTexState3, state3, fragColor, fragCoord);
    StoreValue(kTexState4, state4, fragColor, fragCoord);
    StoreValue(kTexState5, state5, fragColor, fragCoord);
}

// -- Hashing functions --------------------------------------------------------

vec4 Hash(float p)
{
    vec2 h = vec2(p) * vec2(1.271,3.117) + gGameSeed;
    return texture(iChannel3, h / iChannelResolution[3].xy, -100.0);
}

vec4 Hash(vec2 p)
{
    vec2 h = p.xy * vec2(1.271,3.117) + gGameSeed;
    return texture(iChannel3, h / iChannelResolution[3].xy, -100.0);
}

vec4 Hash(vec3 p)
{
    vec2 h = p.xy * vec2(1.271,3.117) + p.z * vec2(1.833,4.192) + gGameSeed;
    return texture(iChannel3, h / iChannelResolution[3].xy, -100.0);
}

// -- Scene tile functions -----------------------------------------------------

// Procedural tile management.

float GetSceneTileIndex(float z)
{
    // The scene is separated into chunks of 5 consecutive tiles, where
    // each chunk is simply a predefined set of tiles.
    
    // First, determine the chunk index and it's type, based on that index.
    float chunkIndex = floor(z * kSceneInvChunkTiles);
    float chunkType  = floor(kSceneNumChunks * Hash(chunkIndex).x) * step(1.0, chunkIndex);
        
   	// Second, determine the tile number we're referring to inside the chunk.
	float tileNum = floor(kSceneChunkTiles * (z * kSceneInvChunkTiles - chunkIndex));
    
    // Finally, depending upon the chunk type, determine which tile occupies
    // that location.
	float tileIdx = 0.0;
	
	if (chunkType == 0.0)
	{
		tileIdx = kSceneTileSnow;
	}
	else if (chunkType == 1.0)
	{
		tileIdx = mix(kSceneTileIceRoad, kSceneTileSnow, step(1.5, tileNum));
		tileIdx = mix(tileIdx, kSceneTileIceRoad,        step(2.5, tileNum));
	}
	else if (chunkType == 2.0)
	{
		tileIdx = mix(kSceneTileSnow, kSceneTileWater, step(0.5, tileNum));
		tileIdx = mix(tileIdx, kSceneTileSnow,         step(2.5, tileNum));
	}
	
	return tileIdx;
}

// Snow tile management.

float GetSceneSnowTileTreeChance(float coords, float treeIdx)
{
    return step(0.5, Hash(vec2(coords, treeIdx)).x) * step(0.5, coords);
}

float GetSceneSnowTileTreeCoord(float coords, float treeIdx)
{
    return floor(-kSceneWidth + 2.0 * kSceneWidth * Hash(vec2(coords, treeIdx)).y);
}

// Water and ice tiles common management.

vec4 GetSceneTileVSS(float coords, float minWidth, float maxWidth, float playerCoef)
{
    vec4 t;
    vec3 h = Hash(coords).xyz;
    t.x = (kSceneMinTileSpeed + floor(kSceneMaxTileSpeed * h.x)) * (2.0 * step(0.5, h.y) - 1.0);
    t.y = floor(mix(minWidth, maxWidth, h.z));
    t.z = 2.0 * t.y;
    t.w = playerCoef;
    return t;
}

vec4 GetSceneTileVss(vec3 coordsTile)
{
    vec4 vss = vec4(0.0);
    
    if (coordsTile.z == kSceneTileWater)
        vss = GetSceneTileVSS(coordsTile.y, 3.0, 6.0, 1.0);

    if (coordsTile.z == kSceneTileIceRoad)
		vss = GetSceneTileVSS(coordsTile.y, 3.0, 8.0, 0.0);
    
    return vss;
}

// -- Scene gameplay functions -------------------------------------------------

// Tile gameplay management.

vec3 GetSceneCoordsTile(vec2 loc)
{
    return vec3(floor(loc), GetSceneTileIndex(loc.y));
}

float GetSceneTileLocalSpaceLoc(float loc, vec4 vss)
{
    loc = loc - iTime * vss.x;
    return vss.z * fract(loc / vss.z);
}

vec4 GetSceneTileVss(vec2 loc)
{
    vec3 coordsTile = GetSceneCoordsTile(loc);
    return GetSceneTileVss(coordsTile);
}

float GetSceneTileBehaviour(vec2 loc)
{
    vec3 coordsTile = GetSceneCoordsTile(loc);
    vec4 vss = GetSceneTileVss(coordsTile);
    
    // Anything below or above the scene width is an obstacle.
	float isObstacle = max(step(1.0, -coordsTile.y), step(kSceneWidth + 0.5, abs(coordsTile.x)));
	float isWater = 0.0;
    float isHazard = 0.0;
    float isOutOfScreen = 0.0;
    
    // Check for each tile case.
    if (coordsTile.z == kSceneTileSnow)
    {
        for (int i = 0; i < 5; i++)
        {
            float treeChance = GetSceneSnowTileTreeChance(coordsTile.y, float(i));
            float treeCoord = GetSceneSnowTileTreeCoord(coordsTile.y, float(i));
            
            isObstacle = max(isObstacle, treeChance * (1.0 - step(0.5, abs(coordsTile.x - treeCoord))));
        }
    }
    else if (coordsTile.z == kSceneTileWater)
    {
        isOutOfScreen = isObstacle;
        isObstacle = 0.0;
        
        float l = GetSceneTileLocalSpaceLoc(loc.x, vss);        
        if (l > vss.y) isWater = 1.0;
    }
    else if (coordsTile.z == kSceneTileIceRoad)
    {
        float l = GetSceneTileLocalSpaceLoc(loc.x, vss);
        if (l < 2.0) isHazard = 1.0;
    }
    
    float behav = kBehavGround;
    behav = mix(behav, kBehavWater, isWater);
    behav = mix(behav, kBehavHazard, isHazard);
    behav = mix(behav, kBehavObstacle, isObstacle);
    behav = mix(behav, kBehavOutOfScreen, isOutOfScreen);
    
    return behav;
}

vec2 GetNextCoordinates(vec2 loc)
{
    float behav = GetSceneTileBehaviour(loc);
    vec4 vss = GetSceneTileVss(loc);
    
    float lsloc = vss.w == 0.0 && behav != kBehavWater? loc.x : GetSceneTileLocalSpaceLoc(loc.x, vss);
    float lsloc0 = floor(lsloc) + 0.5;
    
    loc.y = floor(loc.y) + 0.5;
    loc.x += (lsloc0 - lsloc);    
    return loc;
}

// =============================================================================
// END OF SHARED CODE
// =============================================================================

// =============================================================================
// BEGIN OF FONT CODE
// =============================================================================

// --- Global values -----------------------------------------------------------

float gCharPadding  = 2.0;
vec2  gCharPrintPos = vec2(0.0);

// --- Character printing functions --------------------------------------------

float CharRect(vec2 p, vec2 b)
{
	vec2 d = abs(p) - b;
  	return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
}

float CharRect(vec2 p, float minX, float minY, float maxX, float maxY)
{
	vec2 minCoord = vec2(minX, minY);
	vec2 maxCoord = vec2(maxX, maxY);
	vec2 b = 0.5 * (maxCoord - minCoord);
    vec2 c = 0.5 * (maxCoord + minCoord);
    return CharRect(p - c, b);
}

float CharA(vec2 p, inout float d)
{
	p -= gCharPrintPos - vec2(8.0, 0.0);
	gCharPrintPos.x += 10.0 + gCharPadding;
	
    d = min(d, CharRect(p, 3.0, 3.0, 7.0, 12.0));
    d = min(d, CharRect(p, 9.0, 3.0, 13.0, 12.0));
    d = min(d, CharRect(p, 7.0, 7.0, 9.0, 9.0));
    d = min(d, CharRect(p, 4.0, 11.0, 12.0, 13.0));
    
    return d;
}

float CharB(vec2 p, inout float d)
{
	p -= gCharPrintPos - vec2(8.0, 0.0);
	gCharPrintPos.x += 10.0 + gCharPadding;
	
    d = min(d, CharRect(p, 3.0, 3.0, 7.0, 13.0));
    d = min(d, CharRect(p, 3.0, 3.0, 12.0, 5.0));
    d = min(d, CharRect(p, 3.0, 7.0, 12.0, 9.0));
    d = min(d, CharRect(p, 3.0, 11.0, 12.0, 13.0));
    d = min(d, CharRect(p, 9.0, 4.0, 13.0, 7.0));
    d = min(d, CharRect(p, 9.0, 9.0, 13.0, 12.0));
    return d;
}

float CharC(vec2 p, inout float d)
{
	p -= gCharPrintPos - vec2(8.0, 0.0);
	gCharPrintPos.x += 10.0 + gCharPadding;

    d = min(d, CharRect(p, 3.0, 4.0, 7.0, 12.0));
    d = min(d, CharRect(p, 4.0, 3.0, 13.0, 5.0));
    d = min(d, CharRect(p, 4.0, 11.0, 13.0, 13.0));
    return d;
}

float CharD(vec2 p, inout float d)
{
	p -= gCharPrintPos - vec2(8.0, 0.0);
	gCharPrintPos.x += 10.0 + gCharPadding;

    d = min(d, CharRect(p, 3.0, 3.0, 7.0, 13.0));
    d = min(d, CharRect(p, 9.0, 3.0, 12.0, 13.0));
    d = min(d, CharRect(p, 3.0, 3.0, 12.0, 5.0));
    d = min(d, CharRect(p, 3.0, 11.0, 12.0, 13.0));
    d = min(d, CharRect(p, 9.0, 4.0, 13.0, 12.0));
    return d;
}

float CharE(vec2 p, inout float d)
{
	p -= gCharPrintPos - vec2(8.0, 0.0);
	gCharPrintPos.x += 10.0 + gCharPadding;

    d = min(d, CharRect(p, 3.0, 4.0, 7.0, 12.0));
    d = min(d, CharRect(p, 4.0, 3.0, 13.0, 5.0));
    d = min(d, CharRect(p, 4.0, 11.0, 13.0, 13.0));
    d = min(d, CharRect(p, 7.0, 7.0, 10.0, 9.0));
    return d;
}

float CharF(vec2 p, inout float d)
{
	p -= gCharPrintPos - vec2(8.0, 0.0);
	gCharPrintPos.x += 10.0 + gCharPadding;

    d = min(d, CharRect(p, 3.0, 3.0, 7.0, 12.0));
    d = min(d, CharRect(p, 3.0, 7.0, 10.0, 9.0));
    d = min(d, CharRect(p, 4.0, 11.0, 13.0, 13.0));
    return d;
}

float CharG(vec2 p, inout float d)
{
	p -= gCharPrintPos - vec2(8.0, 0.0);
	gCharPrintPos.x += 10.0 + gCharPadding;

    d = min(d, CharRect(p, 3.0, 4.0, 7.0, 12.0));
    d = min(d, CharRect(p, 4.0, 3.0, 13.0, 5.0));
    d = min(d, CharRect(p, 9.0, 3.0, 13.0, 9.0));
    d = min(d, CharRect(p, 8.0, 7.0, 13.0, 9.0));
    d = min(d, CharRect(p, 4.0, 11.0, 13.0, 13.0));
    return d;
}

float CharH(vec2 p, inout float d)
{
	p -= gCharPrintPos - vec2(8.0, 0.0);
	gCharPrintPos.x += 10.0 + gCharPadding;

    d = min(d, CharRect(p, 3.0, 3.0, 7.0, 13.0));
    d = min(d, CharRect(p, 9.0, 3.0, 13.0, 13.0));
    d = min(d, CharRect(p, 3.0, 7.0, 13.0, 9.0));
    return d;
}

float CharI(vec2 p, inout float d)
{
	p -= gCharPrintPos - vec2(11.0, 0.0);
	gCharPrintPos.x += 4.0 + gCharPadding;

    d = min(d, CharRect(p, 6.0, 3.0, 10.0, 13.0));
    return d;
}

float CharJ(vec2 p, inout float d)
{
	p -= gCharPrintPos - vec2(8.0, 0.0);
	gCharPrintPos.x += 10.0 + gCharPadding;

    d = min(d, CharRect(p, 3.0, 3.0, 12.0, 5.0));
    d = min(d, CharRect(p, 9.0, 4.0, 13.0, 13.0));
    return d;
}

float CharK(vec2 p, inout float d)
{
	p -= gCharPrintPos - vec2(8.0, 0.0);
	gCharPrintPos.x += 10.0 + gCharPadding;

    d = min(d, CharRect(p, 3.0, 3.0, 7.0, 13.0));
    d = min(d, CharRect(p, 3.0, 7.0, 12.0, 9.0));
    d = min(d, CharRect(p, 9.0, 3.0, 13.0, 7.0));
    d = min(d, CharRect(p, 9.0, 9.0, 13.0, 13.0));
    return d;
}

float CharL(vec2 p, inout float d)
{
	p -= gCharPrintPos - vec2(8.0, 0.0);
	gCharPrintPos.x += 10.0 + gCharPadding;

    d = min(d, CharRect(p, 3.0, 3.0, 7.0, 13.0));
    d = min(d, CharRect(p, 3.0, 3.0, 13.0, 5.0));
    return d;
}

float CharM(vec2 p, inout float d)
{
	p -= gCharPrintPos - vec2(5.0, 0.0);
	gCharPrintPos.x += 16.0 + gCharPadding;

    d = min(d, CharRect(p, 0.0, 3.0, 4.0, 13.0));
    d = min(d, CharRect(p, 6.0, 3.0, 10.0, 13.0));
    d = min(d, CharRect(p, 12.0, 3.0, 16.0, 12.0));
    d = min(d, CharRect(p, 0.0, 11.0, 15.0, 13.0));
    return d;
}

float CharN(vec2 p, inout float d)
{
	p -= gCharPrintPos - vec2(8.0, 0.0);
	gCharPrintPos.x += 10.0 + gCharPadding;

    d = min(d, CharRect(p, 3.0, 3.0, 7.0, 13.0));
    d = min(d, CharRect(p, 3.0, 11.0, 12.0, 13.0));
    d = min(d, CharRect(p, 9.0, 3.0, 13.0, 12.0));
    return d;
}

float CharO(vec2 p, inout float d)
{
	p -= gCharPrintPos - vec2(8.0, 0.0);
	gCharPrintPos.x += 10.0 + gCharPadding;

    d = min(d, CharRect(p, 3.0, 4.0, 7.0, 12.0));
    d = min(d, CharRect(p, 9.0, 4.0, 13.0, 12.0));
    d = min(d, CharRect(p, 4.0, 3.0, 12.0, 5.0));
    d = min(d, CharRect(p, 4.0, 11.0, 12.0, 13.0));
    return d;
}

float CharP(vec2 p, inout float d)
{
	p -= gCharPrintPos - vec2(8.0, 0.0);
	gCharPrintPos.x += 10.0 + gCharPadding;

    d = min(d, CharRect(p, 3.0, 3.0, 7.0, 13.0));
    d = min(d, CharRect(p, 6.0, 7.0, 12.0, 9.0));
    d = min(d, CharRect(p, 9.0, 8.0, 13.0, 12.0));
    d = min(d, CharRect(p, 6.0, 11.0, 12.0, 13.0));
    return d;
}

float CharQ(vec2 p, inout float d)
{
	p -= gCharPrintPos - vec2(8.0, 0.0);
	gCharPrintPos.x += 10.0 + gCharPadding;

    d = min(d, CharRect(p, 3.0, 4.0, 7.0, 12.0));
    d = min(d, CharRect(p, 9.0, 4.0, 13.0, 12.0));
    d = min(d, CharRect(p, 4.0, 3.0, 12.0, 5.0));
    d = min(d, CharRect(p, 4.0, 11.0, 12.0, 13.0));
    d = min(d, CharRect(p, 8.0, 1.0, 13.0, 3.0));
    return d;
}

float CharR(vec2 p, inout float d)
{
	p -= gCharPrintPos - vec2(8.0, 0.0);
	gCharPrintPos.x += 10.0 + gCharPadding;

    d = min(d, CharRect(p, 3.0, 3.0, 7.0, 13.0));
    d = min(d, CharRect(p, 6.0, 7.0, 12.0, 9.0));
    d = min(d, CharRect(p, 9.0, 8.0, 13.0, 12.0));
    d = min(d, CharRect(p, 6.0, 11.0, 12.0, 13.0));
    d = min(d, CharRect(p, 9.0, 3.0, 13.0, 7.0));
    return d;
}

float CharS(vec2 p, inout float d)
{
	p -= gCharPrintPos - vec2(8.0, 0.0);
	gCharPrintPos.x += 10.0 + gCharPadding;

    d = min(d, CharRect(p, 3.0, 3.0, 12.0, 5.0));
    d = min(d, CharRect(p, 4.0, 7.0, 12.0, 9.0));
    d = min(d, CharRect(p, 4.0, 11.0, 13.0, 13.0));
    d = min(d, CharRect(p, 9.0, 4.0, 13.0, 8.0));
    d = min(d, CharRect(p, 3.0, 8.0, 7.0, 12.0));
    return d;
}

float CharT(vec2 p, inout float d)
{
	p -= gCharPrintPos - vec2(8.0, 0.0);
	gCharPrintPos.x += 10.0 + gCharPadding;

    d = min(d, CharRect(p, 6.0, 3.0, 10.0, 13.0));
    d = min(d, CharRect(p, 3.0, 11.0, 13.0, 13.0));
    return d;
}

float CharU(vec2 p, inout float d)
{
	p -= gCharPrintPos - vec2(8.0, 0.0);
	gCharPrintPos.x += 10.0 + gCharPadding;

    d = min(d, CharRect(p, 3.0, 4.0, 7.0, 13.0));
    d = min(d, CharRect(p, 9.0, 4.0, 13.0, 13.0));
    d = min(d, CharRect(p, 4.0, 3.0, 12.0, 5.0));
    return d;
}

float CharV(vec2 p, inout float d)
{
	p -= gCharPrintPos - vec2(8.0, 0.0);
	gCharPrintPos.x += 10.0 + gCharPadding;

    d = min(d, CharRect(p, 3.0, 3.0, 7.0, 13.0));
    d = min(d, CharRect(p, 9.0, 4.0, 13.0, 13.0));
    d = min(d, CharRect(p, 4.0, 3.0, 12.0, 5.0));
    return d;
}

float CharW(vec2 p, inout float d)
{
	p -= gCharPrintPos - vec2(5.0, 0.0);
	gCharPrintPos.x += 16.0 + gCharPadding;

    d = min(d, CharRect(p, 0.0, 3.0, 4.0, 13.0));
    d = min(d, CharRect(p, 6.0, 3.0, 10.0, 13.0));
    d = min(d, CharRect(p, 12.0, 4.0, 16.0, 13.0));
    d = min(d, CharRect(p, 0.0, 3.0, 15.0, 6.0));
    return d;
}

float CharX(vec2 p, inout float d)
{
	p -= gCharPrintPos - vec2(8.0, 0.0);
	gCharPrintPos.x += 10.0 + gCharPadding;

    d = min(d, CharRect(p, 3.0, 3.0, 7.0, 7.0));
    d = min(d, CharRect(p, 9.0, 3.0, 13.0, 7.0));
    d = min(d, CharRect(p, 3.0, 9.0, 7.0, 13.0));
    d = min(d, CharRect(p, 9.0, 9.0, 13.0, 13.0));
    d = min(d, CharRect(p, 4.0, 7.0, 12.0, 9.0));
    return d;
}

float CharY(vec2 p, inout float d)
{
	p -= gCharPrintPos - vec2(8.0, 0.0);
	gCharPrintPos.x += 10.0 + gCharPadding;

    d = min(d, CharRect(p, 6.0, 3.0, 10.0, 7.0));
    d = min(d, CharRect(p, 3.0, 8.0, 7.0, 13.0));
    d = min(d, CharRect(p, 9.0, 8.0, 13.0, 13.0));
    d = min(d, CharRect(p, 4.0, 7.0, 12.0, 9.0));
    return d;
}

float CharZ(vec2 p, inout float d)
{
	p -= gCharPrintPos - vec2(8.0, 0.0);
	gCharPrintPos.x += 10.0 + gCharPadding;

    d = min(d, CharRect(p, 3.0, 3.0, 13.0, 5.0));
    d = min(d, CharRect(p, 4.0, 7.0, 12.0, 9.0));
    d = min(d, CharRect(p, 3.0, 11.0, 13.0, 13.0));
    d = min(d, CharRect(p, 9.0, 8.0, 13.0, 13.0));
    d = min(d, CharRect(p, 3.0, 4.0, 7.0, 8.0));
    return d;
}

float Char0(vec2 p, inout float d)
{
	p -= gCharPrintPos - vec2(8.0, 0.0);
	gCharPrintPos.x += 10.0 + gCharPadding;

    d = min(d, CharRect(p, 3.0, 4.0, 7.0, 12.0));
    d = min(d, CharRect(p, 9.0, 4.0, 13.0, 12.0));
    d = min(d, CharRect(p, 4.0, 3.0, 12.0, 5.0));
    d = min(d, CharRect(p, 4.0, 11.0, 12.0, 13.0));
    d = min(d, CharRect(p, 7.0, 7.0, 9.0, 9.0));
    return d;
}

float Char1(vec2 p, inout float d)
{
	p -= gCharPrintPos - vec2(10.0, 0.0);
	gCharPrintPos.x += 8.0 + gCharPadding;

    d = min(d, CharRect(p, 7.0, 3.0, 11.0, 12.0));
    d = min(d, CharRect(p, 6.0, 11.0, 10.0, 13.0));
    return d;
}

float Char2(vec2 p, inout float d)
{
    return CharZ(p, d);
}

float Char3(vec2 p, inout float d)
{
	p -= gCharPrintPos - vec2(8.0, 0.0);
	gCharPrintPos.x += 10.0 + gCharPadding;

    d = min(d, CharRect(p, 3.0, 3.0, 12.0, 5.0));
    d = min(d, CharRect(p, 9.0, 4.0, 13.0, 7.0));
    d = min(d, CharRect(p, 6.0, 7.0, 12.0, 9.0));
    d = min(d, CharRect(p, 9.0, 9.0, 13.0, 12.0));
    d = min(d, CharRect(p, 3.0, 11.0, 12.0, 13.0));
    return d;
}

float Char4(vec2 p, inout float d)
{
	p -= gCharPrintPos - vec2(8.0, 0.0);
	gCharPrintPos.x += 10.0 + gCharPadding;

    d = min(d, CharRect(p, 9.0, 3.0, 13.0, 13.0));
    d = min(d, CharRect(p, 4.0, 7.0, 13.0, 9.0));
    d = min(d, CharRect(p, 3.0, 8.0, 7.0, 13.0));
    return d;
}

float Char5(vec2 p, inout float d)
{
	p -= gCharPrintPos - vec2(8.0, 0.0);
	gCharPrintPos.x += 10.0 + gCharPadding;

    d = min(d, CharRect(p, 3.0, 3.0, 12.0, 5.0));
    d = min(d, CharRect(p, 4.0, 7.0, 12.0, 9.0));
    d = min(d, CharRect(p, 3.0, 11.0, 13.0, 13.0));
    d = min(d, CharRect(p, 9.0, 4.0, 13.0, 8.0));
    d = min(d, CharRect(p, 3.0, 8.0, 7.0, 12.0));
    return d;
}

float Char6(vec2 p, inout float d)
{
	p -= gCharPrintPos - vec2(8.0, 0.0);
	gCharPrintPos.x += 10.0 + gCharPadding;

    d = min(d, CharRect(p, 3.0, 4.0, 7.0, 12.0));
    d = min(d, CharRect(p, 4.0, 3.0, 12.0, 5.0));
    d = min(d, CharRect(p, 9.0, 4.0, 13.0, 8.0));
    d = min(d, CharRect(p, 3.0, 7.0, 12.0, 9.0));
    d = min(d, CharRect(p, 4.0, 11.0, 13.0, 13.0));
    return d;
}

float Char7(vec2 p, inout float d)
{
	p -= gCharPrintPos - vec2(8.0, 0.0);
	gCharPrintPos.x += 10.0 + gCharPadding;

    d = min(d, CharRect(p, 9.0, 3.0, 13.0, 12.0));
    d = min(d, CharRect(p, 3.0, 11.0, 12.0, 13.0));
    return d;
}

float Char8(vec2 p, inout float d)
{
	p -= gCharPrintPos - vec2(8.0, 0.0);
	gCharPrintPos.x += 10.0 + gCharPadding;

    d = min(d, CharRect(p, 3.0, 4.0, 7.0, 7.0));
    d = min(d, CharRect(p, 9.0, 4.0, 13.0, 7.0));
    d = min(d, CharRect(p, 3.0, 9.0, 7.0, 12.0));
    d = min(d, CharRect(p, 9.0, 9.0, 13.0, 12.0));
    d = min(d, CharRect(p, 4.0, 7.0, 12.0, 9.0));
    d = min(d, CharRect(p, 4.0, 3.0, 12.0, 5.0));
    d = min(d, CharRect(p, 4.0, 11.0, 12.0, 13.0));
    return d;
}

float Char9(vec2 p, inout float d)
{
    p -= gCharPrintPos - vec2(8.0, 0.0);
	gCharPrintPos.x += 10.0 + gCharPadding;
    
	d = min(d, CharRect(p, 3.0, 3.0, 12.0, 5.0));
    d = min(d, CharRect(p, 9.0, 4.0, 13.0, 12.0));
    d = min(d, CharRect(p, 4.0, 11.0, 12.0, 13.0));
    d = min(d, CharRect(p, 3.0, 8.0, 7.0, 12.0));
    d = min(d, CharRect(p, 4.0, 7.0, 13.0, 9.0));
    return d;
}

void CharSpace()
{
    gCharPrintPos.x += 10.0 + gCharPadding;
}

float CharDigit(vec2 p, float n, inout float d)
{
    n = floor(n);
    
    if (n == 0.0) return Char0(p, d);
    if (n == 1.0) return Char1(p, d);
    if (n == 2.0) return Char2(p, d);
    if (n == 3.0) return Char3(p, d);
    if (n == 4.0) return Char4(p, d);
    if (n == 5.0) return Char5(p, d);
    if (n == 6.0) return Char6(p, d);
    if (n == 7.0) return Char7(p, d);
    if (n == 8.0) return Char8(p, d);
    if (n == 9.0) return Char9(p, d);
    return d;
}

void Print(vec2 p, float n
           , inout float d)
{   
	for (int i = 5; i >= 0; i--)
    {
        float w = pow(10.0, float(i));
        float k = mod(n / w, 10.0);
        
        if (abs(n) > w || i == 0)
            CharDigit(p, k, d);
    }   
}    

// =============================================================================
// END OF FONT CODE
// =============================================================================

// =============================================================================
// START OF UI RENDER CODE
// =============================================================================

void RenderUI(inout vec4 fragColor, vec2 fragCoord, vec2 uv, float aspect)
{
    uv *= 128.0;
       
    // Render CROSSY PENGUIN logo upon the title screen or during the first
    // seconds of the game (with an animation!).
    
    if (gGameState == kStateTitle || (gGameState == kStateInGame && gGameStateTime < 4.0))
    {
        float logoSdf = kOmega;        
        vec2 logoUv = uv * 0.5;
        logoUv.x -= (gGameState == kStateInGame)? 500.0 * gGameStateTime * gGameStateTime : 0.0;
        logoUv.y += uv.x * 0.13;
                
        vec2 subLogoUv = logoUv * 3.0;
        
        gCharPrintPos = vec2(-34.0, 7.0);
        CharC(logoUv, logoSdf);
        CharR(logoUv, logoSdf);
        CharO(logoUv, logoSdf);
        CharS(logoUv, logoSdf);
        CharS(logoUv, logoSdf);
        CharY(logoUv, logoSdf);
        gCharPrintPos = vec2(-38.0, -7.0);
        CharP(logoUv, logoSdf);
        CharE(logoUv, logoSdf);
        CharN(logoUv, logoSdf);
        CharG(logoUv, logoSdf);
        CharU(logoUv, logoSdf);
        CharI(logoUv, logoSdf);
        CharN(logoUv, logoSdf);
        gCharPrintPos = vec2(-132.0, -40.0);
        CharA(subLogoUv, logoSdf);
        CharSpace();
        CharC(subLogoUv, logoSdf);
        CharR(subLogoUv, logoSdf);
        CharO(subLogoUv, logoSdf);
        CharS(subLogoUv, logoSdf);
        CharS(subLogoUv, logoSdf);
        CharY(subLogoUv, logoSdf);
        CharSpace();
        CharR(subLogoUv, logoSdf);
        CharO(subLogoUv, logoSdf);
        CharA(subLogoUv, logoSdf);
        CharD(subLogoUv, logoSdf);
        CharSpace();
        CharT(subLogoUv, logoSdf);
        CharR(subLogoUv, logoSdf);
        CharI(subLogoUv, logoSdf);
        CharB(subLogoUv, logoSdf);
        CharU(subLogoUv, logoSdf);
        CharT(subLogoUv, logoSdf);
        CharE(subLogoUv, logoSdf);
        
        fragColor.rgb = mix(fragColor.rgb, vec3(0.0), step(-3.0, -logoSdf));
        fragColor.rgb = mix(fragColor.rgb, vec3(1.0), step(0.0, -logoSdf));
    }
    
    // Render the score during the InGame state and hide on GameOver.
    
    if (gGameState == kStateInGame || (gGameState == kStateGameOver && gGameStateTime < 4.0))
    {
        float scoreSdf = kOmega;
        vec2 scoreUv = uv;
        
        if (gGameState == kStateInGame) scoreUv.y -= 64.0 - 64.0 * min(1.0, gGameStateTime);
        else                            scoreUv.y -= 64.0 * min(1.0, gGameStateTime);
        
        gCharPrintPos = vec2(-120.0 * aspect, 104.0);
        Print(scoreUv, gScore, scoreSdf);
        
        fragColor.rgb = mix(fragColor.rgb, vec3(0.0), step(-3.0, -scoreSdf));
        fragColor.rgb = mix(fragColor.rgb, vec3(1.0), step(0.0, -scoreSdf));
    }
    
    // Fade to blue upon GameOver and show score.
   
    if (gGameState == kStateGameOver || gGameState == kStateRestarting)
    {
        fragColor.rgb  = mix(fragColor.rgb, vec3(0.2, 0.7, 1.0), min(0.5, gGameStateTime));
        
        float gameOverSdf = kOmega;        
        vec2 gameOverUv = uv * 0.5;
        float gameOverTime = gGameState == kStateRestarting? 1.0 : min(gGameStateTime * 0.7, 1.0);
        
        gameOverUv.y -= 128.0 * abs(cos(2.0 * kPi * gameOverTime * gameOverTime)) * (1.0 - gameOverTime);
                       
        gCharPrintPos = vec2(-45.0, 0.0);
        CharG(gameOverUv, gameOverSdf);
        CharA(gameOverUv, gameOverSdf);
        CharM(gameOverUv, gameOverSdf);
        CharE(gameOverUv, gameOverSdf);
        CharSpace();
        CharO(gameOverUv, gameOverSdf);
        CharV(gameOverUv, gameOverSdf);
        CharE(gameOverUv, gameOverSdf);
        CharR(gameOverUv, gameOverSdf);
        
        fragColor.rgb = mix(fragColor.rgb, vec3(0.0), step(-3.0, -gameOverSdf));
        fragColor.rgb = mix(fragColor.rgb, vec3(1.0), step(0.0, -gameOverSdf));
        
        float messageSdf = kOmega;
        vec2 messageUv = uv * 1.5;
        float messageTime = gGameState == kStateRestarting? 1.0 : clamp(gGameStateTime * 0.7 - 1.0, 0.0, 1.0);
        
        messageUv.x -= 1024.0 * (1.0 - messageTime) * (1.0 - messageTime);
                 
        if (gPlayerDeathCause == kBehavWater)
        {
            gCharPrintPos = vec2(-170.0, -40.0);
            CharS(messageUv, messageSdf);
            CharE(messageUv, messageSdf);
            CharE(messageUv, messageSdf);
            CharM(messageUv, messageSdf);
            CharS(messageUv, messageSdf);
            CharSpace();
            CharL(messageUv, messageSdf);
            CharI(messageUv, messageSdf);
            CharK(messageUv, messageSdf);
            CharE(messageUv, messageSdf);
            CharSpace();
            CharT(messageUv, messageSdf);
            CharH(messageUv, messageSdf);
            CharI(messageUv, messageSdf);
            CharS(messageUv, messageSdf);
            CharSpace();
            CharP(messageUv, messageSdf);
            CharE(messageUv, messageSdf);
            CharN(messageUv, messageSdf);
            CharG(messageUv, messageSdf);
            CharU(messageUv, messageSdf);
            CharI(messageUv, messageSdf);
            CharN(messageUv, messageSdf);
            CharSpace();
            CharC(messageUv, messageSdf);
            CharA(messageUv, messageSdf);
            CharN(messageUv, messageSdf);
            CharT(messageUv, messageSdf);
            CharSpace();
            CharS(messageUv, messageSdf);
            CharW(messageUv, messageSdf);
            CharI(messageUv, messageSdf);
            CharM(messageUv, messageSdf);
        }
        else if (gPlayerDeathCause == kBehavOutOfScreen)
        {
            gCharPrintPos = vec2(-220.0, -40.0);
            CharY(messageUv, messageSdf);
            CharO(messageUv, messageSdf);
            CharU(messageUv, messageSdf);
            CharSpace();
            CharW(messageUv, messageSdf);
            CharE(messageUv, messageSdf);
            CharN(messageUv, messageSdf);
            CharT(messageUv, messageSdf);
            CharSpace();
            CharO(messageUv, messageSdf);
            CharN(messageUv, messageSdf);
            CharSpace();
            CharA(messageUv, messageSdf);
            CharSpace();
            CharJ(messageUv, messageSdf);
            CharO(messageUv, messageSdf);
            CharU(messageUv, messageSdf);
            CharR(messageUv, messageSdf);
            CharN(messageUv, messageSdf);
            CharE(messageUv, messageSdf);
            CharY(messageUv, messageSdf);
            CharSpace();
            CharT(messageUv, messageSdf);
            CharO(messageUv, messageSdf);
            CharSpace();
            CharF(messageUv, messageSdf);
            CharA(messageUv, messageSdf);
            CharR(messageUv, messageSdf);
            CharSpace();
            CharA(messageUv, messageSdf);
            CharW(messageUv, messageSdf);
            CharA(messageUv, messageSdf);
            CharY(messageUv, messageSdf);
            CharSpace();
            CharL(messageUv, messageSdf);
            CharA(messageUv, messageSdf);
            CharN(messageUv, messageSdf);
            CharD(messageUv, messageSdf);
            CharS(messageUv, messageSdf);
        }
        else if (gPlayerDeathCause == kBehavHazard)
        {
            gCharPrintPos = vec2(-170.0, -40.0);
            CharD(messageUv, messageSdf);
            CharI(messageUv, messageSdf);
            CharD(messageUv, messageSdf);
            CharSpace();
            CharA(messageUv, messageSdf);
            CharN(messageUv, messageSdf);
            CharY(messageUv, messageSdf);
            CharO(messageUv, messageSdf);
            CharN(messageUv, messageSdf);
            CharE(messageUv, messageSdf);
            CharSpace();
            CharC(messageUv, messageSdf);
            CharA(messageUv, messageSdf);
            CharT(messageUv, messageSdf);
            CharC(messageUv, messageSdf);
            CharH(messageUv, messageSdf);
            CharSpace();
            CharT(messageUv, messageSdf);
            CharH(messageUv, messageSdf);
            CharE(messageUv, messageSdf);
            CharSpace();
            CharL(messageUv, messageSdf);
            CharI(messageUv, messageSdf);
            CharC(messageUv, messageSdf);
            CharE(messageUv, messageSdf);
            CharN(messageUv, messageSdf);
            CharS(messageUv, messageSdf);
            CharE(messageUv, messageSdf);
            CharSpace();
            CharP(messageUv, messageSdf);
            CharL(messageUv, messageSdf);
            CharA(messageUv, messageSdf);
            CharT(messageUv, messageSdf);
            CharE(messageUv, messageSdf);
        }
        
        fragColor.rgb = mix(fragColor.rgb, vec3(0.0), step(-3.0, -gameOverSdf));
        fragColor.rgb = mix(fragColor.rgb, vec3(1.0), step(0.0, -gameOverSdf));
        fragColor.rgb = mix(fragColor.rgb, vec3(0.0), step(-3.0, -messageSdf));
        fragColor.rgb = mix(fragColor.rgb, vec3(1.0), step(0.0, -messageSdf));
    }   
    
    // Fade to white upon Restarting
    
    if (gGameState == kStateRestarting)
        fragColor.rgb = mix(mix(fragColor.rgb, vec3(0.2, 0.7, 1.0), 0.5), vec3(1.0), min(1.0, gGameStateTime));
    
    // Fade from white at the title.
    
    if (gGameState == kStateTitle)
    	fragColor.rgb = mix(vec3(1.0), fragColor.rgb, min(1.0, gGameStateTime));
    
    // Press space to continue.
    
    if (step(0.5, fract(iTime * 0.75)) > 0.5 && (gGameState == kStateTitle || gGameState == kStateGameOver) && gGameStateTime > 1.0)
    {
        float messageSdf = kOmega;
        vec2 messageUv = uv * 1.75;
                 
        gCharPrintPos = vec2(-130.0, -100.0);
        CharP(messageUv, messageSdf);
        CharR(messageUv, messageSdf);
        CharE(messageUv, messageSdf);
        CharS(messageUv, messageSdf);
        CharS(messageUv, messageSdf);
        CharSpace();
        CharS(messageUv, messageSdf);
        CharP(messageUv, messageSdf);
        CharA(messageUv, messageSdf);
        CharC(messageUv, messageSdf);
        CharE(messageUv, messageSdf);
        CharSpace();
        CharT(messageUv, messageSdf);
        CharO(messageUv, messageSdf);
        CharSpace();
        CharC(messageUv, messageSdf);
        CharO(messageUv, messageSdf);
        CharN(messageUv, messageSdf);
        CharT(messageUv, messageSdf);
        CharI(messageUv, messageSdf);
        CharN(messageUv, messageSdf);
        CharU(messageUv, messageSdf);
        CharE(messageUv, messageSdf);
        
        fragColor.rgb = mix(fragColor.rgb, vec3(0.0), step(-3.0, -messageSdf));
        fragColor.rgb = mix(fragColor.rgb, vec3(1.0, 1.0, 0.0), step(0.0, -messageSdf));
    }
}

// =============================================================================
// END OF UI RENDER CODE
// =============================================================================

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    LoadState();

	// Compute uv coords.
    vec2 uv = fragCoord.xy / iResolution.xy;
    
    // Render lower-res back buffer.
    fragColor = texture(iChannel1, uv * gFbScale);
    
    // Render UI
    float aspect = iResolution.x / iResolution.y;
    uv = 2.0 * uv - 1.0;
    uv.x *= aspect;    

    RenderUI(fragColor, fragCoord, uv, aspect);
    fragColor.a = 1.;
}

`;

export default class implements iSub {
  key(): string {
    return '4dKXDG';
  }
  name(): string {
    return 'Crossy Penguin [MIGJRV] (按键未完成)';
  }
  sort() {
    return 686;
  }
  tags?(): string[] {
    return [];
  }
  webgl() {
    return WEBGL_2;
  }
  main(): HTMLCanvasElement {
    return createCanvas();
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
  channels() {
    return [
      { type: 1, f: buffA, fi: 0 }, //
      { type: 1, f: buffB, fi: 1 }, //
      webglUtils.DEFAULT_NOISE,
      webglUtils.DEFAULT_NOISE,
    ];
  }
}
