import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function Toast({ message, show }) {
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.22 }}
            role="status"
            className="glass shadow-glass-lg flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-ink"
          >
            <CheckCircle2 size={17} className="text-emerald" />
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
