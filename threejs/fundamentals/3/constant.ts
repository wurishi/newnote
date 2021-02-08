import * as THREE from 'three';

export interface Demo {
  main(scene: THREE.Scene): void;
  getAPI(): any;
  update(params: any): void;
}
