import * as THREE from "./node_modules/three/build/three.module.js";
import {OrbitControls} from "./node_modules/three/examples/jsm/controls/OrbitControls.js"
import gsap from "./node_modules/gsap/index.js";

let scene, camera, renderer, skyboxGeo, skybox, controls, myReq;
let zoomOut = false;
let autoRotate = true;
let skyboxImage = 'purplenebula';

function createPathStrings(filename) {
  const basePath = `https://raw.githubusercontent.com/codypearce/some-skyboxes/master/skyboxes/${filename}/`;
  const baseFilename = basePath + filename;
  const fileType = filename == 'purplenebula' ? '.png' : '.jpg';
  const sides = ['ft', 'bk', 'up', 'dn', 'rt', 'lf'];
  const pathStings = sides.map(side => {
    return baseFilename + '_' + side + fileType;
  });

  return pathStings;
}

function createMaterialArray(filename) {
  const skyboxImagepaths = createPathStrings(filename);
  const materialArray = skyboxImagepaths.map(image => {
    let texture = new THREE.TextureLoader().load(image);

    return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
  });
  return materialArray;
}

function init() {

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    45,
    30000,
  );
  camera.position.set(500,250,500);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.id = 'canvas';
  document.body.appendChild(renderer.domElement);

  const materialArray = createMaterialArray(skyboxImage);

  skyboxGeo = new THREE.BoxGeometry(2000, 2000, 2000);
  skybox = new THREE.Mesh(skyboxGeo, materialArray);

  scene.add(skybox);


  controls = new OrbitControls(camera, renderer.domElement);
  controls.enabled = true;
  controls.minDistance = 700;
  controls.maxDistance = 1500;
  // controls.autoRotate = true;
  // controls.autoRotateSpeed = 1.0;

  window.addEventListener('resize', onWindowResize, false);
  animate();
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
     controls.autoRotate = autoRotate;
  
    if(controls.maxDistance == 1500 && zoomOut) {
    
      controls.maxDistance = 20000;
      camera.position.z = 20000;
    } else if(controls.maxDistance == 20000 && !zoomOut) {
          console.log('called')
      controls.maxDistance = 1500;
      camera.position.z = 2000;
    }
    
    controls.update();
    renderer.render(scene, camera);
    myReq = window.requestAnimationFrame(animate);
   
}

init();

function switchSkyBox (skyboxName) {
  scene.remove(skybox);
  skyboxImage = skyboxName;
  const materialArray = createMaterialArray(skyboxImage);

  skybox = new THREE.Mesh(skyboxGeo, materialArray);
  scene.add(skybox);
}

function toggleAutoRotate(value) {
  autoRotate = value;
}

function toggleZoom(value) {
  zoomOut = value;
  zoomBtn.textContent = value ? 'Inside Box' : "Outside Box";
  loading.style.display = value ? 'none' : 'show';
}

// const spaceBtn = document.getElementById('space');
// const mountainsBtn = document.getElementById('mountains');
// const waterBtn = document.getElementById('water');
// const lavaButton = document.getElementById('lava');
// const autoRotateBtn = document.getElementById('autoRotate');
// const zoomBtn = document.getElementById('zoom');
// const loading = document.getElementById('loading');


// spaceBtn.addEventListener('click', () => switchSkyBox('purplenebula'))
// mountainsBtn.addEventListener('click', () => switchSkyBox('afterrain'))
// waterBtn.addEventListener('click', () => switchSkyBox('aqua9'))
// lavaButton.addEventListener('click', () => switchSkyBox('flame'))
// autoRotateBtn.addEventListener('click', () => toggleAutoRotate(!autoRotate))
// zoomBtn.addEventListener('click', () => toggleZoom(!zoomOut))


/* const body = document.querySelector("body");
const about = document.querySelector(".about-me");
const hello = document.querySelector("h1:nth-child(2)");
const hello2 = document.querySelector("body > h1:nth-child(3)");
const button = document.querySelector(".btn-action-first");
const buttons = document.querySelector(".buttons");
const cubeTexture = new THREE.TextureLoader().load("textures/dark-s_px.jpg");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);


const renderer = new THREE.WebGLRenderer({ body, alpha:true });
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ color: 0xffffff, map: cubeTexture });
// const material = new THREE.MeshPhongMaterial({ color: 0xffffff, map: texture });
const cube = new THREE.Mesh(geometry, material);

let alight = new THREE.AmbientLight(0xffffff,6);
 scene.add(alight);
let plight = new THREE.PointLight(0xffffff, 5);
plight.position.set(5, 5, 0);
plight.lookAt(0, 0, 0);
scene.add(plight);

setTimeout(() => {
    hello.classList.toggle("hidden");
    hello2.classList.toggle("hidden");
}, 2000);

scene.add(cube);
setTimeout(() => {
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
    } else {
        gsap.to(cube.position, { y: 0, x: 0, duration: 2 });
    }
});
animate(); */

