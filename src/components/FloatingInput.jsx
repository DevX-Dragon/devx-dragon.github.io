export default function FloatingInput({ id, label, type = "text", as = "input", value, onChange, required }) {
  const Tag = as;
  return (
    <div className="relative">
      <Tag
        id={id}
        name={id}
        type={as === "input" ? type : undefined}
        rows={as === "textarea" ? 4 : undefined}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" "
        className="peer w-full resize-none rounded-xl border border-hairline bg-white px-4 pb-2.5 pt-5 text-sm text-ink placeholder-transparent focus:border-indigo"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-4 origin-left text-sm text-zinc-400 transition-all
          peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo
          peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-muted"
      >
        {label}
      </label>
    </div>
  );
}
