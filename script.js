import * as THREE from "./node_modules/three/build/three.module.js";

const room = new THREE.Mesh(
  new THREE.BoxGeometry(6, 3, 12),
  new THREE.MeshStandardMaterial({
    roughness: 0.2,
    metalness: 0.8,
    side: THREE.BackSide
  })
);

const cube = new THREE.Mesh(
  new THREE.TorusKnotGeometry(0.5, 0.1, 500, 64),
  new THREE.MeshStandardMaterial({
    roughness: 0.2,
    metalness: 0.7,
    color: 0xffffff,
  })
);

const rail = new THREE.RectAreaLight(0xffffff, 1, 0.01, 1);
rail.position.set(0, -1, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.gammaInput = true;
renderer.gammaOutput = true;

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const scene = new THREE.Scene();
scene.add(room, cube, rail);

document.body.appendChild(renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  rail.position.z -= 0.05;

  if (rail.position.z < -8) {
    rail.position.z = 4;
  }
}

animate();
