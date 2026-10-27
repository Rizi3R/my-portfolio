import React, { useEffect, useRef } from 'react';

export const CyberBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates in screen space
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140,
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNodes();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Node interface
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
      isAccent: boolean;
    }

    let nodes: Node[] = [];

    const initNodes = () => {
      nodes = [];
      // Moderate node density for high performance
      const count = Math.min(Math.floor((width * height) / 16000), 75);
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 1.5 + 1,
          baseAlpha: Math.random() * 0.35 + 0.15,
          isAccent: Math.random() > 0.85, // 15% cyan/emerald accents
        });
      }
    };

    initNodes();

    let lastTime = performance.now();

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      // Render subtle connections
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];

        // Update position
        n1.x += n1.vx * dt * 60;
        n1.y += n1.vy * dt * 60;

        // Bounce from edges
        if (n1.x < 0) {
          n1.x = 0;
          n1.vx *= -1;
        } else if (n1.x > width) {
          n1.x = width;
          n1.vx *= -1;
        }
        if (n1.y < 0) {
          n1.y = 0;
          n1.vy *= -1;
        } else if (n1.y > height) {
          n1.y = height;
          n1.vy *= -1;
        }

        // Mouse gravitational attraction/deflection
        const dxMouse = mouse.x - n1.x;
        const dyMouse = mouse.y - n1.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < mouse.radius) {
          const force = (1 - distMouse / mouse.radius) * 0.08;
          n1.x -= dxMouse * force;
          n1.y -= dyMouse * force;
        }

        // Draw connections to nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 130;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.14;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            if (n1.isAccent || n2.isAccent) {
              ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 1.5})`;
            } else {
              ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
            }
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(n1.x, n1.y, n1.radius, 0, Math.PI * 2);
        if (n1.isAccent) {
          ctx.fillStyle = `rgba(56, 189, 248, ${n1.baseAlpha * 1.4})`;
          ctx.shadowColor = 'rgba(56, 189, 248, 0.4)';
          ctx.shadowBlur = 6;
        } else {
          ctx.fillStyle = `rgba(148, 163, 184, ${n1.baseAlpha})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60"
      />
      {/* Subtle radial ambient vignettes */}
      <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] bg-sky-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] -right-[15%] w-[45vw] h-[45vw] bg-emerald-600/4 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-[10%] left-[25%] w-[55vw] h-[55vw] bg-indigo-600/4 blur-[140px] rounded-full pointer-events-none" />
    </div>
  );
};
