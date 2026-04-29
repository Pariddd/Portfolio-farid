// import React, { useEffect, useRef, useCallback, useMemo } from "react";

// const ANIMATION_CONFIG = {
//   INITIAL_DURATION: 1200,
//   INITIAL_X_OFFSET: 70,
//   INITIAL_Y_OFFSET: 60,
//   DEVICE_BETA_OFFSET: 20,
//   ENTER_TRANSITION_MS: 180,
// };

// const clamp = (v, min = 0, max = 100) => Math.min(Math.max(v, min), max);
// const round = (v, precision = 3) => parseFloat(v.toFixed(precision));
// const adjust = (v, fMin, fMax, tMin, tMax) =>
//   round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

// const ProfileCardComponent = ({
//   avatarUrl = "",
//   iconUrl = "",
//   grainUrl = "",
//   behindGlowEnabled = true,
//   behindGlowColor,
//   behindGlowSize,
//   className = "",
//   enableTilt = true,
//   enableMobileTilt = false,
//   mobileTiltSensitivity = 5,
//   miniAvatarUrl,
//   name = "Javi A. Torres",
//   title = "Software Engineer",
//   handle = "javicodes",
//   status = "Online",
//   contactText = "Contact",
//   showUserInfo = true,
//   onContactClick,
// }) => {
//   const wrapRef = useRef(null);
//   const shellRef = useRef(null);

//   const enterTimerRef = useRef(null);
//   const leaveRafRef = useRef(null);

//   const tiltEngine = useMemo(() => {
//     if (!enableTilt) return null;

//     let rafId = null;
//     let running = false;
//     let lastTs = 0;

//     let currentX = 0;
//     let currentY = 0;
//     let targetX = 0;
//     let targetY = 0;

//     const DEFAULT_TAU = 0.14;
//     const INITIAL_TAU = 0.6;
//     let initialUntil = 0;

//     const setVarsFromXY = (x, y) => {
//       const shell = shellRef.current;
//       const wrap = wrapRef.current;
//       if (!shell || !wrap) return;

//       const width = shell.clientWidth || 1;
//       const height = shell.clientHeight || 1;

//       const percentX = clamp((100 / width) * x);
//       const percentY = clamp((100 / height) * y);

//       const centerX = percentX - 50;
//       const centerY = percentY - 50;

//       const properties = {
//         "--pointer-x": `${percentX}%`,
//         "--pointer-y": `${percentY}%`,
//         "--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
//         "--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
//         "--pointer-from-center": `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
//         "--pointer-from-top": `${percentY / 100}`,
//         "--pointer-from-left": `${percentX / 100}`,
//         "--rotate-x": `${round(-(centerX / 5))}deg`,
//         "--rotate-y": `${round(centerY / 4)}deg`,
//       };

//       for (const [k, v] of Object.entries(properties))
//         wrap.style.setProperty(k, v);
//     };

//     const step = (ts) => {
//       if (!running) return;
//       if (lastTs === 0) lastTs = ts;
//       const dt = (ts - lastTs) / 1000;
//       lastTs = ts;

//       const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
//       const k = 1 - Math.exp(-dt / tau);

//       currentX += (targetX - currentX) * k;
//       currentY += (targetY - currentY) * k;

//       setVarsFromXY(currentX, currentY);

//       const stillFar =
//         Math.abs(targetX - currentX) > 0.05 ||
//         Math.abs(targetY - currentY) > 0.05;

//       if (stillFar || document.hasFocus()) {
//         rafId = requestAnimationFrame(step);
//       } else {
//         running = false;
//         lastTs = 0;
//         if (rafId) {
//           cancelAnimationFrame(rafId);
//           rafId = null;
//         }
//       }
//     };

//     const start = () => {
//       if (running) return;
//       running = true;
//       lastTs = 0;
//       rafId = requestAnimationFrame(step);
//     };

//     return {
//       setImmediate(x, y) {
//         currentX = x;
//         currentY = y;
//         setVarsFromXY(currentX, currentY);
//       },
//       setTarget(x, y) {
//         targetX = x;
//         targetY = y;
//         start();
//       },
//       toCenter() {
//         const shell = shellRef.current;
//         if (!shell) return;
//         this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
//       },
//       beginInitial(durationMs) {
//         initialUntil = performance.now() + durationMs;
//         start();
//       },
//       getCurrent() {
//         return { x: currentX, y: currentY, tx: targetX, ty: targetY };
//       },
//       cancel() {
//         if (rafId) cancelAnimationFrame(rafId);
//         rafId = null;
//         running = false;
//         lastTs = 0;
//       },
//     };
//   }, [enableTilt]);

