import React, { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Cubes.css';

interface CubesProps {
  gridSize?: number;
  gridCols?: number;
  gridRows?: number;
  cubeSize?: number;
  maxAngle?: number;
  radius?: number;
  easing?: string;
  duration?: { enter: number; leave: number };
  cellGap?: number | { row?: number; col?: number };
  borderStyle?: string;
  faceColor?: string;
  shadow?: boolean | string;
  autoAnimate?: boolean;
  rippleOnClick?: boolean;
  rippleColor?: string;
  rippleSpeed?: number;
}

const Cubes: React.FC<CubesProps> = ({
  gridSize = 10,
  gridCols,
  gridRows,
  cubeSize,
  maxAngle = 45,
  radius = 3,
  easing = 'power3.out',
  duration = { enter: 0.3, leave: 0.6 },
  cellGap,
  borderStyle = '1px solid #fff',
  faceColor = '#120F17',
  shadow = false,
  autoAnimate = true,
  rippleOnClick = true,
  rippleColor = '#fff',
  rippleSpeed = 2
}) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userActiveRef = useRef(false);
  const simPosRef = useRef({ x: 0, y: 0 });
  const simTargetRef = useRef({ x: 0, y: 0 });
  const simRAFRef = useRef<number | null>(null);

  const cols = gridCols ?? gridSize;
  const rows = gridRows ?? gridSize;

  const colGap = typeof cellGap === 'number' ? `${cellGap}px` : cellGap?.col !== undefined ? `${cellGap.col}px` : '1.5%';
  const rowGap = typeof cellGap === 'number' ? `${cellGap}px` : cellGap?.row !== undefined ? `${cellGap.row}px` : '1.5%';

  const enterDur = duration.enter;
  const leaveDur = duration.leave;

  const tiltAt = useCallback(
    (rowCenter: number, colCenter: number) => {
      if (!sceneRef.current) return;
      sceneRef.current.querySelectorAll('.cube').forEach(cube => {
        const el = cube as HTMLElement;
        const r = +(el.dataset.row || 0);
        const c = +(el.dataset.col || 0);
        const dist = Math.hypot(r - rowCenter, c - colCenter);
        if (dist <= radius) {
          const pct = 1 - dist / radius;
          const angle = pct * maxAngle;
          gsap.to(cube, {
            duration: enterDur,
            ease: easing,
            overwrite: true,
            rotateX: -angle,
            rotateY: angle
          });
        } else {
          gsap.to(cube, {
            duration: leaveDur,
            ease: 'power3.out',
            overwrite: true,
            rotateX: 0,
            rotateY: 0
          });
        }
      });
    },
    [radius, maxAngle, enterDur, leaveDur, easing]
  );

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      userActiveRef.current = true;
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

      if (!sceneRef.current) return;
      const rect = sceneRef.current.getBoundingClientRect();
      const cellW = rect.width / cols;
      const cellH = rect.height / rows;
      const colCenter = (e.clientX - rect.left) / cellW;
      const rowCenter = (e.clientY - rect.top) / cellH;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => tiltAt(rowCenter, colCenter));

      idleTimerRef.current = setTimeout(() => {
        userActiveRef.current = false;
      }, 3000);
    },
    [gridSize, tiltAt]
  );

  const resetAll = useCallback(() => {
    if (!sceneRef.current) return;
    sceneRef.current.querySelectorAll('.cube').forEach(cube =>
      gsap.to(cube, {
        duration: leaveDur,
        rotateX: 0,
        rotateY: 0,
        ease: 'power3.out'
      })
    );
  }, [leaveDur]);

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      userActiveRef.current = true;
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

      if (!sceneRef.current) return;
      const rect = sceneRef.current.getBoundingClientRect();
      const cellW = rect.width / cols;
      const cellH = rect.height / rows;

      const touch = e.touches[0];
      const colCenter = (touch.clientX - rect.left) / cellW;
      const rowCenter = (touch.clientY - rect.top) / cellH;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => tiltAt(rowCenter, colCenter));

      idleTimerRef.current = setTimeout(() => {
        userActiveRef.current = false;
      }, 3000);
    },
    [cols, rows, tiltAt]
  );

  const onTouchStart = useCallback(() => {
    userActiveRef.current = true;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!sceneRef.current) return;
    resetAll();
  }, [resetAll]);

  const onClick = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!rippleOnClick || !sceneRef.current) return;
      const rect = sceneRef.current.getBoundingClientRect();
      const cellW = rect.width / cols;
      const cellH = rect.height / rows;

      let clientX = 0, clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const colHit = Math.floor((clientX - rect.left) / cellW);
      const rowHit = Math.floor((clientY - rect.top) / cellH);

      const baseRingDelay = 0.15;
      const baseAnimDur = 0.3;
      const baseHold = 0.6;

      const spreadDelay = baseRingDelay / rippleSpeed;
      const animDuration = baseAnimDur / rippleSpeed;
      const holdTime = baseHold / rippleSpeed;

      const rings: Record<number, HTMLElement[]> = {};
      sceneRef.current.querySelectorAll('.cube').forEach(cube => {
        const el = cube as HTMLElement;
        const r = +(el.dataset.row || 0);
        const c = +(el.dataset.col || 0);
        const dist = Math.hypot(r - rowHit, c - colHit);
        const ring = Math.round(dist);
        if (!rings[ring]) rings[ring] = [];
        rings[ring].push(el);
      });

      Object.keys(rings)
        .map(Number)
        .sort((a, b) => a - b)
        .forEach(ring => {
          const delay = ring * spreadDelay;
          const faces = rings[ring].flatMap(cube => Array.from(cube.querySelectorAll('.cube-face')));

          gsap.to(faces, {
            backgroundColor: rippleColor,
            duration: animDuration,
            delay,
            ease: 'power3.out'
          });
          gsap.to(faces, {
            backgroundColor: faceColor,
            duration: animDuration,
            delay: delay + animDuration + holdTime,
            ease: 'power3.out'
          });
        });
    },
    [rippleOnClick, cols, rows, faceColor, rippleColor, rippleSpeed]
  );

  useEffect(() => {
    if (!autoAnimate || !sceneRef.current) return;
    simPosRef.current = {
      x: Math.random() * cols,
      y: Math.random() * rows
    };
    simTargetRef.current = {
      x: Math.random() * cols,
      y: Math.random() * rows
    };
    const speed = 0.06;
    const loop = () => {
      if (!userActiveRef.current) {
        const pos = simPosRef.current;
        const tgt = simTargetRef.current;
        pos.x += (tgt.x - pos.x) * speed;
        pos.y += (tgt.y - pos.y) * speed;
        tiltAt(pos.y, pos.x);
        if (Math.hypot(pos.x - tgt.x, pos.y - tgt.y) < 0.1) {
          simTargetRef.current = {
            x: Math.random() * cols,
            y: Math.random() * rows
          };
        }
      }
      simRAFRef.current = requestAnimationFrame(loop);
    };
    simRAFRef.current = requestAnimationFrame(loop);
    return () => {
      if (simRAFRef.current != null) {
        cancelAnimationFrame(simRAFRef.current);
      }
    };
  }, [autoAnimate, cols, rows, tiltAt]);

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;

    el.addEventListener('pointermove', onPointerMove as any);
    el.addEventListener('pointerleave', resetAll);
    el.addEventListener('click', onClick as any);

    el.addEventListener('touchmove', onTouchMove as any, { passive: false });
    el.addEventListener('touchstart', onTouchStart as any, { passive: true });
    el.addEventListener('touchend', onTouchEnd as any, { passive: true });

    return () => {
      el.removeEventListener('pointermove', onPointerMove as any);
      el.removeEventListener('pointerleave', resetAll);
      el.removeEventListener('click', onClick as any);

      el.removeEventListener('touchmove', onTouchMove as any);
      el.removeEventListener('touchstart', onTouchStart as any);
      el.removeEventListener('touchend', onTouchEnd as any);

      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [onPointerMove, resetAll, onClick, onTouchMove, onTouchStart, onTouchEnd]);

  const colsArr = Array.from({ length: cols });
  const rowsArr = Array.from({ length: rows });
  const sceneStyle = {
    gridTemplateColumns: cubeSize ? `repeat(${cols}, ${cubeSize}px)` : `repeat(${cols}, 1fr)`,
    gridTemplateRows: cubeSize ? `repeat(${rows}, ${cubeSize}px)` : `repeat(${rows}, 1fr)`,
    columnGap: colGap,
    rowGap: rowGap
  };
  const wrapperStyle = {
    '--cube-face-border': borderStyle,
    '--cube-face-bg': faceColor,
    '--cube-face-shadow': shadow === true ? '0 0 6px rgba(0,0,0,.5)' : shadow || 'none',
    aspectRatio: `${cols} / ${rows}`,
    ...(cubeSize
      ? {
          width: `${cols * cubeSize}px`,
          height: `${rows * cubeSize}px`
        }
      : {})
  } as React.CSSProperties;

  return (
    <div className="default-animation" style={wrapperStyle}>
      <div ref={sceneRef} className="default-animation--scene" style={sceneStyle}>
        {rowsArr.map((_, r) =>
          colsArr.map((__, c) => (
            <div key={`${r}-${c}`} className="cube" data-row={r} data-col={c}>
              <div className="cube-face cube-face--top" />
              <div className="cube-face cube-face--bottom" />
              <div className="cube-face cube-face--left" />
              <div className="cube-face cube-face--right" />
              <div className="cube-face cube-face--front" />
              <div className="cube-face cube-face--back" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cubes;
