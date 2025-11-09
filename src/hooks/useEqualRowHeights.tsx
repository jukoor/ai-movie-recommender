import { useEffect, useRef } from "react";

/**
 * Custom hook to ensure equal heights for grid items within each row
 * This creates a more elegant solution by calculating the tallest item in each row
 * and applying that height to all items in the same row
 */
export const useEqualRowHeights = (
  dependencies: unknown[] = [],
  enabled: boolean = true
) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !gridRef.current) return;

    const calculateEqualRowHeights = () => {
      const grid = gridRef.current;
      if (!grid) return;

      // Get all direct children (movie cards)
      const items = Array.from(grid.children) as HTMLElement[];
      if (items.length === 0) return;

      // Reset heights first
      items.forEach((item) => {
        item.style.height = "auto";
      });

      // Get grid computed styles to determine columns per row
      const gridStyles = window.getComputedStyle(grid);
      const columns = gridStyles.gridTemplateColumns.split(" ").length;

      // Group items by rows
      const rows: HTMLElement[][] = [];
      for (let i = 0; i < items.length; i += columns) {
        rows.push(items.slice(i, i + columns));
      }

      // Set equal height for each row
      rows.forEach((row) => {
        // Find the tallest item in this row
        const maxHeight = Math.max(...row.map((item) => item.offsetHeight));

        // Apply the max height to all items in the row
        row.forEach((item) => {
          item.style.height = `${maxHeight}px`;
        });
      });
    };

    // Calculate heights after a short delay to ensure content is rendered
    const timeoutId = setTimeout(calculateEqualRowHeights, 100);

    // Recalculate on window resize
    const handleResize = () => {
      // Reset heights before recalculating
      const items = Array.from(
        gridRef.current?.children || []
      ) as HTMLElement[];
      items.forEach((item) => {
        item.style.height = "auto";
      });
      setTimeout(calculateEqualRowHeights, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, [...dependencies, enabled]);

  return gridRef;
};
