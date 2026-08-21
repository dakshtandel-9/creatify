"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Source crop: the animation renders on a 1920x1080 canvas with the mark
// and wordmark occupying a region on the left, plus a drop shadow and a
// corner sparkle further down/right that we deliberately crop away.
const CROP = { sx: 238, sy: 242, sw: 1480, sh: 567 };
const RENDER_WIDTH = 592;
const RENDER_HEIGHT = Math.round((CROP.sh / CROP.sw) * RENDER_WIDTH);

// The source video has no alpha channel — it sits on a light paper-grain
// off-white, not pure white. We key that background out per-frame so the
// loop composites cleanly onto the header instead of showing a gray box.
const BG = { r: 240, g: 240, b: 240 };
const INNER_RADIUS = 14;
const OUTER_RADIUS = 60;

// Playback cycle: build up, hold on the full mark, unbuild in reverse,
// hold on blank — then repeat. Native <video> only plays forward, so the
// reverse leg is driven by scrubbing currentTime frame-by-frame.
//
// The source clip doesn't hold on the built logo through to its own end —
// it fades itself back to blank in the last ~0.5s to loop natively. We cap
// forward playback at PEAK_TIME (comfortably inside the fully-built plateau,
// before that self-fade starts) and treat that as "fully built" for the
// hold/reverse steps below, instead of running to the clip's true end.
const PEAK_TIME = 3;
const HOLD_FULL_MS = 2500;
const HOLD_BLANK_MS = 3000;
const REVERSE_FPS = 24;

type LogoLoopProps = {
  className?: string;
};

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

function seekTo(video: HTMLVideoElement, time: number) {
  return new Promise<void>((resolve) => {
    const onSeeked = () => {
      video.removeEventListener("seeked", onSeeked);
      resolve();
    };
    video.addEventListener("seeked", onSeeked);
    video.currentTime = time;
  });
}

function waitUntilTime(video: HTMLVideoElement, targetTime: number) {
  return new Promise<void>((resolve) => {
    const check = () => {
      if (video.ended || video.currentTime >= targetTime) {
        resolve();
      } else {
        requestAnimationFrame(check);
      }
    };
    check();
  });
}

export function LogoLoop({ className }: LogoLoopProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let cancelled = false;
    let drawHandle = 0;

    const drawFrame = () => {
      ctx.drawImage(video, CROP.sx, CROP.sy, CROP.sw, CROP.sh, 0, 0, RENDER_WIDTH, RENDER_HEIGHT);
      const frame = ctx.getImageData(0, 0, RENDER_WIDTH, RENDER_HEIGHT);
      const data = frame.data;
      for (let i = 0; i < data.length; i += 4) {
        const dr = data[i] - BG.r;
        const dg = data[i + 1] - BG.g;
        const db = data[i + 2] - BG.b;
        const dist = Math.sqrt(dr * dr + dg * dg + db * db);
        const alpha = Math.max(0, Math.min(1, (dist - INNER_RADIUS) / (OUTER_RADIUS - INNER_RADIUS)));
        data[i + 3] = Math.round(alpha * 255);
      }
      ctx.putImageData(frame, 0, 0);
    };

    // A plain rAF loop (rather than requestVideoFrameCallback) is used
    // deliberately: rVFC only reliably refires during native playback, and
    // this component drives most of its timeline by seeking a paused video,
    // which left the canvas frozen on stale frames when rVFC backed it.
    const drawLoop = () => {
      if (cancelled) return;
      // Gate on readyState > 0 (HAVE_METADATA), not >= 2: while this
      // component is scrubbing currentTime backward, readyState regresses
      // to 1 for the whole scrub and only recovers once seeking fully
      // stops, even though each awaited "seeked" event confirms a frame is
      // actually presentable. Gating on >= 2 left the canvas frozen through
      // the entire reverse leg.
      if (video.readyState > 0) drawFrame();
      drawHandle = requestAnimationFrame(drawLoop);
    };

    const runCycle = async () => {
      if (video.readyState < 1) {
        await new Promise<void>((resolve) => {
          video.addEventListener("loadedmetadata", () => resolve(), { once: true });
        });
      }
      if (cancelled) return;

      const peakTime = Math.min(PEAK_TIME, video.duration || PEAK_TIME);
      const totalFrames = Math.max(1, Math.round(peakTime * REVERSE_FPS));
      const stepDelay = (peakTime * 1000) / totalFrames;

      while (!cancelled) {
        // Play forward: blank -> fully built logo.
        video.currentTime = 0;
        await video.play().catch(() => {});
        await waitUntilTime(video, peakTime);
        if (cancelled) return;
        video.pause();
        video.currentTime = peakTime;

        // Hold on the fully built logo.
        await wait(HOLD_FULL_MS);
        if (cancelled) return;

        // Play in reverse, frame by frame: fully built logo -> blank.
        for (let f = totalFrames; f >= 0; f--) {
          const stepStart = performance.now();
          await seekTo(video, (f / totalFrames) * peakTime);
          if (cancelled) return;
          const elapsed = performance.now() - stepStart;
          if (elapsed < stepDelay) await wait(stepDelay - elapsed);
          if (cancelled) return;
        }

        // Hold on blank — nothing visible.
        await wait(HOLD_BLANK_MS);
        if (cancelled) return;
      }
    };

    video.pause();
    drawLoop();
    runCycle();

    return () => {
      cancelled = true;
      cancelAnimationFrame(drawHandle);
    };
  }, []);

  return (
    <span className={cn("relative inline-flex items-center", className)}>
      <video
        ref={videoRef}
        src="/logoloop.mp4"
        muted
        playsInline
        webkit-playsinline="true"
        controls={false}
        preload="auto"
        className="absolute h-px w-px opacity-0"
        aria-hidden="true"
        tabIndex={-1}
      />
      <canvas
        ref={canvasRef}
        width={RENDER_WIDTH}
        height={RENDER_HEIGHT}
        className="h-full w-auto"
        style={{ aspectRatio: `${CROP.sw} / ${CROP.sh}` }}
        aria-hidden="true"
      />
    </span>
  );
}
