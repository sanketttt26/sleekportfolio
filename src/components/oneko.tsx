"use client";

import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
// Imported (not served from /public) so the URL is content-hashed: a cached old sheet
// can never be paired with a newer frame map.
import sheet from "./oneko-gojo.png";

// Port of oneko.js (MIT, see public/oneko-LICENSE.txt). oneko-gojo.png is the original oneko.gif
// with Gojo's shades, blush and tongue drawn on: 8x4 frames, entries are [column, row] offsets.
const sprites: Record<string, [number, number][]> = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
  scratchWallN: [[0, 0], [0, -1]],
  scratchWallS: [[-7, -1], [-6, -2]],
  scratchWallE: [[-2, -2], [-2, -3]],
  scratchWallW: [[-4, 0], [-4, -1]],
  tired: [[-3, -2]],
  sleeping: [[-2, 0], [-2, -1]],
  N: [[-1, -2], [-1, -3]],
  NE: [[0, -2], [0, -3]],
  E: [[-3, 0], [-3, -1]],
  SE: [[-5, -1], [-5, -2]],
  S: [[-6, -3], [-7, -2]],
  SW: [[-5, -3], [-6, -1]],
  W: [[-4, -2], [-4, -3]],
  NW: [[-1, 0], [-1, -1]],
};

const lines = [
  "Infinity. You can't touch me.",
  "Don't worry, I'm the strongest.",
  "Nah, I'd win.",
  "Throughout heaven and earth, I alone am the honored one.",
];

const SIZE = 32; // px per frame, oneko's native size
const HALF = SIZE / 2;
const SPEED = 10;

type Bubble = { text: string; below: boolean; align: "left" | "center" | "right" };

export function Oneko() {
  const ref = useRef<HTMLDivElement>(null);
  const poked = useRef(0);
  const said = useRef(0);
  const bubbleTimer = useRef<number>(undefined);
  const [bubble, setBubble] = useState<Bubble | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = window.innerWidth - SIZE;
    let y = window.innerHeight - SIZE;
    let mouseX = x;
    let mouseY = y;
    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation: string | null = null;
    let idleFrame = 0;
    let last = 0;
    let raf = 0;

    const setSprite = (name: string, frame: number) => {
      const [col, row] = sprites[name][frame % sprites[name].length];
      el.style.backgroundPosition = `${col * SIZE}px ${row * SIZE}px`;
    };
    const place = () => {
      // whole pixels, so the sprite doesn't shimmer between subpixel positions
      el.style.left = `${Math.round(x - HALF)}px`;
      el.style.top = `${Math.round(y - HALF)}px`;
    };

    const idle = () => {
      idleTime += 1;
      if (idleTime > 10 && Math.floor(Math.random() * 200) === 0 && idleAnimation === null) {
        const options = ["sleeping", "scratchSelf"];
        if (x < SIZE) options.push("scratchWallW");
        if (y < SIZE) options.push("scratchWallN");
        if (x > window.innerWidth - SIZE) options.push("scratchWallE");
        if (y > window.innerHeight - SIZE) options.push("scratchWallS");
        idleAnimation = options[Math.floor(Math.random() * options.length)];
      }
      switch (idleAnimation) {
        case "sleeping":
          if (idleFrame < 8) {
            setSprite("tired", 0);
            break;
          }
          setSprite("sleeping", Math.floor(idleFrame / 4));
          if (idleFrame > 192) idleAnimation = null;
          break;
        case null:
          setSprite("idle", 0);
          return;
        default:
          setSprite(idleAnimation, idleFrame);
          if (idleFrame > 9) idleAnimation = null;
      }
      idleFrame = idleAnimation === null ? 0 : idleFrame + 1;
    };

    const frame = () => {
      frameCount += 1;
      if (poked.current > 0) {
        poked.current -= 1;
        idleAnimation = null;
        idleFrame = 0;
        setSprite("alert", 0);
        return;
      }
      const diffX = x - mouseX;
      const diffY = y - mouseY;
      const distance = Math.hypot(diffX, diffY);
      if (distance < 48) {
        idle();
        return;
      }
      idleAnimation = null;
      idleFrame = 0;
      if (idleTime > 1) {
        setSprite("alert", 0);
        idleTime = Math.min(idleTime, 7) - 1;
        return;
      }
      let direction = diffY / distance > 0.5 ? "N" : "";
      direction += diffY / distance < -0.5 ? "S" : "";
      direction += diffX / distance > 0.5 ? "W" : "";
      direction += diffX / distance < -0.5 ? "E" : "";
      setSprite(direction, frameCount);
      x = Math.min(Math.max(HALF, x - (diffX / distance) * SPEED), window.innerWidth - HALF);
      y = Math.min(Math.max(HALF, y - (diffY / distance) * SPEED), window.innerHeight - HALF);
      place();
    };

    const loop = (time: number) => {
      if (time - last > 100) {
        last = time;
        frame();
      }
      raf = requestAnimationFrame(loop);
    };
    // Pointer events cover mouse, pen and touch; a tap also counts as a target.
    const follow = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    place();
    setSprite("idle", 0);
    el.style.display = "block";
    document.addEventListener("pointermove", follow);
    document.addEventListener("pointerdown", follow);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", follow);
      document.removeEventListener("pointerdown", follow);
    };
  }, []);

  function poke() {
    const rect = ref.current!.getBoundingClientRect();
    poked.current = 10;

    const text = lines[said.current++ % lines.length];

    setBubble({
      text,
      below: rect.top < 80,
      align:
        rect.left < 110 ? "left" : rect.right > window.innerWidth - 110 ? "right" : "center",
    });
    window.clearTimeout(bubbleTimer.current);
    bubbleTimer.current = window.setTimeout(() => setBubble(null), 2500);
  }

  return (
    <div
      ref={ref}
      aria-hidden
      onClick={poke}
      className="fixed z-[2147483647] hidden cursor-pointer select-none bg-no-repeat [image-rendering:pixelated]"
      style={{
        width: SIZE,
        height: SIZE,
        backgroundImage: `url(${sheet.src})`,
        backgroundSize: `${SIZE * 8}px ${SIZE * 4}px`,
      }}
    >
      {bubble ? (
        <>
          <span className="pointer-events-none absolute -inset-2 animate-ping rounded-full border-2 border-sky-400/70" />
          <span
            className={clsx(
              "pointer-events-none absolute w-max max-w-[200px] rounded-lg border border-border bg-card px-2.5 py-1.5 text-[12px] leading-snug text-foreground shadow-md",
              bubble.below ? "top-full mt-2" : "bottom-full mb-2",
              {
                left: "left-0",
                center: "left-1/2 -translate-x-1/2",
                right: "right-0",
              }[bubble.align],
            )}
          >
            {bubble.text}
          </span>
        </>
      ) : null}
    </div>
  );
}
