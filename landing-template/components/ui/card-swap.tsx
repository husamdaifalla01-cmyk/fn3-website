import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useRef
} from 'react';
import gsap from 'gsap';

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: 'linear' | 'elastic';
  children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`absolute top-1/2 left-1/2 [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
  />
));
Card.displayName = 'Card';

type CardRef = RefObject<HTMLDivElement | null>;
interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => {
  // Wider spread for better card visibility
  const positions = [-distX * 1.8, distX * 0.4, distX * 2.2];
  // Lower stagger so middle card title isn't cut off
  const verticalOffsets = [0, 35, 70];
  return {
    x: positions[i] || 0,
    y: verticalOffsets[i] || 0,
    z: i * 15, // Optimal depth for visibility
    zIndex: i + 1 // Left to right layering
  };
};

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    rotateY: -15,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children
}) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(() => Children.toArray(children) as ReactElement<CardProps>[], [children]);
  const refs = useMemo<CardRef[]>(() => childArr.map(() => React.createRef<HTMLDivElement>()), [childArr.length]);

  const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number>(0);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const total = refs.length;

    // Check if this is mobile view (screen width based)
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // Mobile: Start stacked (like makeSlot positions), animate to spread
      refs.forEach((r, i) => {
        const stackedSlot = makeSlot(i, cardDistance, verticalDistance, total);
        gsap.set(r.current!, {
          x: stackedSlot.x * 0.2, // Start much closer together
          y: stackedSlot.y * 0.3, // Start more stacked
          z: stackedSlot.z * 0.1,
          xPercent: -50,
          yPercent: -50,
          rotateX: -8,
          rotateY: -10,
          skewY: -skewAmount * 0.5,
          transformOrigin: 'center center',
          zIndex: i + 1,
          force3D: true
        });
      });

      // Mobile scroll: animate from stacked to spread
      const handleMobileScroll = () => {
        const scrollY = window.scrollY;
        const maxScroll = 300;
        const progress = Math.min(scrollY / maxScroll, 1);

        refs.forEach((r, i) => {
          const finalSlot = makeSlot(i, cardDistance, verticalDistance, total);
          const startX = finalSlot.x * 0.2;
          const startY = finalSlot.y * 0.3;
          const startZ = finalSlot.z * 0.1;

          gsap.to(r.current!, {
            x: startX + (finalSlot.x - startX) * progress,
            y: startY + (finalSlot.y - startY) * progress,
            z: startZ + (finalSlot.z - startZ) * progress,
            rotateX: -8 + (8 * progress),
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      };

      window.addEventListener('scroll', handleMobileScroll);
      handleMobileScroll();

      return () => {
        window.removeEventListener('scroll', handleMobileScroll);
      };
    } else {
      // Desktop: Original behavior (spread to stacked)
      const initialYPositions = [-20, 25, 70];
      refs.forEach((r, i) => {
        gsap.set(r.current!, {
          x: (i - 1) * 100 - 20,
          y: initialYPositions[i],
          z: i * 10,
          xPercent: -50,
          yPercent: -50,
          rotateX: -8,
          rotateY: -10,
          skewY: -skewAmount * 0.5,
          transformOrigin: 'center center',
          zIndex: i + 1,
          force3D: true
        });
      });

      const handleDesktopScroll = () => {
        const scrollY = window.scrollY;
        const maxScroll = 300;
        const progress = Math.min(scrollY / maxScroll, 1);

        const initialYPositions = [-20, 25, 70];
        refs.forEach((r, i) => {
          const slot = makeSlot(i, cardDistance, verticalDistance, total);
          const initialX = (i - 1) * 100 - 20;
          const initialY = initialYPositions[i];
          gsap.to(r.current!, {
            x: initialX + (slot.x - initialX) * progress,
            y: initialY + (slot.y - initialY) * progress,
            z: slot.z * progress,
            rotateX: -8 + (8 * progress),
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      };

      window.addEventListener('scroll', handleDesktopScroll);
      handleDesktopScroll();

      return () => {
        window.removeEventListener('scroll', handleDesktopScroll);
      };
    }
  }, [cardDistance, verticalDistance, skewAmount]);

  const rendered = childArr.map((child, i) =>
    isValidElement<CardProps>(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: e => {
            child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>);
            onCardClick?.(i);
          }
        } as CardProps & React.RefAttributes<HTMLDivElement>)
      : child
  );

  return (
    <div
      ref={container}
      className="relative w-full h-[400px] flex items-center justify-center perspective-[1500px] overflow-visible"
      style={{ width: '100%', height: 400 }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;