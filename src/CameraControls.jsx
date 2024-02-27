import React, {useRef} from 'react'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { Canvas, extend, useFrame, useLoader, useThree } from '@react-three/fiber';
extend({OrbitControls})
function CameraControls() {
  
    const {
        camera,
        gl: {domElement}
      } = useThree();
    
      const controlsRef = useRef();
      useFrame(() => controlsRef.current.update())
    
      return (
        <orbitControls
          ref={controlsRef}
          args={[camera, domElement]}
          autoRotate
          autoRotateSpeed={-0.05}
        />
      );
}

export default CameraControls