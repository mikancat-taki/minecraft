import * as THREE from 'three';

export class World {
    scene: THREE.Scene;

    constructor(scene: THREE.Scene) {
        this.scene = scene;
    }

    generateFlatWorld() {
        const geometry = new THREE.BoxGeometry(1,1,1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

        for(let x= -10; x<10; x++){
            for(let z= -10; z<10; z++){
                const block = new THREE.Mesh(geometry, material);
                block.position.set(x, 0, z);
                this.scene.add(block);
            }
        }
    }
}
