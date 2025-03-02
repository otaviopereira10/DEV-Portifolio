import * as THREE from "three";
import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Physics, RigidBody, BallCollider, useSphericalJoint } from "@react-three/rapier";

function ElasticCard() {
  const cardRef = useRef<RigidRBody | null>(null);
  const fixedRef = useRef<RigidBody | null>(null);

  useEffect(() => {
    if (fixedRef.current && cardRef.current) {
      useSphericalJoint(fixedRef.current, cardRef.current, [[0, 0, 0], [0, -2, 0]]);
    }
  }, []);

  return (
    <group>
      {/* Objeto fixo no topo */}
      <RigidBody ref={fixedRef} type="fixed">
        <BallCollider args={[0.1]} />
      </RigidBody>

      {/* Cartão suspenso */}
      <RigidBody ref={cardRef} type="dynamic" colliders="cuboid">
        <mesh>
          <boxGeometry args={[2, 3, 0.1]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </RigidBody>
    </group>
  );
}

const Card3D = () => {
  return (
    <div className="w-full h-[500px]">
      <Canvas camera={{ position: [0, 0, 10], fov: 30 }} shadows>
        <ambientLight intensity={1} />
        <Physics gravity={[0, -30, 0]}>
          <ElasticCard />
        </Physics>
        <Environment background preset="sunset" />
      </Canvas>
    </div>
  );
};

export default Card3D;
