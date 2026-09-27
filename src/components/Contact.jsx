import { useState } from "react";
import confetti from "canvas-confetti";
import { Send } from "lucide-react";
import FloatingInput from "./FloatingInput.jsx";
import MagneticButton from "./MagneticButton.jsx";
import Toast from "./Toast.jsx";

const initialForm = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [showToast, setShowToast] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // This is a static site with no backend — the form is wired for visual
    // feedback only. Wire it to your own endpoint (Formspree, Resend, etc.)
    // before relying on it to actually deliver messages.
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#4F46E5", "#10B981", "#A5B4FC"],
    });
    setShowToast(true);
    setForm(initialForm);
    setTimeout(() => setShowToast(false), 3200);
  }

  return (
    <section id="contact" className="bg-white px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink">
          Let's build something
        </h2>
        <p className="mt-2 text-[15px] text-muted">
          Open for freelance work and full-time roles alike. Send a note and
          I'll get back to you within a couple of days.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <FloatingInput id="name" label="Your name" value={form.name} onChange={handleChange} required />
            <FloatingInput id="email" label="Email" type="email" value={form.email} onChange={handleChange} required />
          </div>
          <FloatingInput id="message" label="What are you building?" as="textarea" value={form.message} onChange={handleChange} required />

          <MagneticButton
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-indigo px-6 py-3 text-sm font-medium text-white"
          >
            Send message <Send size={15} />
          </MagneticButton>
        </form>
      </div>

      <Toast show={showToast} message="Message sent — talk soon!" />
    </section>
  );
}
