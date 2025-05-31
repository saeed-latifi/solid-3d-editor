import { onMount, createEffect } from "solid-js";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { selectedModel } from "../states/model";

let currentModel: THREE.Group | null = null; // Track loaded model

const ThreeScene = () => {
    let container!: HTMLDivElement;
    let renderer!: THREE.WebGLRenderer;
    let scene!: THREE.Scene;
    let camera!: THREE.PerspectiveCamera;
    let controls!: OrbitControls;

    onMount(() => {
        initThree();
        loadModel(); // Initial load
        animate();

        window.addEventListener("resize", onWindowResize, false);
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
        controls.enablePan = true;
        controls.enableZoom = true;
        controls.enableRotate = true;

        // Light
        const light = new THREE.HemisphereLight(0xffffff, 0x444444);
        light.position.set(0, 20, 0);
        scene.add(light);
    };

    const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const loadModel = () => {
        const loader = new GLTFLoader();

        loader.load(
            selectedModel(),
            (gltf) => {
                // Remove previous model
                if (currentModel) {
                    scene.remove(currentModel);
                    currentModel.traverse((child) => {
                        if (child instanceof THREE.Mesh) {
                            child.geometry.dispose();
                            if (child.material instanceof THREE.Material) {
                                child.material.dispose();
                            } else if (Array.isArray(child.material)) {
                                child.material.forEach((mat) => mat.dispose());
                            }
                        }
                    });
                }

                currentModel = gltf.scene;
                scene.add(currentModel);
                console.log("Model loaded:", selectedModel());
            },
            undefined,
            (error) => {
                console.error("Error loading model:", error);
            }
        );
    };

    // 🔥 React to model change
    createEffect(() => {
        loadModel();
    });

    const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    };

    return <div ref={container} style={{ width: "100vw", height: "100vh" }} />;
};

export default ThreeScene;