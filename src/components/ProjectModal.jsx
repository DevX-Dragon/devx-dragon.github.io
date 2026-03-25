import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Cpu, Code2, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';

const TAG_CONFIG = {
  Hardware: { icon: Cpu, color: '#00FFE7' },
  Software: { icon: Code2, color: '#FFE600' },
  IRL: { icon: Wrench, color: '#ffffff' },
};

export default function ProjectModal({ project, onClose }) {
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;
  const { title, description, tags = [], images = [], repoUrl, liveUrl, status = 'done' } = project.data;
  const primaryTag = tags[0];
  const accentColor = primaryTag ? TAG_CONFIG[primaryTag]?.color : '#00FFE7';

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full sm:max-w-3xl max-h-[92vh] overflow-y-auto bg-[#0e0e0e] border-2 border-[#222] sm:border-[var(--accent)] font-grotesk"
          style={{ '--accent': accentColor }}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '60%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 z-10" style={{ borderColor: accentColor }} />
          <div className="absolute top-0 right-12 w-5 h-5 border-t-2 border-r-2 z-10" style={{ borderColor: accentColor }} />
          <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 z-10" style={{ borderColor: accentColor }} />
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 z-10" style={{ borderColor: accentColor }} />

          {/* Header bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b-2 border-[#1a1a1a] sticky top-0 bg-[#0e0e0e] z-20">
            <span
              className="font-mono text-xs font-bold uppercase tracking-widest"
              style={{ color: accentColor }}
            >
              // PROJECT LOG
            </span>
            <button
              onClick={onClose}
              className="p-1.5 border border-[#333] hover:border-[#ff4444] hover:text-[#ff4444] text-[#666] transition-all duration-150"
            >
              <X size={14} />
            </button>
          </div>

          {/* Image gallery */}
          {images.length > 0 && (
            <div className="relative">
              <div className="relative h-56 sm:h-80 overflow-hidden bg-[#070707]">
                <img
                  src={images[imgIdx]}
                  alt={`${title} — image ${imgIdx + 1}`}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: `linear-gradient(to top, #0e0e0e 0%, transparent 50%)` }}
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 absolute bottom-4 left-1/2 -translate-x-1/2">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      className="w-2 h-2 border transition-all duration-150"
                      style={{
                        borderColor: accentColor,
                        background: i === imgIdx ? accentColor : 'transparent',
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-5 sm:p-8 flex flex-col gap-5">
            {/* Tags */}
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag) => {
                const cfg = TAG_CONFIG[tag];
                const Icon = cfg?.icon;
                return (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 border"
                    style={{ borderColor: cfg.color, color: cfg.color }}
                  >
                    {Icon && <Icon size={11} />}
                    {tag}
                  </span>
                );
              })}
              <span className="font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 border border-[#333] text-[#555]">
                {status}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-grotesk text-2xl sm:text-4xl font-black leading-tight text-white">
              {title}
            </h2>

            {/* Description */}
            <p className="font-mono text-sm text-[#aaa] leading-relaxed">
              {project.body || description}
            </p>

            {/* Action buttons */}
            <div className="flex gap-3 flex-wrap pt-2">
              {repoUrl && (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-lab"
                >
                  <Github size={14} />
                  Source Code
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-lab"
                  style={{ '--btn-color': '#FFE600', borderColor: '#FFE600', color: '#FFE600' }}
                >
                  <ExternalLink size={14} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
