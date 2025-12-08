import { useEffect, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface CursorPosition {
  x: number;
  y: number;
}

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const trailX = useSpring(cursorX, { damping: 50, stiffness: 200 });
  const trailY = useSpring(cursorY, { damping: 50, stiffness: 200 });

  const moveCursor = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    if (!isVisible) setIsVisible(true);
  }, [cursorX, cursorY, isVisible]);

  useEffect(() => {
    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", () => setIsClicking(true));
    window.addEventListener("mouseup", () => setIsClicking(false));
    window.addEventListener("mouseleave", () => setIsVisible(false));
    window.addEventListener("mouseenter", () => setIsVisible(true));

    const interactiveElements = document.querySelectorAll(
      'a, button, [data-cursor-hover], input, textarea, [role="button"]'
    );

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", () => setIsClicking(true));
      window.removeEventListener("mouseup", () => setIsClicking(false));
      window.removeEventListener("mouseleave", () => setIsVisible(false));
      window.removeEventListener("mouseenter", () => setIsVisible(true));

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [moveCursor]);

  useEffect(() => {
    const updateInteractiveElements = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [data-cursor-hover], input, textarea, [role="button"]'
      );

      const handleMouseEnter = () => setIsHovering(true);
      const handleMouseLeave = () => setIsHovering(false);

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    const observer = new MutationObserver(updateInteractiveElements);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      >
        <div
          className={`w-4 h-4 rounded-full transition-colors duration-200 ${
            isHovering ? "bg-neon-green" : "bg-neon-pink"
          }`}
          style={{
            boxShadow: isHovering
              ? "0 0 20px #39FF14, 0 0 40px #39FF14"
              : "0 0 20px #FF00FF, 0 0 40px #FF00FF",
          }}
        />
      </motion.div>

      <motion.div
        className="fixed pointer-events-none z-[9998]"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 1.2 : isHovering ? 2 : 1,
          opacity: isVisible ? 0.5 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="w-8 h-8 rounded-full border-2 border-neon-blue"
          style={{
            boxShadow: "0 0 10px #00FFFF",
          }}
        />
      </motion.div>

      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none z-[9997]"
          style={{
            x: useSpring(cursorX, { damping: 60 + i * 10, stiffness: 150 - i * 20 }),
            y: useSpring(cursorY, { damping: 60 + i * 10, stiffness: 150 - i * 20 }),
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            opacity: isVisible ? 0.3 - i * 0.05 : 0,
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: 4 + i * 2,
              height: 4 + i * 2,
              backgroundColor: i % 2 === 0 ? "#FF00FF" : "#00FFFF",
              boxShadow: `0 0 ${5 + i * 2}px ${i % 2 === 0 ? "#FF00FF" : "#00FFFF"}`,
            }}
          />
        </motion.div>
      ))}
    </>
  );
}
