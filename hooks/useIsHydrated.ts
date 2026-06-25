"use client";

import { useEffect, useState } from "react";

/** True after the first client render — use to defer motion `initial` until hydration completes. */
export function useIsHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}

/** Defer motion enter variants until after hydration to avoid SSR/client mismatches. */
export function hydratedInitial<T>(hydrated: boolean, value: T): T | false {
  return hydrated ? value : false;
}
