import * as THREE from "./node_modules/three/build/three.module.js";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";
import gsap from "./node_modules/gsap/index.js";

const body = document.querySelector("body");
const about = document.querySelector(".about-me");
const hello = document.querySelector("h1:nth-child(2)");
const hello2 = document.querySelector("body > h1:nth-child(3)");
const button = document.querySelector(".btn-action-first");
const buttons = document.querySelector(".buttons");
const cubeTexture = new THREE.TextureLoader().load("textures/neon.jpg");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({ body, alpha: true });
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    map: cubeTexture,
});
// const material = new THREE.MeshPhongMaterial({ color: 0xffffff, map: texture });
const cube = new THREE.Mesh(geometry, material);

let alight = new THREE.AmbientLight(0xffffff, 1);
scene.add(alight);
let plight = new THREE.PointLight(0xffffff, 4);
let plight2 = new THREE.PointLight(0xffffff, 4);
plight.position.set(0, 5, 0);
plight2.position.set(5, -5, 5);
plight2.lookAt(0, 0, 0);
plight.lookAt(0, 0, 0);
scene.add(plight);
scene.add(plight2);

setTimeout(() => {
    hello.classList.toggle("hidden");
    hello2.classList.toggle("hidden");
}, 2000);
scene.add(cube);
cube.position.y = 10;
setTimeout(() => {
    gsap.to(cube.position, { x: 0, y: 0, z: 0, duration: 2 });
    gsap.to(cube.rotation, {
        y: 5,
        z: 5,
        x: 5,
        duration: 2,
    });
    buttons.classList.toggle("hidden");
    hello2.classList.toggle("hidden");
}, 4000);

camera.position.z = 10;
camera.position.x = 0;
let speed = 0.01;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    cube.rotateY(Math.sin(speed));
    cube.rotateX(Math.sin(speed));
    if (cube.position.x != 0) {
        button.innerHTML = "Vissza";
    } else {
        button.innerHTML = "Tovább";
    }
}

button.addEventListener("click", () => {
    // gsap.to(cube.position, {x: 10, duration: 5});
    // button.classList.toggle("float-left-top");
    about.classList.toggle("visible");

    if (cube.position.x === 0) {
        gsap.to(cube.position, { y: 5, x: -13, duration: 3 });
        gsap.to(cube.rotation, {
          y: 5,
          z: 5,
          x: 5,
          duration: 2,
      });
    } else {
        gsap.to(cube.position, { y: 0, x: 0, duration: 2 });
    }
});

animate();
window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
