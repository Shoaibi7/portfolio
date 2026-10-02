"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navItems, site } from "@/data/site";
import { CloseIcon, GitHubIcon, LinkedInIcon, MenuIcon } from "@/components/ui/icons";
import { ButtonLink, Container } from "@/components/ui/primitives";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-canvas/85 backdrop-blur-md supports-[backdrop-filter]:bg-canvas/75">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-2.5" onClick={close}>
          <span
            aria-hidden
            className="grid size-8 place-items-center rounded-lg bg-ink font-mono text-[13px] font-semibold text-white transition-colors group-hover:bg-accent"
          >
            MS
          </span>
          <span className="text-[15px] font-semibold tracking-tight">{site.name}</span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3 py-2 text-sm text-ink-2 transition-colors hover:bg-subtle hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-1 md:flex">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (opens in a new tab)"
            className="grid size-9 place-items-center rounded-full text-ink-2 transition-colors hover:bg-subtle hover:text-ink"
          >
            <GitHubIcon />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile (opens in a new tab)"
            className="grid size-9 place-items-center rounded-full text-ink-2 transition-colors hover:bg-subtle hover:text-ink"
          >
            <LinkedInIcon />
          </a>
          <ButtonLink href="/#contact" className="ml-2 px-4 py-2">
            Let&apos;s talk
          </ButtonLink>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="grid size-10 place-items-center rounded-full text-ink md:hidden hover:bg-subtle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon width={22} height={22} /> : <MenuIcon width={22} height={22} />}
        </button>
      </Container>

      <div id="mobile-menu" hidden={!open} className="border-t border-line bg-canvas md:hidden">
        <Container className="py-4">
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="block rounded-lg px-2 py-3 text-base text-ink hover:bg-subtle"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-4 flex items-center gap-2 border-t border-line pt-4">
            <ButtonLink href="/#contact" onClick={close} className="flex-1">
              Let&apos;s talk
            </ButtonLink>
            <ButtonLink href={site.github} external variant="secondary" aria-label="GitHub profile (opens in a new tab)" className="px-3">
              <GitHubIcon />
            </ButtonLink>
            <ButtonLink href={site.linkedin} external variant="secondary" aria-label="LinkedIn profile (opens in a new tab)" className="px-3">
              <LinkedInIcon />
            </ButtonLink>
          </div>
        </Container>
      </div>
    </header>
  );
}
