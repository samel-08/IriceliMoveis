import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import './DriftWall.css';

const DEFAULT_ITEMS = [];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const columnFactor = (index, variance) => {
  const pseudo = ((index * 0.6180339887 + 0.35) % 1) * 2 - 1;
  return 1 + variance * pseudo;
};

const shuffleItems = (items, seed) => {
  const ordered = [...items];
  for (let i = ordered.length - 1; i > 0; i--) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const next = seed % (i + 1);
    [ordered[i], ordered[next]] = [ordered[next], ordered[i]];
  }
  return ordered;
};

const DriftWall = ({
  items = DEFAULT_ITEMS,
  columns = 5,
  tileWidth = 200,
  tileHeight = 132,
  gap = 18,
  radius = 14,
  tilt = 16,
  turn = -14,
  roll = 0,
  perspective = 1200,
  depth = 120,
  speed = 42,
  direction = 'up',
  variance = 0.45,
  parallax = 0.6,
  pauseOnHover = false,
  lift = 64,
  fade = 0.6,
  dim = 0.55,
  grayscale = false,
  overlayColor = '#060010',
  className = '',
  onItemSelect,
  paused = false,
  style
}) => {
  const containerRef = useRef(null);
  const planeRef = useRef(null);
  const trackRefs = useRef([]);
  const rafRef = useRef(null);

  const offsetsRef = useRef([]);
  const velocitiesRef = useRef([]);
  const hoveredColRef = useRef(-1);
  const wallHoveredRef = useRef(false);
  const pointerRef = useRef({ x: 0, y: 0 });
  const pointerDampedRef = useRef({ x: 0, y: 0 });
  const lastTsRef = useRef(null);

  const [containerHeight, setContainerHeight] = useState(600);
  const [containerWidth, setContainerWidth] = useState(0);
  const [inView, setInView] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(() => typeof document === 'undefined' || !document.hidden);
  const [activeId, setActiveId] = useState(null);
  const activeIdRef = useRef(null);
  const [reduced, setReduced] = useState(prefersReducedMotion);
  const [shuffleSeed] = useState(() => Math.floor(Math.random() * 0x100000000));

  const shuffledItems = useMemo(() => {
    // Include the collection in the seed: edits get a new order, while hover
    // and responsive column changes reuse the same shuffled collection.
    const signature = JSON.stringify(items.map(item => [item.projectId, item.image]));
    let seed = shuffleSeed;
    for (let i = 0; i < signature.length; i++) {
      seed = (Math.imul(seed, 31) + signature.charCodeAt(i)) >>> 0;
    }
    return shuffleItems(items, seed);
  }, [items, shuffleSeed]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = e => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => { mq.removeEventListener("change", onChange);};
}, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    if (containerRef.current) observer.observe(containerRef.current);
    const onVisibility = () => setDocumentVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  const responsiveColumns = containerWidth < 500 ? 2 : containerWidth < 640 ? 3 :
    containerWidth < 820 ? 4 : containerWidth < 1024 ? 5 : containerWidth < 1280 ? 6 : 7;
  const columnCount = Math.max(1, Math.min(columns, responsiveColumns, items.length || 1));
  const desktopProgress = Math.min(1, Math.max(0, (containerWidth - 500) / 780));
  const fittedGap = gap * (0.75 + desktopProgress * 0.25);
  const fittedTilt = tilt * (0.55 + desktopProgress * 0.45);
  const fittedTurn = turn * (0.4 + desktopProgress * 0.6);
  const fittedDepth = depth * (0.4 + desktopProgress * 0.6);
  const fittedLift = lift * (0.4 + desktopProgress * 0.6);
  const fittedParallax = parallax * (0.3 + desktopProgress * 0.7);
  const fittedFade = fade * (0.65 + desktopProgress * 0.35);
  const fittedPerspective = Math.max(perspective * (0.65 + desktopProgress * 0.35), containerHeight * 2);
  const planeHeight = containerHeight * 1.6;
  const fittedWidth = Math.min(tileWidth, Math.max(1, containerWidth / columnCount - fittedGap));
  const fittedHeight = fittedWidth * tileHeight / tileWidth;

  const columnItems = useMemo(() => {
    // Give each column its own slice of the deck. Reusing the full list in
    // every column made the same projects appear alongside one another.
    const distributed = Array.from({ length: columnCount }, () => []);
    shuffledItems.forEach((item, index) => {
      distributed[index % columnCount].push(item);
    });
    return distributed.map((column, index) => shuffleItems(column, index + 1));
  }, [shuffledItems, columnCount]);

  const columnMeta = useMemo(() => {
    const unit = fittedHeight + fittedGap;
    return columnItems.map(col => {
      const copyHeight = Math.max(unit, col.length * unit);
      // Offsets wrap within one copy. Keep the entire fixed-height plane covered
      // even just before wrapping, with a pixel of slack for fractional sizing.
      const copies = Math.max(2, Math.ceil((planeHeight + copyHeight + 1) / copyHeight));
      return { copyHeight, copies };
    });
  }, [columnItems, fittedHeight, fittedGap, planeHeight]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerHeight(entry.contentRect.height || 600);
      setContainerWidth(entry.contentRect.width);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const baseVelocities = useMemo(() => {
    const dirSign = direction === 'up' ? 1 : -1;
    return columnItems.map((_, c) => {
      const altSign = c % 2 === 0 ? 1 : -1;
      return speed * columnFactor(c, variance) * dirSign * altSign;
    });
  }, [columnItems, speed, direction, variance]);

  useEffect(() => {
    offsetsRef.current = columnMeta.map((meta, c) =>
      columnItems[c].length <= 4 ? 0 : meta.copyHeight * ((c * 0.37) % 1)
    );
    velocitiesRef.current = columnItems.map(() => 0);
  }, [columnMeta, columnItems]);

  const applyPlaneTransform = useCallback(
    (px, py) => {
      const plane = planeRef.current;
      if (!plane) return;
      plane.style.transform =
        `translate(-50%, -50%) scale(1.18) ` +
        `rotateX(${fittedTilt + py}deg) rotateY(${fittedTurn + px}deg) rotateZ(${roll}deg) ` +
        `translateZ(${-fittedDepth}px)`;
    },
    [fittedTilt, fittedTurn, roll, fittedDepth]
  );

  useEffect(() => {
    applyPlaneTransform(0, 0);
    trackRefs.current.forEach((el, c) => {
      if (el) el.style.transform = `translate3d(0, ${-(offsetsRef.current[c] ?? 0)}px, 0)`;
    });
    if (reduced || window.matchMedia("(max-width: 600px)").matches || paused || !inView || !documentVisible || !containerWidth || !items.length) return;
    const animate = ts => {
      if (lastTsRef.current !== null && ts - lastTsRef.current < 1000 / 30) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.min(0.05, Math.max(0, ts - lastTsRef.current) / 1000);
      lastTsRef.current = ts;

      const maxTilt = fittedParallax * 8;
      const targetX = pointerRef.current.x * maxTilt;
      const targetY = -pointerRef.current.y * maxTilt;
      const damp = 1 - Math.exp(-dt / 0.12);
      pointerDampedRef.current.x += (targetX - pointerDampedRef.current.x) * damp;
      pointerDampedRef.current.y += (targetY - pointerDampedRef.current.y) * damp;
      applyPlaneTransform(pointerDampedRef.current.x, pointerDampedRef.current.y);

      for (let c = 0; c < trackRefs.current.length; c++) {
        const meta = columnMeta[c];
        if (!meta) continue;
        const paused = wallHoveredRef.current && pauseOnHover;
        const factor = paused || hoveredColRef.current === c ? 0 : 1;
        const target = baseVelocities[c] * factor;

        const ease = 1 - Math.exp(-dt / (target === 0 ? 0.16 : 0.28));
        velocitiesRef.current[c] += (target - velocitiesRef.current[c]) * ease;
        let next = (offsetsRef.current[c] ?? 0) + velocitiesRef.current[c] * dt;
        next = ((next % meta.copyHeight) + meta.copyHeight) % meta.copyHeight;
        offsetsRef.current[c] = next;

        const el = trackRefs.current[c];
        if (el) el.style.transform = `translate3d(0, ${-next}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [baseVelocities, columnMeta, pauseOnHover, fittedParallax, reduced, paused, inView, documentVisible, containerWidth, items.length, applyPlaneTransform]);

  const activate = useCallback((id, index) => {
    activeIdRef.current = id;
    hoveredColRef.current = index;
    setActiveId(id);
  }, []);
  const release = useCallback(() => {
    activeIdRef.current = null;
    hoveredColRef.current = -1;
    setActiveId(null);
  }, []);

  const handlePointerMove = useCallback(
    e => {
      if (window.matchMedia("(pointer: coarse)").matches) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      if (parallax > 0 && !reduced) {
        pointerRef.current = {
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5
        };
      }
      const hit = document.elementFromPoint(e.clientX, e.clientY);
      const tile = hit && hit.closest ? hit.closest('[data-tile-id]') : null;
      if (!tile) { release(); return; }
      const id = tile.dataset.tileId;
      if (id === activeIdRef.current) return;
      activeIdRef.current = id;
      hoveredColRef.current = Number(tile.dataset.col);
      setActiveId(id);
    },
    [parallax, reduced, release]
  );

  const handlePointerLeaveWall = useCallback(() => {
    wallHoveredRef.current = false;
    pointerRef.current = { x: 0, y: 0 };
    release();
  }, [release]);

  const cssVars = useMemo(
    () => ({
      '--dw-tile-w': `${fittedWidth}px`,
      '--dw-tile-h': `${fittedHeight}px`,
      '--dw-plane-h': `${planeHeight}px`,
      '--dw-gap': `${fittedGap}px`,
      '--dw-radius': `${radius}px`,
      '--dw-perspective': `${fittedPerspective}px`,
      '--dw-lift': `${fittedLift}px`,
      '--dw-dim': dim,
      '--dw-gray': grayscale ? 1 : 0,
      '--dw-overlay': overlayColor,
      '--dw-edge': `${Math.max(0, (1 - fittedFade) * 100)}%`,
      ...style
    }),
    [fittedWidth, fittedHeight, planeHeight, fittedGap, radius, fittedPerspective, fittedLift, dim, grayscale, overlayColor, fittedFade, style]
  );

  const renderTile = (item, id, colIndex, duplicate) => {
    const inner = (
      <span className="drift-wall__inner">
        <img src={item.image} alt={duplicate ? '' : item.alt ?? item.title ?? ''}
          style={{ objectPosition: item.objectPosition || 'center' }}
          loading="lazy" decoding="async" draggable={false} />
        <span className="drift-wall__overlay" aria-hidden="true" />
        {item.category && <span className="drift-wall__caption" aria-hidden="true">
          <small>{item.category}</small><span>{item.title}</span>
        </span>}
      </span>
    );
    const commonProps = {
      className: `drift-wall__tile${activeId === id ? ' is-active' : ''}`,
      'data-tile-id': id,
      'data-col': colIndex,
      'data-project-id': item.projectId,
      'aria-hidden': duplicate ? true : undefined,
      onFocus: () => activate(id, colIndex),
      onBlur: release
    };
    if (onItemSelect) {
      return <button key={id} type="button" tabIndex={duplicate ? -1 : 0}
        aria-label={`Ver projeto: ${item.title}`} onClick={() => onItemSelect(item)} {...commonProps}>
        {inner}
      </button>;
    }
    if (item.href) {
      return (
        <a key={id} href={item.href} tabIndex={duplicate ? -1 : undefined} target="_blank" rel="noreferrer noopener" {...commonProps}>
          {inner}
        </a>
      );
    }
    return (
      <div key={id} {...commonProps}>
        {inner}
      </div>
    );
  };

  const rootClass = ['drift-wall', reduced ? 'drift-wall--reduced' : '', className].filter(Boolean).join(' ');

  return (
    <div
      ref={containerRef}
      className={rootClass}
      style={cssVars}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => {
        wallHoveredRef.current = true;
      }}
      onPointerLeave={handlePointerLeaveWall}
      role="group"
      aria-label="Projetos Iriceli"
    >
      <div ref={planeRef} className="drift-wall__plane">
        {columnItems.map((col, c) => {
          const meta = columnMeta[c];
          const copies = Array.from({ length: meta.copies });
          return (
            <div className="drift-wall__col" key={`col-${c}`}>
              <div className="drift-wall__track" ref={el => (trackRefs.current[c] = el)}>
                {copies.map((_, copyIndex) =>
                  col.map((item, itemIndex) => renderTile(item, `${c}-${copyIndex}-${itemIndex}`, c, copyIndex > 0))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DriftWall;
