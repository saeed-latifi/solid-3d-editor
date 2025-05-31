import { onMount } from "solid-js";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const ThreeScene = () => {
  let container!: HTMLDivElement;
  let renderer: THREE.WebGLRenderer;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let controls: OrbitControls;

  onMount(() => {
    initThree();
    loadModel();
    animate();
  });

  const initThree = () => {
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);

    // Camera
    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(15, 15, 15);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = true; // Enable panning
    controls.enableZoom = true; // Optional: zoom
    controls.enableRotate = true; // Optional: rotate

    // Light
    const light = new THREE.HemisphereLight(0xffffff, 0x444444);
    light.position.set(0, 20, 0);
    scene.add(light);

    // Handle resize
    window.addEventListener("resize", onWindowResize, false);
  };

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  const loadModel = () => {
    const loader = new GLTFLoader();
    loader.load(
      "https://saeed-latifi.github.io/assets-3d/base.glb",
      (gltf) => {
        scene.add(gltf.scene);
        console.log("Model loaded");
      },
      undefined,
      (error) => {
        console.error("Error loading model:", error);
      }
    );
  };

  const animate = () => {
    requestAnimationFrame(animate);
    controls.update(); // only required if controls.enableDamping = true
    renderer.render(scene, camera);
  };

  return <div ref={container} style={{ width: "100vw", height: "100vh" }} />;
};

export default ThreeScene;
