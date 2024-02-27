import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

import scene from "./assets/our_moon.glb";


function Moon({ currentAnimation, ...props }) {
  const group = useRef();
  console.log("Moon Use Ref",group);
  const { nodes, materials, animations } = useGLTF(scene);
  const { actions } = useAnimations(animations, group);
  
  useEffect(() => {
    Object.values(actions).forEach((action) => action.stop());

    if (actions[currentAnimation]) {
      actions[currentAnimation].play();
    }
  }, [actions, currentAnimation]);

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes.lroc_color_poles_16k_lroc_color_poles_16k_0.geometry
              }
              material={materials.lroc_color_poles_16k}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes.lroc_color_poles_16k_lroc_color_poles_16k_0_1.geometry
              }
              material={materials.lroc_color_poles_16k}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes.lroc_color_poles_16k_lroc_color_poles_16k_0_2.geometry
              }
              material={materials.lroc_color_poles_16k}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes.lroc_color_poles_16k_lroc_color_poles_16k_0_3.geometry
              }
              material={materials.lroc_color_poles_16k}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes.lroc_color_poles_16k_lroc_color_poles_16k_0_4.geometry
              }
              material={materials.lroc_color_poles_16k}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes.lroc_color_poles_16k_lroc_color_poles_16k_0_5.geometry
              }
              material={materials.lroc_color_poles_16k}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes.lroc_color_poles_16k_lroc_color_poles_16k_0_6.geometry
              }
              material={materials.lroc_color_poles_16k}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes.lroc_color_poles_16k_lroc_color_poles_16k_0_7.geometry
              }
              material={materials.lroc_color_poles_16k}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes.lroc_color_poles_16k_lroc_color_poles_16k_0_8.geometry
              }
              material={materials.lroc_color_poles_16k}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes.lroc_color_poles_16k_lroc_color_poles_16k_0_9.geometry
              }
              material={materials.lroc_color_poles_16k}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes.lroc_color_poles_16k_lroc_color_poles_16k_0_10.geometry
              }
              material={materials.lroc_color_poles_16k}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/our_moon.glb");

export default Moon;