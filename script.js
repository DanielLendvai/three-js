import * as THREE from "./node_modules/three/build/three.module.js";
import { RGBELoader } from "./node_modules/three/examples/jsm/loaders/RGBELoader.js";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";
import gsap from "./node_modules/gsap/index.js";

const moveBtn = document.querySelector("#move-button");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.6;
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.SphereGeometry(1.5, 30, 30);
const material = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load("textures/earthmap1k.jpg"),
    bumpMap: new THREE.TextureLoader().load("textures/earthbump.jpg"),
    bumpScale: 0.3,
});
const globe = new THREE.Mesh(geometry, material);

const ambientlight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientlight);

// set point light

const pointerlight = new THREE.PointLight(0xffffff, 0.5);

// set light position

pointerlight.position.set(5, 3, 5);
scene.add(pointerlight);

const stargeometry = new THREE.SphereGeometry(20, 20, 20);

const starmaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("textures/galaxy.png"),
    side: THREE.BackSide,
});

const starmesh = new THREE.Mesh(stargeometry, starmaterial);

scene.add(starmesh);
camera.position.z = 10;
camera.lookAt(0,0,0);
let speed = 0.01;

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    starmesh.rotateY(0.005)
    globe.rotateY(Math.sin(speed));
    globe.rotateX(Math.sin(speed));
}

var tl = gsap.timeline();
  document.querySelector("#move-button").onclick = () => {
      tl.to(camera.position, {z: 20, duration: 2});
      
    }

animate();
window.addEventListener("resize", onWindowResize, false);
scene.add(globe);

/* new RGBELoader().load("textures/sky4k.hdr", function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
});
 */
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
