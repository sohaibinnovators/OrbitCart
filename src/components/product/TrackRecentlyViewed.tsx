"use client";

import { useEffect } from "react";
import { trackRecentlyViewed } from "@/src/lib/recently-viewed";

export function TrackRecentlyViewed({ productId }: { productId: string }) {
  useEffect(() => {
    trackRecentlyViewed(productId);
  }, [productId]);
  return null;
}
