"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import version from "@/assets/icon/version-switching-icon.png"
export const DraggableDiv = (): JSX.Element => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (event: MouseEvent | TouchEvent) => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      let x, y;

      if ('changedTouches' in event) {
        const touch = event.changedTouches[0];
        x = touch.clientX
        y = touch.clientY
      } else {
        x = event.clientX
        y = event.clientY
      }
      setPosition({ x, y });
    };

    const handleStart = (event: MouseEvent | TouchEvent) => {
      console.log(222)
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('touchmove', handleMove, { passive: false });

      if (event.type === 'mousedown') {
        window.addEventListener('mouseup', handleStop);
      } else if (event.type === 'touchstart') {
        window.addEventListener('touchend', handleStop);
        window.addEventListener('touchcancel', handleStop);
      }
    };

    const handleStop = () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('mouseup', handleStop);
      window.removeEventListener('touchend', handleStop);
      window.removeEventListener('touchcancel', handleStop);
    };

    containerRef.current?.addEventListener('mousedown', handleStart);
    containerRef.current?.addEventListener('touchstart', handleStart);

    return () => {
      containerRef.current?.removeEventListener('mousedown', handleStart);
      containerRef.current?.removeEventListener('touchstart', handleStart);
    };
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute z-10 bg-slate-100 dark:bg-black w-12 rounded-lg top-80 right-4"
      style={{ left: position.x + 'px', top: position.y + 'px' }}
    >
      <Image src={version} alt="版本切换" className="w-12 h-12"/>
    </div>
  );
}