//   const getOffsets = (evt, el) => {
//     const rect = el.getBoundingClientRect();
//     return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
//   };

//   const handlePointerMove = useCallback(
//     (event) => {
//       const shell = shellRef.current;
//       if (!shell || !tiltEngine) return;
//       const { x, y } = getOffsets(event, shell);
//       tiltEngine.setTarget(x, y);
//     },
//     [tiltEngine],
//   );

//   const handlePointerEnter = useCallback(
//     (event) => {
//       const shell = shellRef.current;
//       if (!shell || !tiltEngine) return;

//       shell.classList.add("active");
//       shell.classList.add("entering");
//       if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
//       enterTimerRef.current = window.setTimeout(() => {
//         shell.classList.remove("entering");
//       }, ANIMATION_CONFIG.ENTER_TRANSITION_MS);

//       const { x, y } = getOffsets(event, shell);
//       tiltEngine.setTarget(x, y);
//     },
//     [tiltEngine],
//   );

//   const handlePointerLeave = useCallback(() => {
//     const shell = shellRef.current;
//     if (!shell || !tiltEngine) return;

//     tiltEngine.toCenter();

//     const checkSettle = () => {
//       const { x, y, tx, ty } = tiltEngine.getCurrent();
//       const settled = Math.hypot(tx - x, ty - y) < 0.6;
//       if (settled) {
//         shell.classList.remove("active");
//         leaveRafRef.current = null;
//       } else {
//         leaveRafRef.current = requestAnimationFrame(checkSettle);
//       }
//     };
//     if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
//     leaveRafRef.current = requestAnimationFrame(checkSettle);
//   }, [tiltEngine]);

//   const handleDeviceOrientation = useCallback(
//     (event) => {
//       const shell = shellRef.current;
//       if (!shell || !tiltEngine) return;

//       const { beta, gamma } = event;
//       if (beta == null || gamma == null) return;

//       const centerX = shell.clientWidth / 2;
//       const centerY = shell.clientHeight / 2;
//       const x = clamp(
//         centerX + gamma * mobileTiltSensitivity,
//         0,
//         shell.clientWidth,
//       );
//       const y = clamp(
//         centerY +
//           (beta - ANIMATION_CONFIG.DEVICE_BETA_OFFSET) * mobileTiltSensitivity,
//         0,
//         shell.clientHeight,
//       );

//       tiltEngine.setTarget(x, y);
//     },
//     [tiltEngine, mobileTiltSensitivity],
//   );

//   useEffect(() => {
//     if (!enableTilt || !tiltEngine) return;

//     const shell = shellRef.current;
//     if (!shell) return;

//     const pointerMoveHandler = handlePointerMove;
//     const pointerEnterHandler = handlePointerEnter;
//     const pointerLeaveHandler = handlePointerLeave;
//     const deviceOrientationHandler = handleDeviceOrientation;

//     shell.addEventListener("pointerenter", pointerEnterHandler);
//     shell.addEventListener("pointermove", pointerMoveHandler);
//     shell.addEventListener("pointerleave", pointerLeaveHandler);

//     const handleClick = () => {
//       if (!enableMobileTilt || location.protocol !== "https:") return;
//       const anyMotion = window.DeviceMotionEvent;
//       if (anyMotion && typeof anyMotion.requestPermission === "function") {
//         anyMotion
//           .requestPermission()
//           .then((state) => {
//             if (state === "granted") {
//               window.addEventListener(
//                 "deviceorientation",
//                 deviceOrientationHandler,
//               );
//             }
//           })
//           .catch(console.error);
//       } else {
//         window.addEventListener("deviceorientation", deviceOrientationHandler);
//       }
//     };
//     shell.addEventListener("click", handleClick);

//     const initialX =
//       (shell.clientWidth || 0) - ANIMATION_CONFIG.INITIAL_X_OFFSET;
//     const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
//     tiltEngine.setImmediate(initialX, initialY);
//     tiltEngine.toCenter();
//     tiltEngine.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION);

