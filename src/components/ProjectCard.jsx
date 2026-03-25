import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, ExternalLink, Cpu, Code2, Wrench, ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';

const TAG_CONFIG = {
  Hardware: { icon: Cpu, color: '#00FFE7', bg: 'rgba(0,255,231,0.08)' },
  Software: { icon: Code2, color: '#FFE600', bg: 'rgba(255,230,0,0.08)' },
  IRL: { icon: Wrench, color: '#ffffff', bg: 'rgba(255,255,255,0.08)' },
};

const STATUS_CONFIG = {
  done: { label: '● DONE', color: '#00FFE7' },
  wip: { label: '◐ WIP', color: '#FFE600' },
  abandoned: { label: '○ SHELVED', color: '#666' },
};

export default function ProjectCard({ project, onClick }) {
  const { title, description, tags = [], images = [], repoUrl, liveUrl, status = 'done' } = project.data;
  const slug = project.slug;

  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg']);

  function handleMouseMove(e) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const hasImage = images && images.length > 0;
  const primaryTag = tags[0];
  const accentColor = primaryTag ? TAG_CONFIG[primaryTag]?.color : '#00FFE7';
  const statusCfg = STATUS_CONFIG[status] || STATUS_CONFIG.done;

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
      whileHover={{ z: 20 }}
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      {/* Card shell */}
      <div
        className="relative overflow-hidden border-2 border-[#222] bg-[#111] transition-all duration-200 group-hover:border-[var(--accent)] h-full flex flex-col"
        style={{ '--accent': accentColor }}
      >
        {/* Hover glow border effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ boxShadow: `inset 0 0 30px ${accentColor}15, 0 0 30px ${accentColor}20` }}
        />

        {/* Corner accent — top-left */}
        <div
          className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 transition-colors duration-200"
          style={{ borderColor: accentColor, opacity: 0.6 }}
        />
        {/* Corner accent — bottom-right */}
        <div
          className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 transition-colors duration-200"
          style={{ borderColor: accentColor, opacity: 0.6 }}
        />

        {/* Image area */}
        {hasImage ? (
          <div className="relative h-44 overflow-hidden border-b-2 border-[#222] group-hover:border-[var(--accent)] transition-colors duration-200 bg-[#0a0a0a]">
            <img
              src={images[0]}
              alt={title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            />
            {/* Scanline overlay on image */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)' }}
            />
          </div>
        ) : (
          <div className="relative h-44 border-b-2 border-[#222] bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
            {/* Placeholder grid pattern */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(${accentColor}08 1px, transparent 1px), linear-gradient(90deg, ${accentColor}08 1px, transparent 1px)`,
                backgroundSize: '24px 24px'
              }}
            />
            <span
              className="font-mono text-5xl font-black opacity-10 group-hover:opacity-20 transition-opacity select-none"
              style={{ color: accentColor }}
            >
              {title.charAt(0)}
            </span>
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 gap-3">
          {/* Status + Tags row */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex gap-1.5 flex-wrap">
              {tags.map((tag) => {
                const cfg = TAG_CONFIG[tag];
                return (
                  <span
                    key={tag}
                    className="font-mono text-[0.65rem] font-bold uppercase tracking-widest px-2 py-0.5 border"
                    style={{ borderColor: cfg.color, color: cfg.color, background: cfg.bg }}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
            <span
              className="font-mono text-[0.6rem] font-bold uppercase tracking-widest"
              style={{ color: statusCfg.color }}
            >
              {statusCfg.label}
            </span>
          </div>

          {/* Title */}
          <h3
            className="font-grotesk text-lg font-bold leading-tight group-hover:transition-colors duration-200"
            style={{ color: 'white' }}
          >
            {title}
          </h3>

          {/* Description */}
          <p className="font-mono text-xs text-[#888] leading-relaxed line-clamp-3 flex-1">
            {description}
          </p>

          {/* Footer links */}
          <div className="flex items-center justify-between pt-2 border-t border-[#1a1a1a]">
            <span
              className="font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ color: accentColor }}
            >
              View Build <ArrowUpRight size={12} />
            </span>
            <div className="flex gap-2">
              {repoUrl && (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 border border-[#333] hover:border-[#00FFE7] hover:text-[#00FFE7] text-[#666] transition-all duration-150"
                  title="View source"
                >
                  <Github size={13} />
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 border border-[#333] hover:border-[#FFE600] hover:text-[#FFE600] text-[#666] transition-all duration-150"
                  title="View live"
                >
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
