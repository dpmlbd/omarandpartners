"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { RiCloseLine } from "@remixicon/react";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: "left" | "right";
  topOffset?: string;
}

export function Sheet({ open, onClose, children, side = "left", topOffset = "0px" }: SheetProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isRight = side === "right";

  const content = (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute bg-black/40 backdrop-blur-sm"
            style={{ top: topOffset, left: 0, right: 0, bottom: 0 }}
            onClick={onClose}
          />
          <motion.div
            initial={{ x: isRight ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: isRight ? "100%" : "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={`absolute ${isRight ? "right-0" : "left-0"} bottom-0 w-[300px] bg-background ${isRight ? "border-l" : "border-r"} border-border shadow-2xl`}
            style={{ top: topOffset }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Close menu"
            >
              <RiCloseLine size={24} />
            </button>
            <div className="p-8 pt-16">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (typeof document !== "undefined") {
    return createPortal(content, document.body);
  }
  return content;
}
