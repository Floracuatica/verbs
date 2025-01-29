console.log("Three.js cargado correctamente:", THREE);

// 1. Crear la escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 2. Cargar la textura kawaii
const textureLoader = new THREE.TextureLoader();
const kawaiiTexture = textureLoader.load(
    '../img/texture.jpg',
    function(texture) { 
        console.log("✅ Textura cargada correctamente:", texture);
    },
    undefined,
    function(error) {
        console.error("❌ Error al cargar la textura:", error);
    }
);

const material = new THREE.MeshBasicMaterial({ 
    map: kawaiiTexture, 
    side: THREE.DoubleSide // 🔥 Asegura que la textura se vea por todos los lados
});


// 3. Crear cubos con la textura
const cubes = [];
const cubeCount = 100;

for (let i = 0; i < cubeCount; i++) {
    const size = Math.random() * 2 + 1; 
    const geometry = new THREE.BoxGeometry(size, size, size);
    
    // 🔥 Usamos MeshBasicMaterial para asegurarnos de que la textura se vea sin necesidad de luz
    const material = new THREE.MeshBasicMaterial({ map: kawaiiTexture });

    const cube = new THREE.Mesh(geometry, material);

    // Posiciones aleatorias en el espacio
    cube.position.set(
        (Math.random() - 0.5) * 20, 
        (Math.random() - 0.5) * 15, 
        (Math.random() - 0.5) * 20
    );

    scene.add(cube);
    cubes.push(cube);
}

// 4. Posicionar la cámara
camera.position.z = 15;

// 5. Añadir luz (solo si usamos MeshStandardMaterial)
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(5, 5, 5);
scene.add(light);

// 6. Animación
function animate() {
    requestAnimationFrame(animate);

    // Hacer que los cubos roten lentamente
    cubes.forEach(cube => {
        cube.rotation.x += 0.01; 
        cube.rotation.y += 0.01; 
        cube.rotation.z += 0.005;
    });

    renderer.render(scene, camera);
}

animate();

