import * as THREE from 'three';
import { createBlock } from './block';

export class World {
    scene: THREE.Scene;

    constructor(scene: THREE.Scene) {
        this.scene = scene;
    }

    generateFlatWorld() {
        for(let x= -10; x<10; x++){
            for(let z= -10; z<10; z++){
                const block = createBlock('grass', new THREE.Vector3(x,0,z));
                this.scene.add(block);
            }
        }
    }

    addBlock(pos: THREE.Vector3, type: string) {
        const block = createBlock(type, pos);
        this.scene.add(block);
    }
}
