"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Clear any stale scroll lock state left by opened modals
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    document.body.style.overflow = "";
    delete document.body.dataset.scrollY;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