//     return () => {
//       shell.removeEventListener("pointerenter", pointerEnterHandler);
//       shell.removeEventListener("pointermove", pointerMoveHandler);
//       shell.removeEventListener("pointerleave", pointerLeaveHandler);
//       shell.removeEventListener("click", handleClick);
//       window.removeEventListener("deviceorientation", deviceOrientationHandler);
//       if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
//       if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
//       tiltEngine.cancel();
//       shell.classList.remove("entering");
//     };
//   }, [
//     enableTilt,
//     enableMobileTilt,
//     tiltEngine,
//     handlePointerMove,
//     handlePointerEnter,
//     handlePointerLeave,
//     handleDeviceOrientation,
//   ]);

//   const cardRadius = "30px";

//   const cardStyle = useMemo(
//     () => ({
//       "--icon": iconUrl ? `url(${iconUrl})` : "none",
//       "--grain": grainUrl ? `url(${grainUrl})` : "none",
//       "--behind-glow-color": behindGlowColor ?? "rgba(125, 190, 255, 0.67)",
//       "--behind-glow-size": behindGlowSize ?? "50%",
//       "--pointer-x": "50%",
//       "--pointer-y": "50%",
//       "--pointer-from-center": "0",
//       "--pointer-from-top": "0.5",
//       "--pointer-from-left": "0.5",
//       "--card-opacity": "1",
//       "--rotate-x": "0deg",
//       "--rotate-y": "0deg",
//       "--background-x": "50%",
//       "--background-y": "50%",
//       "--card-radius": cardRadius,
//     }),
//     [iconUrl, grainUrl, behindGlowColor, behindGlowSize, cardRadius],
//   );

//   const handleContactClick = useCallback(() => {
//     onContactClick?.();
//   }, [onContactClick]);

