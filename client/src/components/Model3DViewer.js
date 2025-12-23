import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage } from '@react-three/drei';

// Component con để load model
function Model({ path }) {
  // useGLTF sẽ tự động tải file từ đường dẫn được import
  const { scene } = useGLTF(path);
  return <primitive object={scene} scale={0.5} />; // Điều chỉnh scale nếu model quá to/nhỏ
}

const Model3DViewer = ({ modelSource }) => {
  return (
    <div style={{ width: '100%', height: '400px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
      <Canvas dpr={[1, 2]} camera={{ fov: 45 }}>
        <color attach="background" args={['#f0f0f0']} />
        <Suspense fallback={null}>
          {/* Stage giúp tự động căn chỉnh ánh sáng và vị trí model cho đẹp */}
          <Stage environment="city" intensity={0.6}>
            <Model path={modelSource} />
          </Stage>
        </Suspense>
        <OrbitControls autoRotate={false} />
      </Canvas>
    </div>
  );
};

export default Model3DViewer;