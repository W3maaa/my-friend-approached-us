import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { proposal } from "@/config/proposal";

/* ------------------------------ tiny atoms ------------------------------ */

function Dot() {
  return <span className="inline-block h-1 w-1 rounded-full bg-primary align-middle" />;
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
      <Dot />
      <span>{children}</span>
    </div>
  );
}

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`relative mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center px-6 py-24 sm:px-10 ${className}`}
    >
      {children}
    </section>
  );
}

function Reveal({
  children,
  delay = 0,
  y = 14,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* --------------------------- phone-call motif --------------------------- */

function IncomingCall({
  label = "Unknown Caller",
  sub = "incoming call",
  hint,
}: {
  label?: string;
  sub?: string;
  hint?: string;
}) {
  return (
    <div className="mx-auto w-full max-w-xs rounded-2xl border border-border bg-card/70 p-4 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary/15">
          <span className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="relative text-primary">
            <path
              d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex-1">
          <div className="text-sm text-foreground">{label}</div>
          <div className="text-xs text-muted-foreground">{sub}</div>
        </div>
      </div>
      {hint && <div className="mt-3 text-[11px] text-muted-foreground italic">{hint}</div>}
    </div>
  );
}

/* ------------------------------- sections ------------------------------- */

function Opening({ onBegin }: { onBegin: () => void }) {
  return (
    <Section className="items-center text-center">
      <Reveal>
        <Kicker>a note, for one person only</Kicker>
      </Reveal>
      <Reveal delay={0.15}>
        <h1 className="mt-6 font-serif text-5xl leading-[1.05] sm:text-7xl">
          {proposal.her},<br />
          before you continue —
        </h1>
      </Reveal>
      <Reveal delay={0.4}>
        <p className="mx-auto mt-8 max-w-md text-base text-muted-foreground sm:text-lg">
          promise you won&apos;t judge how much thought went into this. it&apos;s either going to be
          really cute, or the most elaborate way anyone has ever made a very simple question
          slightly complicated.
        </p>
      </Reveal>
      <Reveal delay={0.7}>
        <button
          onClick={onBegin}
          className="mt-12 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          okay, keep going
          <span aria-hidden>→</span>
        </button>
      </Reveal>
      <Reveal delay={1}>
        <div className="mt-16 font-hand text-lg text-primary">— {proposal.him}</div>
      </Reveal>
    </Section>
  );
}

function HowItStarted() {
  const steps = [
    { n: "01", t: "I saw you.", s: "across the room. that's the whole first step." },
    {
      n: "02",
      t: "I was going to come talk to you.",
      s: "I had a whole plan. it was going to be smooth. probably.",
    },
    {
      n: "03",
      t: "My phone rang.",
      s: "an important call. the timing was, objectively, criminal.",
      call: true,
    },
    { n: "04", t: "I panicked.", s: "quietly. professionally. on the inside." },
    {
      n: "05",
      t: "So I sent my friend.",
      s: "shoutout to the man who did the approaching on my behalf. real one.",
    },
    { n: "06", t: "And somehow… it worked.", s: "which is how you ended up here, reading this." },
  ];

  return (
    <Section>
      <Reveal>
        <Kicker>how it started</Kicker>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-5xl">
          Some stories begin perfectly. <span className="text-muted-foreground">Ours…</span>{" "}
          <em className="text-primary">didn&apos;t.</em>
        </h2>
      </Reveal>

      <ol className="mt-14 space-y-10">
        {steps.map((step, i) => (
          <Reveal key={step.n} delay={0.05 * i}>
            <li className="grid grid-cols-[auto_1fr] gap-6">
              <div className="font-serif text-2xl text-primary/70">{step.n}</div>
              <div>
                <div className="font-serif text-2xl leading-snug sm:text-3xl">{step.t}</div>
                <div className="mt-1 text-sm text-muted-foreground sm:text-base">{step.s}</div>
                {step.call && (
                  <div className="mt-5">
                    <IncomingCall
                      label="Important Call"
                      sub="incoming — worst timing imaginable"
                      hint="delegating approach…"
                    />
                  </div>
                )}
              </div>
            </li>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={0.2}>
        <p className="mt-16 text-sm text-muted-foreground italic">
          special thanks to the friend who had to do the approaching because my phone chose
          violence.
        </p>
      </Reveal>
    </Section>
  );
}

function LittleThings() {
  const bits = [
    "you don't perform around me.",
    "you don't shrink either.",
    "you're just… you. and it turns out that's the part I like most.",
    "you make it easy to stop trying to be someone.",
    "being around you feels quiet in a good way.",
  ];
  return (
    <Section>
      <Reveal>
        <Kicker>the small stuff</Kicker>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-5xl">
          Things I&apos;ve noticed,<br />
          <span className="text-muted-foreground">without meaning to.</span>
        </h2>
      </Reveal>

      <ul className="mt-14 space-y-6">
        {bits.map((b, i) => (
          <Reveal key={i} delay={0.08 * i}>
            <li className="border-l border-border pl-5 font-serif text-2xl leading-snug sm:text-3xl">
              {b}
            </li>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

function TheFeeling() {
  return (
    <Section className="items-start">
      <Reveal>
        <Kicker>the feeling</Kicker>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-10 font-serif text-3xl leading-relaxed sm:text-4xl">
          I don&apos;t have a clean way to say this, so I&apos;ll just say it —
        </p>
      </Reveal>
      <Reveal delay={0.5}>
        <p className="mt-8 font-serif text-3xl leading-relaxed text-primary sm:text-4xl">
          when it&apos;s just us, something in me stops holding its breath.
        </p>
      </Reveal>
      <Reveal delay={0.9}>
        <p className="mt-8 max-w-lg text-base text-muted-foreground sm:text-lg">
          not in a dramatic way. more like — I like the version of me that shows up around you. I
          didn&apos;t know I was looking for that until it was there.
        </p>
      </Reveal>
    </Section>
  );
}

function Letter({ onContinue }: { onContinue: () => void }) {
  return (
    <Section>
      <Reveal>
        <Kicker>a small letter</Kicker>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-8 rounded-2xl border border-border bg-card/40 p-8 backdrop-blur-sm sm:p-10">
          <div className="font-hand text-2xl text-primary">Hey {proposal.her},</div>

          <div className="mt-6 space-y-5 font-serif text-lg leading-relaxed text-foreground/90 sm:text-xl">
            <p>
              I&apos;m not going to try to write a perfect version of this. every draft I did in my
              head sounded like something off the internet, and you deserve better than that.
            </p>
            <p>
              you already know how this whole thing started. I saw you first. I was going to walk
              over. my phone decided that exact second was a good time to matter. and instead of
              me, you got my friend — sent in like a very underpaid ambassador.
            </p>
            <p>
              honestly? I&apos;m glad it happened that way. a smoother version of that story
              probably wouldn&apos;t be ours.
            </p>
            <p>
              here&apos;s the part I actually wanted to say. I like who you are. not a polished
              version, not a highlight-reel version — you. and I like who I am when I&apos;m next
              to you. that&apos;s not a small thing to me.
            </p>
            <p>
              I don&apos;t want to keep quietly wondering where this could go. I&apos;d rather just
              ask.
            </p>
          </div>

          <div className="mt-8 font-hand text-2xl text-primary">— {proposal.him}</div>
        </div>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="mt-12 flex justify-center">
          <button
            onClick={onContinue}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            there&apos;s one more thing
            <span aria-hidden>→</span>
          </button>
        </div>
      </Reveal>
    </Section>
  );
}

/* ------------------------- the question (modal-ish) ------------------------- */

function TheQuestion({
  onYes,
  onThink,
}: {
  onYes: () => void;
  onThink: () => void;
}) {
  const [stage, setStage] = useState(0);
  // stages: 0 name, 1 preface, 2 three-lines, 3 the question + buttons
  useEffect(() => {
    if (stage >= 3) return;
    const delays = [1400, 2600, 3800];
    const t = setTimeout(() => setStage((s) => s + 1), delays[stage]);
    return () => clearTimeout(t);
  }, [stage]);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-lg text-center">
        <AnimatePresence mode="wait">
          {stage === 0 && (
            <motion.h2
              key="name"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.9 }}
              className="font-serif text-6xl sm:text-8xl"
            >
              {proposal.her}.
            </motion.h2>
          )}
          {stage === 1 && (
            <motion.p
              key="preface"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.9 }}
              className="font-serif text-3xl leading-snug sm:text-4xl"
            >
              there&apos;s something I&apos;ve been meaning to ask you.
            </motion.p>
          )}
          {stage === 2 && (
            <motion.div
              key="three"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-3 font-serif text-2xl leading-relaxed sm:text-3xl"
            >
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                I really like you.
              </motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
                I like who I am when I&apos;m with you.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7 }}
                className="text-primary"
              >
                I like what we have.
              </motion.p>
            </motion.div>
          )}
          {stage === 3 && (
            <motion.div
              key="q"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1 }}
            >
              <h1 className="font-serif text-5xl leading-tight sm:text-7xl">
                Will you be<br />my girlfriend?
              </h1>

              <div className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <button
                  onClick={onYes}
                  className="w-full rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground transition-transform hover:scale-[1.03] sm:w-auto"
                >
                  yes
                </button>
                <button
                  onClick={onThink}
                  className="w-full rounded-full border border-border px-8 py-4 text-base text-foreground transition-colors hover:border-primary hover:text-primary sm:w-auto"
                >
                  let me think about it
                </button>
              </div>
              <p className="mt-8 text-xs text-muted-foreground">
                no wrong answer. no pressure. take the time you need.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Yes({ onReset }: { onReset: () => void }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-background px-6">
      {/* subtle ember embers — no confetti storm */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary"
            initial={{ y: "110%", x: `${(i * 53) % 100}%`, opacity: 0 }}
            animate={{ y: "-10%", opacity: [0, 1, 0] }}
            transition={{ duration: 6 + (i % 5), delay: i * 0.25, repeat: Infinity, ease: "easeOut" }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative w-full max-w-lg text-center"
      >
        <Kicker>officially a thing</Kicker>
        <h2 className="mt-6 font-serif text-5xl leading-tight sm:text-7xl">
          so… this is real now.
        </h2>
        <p className="mt-8 font-serif text-xl leading-relaxed text-foreground/90 sm:text-2xl">
          very glad I built a whole website instead of just asking normally. and very, very glad
          it was you on the other end of it.
        </p>
        <p className="mt-6 text-sm text-muted-foreground">
          I&apos;ll take it from here. — {proposal.him}
        </p>
        <button
          onClick={onReset}
          className="mt-12 text-xs text-muted-foreground underline underline-offset-4 hover:text-primary"
        >
          read it again
        </button>
      </motion.div>
    </div>
  );
}

function Think({ onReset }: { onReset: () => void }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-background px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-md text-center"
      >
        <Kicker>completely okay</Kicker>
        <h2 className="mt-6 font-serif text-5xl leading-tight sm:text-6xl">that&apos;s okay.</h2>
        <p className="mt-8 font-serif text-xl leading-relaxed text-foreground/90 sm:text-2xl">
          I meant every word. I just wanted you to know. no pressure, no rush — whenever
          you&apos;re ready, or not.
        </p>
        <p className="mt-6 text-sm text-muted-foreground">— {proposal.him}</p>
        <button
          onClick={onReset}
          className="mt-12 text-xs text-muted-foreground underline underline-offset-4 hover:text-primary"
        >
          read it again
        </button>
      </motion.div>
    </div>
  );
}

/* --------------------------------- root --------------------------------- */

type Phase = "scroll" | "question" | "yes" | "think";

export default function Proposal() {
  const [phase, setPhase] = useState<Phase>("scroll");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const beginRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={scrollRef} className="grain relative min-h-screen">
      {/* progress line */}
      <motion.div
        style={{ scaleX: barScale, transformOrigin: "0% 50%" }}
        className="fixed left-0 right-0 top-0 z-30 h-[2px] bg-primary/70"
      />

      {/* soft ambient warmth */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        <Opening
          onBegin={() =>
            beginRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        />
        <div ref={beginRef} />
        <HowItStarted />
        <LittleThings />
        <TheFeeling />
        <Letter onContinue={() => setPhase("question")} />
        <footer className="pb-16 pt-4 text-center text-[11px] tracking-widest text-muted-foreground uppercase">
          made by hand · for {proposal.her}
        </footer>
      </div>

      <AnimatePresence>
        {phase === "question" && (
          <motion.div
            key="q"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <TheQuestion onYes={() => setPhase("yes")} onThink={() => setPhase("think")} />
          </motion.div>
        )}
        {phase === "yes" && (
          <motion.div
            key="y"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Yes onReset={() => setPhase("scroll")} />
          </motion.div>
        )}
        {phase === "think" && (
          <motion.div
            key="t"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Think onReset={() => setPhase("scroll")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
