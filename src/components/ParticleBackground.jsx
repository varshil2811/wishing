import React, { useEffect, useRef } from 'react';

const ParticleBackground = ({ config }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let hearts = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = Math.random() * 1 + 0.2;
        this.opacity = Math.random() * 0.5 + 0.2;
      }
      update() {
        this.y -= this.speedY;
        if (this.y < -10) {
          this.y = canvas.height + 10;
          this.x = Math.random() * canvas.width;
        }
      }
      draw() {
        ctx.fillStyle = `rgba(253, 251, 247, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class FloatingHeart {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 15 + 10;
        this.speedY = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 1;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      }
      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        if (this.y < -50) {
          this.y = canvas.height + 50;
          this.x = Math.random() * canvas.width;
        }
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = `rgba(209, 106, 130, ${this.opacity})`;
        
        // Draw heart
        ctx.beginPath();
        const topCurveHeight = this.size * 0.3;
        ctx.moveTo(0, topCurveHeight);
        ctx.bezierCurveTo(0, 0, -this.size / 2, 0, -this.size / 2, topCurveHeight);
        ctx.bezierCurveTo(-this.size / 2, this.size / 2, 0, this.size * 0.7, 0, this.size);
        ctx.bezierCurveTo(0, this.size * 0.7, this.size / 2, this.size / 2, this.size / 2, topCurveHeight);
        ctx.bezierCurveTo(this.size / 2, 0, 0, 0, 0, topCurveHeight);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }

    if (config?.particles) {
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
      }
    }

    if (config?.floatingHearts) {
      for (let i = 0; i < 15; i++) {
        hearts.push(new FloatingHeart());
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      hearts.forEach(h => {
        h.update();
        h.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [config]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default ParticleBackground;