//   return (
//     <div
//       ref={wrapRef}
//       className={`relative touch-none ${className}`.trim()}
//       style={{
//         perspective: "500px",
//         transform: "translate3d(0, 0, 0.1px)",
//         ...cardStyle,
//       }}
//     >
//       {behindGlowEnabled && (
//         <div
//           className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-200 ease-out"
//           style={{
//             background: `radial-gradient(circle at var(--pointer-x) var(--pointer-y), var(--behind-glow-color) 0%, transparent var(--behind-glow-size))`,
//             filter: "blur(50px) saturate(1.1)",
//             opacity: "calc(0.8 * var(--card-opacity))",
//           }}
//         />
//       )}
//       <div ref={shellRef} className="relative z-[1] group">
//         <section
//           className="grid relative overflow-hidden backface-hidden"
//           style={{
//             height: "80svh",
//             maxHeight: "540px",
//             aspectRatio: "0.718",
//             borderRadius: cardRadius,
//             boxShadow:
//               "rgba(0, 0, 0, 0.8) calc((var(--pointer-from-left) * 10px) - 3px) calc((var(--pointer-from-top) * 20px) - 6px) 20px -5px",
//             transition: "transform 1s ease",
//             transform: "translateZ(0) rotateX(0deg) rotateY(0deg)",
//             background: "rgba(0, 0, 0, 0.9)",
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.transition = "none";
//             e.currentTarget.style.transform =
//               "translateZ(0) rotateX(var(--rotate-y)) rotateY(var(--rotate-x))";
//           }}
//           onMouseLeave={(e) => {
//             const shell = shellRef.current;
//             if (shell?.classList.contains("entering")) {
//               e.currentTarget.style.transition = "transform 180ms ease-out";
//             } else {
//               e.currentTarget.style.transition = "transform 1s ease";
//             }
//             e.currentTarget.style.transform =
//               "translateZ(0) rotateX(0deg) rotateY(0deg)";
//           }}
//         >
//           {/* Avatar — NO blend mode, foto tampil asli */}
//           <div
//             className="overflow-visible backface-hidden absolute inset-0"
//             style={{
//               mixBlendMode: "normal",
//               gridArea: "1 / -1",
//               borderRadius: cardRadius,
//               pointerEvents: "none",
//             }}
//           >
//             <img
//               className="absolute inset-0 w-full h-full backface-hidden"
//               src={avatarUrl}
//               alt={`${name || "User"} avatar`}
//               loading="lazy"
//               style={{
//                 objectFit: "cover",
//                 objectPosition: "center top",
//                 borderRadius: cardRadius,
//               }}
//               onError={(e) => {
//                 e.target.style.display = "none";
//               }}
//             />
//             {showUserInfo && (
//               <div
//                 className="absolute z-[2] flex items-center justify-between backdrop-blur-[30px] border border-white/10 pointer-events-auto"
//                 style={{
//                   "--ui-inset": "20px",
//                   "--ui-radius-bias": "6px",
//                   bottom: "var(--ui-inset)",
//                   left: "var(--ui-inset)",
//                   right: "var(--ui-inset)",
//                   background: "rgba(255, 255, 255, 0.1)",
//                   borderRadius:
//                     "calc(max(0px, var(--card-radius) - var(--ui-inset) + var(--ui-radius-bias)))",
//                   padding: "12px 14px",
//                 }}
//               >
//                 <div className="flex items-center gap-3">
//                   <div
//                     className="rounded-full overflow-hidden border border-white/10 flex-shrink-0"
//                     style={{ width: "48px", height: "48px" }}
//                   >
//                     <img
//                       className="w-full h-full object-cover rounded-full"
//                       src={miniAvatarUrl || avatarUrl}
//                       alt={`${name || "User"} mini avatar`}
//                       loading="lazy"
//                       style={{ display: "block", borderRadius: "50%" }}
//                       onError={(e) => {
//                         e.target.style.opacity = "0.5";
//                         e.target.src = avatarUrl;
//                       }}
//                     />
//                   </div>
//                   <div className="flex flex-col items-start gap-1.5">
//                     <div className="text-sm font-medium text-white/90 leading-none">
//                       @{handle}
//                     </div>
//                     <div className="text-sm text-white/70 leading-none">
//                       {status}
//                     </div>
//                   </div>
//                 </div>
//                 <button
//                   className="border border-white/10 rounded-lg px-4 py-3 text-xs font-semibold text-white/90 cursor-pointer backdrop-blur-[10px] transition-all duration-200 ease-out hover:border-white/40 hover:-translate-y-px"
//                   onClick={handleContactClick}
//                   style={{ borderRadius: "8px" }}
//                   type="button"
//                   aria-label={`Contact ${name || "user"}`}
//                 >
//                   {contactText}
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Name & Title — di atas foto, tanpa blend mode aneh */}
//           <div
//             className="max-h-full overflow-hidden text-center relative z-[5]"
//             style={{
//               gridArea: "1 / -1",
//               borderRadius: cardRadius,
//               pointerEvents: "none",
//             }}
//           >
//             <div
//               className="w-full absolute flex flex-col"
//               style={{ top: "3em" }}
//             >
//               <h3
//                 className="font-semibold m-0"
//                 style={{
//                   fontSize: "min(5svh, 3em)",
//                   color: "#ffffff",
//                   textShadow: "0 2px 12px rgba(0,0,0,0.6)",
//                 }}
//               >
//                 {name}
//               </h3>
//               <p
//                 className="font-semibold whitespace-nowrap mx-auto w-min"
//                 style={{
//                   position: "relative",
//                   top: "-12px",
//                   fontSize: "16px",
//                   color: "#ffffffcc",
//                   textShadow: "0 2px 8px rgba(0,0,0,0.5)",
//                 }}
//               >
//                 {title}
//               </p>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// const ProfileCard = React.memo(ProfileCardComponent);
// export default ProfileCard;

import React, {
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useState,
} from "react";

const ANIMATION_CONFIG = {
  INITIAL_DURATION: 1200,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
  ENTER_TRANSITION_MS: 180,
};

const clamp = (v, min = 0, max = 100) => Math.min(Math.max(v, min), max);
const round = (v, precision = 3) => parseFloat(v.toFixed(precision));
const adjust = (v, fMin, fMax, tMin, tMax) =>
  round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

