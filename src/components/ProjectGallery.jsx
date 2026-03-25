import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

const ALL_TAGS = ['Hardware', 'Software', 'IRL'];

export default function ProjectGallery({ projects }) {
  const [search, setSearch] = useState('');
  const [activeTags, setActiveTags] = useState([]);
  const [selected, setSelected] = useState(null);

  function toggleTag(tag) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        !search ||
        p.data.title.toLowerCase().includes(search.toLowerCase()) ||
        p.data.description.toLowerCase().includes(search.toLowerCase()) ||
        p.data.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchesTags =
        activeTags.length === 0 ||
        activeTags.every((tag) => p.data.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [projects, search, activeTags]);

  return (
    <section id="projects" className="py-16 px-4 sm:px-6 grid-bg">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-start justify-between mb-10 flex-wrap gap-4">
          <div>
            <span className="font-mono text-xs text-[#00FFE7] uppercase tracking-widest mb-2 block">
              // BUILDS &amp; EXPERIMENTS
            </span>
            <h2 className="font-grotesk text-4xl sm:text-5xl font-black text-white leading-none">
              THE LAB<span className="text-[#00FFE7]">.</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-[#444] pt-2">
            <span className="text-[#00FFE7]">{filtered.length}</span>/{projects.length} builds loaded
          </div>
        </div>

        {/* Search + Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {/* Search input */}
          <div className="relative flex-1">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444] pointer-events-none"
            />
            <input
              type="text"
              placeholder="search builds..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0d0d0d] border-2 border-[#222] pl-9 pr-4 py-2.5 font-mono text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#00FFE7] transition-colors duration-150"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] hover:text-[#00FFE7] transition-colors"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Tag filters */}
          <div className="flex gap-2 items-center flex-wrap">
            {ALL_TAGS.map((tag) => {
              const isActive = activeTags.includes(tag);
              const colorMap = {
                Hardware: '#00FFE7',
                Software: '#FFE600',
                IRL: '#ffffff',
              };
              const color = colorMap[tag];
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className="font-mono text-xs font-bold uppercase tracking-widest px-3 py-2 border-2 transition-all duration-150"
                  style={{
                    borderColor: color,
                    color: isActive ? '#080808' : color,
                    background: isActive ? color : 'transparent',
                    boxShadow: isActive ? `0 0 12px ${color}40` : 'none',
                  }}
                >
                  {tag}
                </button>
              );
            })}
            {activeTags.length > 0 && (
              <button
                onClick={() => setActiveTags([])}
                className="font-mono text-xs text-[#555] hover:text-[#ff4444] uppercase tracking-widest transition-colors"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              filtered.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  onClick={() => setSelected(project)}
                />
              ))
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center"
              >
                <p className="font-mono text-[#444] text-sm">
                  // no builds match &quot;{search}&quot; — try something else
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
