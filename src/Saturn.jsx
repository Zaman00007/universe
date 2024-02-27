import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

import scene from "./assets/saturn.glb";


function Saturn({ currentAnimation, ...props }) {
  const group = useRef();
  console.log("Saturn",group);
  const { nodes, materials, animations } = useGLTF(scene);
  const { actions } = useAnimations(animations, group);
  console.log(actions)
  
  useEffect(() => {
    actions['Take 001'].play();
  },[]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.01}>
          <group name="SaturnFBX" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="Saturn"
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={9.5}
                >
                  <mesh
                    name="Saturn_01_-_Default_0"
                    castShadow
                    receiveShadow
                    geometry={nodes["Saturn_01_-_Default_0"].geometry}
                    material={materials["01_-_Default"]}
                  />
                  <mesh
                    name="Saturn_07_-_Default_0"
                    castShadow
                    receiveShadow
                    geometry={nodes["Saturn_07_-_Default_0"].geometry}
                    material={materials["07_-_Default"]}
                  />
                </group>
                <group
                  name="Iapetus"
                  position={[0, -797.83, 0]}
                  rotation={[-1.343, -0.13, 2.633]}
                  scale={2.721}
                >
                  <mesh
                    name="Iapetus_09_-_Default_0"
                    castShadow
                    receiveShadow
                    geometry={nodes["Iapetus_09_-_Default_0"].geometry}
                    material={materials["09_-_Default"]}
                  />
                </group>
                <group
                  name="Titan"
                  position={[0, 1121.761, 0]}
                  rotation={[-1.45, -0.13, -0.608]}
                  scale={3.616}
                >
                  <mesh
                    name="Titan_03_-_Default_0"
                    castShadow
                    receiveShadow
                    geometry={nodes["Titan_03_-_Default_0"].geometry}
                    material={materials["03_-_Default"]}
                  />
                </group>
                <group
                  name="Enceladus"
                  position={[0, -770.222, 0]}
                  rotation={[-1.36, 0.269, -2.117]}
                  scale={1.577}
                >
                  <mesh
                    name="Enceladus_08_-_Default_0"
                    castShadow
                    receiveShadow
                    geometry={nodes["Enceladus_08_-_Default_0"].geometry}
                    material={materials["08_-_Default"]}
                  />
                </group>
                <group
                  name="Mimas"
                  position={[-13.644, 412.272, 70.943]}
                  rotation={[-1.758, -0.184, 0.768]}
                  scale={4.797}
                >
                  <mesh
                    name="Mimas_04_-_Default_0"
                    castShadow
                    receiveShadow
                    geometry={nodes["Mimas_04_-_Default_0"].geometry}
                    material={materials["04_-_Default"]}
                  />
                </group>
                <group
                  name="Rhea"
                  position={[5.38, -1614.317, 56.946]}
                  rotation={[-1.833, 0, 0]}
                  scale={2.132}
                >
                  <mesh
                    name="Rhea_13_-_Default_0"
                    castShadow
                    receiveShadow
                    geometry={nodes["Rhea_13_-_Default_0"].geometry}
                    material={materials["13_-_Default"]}
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

useGLTF.preload("/Saturn.glb");

export default Saturn;