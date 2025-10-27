import * as THREE from 'three';

export class Player {
    camera: THREE.Camera;
    velocity = new THREE.Vector3();
    direction = new THREE.Vector3();
    speed = 0.1;

    constructor(camera: THREE.Camera) {
        this.camera = camera;
        this.camera.position.set(0, 2, 5);
        this.initControls();
    }

    initControls() {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'w') this.velocity.z = -this.speed;
            if (e.key === 's') this.velocity.z = this.speed;
            if (e.key === 'a') this.velocity.x = -this.speed;
            if (e.key === 'd') this.velocity.x = this.speed;
        });

        window.addEventListener('keyup', (e) => {
            if (['w','s'].includes(e.key)) this.velocity.z = 0;
            if (['a','d'].includes(e.key)) this.velocity.x = 0;
        });
    }

    update() {
        this.camera.position.add(this.velocity);
    }
}
