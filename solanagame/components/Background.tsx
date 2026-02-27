'use client';

import { useEffect, useRef } from 'react';

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Setăm dimensiunea la tot ecranul
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // --- CONFIGURAȚIE BULINE (AGAR.IO STYLE) ---
    const DOT_COUNT = 40; 
    // Am scos albastrul din culorile bulinelor ca să nu se piardă pe fundal
    const COLORS = ['#FF5733', '#33FF57', '#FF33A8', '#F4D03F', '#9B59B6', '#FFFFFF'];
    
    class Dot {
      x: number;
      y: number;
      radius: number;
      dx: number;
      dy: number;
      color: string;

      constructor() {
        this.radius = Math.random() * 15 + 5; 
        this.x = Math.random() * (canvas!.width - this.radius * 2) + this.radius;
        this.y = Math.random() * (canvas!.height - this.radius * 2) + this.radius;
        this.dx = (Math.random() - 0.5) * 1.0; // Viteza puțin mai mică pentru eleganță
        this.dy = (Math.random() - 0.5) * 1.0; 
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // Adăugăm puțină strălucire bulinelor
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.shadowBlur = 0; // Resetăm shadow
        ctx.closePath();
      }

      update(dots: Dot[]) {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x + this.radius > canvas!.width || this.x - this.radius < 0) this.dx = -this.dx;
        if (this.y + this.radius > canvas!.height || this.y - this.radius < 0) this.dy = -this.dy;

        for (let otherDot of dots) {
            if (this === otherDot) continue;
            const dist = Math.hypot(this.x - otherDot.x, this.y - otherDot.y);
            if (dist - this.radius - otherDot.radius < 0) {
                if (this.radius > otherDot.radius) {
                    this.radius += 0.5;
                    otherDot.radius = Math.random() * 10 + 5;
                    otherDot.x = Math.random() * canvas!.width;
                    otherDot.y = Math.random() * canvas!.height;
                }
            }
        }
        this.draw();
      }
    }

    let dotsArray: Dot[] = [];
    function init() {
        dotsArray = [];
        for (let i = 0; i < DOT_COUNT; i++) {
            dotsArray.push(new Dot());
        }
    }

    function animate() {
        animationFrameId = requestAnimationFrame(animate);
        if (!ctx || !canvas) return;
        
        // --- AICI E MODIFICAREA CULORII DE FUNDAL ---
        ctx.fillStyle = '#00074E'; // Albastru închis profund
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        dotsArray.forEach(dot => dot.update(dotsArray));
    }

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />;
}