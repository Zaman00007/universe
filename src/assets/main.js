import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; 
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 225);
camera.position.z = 5;

const viewCam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
viewCam.position.y = 10;

const canvas = document.querySelector('#mainCanvas');
const loadingManager = new THREE.LoadingManager();

const gltfLoader = new GLTFLoader(loadingManager);

const renderer = new THREE.WebGLRenderer({canvas,alpha: true, antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(viewCam, renderer.domElement);
controls.enabled = true;
// controls.enableZoom = true;

let curvY = 1;

const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-10,curvY,0),
  new THREE.Vector3(-5, curvY, 5),
  new THREE.Vector3(0, curvY, 0),
  new THREE.Vector3(5, curvY, -5),
  new THREE.Vector3(10, curvY, 0),
  new THREE.Vector3(5, curvY, 5),
  new THREE.Vector3(0, curvY, 0),
  new THREE.Vector3(-5, curvY, -5),
  new THREE.Vector3(-10,curvY,0),
]);

let FBs = 0.0001;
const followBox = new THREE.Mesh(new THREE.BoxGeometry(FBs,FBs,FBs),new THREE.MeshBasicMaterial({color: 0xffff00}));
scene.add(followBox);

let planeMeshes = [];

let images = [];
let aspectRatios = [];

for(let i = 0; i < 8 ; i++) {
  const plane = new THREE.PlaneGeometry(1,1);
  const planem = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0});
  const planeMesh = new THREE.Mesh(plane,planem);
  planeMesh.name = `mesh_${i}`;
  planeMesh.scale.set(1,1);
  scene.add(planeMesh);
  planeMeshes[i] = planeMesh;
}

for(let i = 0; i < 8 ; i++) {
  images[i] = new Image();
  images[i].src = `/images/${i}.jpeg`;
  images[i].onload = function() {
    let aspectRatio = this.width / this.height;
    aspectRatios[i] = aspectRatio
    planeMeshes[i].scale.set(aspectRatio,1);
  }
}

let percentage = 0.02;

const planeData = [
  { position: [-6.4, curvY, 5], rotation: [0,0.9,0] },
  { position: [-2, curvY, 1.5], rotation: [0,-0.3,0] },
  { position: [3, curvY, -2], rotation: [0,2,0] },
  { position: [7.5, curvY, -5], rotation: [0,2,0] },
  { position: [8, curvY, 2.5], rotation: [0,2.5,0] },
  { position: [4, curvY, 5.9], rotation: [0,2,0] },
  { position: [-2, curvY, -4], rotation: [0,0.6,0] },
  { position: [-7, curvY, -2.5], rotation: [0,2.3,0] },
];

const LightPositions = [[-10, 10], [10, 10], [-10, -10], [10, -10]];

LightPositions.forEach(position => {
  let lit = new THREE.PointLight(0xffffff, 1000);
  lit.position.set(position[0], 10, position[1]);
  scene.add(lit);
});

const standG = new THREE.CircleGeometry(0.2, 32);
standG.rotateX(-Math.PI / 2);
const standR = new THREE.CylinderGeometry(0.05,0.05,0.2);
standR.translate(0,0.1,0);
const standT = new THREE.CircleGeometry(0.35, 32);
standT.rotateX(-Math.PI / 2);
standT.translate(0,0.2,0);
const mergedG = BufferGeometryUtils.mergeGeometries([standG, standR, standT]);
mergedG.translate(0,0.01,0);
const standM = new THREE.MeshStandardMaterial({color: 0x800080, side: THREE.DoubleSide, transparent: true, opacity: 0});
const stand = new THREE.Mesh(mergedG, standM);
stand.translateY(100);
scene.add(stand);

const standArray = [];
for (let i = 0; i < 8; i++) {
  standArray[i] = new THREE.Mesh(mergedG, new THREE.MeshStandardMaterial({color: 0x800080, side: THREE.DoubleSide, transparent: true, opacity: 0}));
  standArray[i].position.set(planeData[i].position[0], 0, planeData[i].position[2]);
  scene.add(standArray[i]);
}

function decreaseOpacity() {
  if(planeMesh.material.opacity > 0.01){
    planeMesh.material.opacity -= 0.01;
    mainText.style.opacity -= 0.01;
    requestAnimationFrame(decreaseOpacity);
  } else {
    planeMesh.material.opacity = 0;
    planeMesh.position.set(0,10000,0);
  }
}

const textColors = ["#fffc31", "#2660a4", "#f6f7eb", "#e94f37", "#44af69"];
const planeMesh = new THREE.Mesh(new THREE.BoxGeometry(100, 0.1, 100), new THREE.MeshBasicMaterial({color: 0xa654cd, side: THREE.DoubleSide, transparent: true, opacity: 1}));
planeMesh.rotation.set(0,-1,1);
planeMesh.position.set(-9,0,0);
scene.add(planeMesh);

