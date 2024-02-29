import './App.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { Canvas, extend, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Suspense, useCallback, useMemo, useRef } from 'react';
import {Stars} from "@react-three/drei"
import CameraControls from './CameraControls';
import Sound from './Sound';
import Saturn from "./Saturn"
import Mars from "./Mars";
import Moon from "./Moon";
extend({OrbitControls})

function App() {
  

  return (
    <>
      <div className="anim">
      <Canvas
      camera={{ position: [100, 10, 0], fov: 75 }}
    >
      <Suspense fallback={null}>
      <directionalLight position={[1,1,1]} intensity={2}/>  
                    <ambientLight intensity={0.5}/>
                    <pointLight/>
                    <spotLight/>
        <Moon 
          position={[200,0,0]}
        
        />
        <Saturn
          position={[0,0,0]}
        />
        {/* <Earth
          position={[150,0,0]}
        /> */}
        <Mars
          position={[100,0,0]}
        />
        <Stars/>
        <CameraControls/>
        <Sound/>
      </Suspense>
      
    </Canvas>
    </div>

    </>
  )
}

export default App
