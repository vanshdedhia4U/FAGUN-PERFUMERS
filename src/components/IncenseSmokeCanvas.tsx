import React, { useEffect, useRef } from 'react';

interface SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  rotation: number;
  rotSpeed: number;
  curlSeed: number;
}

export const IncenseSmokeCanvas: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles: SmokeParticle[] = [];
    const maxParticles = 65;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Just render a static soft mist gradient
      ctx.fillStyle = 'rgba(176, 141, 87, 0.05)';
      ctx.fillRect(0, 0, width, height);
      return () => window.removeEventListener('resize', handleResize);
    }

    // Incense tip position (roughly at bottom center-right of burner)
    const getTipPos = () => ({
      x: width * 0.48,
      y: height * 0.76
    });

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      const tip = getTipPos();

      // Emit new particles from the burning ember
      if (particles.length < maxParticles && Math.random() < 0.6) {
        particles.push({
          x: tip.x + (Math.random() - 0.5) * 4,
          y: tip.y,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -1.2 - Math.random() * 0.8,
          size: 6 + Math.random() * 6,
          alpha: 0.45,
          life: 0,
          maxLife: 140 + Math.random() * 60,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.02,
          curlSeed: Math.random() * 100
        });
      }

      // Update and draw smoke particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;

        // Curl noise / sine wave movement
        const wave = Math.sin(time * 2 + p.curlSeed) * 0.35;
        p.vx += wave * 0.03;

        // Interactive mouse breeze reaction
        if (mouseRef.current.active) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120 && dist > 0) {
            const force = (120 - dist) / 120;
            p.vx += (dx / dist) * force * 0.8;
            p.vy += (dy / dist) * force * 0.4;
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        p.size += 0.28;
        p.rotation += p.rotSpeed;

        // Fade in quickly, then gently fade out as smoke dissipates into the room
        const lifeRatio = p.life / p.maxLife;
        let currentAlpha = 0;
        if (lifeRatio < 0.15) {
          currentAlpha = (lifeRatio / 0.15) * p.alpha;
        } else {
          currentAlpha = (1 - lifeRatio) * p.alpha;
        }

        if (p.life >= p.maxLife || p.y < 20 || currentAlpha <= 0.01) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        // Soft radial gradient for organic smoke puff
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
        // Antique gold/warm ivory tinged smoke
        grad.addColorStop(0, `rgba(235, 226, 212, ${currentAlpha * 0.8})`);
        grad.addColorStop(0.4, `rgba(215, 204, 186, ${currentAlpha * 0.4})`);
        grad.addColorStop(1, 'rgba(215, 204, 186, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw the glowing incense ember at the stick tip
      const emberPulse = 0.75 + Math.sin(time * 5) * 0.25;
      const emberGrad = ctx.createRadialGradient(tip.x, tip.y, 1, tip.x, tip.y, 8);
      emberGrad.addColorStop(0, 'rgba(255, 240, 200, 1)');
      emberGrad.addColorStop(0.2, `rgba(255, 120, 40, ${emberPulse})`);
      emberGrad.addColorStop(0.6, `rgba(180, 50, 20, ${emberPulse * 0.5})`);
      emberGrad.addColorStop(1, 'rgba(180, 50, 20, 0)');

      ctx.fillStyle = emberGrad;
      ctx.beginPath();
      ctx.arc(tip.x, tip.y, 8, 0, Math.PI * 2);
      ctx.fill();

      // Tiny micro-sparkles from the ember occasionally
      if (Math.random() < 0.1) {
        ctx.fillStyle = 'rgba(255, 220, 140, 0.9)';
        ctx.fillRect(
          tip.x + (Math.random() - 0.5) * 6,
          tip.y - Math.random() * 8,
          1.5,
          1.5
        );
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-auto absolute inset-0 z-10 ${className}`}
      aria-hidden="true"
    />
  );
};