const mainText = document.getElementById('mh1');
mainText.style.opacity = 1;
mainText.style.fontSize = "50px";
mainText.innerHTML = `<div style="color: ${textColors[Math.floor(Math.random() * textColors.length)]};">Welcome to the Planet <br> <div style="text-align: center; font-size: 200px; color: ${textColors[Math.floor(Math.random() * textColors.length)]};">Earth</div></div>`;
mainText.style.fontFamily = "'Comfortaa', cursive";

loadingManager.onLoad = function() {
  decreaseOpacity();
}

for(let i = 0; i < planeData.length ; i++) {
  let planePosition = planeData[i].position;
  let planeRotation = planeData[i].rotation;

  planeMeshes[i].position.set(planePosition[0], planePosition[1], planePosition[2]);
  planeMeshes[i].rotation.set(planeRotation[0], planeRotation[1], planeRotation[2]);
}

let drawing = document.createElement('canvas');
drawing.width = 256;
drawing.height = 256;
let context = drawing.getContext('2d');
let grad = context.createLinearGradient(0,0,drawing.width,drawing.height);
const colors = ['#EA7AF4', '#B43E8F', '#6200B3', '#3B0086', '#290628'];
for (let i = 0; i < colors.length; i++) {
  let stop = 0.1 + (i * 0.18);
  grad.addColorStop(stop, colors[i]);
}

context.fillStyle = grad;
context.fillRect(0,0,drawing.width,drawing.height);

let spbg = new THREE.CanvasTexture(drawing);
let matsp = new THREE.MeshBasicMaterial({map: spbg, side: THREE.DoubleSide});

let spbgmsh =  new THREE.Mesh(new THREE.SphereGeometry(200), matsp);
scene.add(spbgmsh);

window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  viewCam.aspect = window.innerWidth / window.innerHeight;
  viewCam.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

const MainTeext2 = [];
MainTeext2.push("Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam");
MainTeext2.push("blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada");
MainTeext2.push("nunc sed blandit libero volutpat sed cras ornare arcu dui");
MainTeext2.push("nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida");
MainTeext2.push("nibh nisl condimentum id venenatis a condimentum vitae sapien pellentesque");
MainTeext2.push("nec nam aliquam sem et tortor consequat id porta nibh");
MainTeext2.push("nec feugiat nisl pretium fusce id velit ut tortor pretium");
MainTeext2.push("tristique et egestas quis ipsum suspendisse ultrices gravida dictum fusce");

const opacityRanges = [
  { min: 0.036, max: 0.101, index: 0 },
  { min: 0.152, max: 0.217, index: 1 },
  { min: 0.221, max: 0.309, index: 2 },
  { min: 0.31, max: 0.4, index: 3 },
  { min: 0.424, max: 0.570, index: 4 },
  { min: 0.568, max: 0.65, index: 5 },
  { min: 0.747, max: 0.834, index: 6 },
  { min: 0.834, max: 0.95, index: 7 },
];
window.addEventListener('wheel', function(event) {
  const delta = 0.0005 * (event.deltaY < 0 ? -1 : 1);
  percentage = (percentage + delta + 1) % 1;


  for (let range of opacityRanges) {
    if (percentage > range.min && percentage < range.max) {
      planeMeshes[range.index].material.opacity = Math.min(planeMeshes[range.index].material.opacity + 0.01, 1);
      standArray[range.index].material.opacity = Math.min(standArray[range.index].material.opacity + 0.05, 1);

    } else {
      planeMeshes[range.index].material.opacity = Math.max(planeMeshes[range.index].material.opacity - 0.01, 0);
      standArray[range.index].material.opacity = Math.max(standArray[range.index].material.opacity - 0.05, 0);
    }
  }

  if (percentage > 0.96 || percentage < 0.035) {
    for (let i = 0; i < 8; i++) {
      planeMeshes[i].material.opacity = 0;
    }
  }
});

function handleScroll(event) {
  const delta = 0.0005 * (event.deltaY < 0 ? -1 : 1);
  percentage = (percentage + delta + 1) % 1;

  for (let range of opacityRanges) {
    if (percentage > range.min && percentage < range.max) {
      planeMeshes[range.index].material.opacity = Math.min(planeMeshes[range.index].material.opacity + 0.01, 1);
      standArray[range.index].material.opacity = Math.min(standArray[range.index].material.opacity + 0.01, 1);

    } else {
      planeMeshes[range.index].material.opacity = Math.max(planeMeshes[range.index].material.opacity - 0.01, 0);
      standArray[range.index].material.opacity = Math.max(standArray[range.index].material.opacity - 0.01, 0);
    }
  }

  if (percentage > 0.96 || percentage < 0.035) {
    for (let i = 0; i < 8; i++) {
      planeMeshes[i].material.opacity = 0;
    }
  }
}

