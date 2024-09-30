document.getElementById('button1').addEventListener('click', function() {
    window.location.href = 'home.html';
});

document.getElementById('button2').addEventListener('click', function() {
    window.location.href = 'contact.html';
});

document.getElementById('button3').addEventListener('click', function() {
    window.location.href = 'suggestion.html';
});
// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('cube-container').appendChild(renderer.domElement);

// Function to create a cube with random size and color
function createCube() {
    const size = Math.random() * 0.5 + 0.1; // Random size between 0.1 and 0.6
    const geometry = new THREE.BoxGeometry(size, size, size);
    const color = Math.random() * 0xffffff; // Random color
    const material = new THREE.MeshStandardMaterial({ color: color });
    const cube = new THREE.Mesh(geometry, material);
    
    // Random initial position
    cube.position.x = Math.random() * 10 - 5;
    cube.position.y = Math.random() * 10 - 5;
    cube.position.z = Math.random() * 10 - 5;
    
    scene.add(cube);
    return cube;
}

// Create multiple cubes
const cubes = [];
for (let i = 0; i < 50; i++) {
    cubes.push(createCube());
}

// Add lighting
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

camera.position.z = 5;

// Function to move cubes based on scroll position
function moveCubes(scrollPercent) {
    const sensitivity = 1; // Adjust this value to decrease sensitivity further
    cubes.forEach(cube => {
        cube.position.x = (Math.random() - 0.5) * 10 * scrollPercent * sensitivity;
        cube.position.y = (Math.random() - 0.5) * 10 * scrollPercent * sensitivity;
        cube.position.z = (Math.random() - 0.5) * 10 * scrollPercent * sensitivity;
    });
}

// Listen for scroll events
window.addEventListener('scroll', () => {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    moveCubes(scrollPercent);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate each cube
    cubes.forEach(cube => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    });
    
    renderer.render(scene, camera);
}
animate();
