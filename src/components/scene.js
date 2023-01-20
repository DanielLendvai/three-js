import React, { useRef, useEffect } from "react";
import * as THREE from "three";

// const Scene = () => {
//     const mountRef = useRef(null);
//     useEffect(() => {
//         // Initialize the ThreeJS scene
//         const scene = new THREE.Scene();
//         const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//         const renderer = new THREE.WebGLRenderer();
//         renderer.setSize(window.innerWidth, window.innerHeight);
//         mountRef.current.appendChild(renderer.domElement);
//         // Set the background color to black
//         scene.background = new THREE.Color(0x000000);
//         // Add lights to the scene
//         const ambientLight = new THREE.AmbientLight(0x223388, 0.5);
//         scene.add(ambientLight);
//         const pointLight = new THREE.PointLight(0xffffff, 1, 100);
//         pointLight.position.set(5, 5, 5);
//         scene.add(pointLight);
//         // Position the camera
//         camera.position.z = 5;
//         // Render the scene
//         const render = () => {
//             requestAnimationFrame(render);
//             renderer.render(scene, camera);
//         };
//         render();
//         // Cleanup function

//     }, [])

const Scene = () => {
    const mountRef = useRef(null);
    useEffect(() => {
        // Initialize the ThreeJS scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        const loader = new THREE.TextureLoader();
        const hdrTexture = loader.load("./puresky.hdr");

        const rgbeLoader = new THREE.Loader();

        rgbeLoader.load(hdrTexture, (hdrCubeMap) => {
            const hdrMaterial = new THREE.ShaderMaterial({
                uniforms: THREE.ShaderLib.equirect.uniforms,
                vertexShader: THREE.ShaderLib.equirect.vertexShader,
                fragmentShader: THREE.ShaderLib.equirect.fragmentShader,
                side: THREE.BackSide,
            });
            hdrMaterial.uniforms.tEquirect.value = hdrCubeMap;
            const sphere = new THREE.Mesh(
                new THREE.SphereGeometry(5, 32, 32),
                hdrMaterial
            );
            scene.add(sphere);
            scene.background = hdrCubeMap;
        });
        const pointLight = new THREE.PointLight(0xCC0000, 1, 100);
        pointLight.position.set(50, 50, 50);
        scene.add(pointLight);
        console.log(pointLight)
        // // Create the cube
        // const geometry = new THREE.BoxGeometry(1, 1, 1);
        // const material = new THREE.MeshBasicMaterial({ color: 0x324511 });
        // const cube = new THREE.Mesh(geometry, material);

        camera.position.z = 5;
        camera.position.y = 1;
        camera.lookAt(0, 0, 0);
        // Add event listener to the canvas
        // mountRef.current.addEventListener("click", onClick, false);
        // Render the scene
        const render = () => {
            // cube.rotateX(0.02);
            requestAnimationFrame(render);
            renderer.render(scene, camera);
        };
        render();
        //         // function onClick(event) {
        //         //     event.preventDefault();
        //         //     // create a Ray with origin at the mouse position
        //         //     //   and direction into the scene (camera direction)
        //         //     const mouse = new THREE.Vector2();
        //         //     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        //         //     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        //         //     const raycaster = new THREE.Raycaster();
        //         //     raycaster.setFromCamera(mouse, camera);
        //         //     // calculate objects intersecting the picking ray
        //         //     const intersects = raycaster.intersectObjects([cube]);
        //         //     if (intersects.length > 0) {
        //         //         alert("Cube clicked!");
        //         //     }
        //         // }

        //         // Cleanup function
        //         return () => {
        //             mountRef.current.removeChild(renderer.domElement);
        //             // mountRef.current.removeEventListener("click", onClick, false);
        //         };
    }, []);

    return <div style={{ width: "100%", height: "100%" }} ref={mountRef} />;
};

export default Scene;
