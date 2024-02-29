import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations, OrbitControls } from "@react-three/drei";

import scene from "./assets/mars.glb";


function Moon({ currentAnimation, ...props }) {
  const group = useRef();
  console.log("Moon Use Ref",group);
  const { nodes, materials, animations } = useGLTF(scene);
  const { actions } = useAnimations(animations, group);
  
  useEffect(() => {
    actions['Take 001'].play();
  },[]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="MarsFBX" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Mars" rotation={[-1.833, 0, 0]} scale={0.1}>
                  <OrbitControls/>
                  <mesh
                    name="Mars_01_-_Default_0"
                    castShadow
                    receiveShadow
                    geometry={nodes["Mars_01_-_Default_0"].geometry}
                    material={materials["01_-_Default"]}
                  />
                </group>
                <group
                  name="Phobos"
                  position={[0, 0, 0.013]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[0.0093, 0.0093, 0.0133]}
                >
                  <mesh
                    name="Phobos_02_-_Default_0"
                    castShadow
                    receiveShadow
                    geometry={nodes["Phobos_02_-_Default_0"].geometry}
                    material={materials["02_-_Default"]}
                  />
                </group>
                <group
                  name="Deimos"
                  position={[0, 0, 0.013]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={[0.0093, 0.0093, 0.0133]}
                >
                  <mesh
                    name="Deimos_03_-_Default_0"
                    castShadow
                    receiveShadow
                    geometry={nodes["Deimos_03_-_Default_0"].geometry}
                    material={materials["03_-_Default"]}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/our_moon.glb");

export default Moon;