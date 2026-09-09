import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "../effects/toastEvents";

export function ReleaseControl({
  released,
  onToggle,
}: {
  released: boolean;
  onToggle: (next: boolean) => void | Promise<void>;
}) {
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleConfirm() {
    setBusy(true);
    await onToggle(!released);
    setBusy(false);
    setConfirming(false);
    toast(!released ? "Problems released" : "Problems re-locked", {
      type: "success",
      icon: !released ? "🚀" : "🔒",
    });
  }

  return (
    <div className="border border-[#26272c] bg-[#15161a] p-8 text-center">
      <p className="text-xs text-[#8f909a] uppercase tracking-wide mb-4">Problem Statements</p>
      <p className="text-sm text-[#8f909a] mb-1">
        Status:{" "}
        <span className={released ? "text-emerald-400" : "text-amber-400"}>{released ? "RELEASED" : "LOCKED"}</span>
      </p>
      <motion.div
        className="text-4xl my-4 inline-block"
        animate={released ? {} : { y: [0, -4, 0] }}
        transition={released ? {} : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {released ? "🔓" : "🔒"}
      </motion.div>
      <div>
        <button
          onClick={() => setConfirming(true)}
          disabled={busy}
          className={`px-6 py-3 text-sm font-medium rounded-md transition-colors ${
            released ? "bg-[#26272c] text-white hover:bg-[#33343a]" : "bg-[#5b8def] text-white hover:bg-[#4a7ee0]"
          }`}
        >
          {released ? "Re-lock Problems" : "Release Problems"}
        </button>
      </div>

      <AnimatePresence>
        {confirming && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-6"
            role="dialog"
            aria-modal="true"
            onClick={() => setConfirming(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 4 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-sm w-full bg-[#15161a] border border-[#26272c] p-6 rounded-lg text-left"
            >
              <h3 className="text-white font-semibold">
                {released ? "Re-lock problem statements?" : "Release problem statements?"}
              </h3>
              <p className="mt-2 text-sm text-[#8f909a]">
                {released
                  ? "Participants will no longer be able to view the challenges."
                  : "Participants will be able to see the challenges after release."}
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setConfirming(false)}
                  className="px-4 py-2 text-sm text-[#8f909a] hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={busy}
                  className="px-4 py-2 text-sm bg-[#5b8def] text-white rounded-md hover:bg-[#4a7ee0] transition-colors"
                >
                  {busy ? "Working..." : released ? "Re-lock" : "Release"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}