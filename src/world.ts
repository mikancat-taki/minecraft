import * as THREE from 'three';
import { createBlock } from './block';
import SimplexNoise from 'simplex-noise';

const CHUNK_SIZE = 16;
const VIEW_DISTANCE = 3;

export class World {
    scene: THREE.Scene;
    chunks: Map<string, THREE.Group> = new Map();
    noise: SimplexNoise;

    constructor(scene: THREE.Scene) {
        this.scene = scene;
        this.noise = new SimplexNoise(Math.random.toString());
    }

    getChunkKey(x: number, z: number) { return `${x},${z}`; }

    generateChunk(chunkX: number, chunkZ: number) {
        const group = new THREE.Group();
        for (let x=0; x<CHUNK_SIZE; x++) {
            for (let z=0; z<CHUNK_SIZE; z++) {
                const worldX = chunkX*CHUNK_SIZE + x;
                const worldZ = chunkZ*CHUNK_SIZE + z;
                const height = Math.floor((this.noise.noise2D(worldX/50, worldZ/50)+1)/2*5);
                for (let y=0; y<=height; y++) {
                    let type='dirt';
                    if (y===height) type='grass';
                    if (y<0) type='water';
                    const block = createBlock(type,new THREE.Vector3(worldX,y,worldZ));
                    group.add(block);
                }
            }
        }
        this.scene.add(group);
        this.chunks.set(this.getChunkKey(chunkX,chunkZ),group);
    }

    removeChunk(chunkX:number,chunkZ:number){
        const key = this.getChunkKey(chunkX,chunkZ);
        const group = this.chunks.get(key);
        if(group){
            this.scene.remove(group);
            group.clear();
            this.chunks.delete(key);
        }
    }

    update(playerPos:THREE.Vector3){
        const currentChunkX = Math.floor(playerPos.x/CHUNK_SIZE);
        const currentChunkZ = Math.floor(playerPos.z/CHUNK_SIZE);
        const neededChunks = new Set<string>();

        for(let x=currentChunkX-VIEW_DISTANCE;x<=currentChunkX+VIEW_DISTANCE;x++){
            for(let z=currentChunkZ-VIEW_DISTANCE;z<=currentChunkZ+VIEW_DISTANCE;z++){
                const key=this.getChunkKey(x,z);
                neededChunks.add(key);
                if(!this.chunks.has(key)) this.generateChunk(x,z);
            }
        }

        for(let key of Array.from(this.chunks.keys())){
            if(!neededChunks.has(key)){
                const [x,z]=key.split(',').map(Number);
                this.removeChunk(x,z);
            }
        }
    }

    addBlock(pos:THREE.Vector3,type:string){
        const block=createBlock(type,pos);
        this.scene.add(block);
    }
}
