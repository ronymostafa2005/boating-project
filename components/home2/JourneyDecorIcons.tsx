import { cn } from "@/lib/utils";

function DecorWaveTop({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-auto w-full max-w-[min(400px,55vw)] text-neera-gold", className)}
      viewBox="0 0 1109 376"
      fill="currentColor"
      fillOpacity={0.1}
      aria-hidden
    >
      <path d="M248.5,238.5C397.2,134.8,555.5,52.9,726.8,0l71.5,85.9C610.5,105.5,428.9,167.9,248.5,238.5z" />
      <path d="M0,376C349.9,219.4,711.4,96.8,1109,80.2c-26.9,108.5-83.6,196.3-173.2,261.4C664.8,231.5,343.8,269.9,0,376z" />
    </svg>
  );
}

function DecorLineTall({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-auto w-6 text-[#d9d9d9] sm:w-8", className)}
      viewBox="0 0 272 804"
      fill="currentColor"
      aria-hidden
    >
      <path d="M1.5,803.5h-1V543.1c0-12.3,5.5-23.7,15-31.4l80.9-65.5c9.3-7.5,14.6-18.7,14.6-30.7V35c0-16.8,13.7-30.5,30.5-30.5H270v1 H141.5C125.2,5.5,112,18.7,112,35v380.4c0,12.3-5.5,23.7-15,31.5l-80.9,65.5c-9.3,7.5-14.6,18.7-14.6,30.7V803.5z" />
      <path d="M271.9,4.9l-6.1,4.4c-0.1,0.1-0.3,0.1-0.4,0s-0.1-0.3-0.1-0.4l2.6-4.2l-2.6-4.2c-0.1-0.1-0.1-0.3,0.1-0.4 c0.1-0.1,0.1-0.1,0.2-0.1c0.1,0,0.1,0,0.2,0.1l6.1,4.4c0.1,0.1,0.1,0.2,0.1,0.3S272,4.9,271.9,4.9L271.9,4.9z" />
    </svg>
  );
}

function DecorLineSide({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-auto w-10 text-[#d9d9d9] sm:w-12", className)}
      viewBox="0 0 163 931"
      fill="currentColor"
      aria-hidden
    >
      <path d="M54.5,930.9h-1V539.6c0-12.4,5.6-23.9,15.3-31.6l78.4-62.5c9.5-7.5,14.9-18.8,14.9-30.9V34.4c0-16.3-13.2-29.5-29.5-29.5H4 v-1h128.5c16.8,0,30.5,13.7,30.5,30.5v380.2c0,12.4-5.6,23.9-15.3,31.7l-78.4,62.5c-9.5,7.5-14.9,18.8-14.9,30.9V930.9z" />
      <path d="M0.1,4.9l6.1,4.4c0.1,0.1,0.3,0.1,0.4,0C6.8,9.2,6.8,9,6.7,8.9L4.1,4.7l2.6-4.2c0.1-0.1,0.1-0.3-0.1-0.4C6.6,0,6.5,0,6.4,0 C6.4,0,6.3,0,6.2,0.1L0.1,4.4C0.1,4.5,0,4.6,0,4.7S0.1,4.9,0.1,4.9L0.1,4.9z" />
    </svg>
  );
}

function DecorWaveBottom({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-auto w-full max-w-[min(500px,60vw)] text-neera-gold", className)}
      viewBox="0 0 1040.8 496.5"
      fill="currentColor"
      fillOpacity={0.1}
      aria-hidden
    >
      <path d="M819.9,178.5c-128.4,128-270.1,236.1-429.6,318L305,424.3C486.6,372.4,654.5,279.4,819.9,178.5z" />
      <path d="M1040.8,0C723.4,215,388.7,398.5,0,483.9c7.6-111.5,48.3-207.8,125.2-287.6C411.2,257.8,720.7,164.2,1040.8,0z" />
    </svg>
  );
}

export function JourneyDecorIcons() {
  return (
    <>
      <div className="home2-journey-decor home2-journey-decor--wave-top pointer-events-none absolute -top-[6%] end-[-35%] z-0 hidden md:block lg:end-[-50%]">
        <DecorWaveTop />
      </div>
      <div className="home2-journey-decor home2-journey-decor--line-center pointer-events-none absolute top-[6%] start-1/2 z-0 hidden -translate-x-1/2 lg:block">
        <DecorLineTall />
      </div>
      <div className="home2-journey-decor home2-journey-decor--line-side pointer-events-none absolute bottom-[7%] end-[3%] z-0 hidden opacity-60 lg:block">
        <DecorLineSide />
      </div>
      <div className="home2-journey-decor home2-journey-decor--wave-bottom pointer-events-none absolute -bottom-[8%] start-[-35%] z-0 md:start-[-20%] lg:start-[-50%]">
        <DecorWaveBottom />
      </div>
    </>
  );
}
