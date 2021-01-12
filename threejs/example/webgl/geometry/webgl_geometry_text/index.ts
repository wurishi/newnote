import {
  DirectionalLight,
  FontLoader,
  Group,
  MeshPhongMaterial,
  PointLight,
  Vector3,
} from 'three';
import { Main } from '../../../main';

const permalink = document.createElement('a');
permalink.id = 'permalink';
permalink.href = '#';
document.body.appendChild(permalink);

function decimalToHex(d: number) {
  let hex = Number(d).toString(16);
  hex = '000000'.substr(0, 6 - hex.length) + hex;
  return hex.toUpperCase();
}

function boolToNum(b: boolean): number {
  return b ? 1 : 0;
}

const fontMap: any = {
  helvetiker: 0,
  optimer: 1,
  gentilis: 2,
  'droid/droid_sans': 3,
  'droid/droid_serif': 4,
};

const weightMap: any = {
  regular: 0,
  bold: 1,
};

class Demo extends Main {
  pointLight: PointLight;
  hex = '';
  cameraTarget: Vector3;

  reverseFontMap: string[];
  reverseWeightMap: string[];

  fontName = '';
  fontWeight = '';
  bevelEnabled = true;
  text = '';

  materials: MeshPhongMaterial[];
  group: Group;

  //
  initHemiLight() {}
  initDirLight() {
    const dirLight = new DirectionalLight(0xffffff, 0.125);
    dirLight.position.set(0, 0, 1).normalize();
    this.scene.add(dirLight);

    const pointLight = new PointLight(0xfffff, 1.5);
    pointLight.position.set(0, 100, 90);
    this.scene.add(pointLight);
    this.pointLight = pointLight;
  }
  initCamera() {
    super.initCamera(30, 1, 1500, new Vector3(0, 400, 700));
    this.cameraTarget = new Vector3(0, 150, 0);
  }
  initScene() {
    super.initScene(0x000000, 250, 1400);
  }
  initPlane() {
    this.reverseFontMap = [];
    this.reverseWeightMap = [];

    for (const key in fontMap) {
      this.reverseFontMap[fontMap[key]] = key;
    }
    for (const key in weightMap) {
      this.reverseWeightMap[weightMap[key]] = key;
    }
    //

    const hash = document.location.hash.substr(1);

    if (hash.length !== 0) {
      const colorhash = hash.substring(0, 6);
      const fonthash = hash.substring(6, 7);
      const weighthash = hash.substring(7, 8);
      const bevelhash = hash.substring(8, 9);
      const texthash = hash.substring(10);

      this.hex = colorhash;
      this.pointLight.color.setHex(parseInt(colorhash, 16));

      this.fontName = this.reverseFontMap[parseInt(fonthash)];
      this.fontWeight = this.reverseWeightMap[parseInt(weighthash)];

      this.bevelEnabled = parseInt(bevelhash) == 1 ? true : false;
      this.text = decodeURI(texthash);

      this.updatePermalink();
    } else {
      this.pointLight.color.setHSL(Math.random(), 1, 0.5);
      this.hex = decimalToHex(this.pointLight.color.getHex());
    }

    this.materials = [
      new MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
      new MeshPhongMaterial({ color: 0xffffff }), // side
    ];

    this.group = new Group();
    this.group.position.y = 100;
    this.scene.add(this.group);

    this.loadFont();
  }

  loadFont() {
    const loader = new FontLoader();
  }

  updatePermalink() {
    // const link =
    //   this.hex +
    //   fontMap[this.fontName] +
    //   weightMap[this.fontWeight] +
    //   boolToNum(this.bevelEnabled);
    // permalink.href = '#' + link;
    // window.location.href = permalink.href;
  }
}

new Demo();
