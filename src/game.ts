import * as THREE from 'three';
import { Player } from './player';
import { World } from './world';

export class Game {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    player: Player;
    world: World;
    raycaster: THREE.Raycaster;
    mouse: THREE.Vector2;
    selectedBlock: string='grass';

    constructor(){
        this.scene=new THREE.Scene();
        this.scene.background=new THREE.Color(0x87ceeb);
        this.camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
        this.renderer=new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth,window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        const light=new THREE.DirectionalLight(0xffffff,1);
        light.position.set(10,20,10);
        this.scene.add(light);
        this.scene.add(new THREE.AmbientLight(0xaaaaaa));

        this.player=new Player(this.camera);
        this.world=new World(this.scene);
        this.raycaster=new THREE.Raycaster();
        this.mouse=new THREE.Vector2();

        window.addEventListener('resize',()=>this.onResize());
        window.addEventListener('mousedown',(e)=>this.onMouseClick(e));
        window.addEventListener('keydown',(e)=>this.onKeyDown(e));
    }

    onResize(){
        this.camera.aspect=window.innerWidth/window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth,window.innerHeight);
    }

    onKeyDown(e:KeyboardEvent){
        const types=['grass','dirt','stone','water','sand'];
        if(['1','2','3','4','5'].includes(e.key)){
            this.selectedBlock=types[parseInt(e.key)-1];
            document.getElementById('blockType')!.innerText=`Selected: ${this.selectedBlock}`;
        }
    }

    onMouseClick(e:MouseEvent){
        this.mouse.x=(e.clientX/window.innerWidth)*2-1;
        this.mouse.y=-(e.clientY/window.innerHeight)*2+1;
        this.raycaster.setFromCamera(this.mouse,this.camera);
        const intersects=this.raycaster.intersectObjects(this.scene.children);
        if(intersects.length>0){
            const intersect=intersects[0];
            if(e.button===0) this.scene.remove(intersect.object);
            else if(e.button===2){
                const pos=intersect.point.clone().add(intersect.face!.normal);
                pos.x=Math.floor(pos.x+0.5);
                pos.y=Math.floor(pos.y+0.5);
                pos.z=Math.floor(pos.z+0.5);
                this.world.addBlock(pos,this.selectedBlock);
            }
        }
    }

    start(){
        this.animate();
    }

    animate=()=>{
        requestAnimationFrame(this.animate);
        this.player.update();
        this.world.update(this.player.camera.position);
        document.getElementById('coords')!.innerText=
            `X:${Math.floor(this.player.camera.position.x)} Y:${Math.floor(this.player.camera.position.y)} Z:${Math.floor(this.player.camera.position.z)}`;
        this.renderer.render(this.scene,this.camera);
    }
}
