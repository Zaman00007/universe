import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

import scene from "./assets/earth.glb";

function Saturn({ currentAnimation, ...props }) {
  const group = useRef();
  console.log("Earth",group);
  const { nodes, materials, animations } = useGLTF(scene);
  const { actions } = useAnimations(animations, group);
  console.log(actions)
  
  useEffect(() => {
    actions['Take 001'].play();
  },[]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.014}
        >
          <group name="EarthFBX" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Earth" rotation={[-1.833, 0, 0]}>
                  <mesh
                    name="Earth_01_-_Default_0"
                    castShadow
                    receiveShadow
                    // geometry={nodes["Earth_01_-_Default_0"].geometry}
                    material={materials["01_-_Default"]}
                  />
                </group>
                <group
                  name="Moon"
                  rotation={[-1.617, -0.258, 1.39]}
                  scale={0.27}
                >
                  <mesh
                    name="Moon_02_-_Default_0"
                    castShadow
                    receiveShadow
                    // geometry={nodes["Moon_02_-_Default_0"].geometry}
                    material={materials["02_-_Default"]}
                  />
                </group>
                <group
                  name="Clouds"
                  rotation={[-1.833, 0, 0]}
                  scale={[1.01, 1.029, 1.029]}
                >
                  <mesh
                    name="Clouds_03_-_Default_0"
                    castShadow
                    receiveShadow
                    // geometry={nodes["Clouds_03_-_Default_0"].geometry}
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

useGLTF.preload("/earth.glb");

export default Saturn;