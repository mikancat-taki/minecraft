import * as THREE from 'three';

export class Player {
    camera: THREE.Camera;
    velocity: THREE.Vector3 = new THREE.Vector3();
    speed = 0.2;
    onGround = true;

    constructor(camera: THREE.Camera) {
        this.camera = camera;
        this.camera.position.set(0, 5, 0);
        this.initControls();
    }

    initControls() {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'w') this.velocity.z = -this.speed;
            if (e.key === 's') this.velocity.z = this.speed;
            if (e.key === 'a') this.velocity.x = -this.speed;
            if (e.key === 'd') this.velocity.x = this.speed;
            if (e.key === ' ') {
                if (this.onGround) {
                    this.velocity.y = 0.5;
                    this.onGround = false;
                }
            }
        });
        window.addEventListener('keyup', (e) => {
            if (['w','s'].includes(e.key)) this.velocity.z = 0;
            if (['a','d'].includes(e.key)) this.velocity.x = 0;
        });
    }

    update() {
        this.velocity.y -= 0.02;
        this.camera.position.add(this.velocity);
        if (this.camera.position.y <= 5) {
            this.camera.position.y = 5;
            this.velocity.y = 0;
            this.onGround = true;
        }
    }
}
