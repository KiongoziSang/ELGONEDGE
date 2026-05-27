"use client";

import { Check, Copy, Facebook, Linkedin, Send, Twitter } from "lucide-react";
import { useMemo, useState } from "react";

type ShareButtonsProps = {
  title: string;
  url: string;
};

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = useMemo(
    () => [
      {
        label: "LinkedIn",
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        icon: Linkedin
      },
      {
        label: "X",
        href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        icon: Twitter
      },
      {
        label: "Facebook",
        href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        icon: Facebook
      },
      {
        label: "WhatsApp",
        href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
        icon: Send
      }
    ],
    [encodedTitle, encodedUrl]
  );

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Share article</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${item.label}`}
              title={`Share on ${item.label}`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-brand-navy transition hover:-translate-y-0.5 hover:border-brand-blue hover:bg-white hover:text-brand-blue hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </a>
          );
        })}
        <button
          type="button"
          onClick={() => void copyLink()}
          aria-label="Copy article link"
          title="Copy article link"
          className="inline-flex h-11 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 text-sm font-black text-brand-navy transition hover:-translate-y-0.5 hover:border-brand-blue hover:bg-white hover:text-brand-blue hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
        >
          {copied ? <Check className="h-5 w-5" aria-hidden="true" /> : <Copy className="h-5 w-5" aria-hidden="true" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}