window.addEventListener('wheel', handleScroll);

let lastTouchY = 0;
window.addEventListener('touchstart', function(event) {
  lastTouchY = event.touches[0].clientY;
});

window.addEventListener('touchmove', function(event) {
  const deltaY = lastTouchY - event.touches[0].clientY;
  lastTouchY = event.touches[0].clientY;
  event.deltaY = deltaY;
  handleScroll(event);
});

function increaseText() {
  for (let range of opacityRanges) {
    if (percentage > range.min && percentage < range.max) {
      mainText.textContent = MainTeext2[range.index];
      mainText.style.opacity = Math.min(parseFloat(mainText.style.opacity) + 0.1, 1);
      mainText.style.position = "absolute";
      console.log(range.index);
      range.index % 2 == 0 ? (mainText.style.left = "20%", mainText.style.width = "30vw") : (mainText.style.left = "75%", mainText.style.width = "30vw");
    }
  }
}

function decreaseText() {
  for (let range of opacityRanges) {
    if (percentage > range.min && percentage < range.max) {
      mainText.textContent = MainTeext2[range.index];
      mainText.style.opacity = Math.max(parseFloat(mainText.style.opacity) - 0.1, 0);
    }
  }
}

let testing = camera;
function changCam(){
  testing == camera ? testing = viewCam : testing = camera;
}
window.changCam = changCam;

const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2500;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 25;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.02, 
  sizeAttenuation: true
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

}, false);

spbgmsh.rotation.z = -Math.PI / 2;
spbgmsh.position.y = 110;

const honeycombarray = [];
let model;

gltfLoader.load('/honey_comb.glb', function(gltf) {
  model = gltf.scene;
  model.scale.set(0.5, 0.5, 0.5);

  for (let i = -5; i < 5; i++) {
    for (let j = -5; j < 5; j++) {
      const instance = model.clone();
      
      instance.traverse((o) => {
        if (o.isMesh) {
          o.material = new THREE.MeshBasicMaterial({ color: 0xEB9FEF,side: THREE.DoubleSide, transparent: true, opacity: 0.6 });
        }
      });

      instance.position.x = i * 8.65;
      instance.position.z = j * 6;
      honeycombarray.push(instance);
      scene.add(instance);
    }
  }
});


gltfLoader.load('/clouds.glb', function(gltf) {
  gltf.scene.scale.set(0.5,0.5,0.5);
  gltf.scene.position.set(0,-1,0);
  gltf.scene.rotation.set(Math.PI,0,0);
  
  gltf.scene.traverse(function(node) {
    if (node.isMesh) {
      node.material.opacity = 0.03;
      node.material.transparent = true;
      node.material.color.set(0xffffff);
    }
  });

  scene.add(gltf.scene);
}, undefined, function(error) {
  console.error(error);
});

function magic123() {
  confetti({
    particleCount: 5,
    angle: 90,
    spread: 180,
    origin: { x: 0,},
    colors: ['#ca2e55', '#ffe0b5', '#8a6552', '#462521', '#bdb246'],
    startVelocity: 60,
  });

  confetti({
    particleCount: 5,
    angle: 90,
    spread: 180,
    origin: { x: 1},
    colors: ['#ca2e55', '#ffe0b5', '#8a6552', '#462521', '#bdb246'],
    startVelocity: 60,
  });
}
const loader = new THREE.TextureLoader();
for(let i = 0; i < 8; i++){
  loader.load(`/images/${i}.jpeg`, function(texture) {
    planeMeshes[i].material.map = texture;
  });
}

function animate() {
  requestAnimationFrame(animate);
  spbgmsh.rotation.y += 0.005;

  const point = curve.getPointAt(percentage);
  followBox.position.set(point.x, point.y, point.z);

  raycaster.setFromCamera(mouse, testing);
  const intersects = raycaster.intersectObjects(planeMeshes);
  
  let isHovering = false;

  for (let i = 0; i < intersects.length; i++) {
    if(intersects[i].object.material.opacity > 0.5) {
      magic123();
      increaseText();
      isHovering = true;
    }
  }

  if (!isHovering) {
    decreaseText();
  }

  particlesMesh.rotation.y += 0.0005;

  camera.lookAt(followBox.position.x, followBox.position.y, followBox.position.z);
  const cameraPoint = curve.getPointAt((percentage - 0.01 + 1) % 1);
  camera.position.set(cameraPoint.x, cameraPoint.y, cameraPoint.z); 

  renderer.render(scene, testing);
}

animate();