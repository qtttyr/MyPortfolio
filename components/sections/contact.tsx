"use client";

import { profile, socials } from "@/content";
import type { CSSVars } from "@/lib/cn";

const d = (ms: number): CSSVars => ({ "--d": ms });

export function Contact({ onRestart }: { onRestart: () => void }) {
  const year = new Date().getFullYear();

  return (
    <div className="flex h-full flex-col justify-between gap-8">
      <div
        data-reveal
        style={d(0)}
        className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        <span>Available for select work</span>
      </div>

      <div className="flex flex-col gap-6">
        <h2
          data-reveal
          style={d(90)}
          className="font-display text-[clamp(2.5rem,11vw,9rem)] leading-[0.9] tracking-[-0.02em]"
        >
          Let&rsquo;s <em className="text-accent italic">talk</em>
        </h2>

        <a
          data-reveal
          style={d(190)}
          href={`mailto:${profile.email}`}
          className="link-underline w-fit font-mono text-[clamp(0.85rem,2.3vw,1.4rem)] tracking-[0.04em]"
        >
          {profile.email}
        </a>
      </div>

      <div
        data-reveal
        style={d(300)}
        className="flex flex-wrap items-end justify-between gap-6 border-t border-line pt-6"
      >
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {socials.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="link-underline font-mono text-[11px] uppercase tracking-[0.22em]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
          <span>{profile.location}</span>
          <span>© {year}</span>
          <button
            type="button"
            onClick={onRestart}
            className="transition-colors hover:text-accent"
          >
            ↑ Back to start
          </button>
        </div>
      </div>
    </div>
  );
}
