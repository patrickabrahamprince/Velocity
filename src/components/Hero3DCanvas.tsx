import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { soundFx } from '../utils/soundEngine';
import { Sparkles, RefreshCw } from 'lucide-react';

export const Hero3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [rpmGlow, setRpmGlow] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060813);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(4.2, 2.2, 4.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    // Group for the entire Go-Kart
    const kartGroup = new THREE.Group();
    scene.add(kartGroup);

    // Materials - Official Velocity Electric Cobalt Blue & Cyan Scheme
    const carbonMaterial = new THREE.MeshStandardMaterial({
      color: 0x0c0f1c,
      roughness: 0.3,
      metalness: 0.8,
    });

    const velocityBlueMaterial = new THREE.MeshStandardMaterial({
      color: 0x0052FF,
      roughness: 0.15,
      metalness: 0.7,
    });

    const electricCyanMaterial = new THREE.MeshStandardMaterial({
      color: 0x00F0FF,
      roughness: 0.2,
      metalness: 0.5,
    });

    const whiteDecalMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.4,
    });

    const tireRubberMaterial = new THREE.MeshStandardMaterial({
      color: 0x121418,
      roughness: 0.9,
      metalness: 0.1,
    });

    const alloyMaterial = new THREE.MeshStandardMaterial({
      color: 0xd8e0f0,
      roughness: 0.2,
      metalness: 0.9,
    });

    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 1.0,
    });

    // 1. Chassis Base
    const frameGeometry = new THREE.BoxGeometry(1.6, 0.12, 3.2);
    const frame = new THREE.Mesh(frameGeometry, carbonMaterial);
    frame.position.y = 0.35;
    frame.castShadow = true;
    kartGroup.add(frame);

    // 2. Front Nose Cone
    const noseGeo = new THREE.CylinderGeometry(0.7, 0.9, 1.2, 16);
    const nose = new THREE.Mesh(noseGeo, velocityBlueMaterial);
    nose.rotation.x = Math.PI / 2;
    nose.position.set(0, 0.38, 1.6);
    nose.scale.set(1.2, 0.7, 0.4);
    nose.castShadow = true;
    kartGroup.add(nose);

    // Front Wing Lip
    const wingGeo = new THREE.BoxGeometry(2.1, 0.08, 0.4);
    const frontWing = new THREE.Mesh(wingGeo, carbonMaterial);
    frontWing.position.set(0, 0.28, 2.0);
    kartGroup.add(frontWing);

    // Nose Center White Stripe
    const stripeGeo = new THREE.BoxGeometry(0.25, 0.02, 1.1);
    const noseStripe = new THREE.Mesh(stripeGeo, whiteDecalMaterial);
    noseStripe.position.set(0, 0.52, 1.6);
    kartGroup.add(noseStripe);

    // 3. Side Pods
    const leftPodGeo = new THREE.BoxGeometry(0.35, 0.35, 1.8);
    const leftPod = new THREE.Mesh(leftPodGeo, velocityBlueMaterial);
    leftPod.position.set(-0.95, 0.42, 0);
    leftPod.castShadow = true;
    kartGroup.add(leftPod);

    const rightPodGeo = new THREE.BoxGeometry(0.35, 0.35, 1.8);
    const rightPod = new THREE.Mesh(rightPodGeo, velocityBlueMaterial);
    rightPod.position.set(0.95, 0.42, 0);
    rightPod.castShadow = true;
    kartGroup.add(rightPod);

    // Side Pod Cyan Laser Strips
    const stripGeo = new THREE.BoxGeometry(0.02, 0.08, 1.5);
    const leftStrip = new THREE.Mesh(stripGeo, electricCyanMaterial);
    leftStrip.position.set(-1.13, 0.45, 0);
    kartGroup.add(leftStrip);

    const rightStrip = new THREE.Mesh(stripGeo, electricCyanMaterial);
    rightStrip.position.set(1.13, 0.45, 0);
    kartGroup.add(rightStrip);

    // 4. Racing Bucket Seat
    const seatBaseGeo = new THREE.BoxGeometry(0.8, 0.15, 0.7);
    const seatBase = new THREE.Mesh(seatBaseGeo, carbonMaterial);
    seatBase.position.set(0, 0.45, -0.2);
    kartGroup.add(seatBase);

    const seatBackGeo = new THREE.BoxGeometry(0.8, 0.8, 0.15);
    const seatBack = new THREE.Mesh(seatBackGeo, carbonMaterial);
    seatBack.position.set(0, 0.8, -0.55);
    seatBack.rotation.x = -0.25;
    kartGroup.add(seatBack);

    // 5. Steering Column & F1 Steering Wheel
    const columnGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.9);
    const column = new THREE.Mesh(columnGeo, alloyMaterial);
    column.rotation.x = -0.7;
    column.position.set(0, 0.7, 0.6);
    kartGroup.add(column);

    const wheelGeo = new THREE.TorusGeometry(0.24, 0.04, 12, 24);
    const wheel = new THREE.Mesh(wheelGeo, carbonMaterial);
    wheel.position.set(0, 1.05, 0.32);
    wheel.rotation.x = -0.7;
    kartGroup.add(wheel);

    // 6. Engine Block & Radiator
    const engineGeo = new THREE.BoxGeometry(0.6, 0.55, 0.55);
    const engine = new THREE.Mesh(engineGeo, alloyMaterial);
    engine.position.set(0.45, 0.6, -0.85);
    engine.castShadow = true;
    kartGroup.add(engine);

    // Chrome Roll Hoop
    const rollHoopGeo = new THREE.TorusGeometry(0.4, 0.04, 12, 24, Math.PI);
    const rollHoop = new THREE.Mesh(rollHoopGeo, chromeMaterial);
    rollHoop.position.set(0, 1.15, -0.65);
    kartGroup.add(rollHoop);

    // 7. Four Wheels (Slick Racing Tires + Alloy Rims)
    const wheels: THREE.Mesh[] = [];
    const wheelData = [
      { x: -1.05, y: 0.35, z: 1.1, radius: 0.32, width: 0.3 },
      { x: 1.05, y: 0.35, z: 1.1, radius: 0.32, width: 0.3 },
      { x: -1.15, y: 0.38, z: -1.1, radius: 0.36, width: 0.45 },
      { x: 1.15, y: 0.38, z: -1.1, radius: 0.36, width: 0.45 },
    ];

    wheelData.forEach((wd) => {
      const tireGeo = new THREE.CylinderGeometry(wd.radius, wd.radius, wd.width, 24);
      const tire = new THREE.Mesh(tireGeo, tireRubberMaterial);
      tire.rotation.z = Math.PI / 2;
      tire.position.set(wd.x, wd.y, wd.z);
      tire.castShadow = true;

      // Rim
      const rimGeo = new THREE.CylinderGeometry(wd.radius * 0.6, wd.radius * 0.6, wd.width + 0.02, 16);
      const rim = new THREE.Mesh(rimGeo, alloyMaterial);
      tire.add(rim);

      // Cyan brake caliper
      const caliperGeo = new THREE.BoxGeometry(0.12, 0.15, 0.15);
      const caliper = new THREE.Mesh(caliperGeo, electricCyanMaterial);
      caliper.position.set(0, wd.radius * 0.4, 0);
      tire.add(caliper);

      kartGroup.add(tire);
      wheels.push(tire);
    });

    // 8. Ground Shadow & Circular Race Platform
    const groundGeo = new THREE.CircleGeometry(3.6, 64);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x080c1a,
      roughness: 0.8,
      metalness: 0.2,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0.02;
    ground.receiveShadow = true;
    scene.add(ground);

    // Neon Track Ring Border on Floor (Electric Blue)
    const ringGeo = new THREE.RingGeometry(3.4, 3.55, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x0052FF,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.03;
    scene.add(ring);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const mainSpot = new THREE.SpotLight(0xffffff, 5.0);
    mainSpot.position.set(5, 8, 5);
    mainSpot.castShadow = true;
    scene.add(mainSpot);

    const blueLight = new THREE.PointLight(0x0052FF, 7.0, 10);
    blueLight.position.set(-3, 1.5, -2);
    scene.add(blueLight);

    const cyanLight = new THREE.PointLight(0x00F0FF, 5.0, 8);
    cyanLight.position.set(2, 0.4, 2);
    scene.add(cyanLight);

    const underglowLight = new THREE.PointLight(0x0052FF, 9.0, 6);
    underglowLight.position.set(0, 0.1, 0);
    kartGroup.add(underglowLight);

    // Mouse Drag Rotation Logic
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = -0.6;
    let targetRotationX = 0.1;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      targetRotationY += deltaX * 0.01;
      targetRotationX += deltaY * 0.005;
      targetRotationX = Math.max(-0.2, Math.min(0.5, targetRotationX));
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (!isDragging) {
        targetRotationY += 0.008;
      }

      kartGroup.rotation.y += (targetRotationY - kartGroup.rotation.y) * 0.08;
      kartGroup.rotation.x += (targetRotationX - kartGroup.rotation.x) * 0.08;
      kartGroup.position.y = Math.sin(elapsedTime * 4) * 0.02;

      wheels.forEach((w) => {
        w.rotation.x += 0.08;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 600;
      const h = container.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      if (container && domEl) {
        container.removeChild(domEl);
      }
      renderer.dispose();
    };
  }, []);

  const handleKartClick = () => {
    setRpmGlow(true);
    soundFx.playRev(1.4);
    setTimeout(() => setRpmGlow(false), 500);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        ref={mountRef}
        onClick={handleKartClick}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      <div className="absolute top-3 right-3 pointer-events-none flex items-center gap-1.5 bg-[#090D1E]/90 backdrop-blur-md border border-[#0052FF]/30 px-2.5 py-1 rounded-full text-[11px] font-mono text-zinc-300">
        <Sparkles className="w-3 h-3 text-[#00F0FF] animate-spin" />
        <span>3D KART</span>
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none flex items-center gap-1.5 bg-[#060813]/85 backdrop-blur-md border border-[#0052FF]/30 px-3 py-1 rounded-full text-[10px] font-mono text-zinc-300 whitespace-nowrap">
        <RefreshCw className="w-3 h-3 text-[#0052FF] animate-pulse" />
        <span>DRAG TO ROTATE • CLICK TO REV</span>
      </div>

      {rpmGlow && (
        <div className="absolute inset-0 pointer-events-none border-2 border-[#0052FF] rounded-3xl animate-ping opacity-30" />
      )}
    </div>
  );
};