const ProfileCardComponent = ({
  avatarUrl = "",
  iconUrl = "",
  grainUrl = "",
  behindGlowEnabled = true,
  behindGlowColor,
  behindGlowSize,
  className = "",
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  miniAvatarUrl,
  name = "Javi A. Torres",
  title = "Software Engineer",
  handle = "javicodes",
  status = "Online",
  contactText = "Contact",
  showUserInfo = true,
  onContactClick,
  cursorGlowEnabled = true,
  cursorGlowColor,
}) => {
  const wrapRef = useRef(null);
  const shellRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const enterTimerRef = useRef(null);
  const leaveRafRef = useRef(null);

  const tiltEngine = useMemo(() => {
    if (!enableTilt) return null;

    let rafId = null;
    let running = false;
    let lastTs = 0;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const DEFAULT_TAU = 0.14;
    const INITIAL_TAU = 0.6;
    let initialUntil = 0;

    const setVarsFromXY = (x, y) => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap) return;

      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;

      const percentX = clamp((100 / width) * x);
      const percentY = clamp((100 / height) * y);

      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties = {
        "--pointer-x": `${percentX}%`,
        "--pointer-y": `${percentY}%`,
        "--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
        "--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
        "--pointer-from-center": `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        "--pointer-from-top": `${percentY / 100}`,
        "--pointer-from-left": `${percentX / 100}`,
        "--rotate-x": `${round(-(centerX / 5))}deg`,
        "--rotate-y": `${round(centerY / 4)}deg`,
      };

      for (const [k, v] of Object.entries(properties))
        wrap.style.setProperty(k, v);
    };

    const step = (ts) => {
      if (!running) return;
      if (lastTs === 0) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
      const k = 1 - Math.exp(-dt / tau);

      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;

      setVarsFromXY(currentX, currentY);

      const stillFar =
        Math.abs(targetX - currentX) > 0.05 ||
        Math.abs(targetY - currentY) > 0.05;

      if (stillFar || document.hasFocus()) {
        rafId = requestAnimationFrame(step);
      } else {
        running = false;
        lastTs = 0;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTs = 0;
      rafId = requestAnimationFrame(step);
    };

    return {
      setImmediate(x, y) {
        currentX = x;
        currentY = y;
        setVarsFromXY(currentX, currentY);
      },
      setTarget(x, y) {
        targetX = x;
        targetY = y;
        start();
      },
      toCenter() {
        const shell = shellRef.current;
        if (!shell) return;
        this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
      },
      beginInitial(durationMs) {
        initialUntil = performance.now() + durationMs;
        start();
      },
      getCurrent() {
        return { x: currentX, y: currentY, tx: targetX, ty: targetY };
      },
      cancel() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        running = false;
        lastTs = 0;
      },
    };
  }, [enableTilt]);

  const getOffsets = (evt, el) => {
    const rect = el.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  };

  const handlePointerMove = useCallback(
    (event) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;
      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine],
  );

  const handlePointerEnter = useCallback(
    (event) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;

      setIsHovered(true);
      shell.classList.add("active");
      shell.classList.add("entering");
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      enterTimerRef.current = window.setTimeout(() => {
        shell.classList.remove("entering");
      }, ANIMATION_CONFIG.ENTER_TRANSITION_MS);

      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine],
  );

  const handlePointerLeave = useCallback(() => {
    const shell = shellRef.current;
    if (!shell || !tiltEngine) return;

    setIsHovered(false);
    tiltEngine.toCenter();

    const checkSettle = () => {
      const { x, y, tx, ty } = tiltEngine.getCurrent();
      const settled = Math.hypot(tx - x, ty - y) < 0.6;
      if (settled) {
        shell.classList.remove("active");
        leaveRafRef.current = null;
      } else {
        leaveRafRef.current = requestAnimationFrame(checkSettle);
      }
    };
    if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
    leaveRafRef.current = requestAnimationFrame(checkSettle);
  }, [tiltEngine]);

  const handleDeviceOrientation = useCallback(
    (event) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) return;

      const { beta, gamma } = event;
      if (beta == null || gamma == null) return;

      const centerX = shell.clientWidth / 2;
      const centerY = shell.clientHeight / 2;
      const x = clamp(
        centerX + gamma * mobileTiltSensitivity,
        0,
        shell.clientWidth,
      );
      const y = clamp(
        centerY +
          (beta - ANIMATION_CONFIG.DEVICE_BETA_OFFSET) * mobileTiltSensitivity,
        0,
        shell.clientHeight,
      );

      tiltEngine.setTarget(x, y);
    },
    [tiltEngine, mobileTiltSensitivity],
  );

  useEffect(() => {
    if (!enableTilt || !tiltEngine) return;

    const shell = shellRef.current;
    if (!shell) return;

    const pointerMoveHandler = handlePointerMove;
    const pointerEnterHandler = handlePointerEnter;
    const pointerLeaveHandler = handlePointerLeave;
    const deviceOrientationHandler = handleDeviceOrientation;

    shell.addEventListener("pointerenter", pointerEnterHandler);
    shell.addEventListener("pointermove", pointerMoveHandler);
    shell.addEventListener("pointerleave", pointerLeaveHandler);

    const handleClick = () => {
      if (!enableMobileTilt || location.protocol !== "https:") return;
      const anyMotion = window.DeviceMotionEvent;
      if (anyMotion && typeof anyMotion.requestPermission === "function") {
        anyMotion
          .requestPermission()
          .then((state) => {
            if (state === "granted") {
              window.addEventListener(
                "deviceorientation",
                deviceOrientationHandler,
              );
            }
          })
          .catch(console.error);
      } else {
        window.addEventListener("deviceorientation", deviceOrientationHandler);
      }
    };
    shell.addEventListener("click", handleClick);

    const initialX =
      (shell.clientWidth || 0) - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
    tiltEngine.setImmediate(initialX, initialY);
    tiltEngine.toCenter();
    tiltEngine.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION);

    return () => {
      shell.removeEventListener("pointerenter", pointerEnterHandler);
      shell.removeEventListener("pointermove", pointerMoveHandler);
      shell.removeEventListener("pointerleave", pointerLeaveHandler);
      shell.removeEventListener("click", handleClick);
      window.removeEventListener("deviceorientation", deviceOrientationHandler);
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
      tiltEngine.cancel();
      shell.classList.remove("entering");
    };
  }, [
    enableTilt,
    enableMobileTilt,
    tiltEngine,
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
    handleDeviceOrientation,
  ]);

  const cardRadius = "30px";

  const cardStyle = useMemo(
    () => ({
      "--icon": iconUrl ? `url(${iconUrl})` : "none",
      "--grain": grainUrl ? `url(${grainUrl})` : "none",
      "--behind-glow-color": behindGlowColor ?? "rgba(125, 190, 255, 0.67)",
      "--behind-glow-size": behindGlowSize ?? "50%",
      "--pointer-x": "50%",
      "--pointer-y": "50%",
      "--pointer-from-center": "0",
      "--pointer-from-top": "0.5",
      "--pointer-from-left": "0.5",
      "--card-opacity": "1",
      "--rotate-x": "0deg",
      "--rotate-y": "0deg",
      "--background-x": "50%",
      "--background-y": "50%",
      "--card-radius": cardRadius,
    }),
    [iconUrl, grainUrl, behindGlowColor, behindGlowSize, cardRadius],
  );

  const handleContactClick = useCallback(() => {
    onContactClick?.();
  }, [onContactClick]);

  return (
    <div
      ref={wrapRef}
      className={`relative touch-none ${className}`.trim()}
      style={{
        perspective: "500px",
        transform: "translate3d(0, 0, 0.1px)",
        ...cardStyle,
      }}
    >
      {behindGlowEnabled && (
        <div
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-200 ease-out"
          style={{
            background: `radial-gradient(circle at var(--pointer-x) var(--pointer-y), var(--behind-glow-color) 0%, transparent var(--behind-glow-size))`,
            filter: "blur(50px) saturate(1.1)",
            opacity: "calc(0.8 * var(--card-opacity))",
          }}
        />
      )}
      <div ref={shellRef} className="relative z-1 group">
        <section
          className="grid relative overflow-hidden backface-hidden"
          style={{
            height: "80svh",
            maxHeight: "540px",
            aspectRatio: "0.718",
            borderRadius: cardRadius,
            boxShadow:
              "rgba(0, 0, 0, 0.8) calc((var(--pointer-from-left) * 10px) - 3px) calc((var(--pointer-from-top) * 20px) - 6px) 20px -5px",
            transition: "transform 1s ease",
            transform: "translateZ(0) rotateX(0deg) rotateY(0deg)",
            background: "rgba(0, 0, 0, 0.9)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transition = "none";
            e.currentTarget.style.transform =
              "translateZ(0) rotateX(var(--rotate-y)) rotateY(var(--rotate-x))";
          }}
          onMouseLeave={(e) => {
            const shell = shellRef.current;
            if (shell?.classList.contains("entering")) {
              e.currentTarget.style.transition = "transform 180ms ease-out";
            } else {
              e.currentTarget.style.transition = "transform 1s ease";
            }
            e.currentTarget.style.transform =
              "translateZ(0) rotateX(0deg) rotateY(0deg)";
          }}
        >
          {/* Avatar — NO blend mode, foto tampil asli */}
          <div
            className="overflow-visible backface-hidden absolute inset-0"
            style={{
              mixBlendMode: "normal",
              gridArea: "1 / -1",
              borderRadius: cardRadius,
              pointerEvents: "none",
            }}
          >
            <img
              className="absolute inset-0 w-full h-full backface-hidden"
              src={avatarUrl}
              alt={`${name || "User"} avatar`}
              loading="lazy"
              style={{
                objectFit: "cover",
                objectPosition: "center top",
                borderRadius: cardRadius,
              }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            {showUserInfo && (
              <div
                className="absolute z-2 flex items-center justify-between backdrop-blur-[30px] border border-white/10 pointer-events-auto"
                style={{
                  "--ui-inset": "20px",
                  "--ui-radius-bias": "6px",
                  bottom: "var(--ui-inset)",
                  left: "var(--ui-inset)",
                  right: "var(--ui-inset)",
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius:
                    "calc(max(0px, var(--card-radius) - var(--ui-inset) + var(--ui-radius-bias)))",
                  padding: "12px 14px",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="rounded-full overflow-hidden border border-white/10 shrink-0"
                    style={{ width: "48px", height: "48px" }}
                  >
                    <img
                      className="w-full h-full object-cover rounded-full"
                      src={miniAvatarUrl || avatarUrl}
                      alt={`${name || "User"} mini avatar`}
                      loading="lazy"
                      style={{ display: "block", borderRadius: "50%" }}
                      onError={(e) => {
                        e.target.style.opacity = "0.5";
                        e.target.src = avatarUrl;
                      }}
                    />
                  </div>
                  <div className="flex flex-col items-start gap-1.5">
                    <div className="text-sm font-medium text-white/90 leading-none">
                      @{handle}
                    </div>
                    <div className="text-sm text-white/70 leading-none">
                      {status}
                    </div>
                  </div>
                </div>
                <button
                  className="border border-white/10 rounded-lg px-4 py-3 text-xs font-semibold text-white/90 cursor-pointer backdrop-blur-[10px] transition-all duration-200 ease-out hover:border-white/40 hover:-translate-y-px"
                  onClick={handleContactClick}
                  style={{ borderRadius: "8px" }}
                  type="button"
                  aria-label={`Contact ${name || "user"}`}
                >
                  {contactText}
                </button>
              </div>
            )}
          </div>

          {/* Name & Title — di atas foto, tanpa blend mode aneh */}
          <div
            className="max-h-full overflow-hidden text-center relative z-5"
            style={{
              gridArea: "1 / -1",
              borderRadius: cardRadius,
              pointerEvents: "none",
            }}
          >
            <div
              className="w-full absolute flex flex-col"
              style={{ top: "3em" }}
            >
              <h3
                className="font-semibold m-0"
                style={{
                  fontSize: "min(5svh, 3em)",
                  color: "#ffffff",
                  textShadow: "0 2px 12px rgba(0,0,0,0.6)",
                }}
              >
                {name}
              </h3>
              <p
                className="font-semibold whitespace-nowrap mx-auto w-min"
                style={{
                  position: "relative",
                  top: "-12px",
                  fontSize: "16px",
                  color: "#ffffffcc",
                  textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                }}
              >
                {title}
              </p>
            </div>
          </div>
          {/* Cursor Glow — mengikuti posisi pointer */}
          {cursorGlowEnabled && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                borderRadius: cardRadius,
                zIndex: 20,
                background: `radial-gradient(circle 140px at var(--pointer-x) var(--pointer-y), ${
                  cursorGlowColor ?? "rgba(255, 255, 255, 0.5)"
                } 0%, transparent 70%)`,
                mixBlendMode: "screen",
                opacity: isHovered ? 1 : 0,
                transition: "opacity 400ms ease",
              }}
            />
          )}
        </section>
      </div>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);
export default ProfileCard;
