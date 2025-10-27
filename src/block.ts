import * as THREE from 'three';

export function createBlock(type: string, position: THREE.Vector3): THREE.Mesh {
    let color = 0x00ff00;
    if (type === 'dirt') color = 0x964B00;
    if (type === 'stone') color = 0x888888;
    if (type === 'water') color = 0x3366ff;
    if (type === 'sand') color = 0xffff66;

    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshLambertMaterial({ color, transparent: type==='water', opacity: type==='water'?0.7:1 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.copy(position);
    return cube;
}
