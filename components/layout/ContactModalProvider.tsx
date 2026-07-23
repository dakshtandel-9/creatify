"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ContactModal } from "@/components/ui/ContactModal";
import type { ContactContent } from "@/types/cms";

type ContactModalContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) throw new Error("useContactModal must be used within ContactModalProvider");
  return ctx;
}

type ContactModalProviderProps = {
  content: ContactContent;
  children: React.ReactNode;
};

/**
 * Intercepts every in-page `href="#contact"` link (nav CTA, hero, inline
 * "want to discuss?" prompts, etc.) so they open the modal instead of
 * jumping to an anchor. Lets existing call sites stay untouched.
 */
export function ContactModalProvider({ content, children }: ContactModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href="#contact"]');
      if (!anchor) return;
      event.preventDefault();
      open();
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [open]);

  return (
    <ContactModalContext.Provider value={{ isOpen, open, close }}>
      {children}
      <ContactModal content={content} isOpen={isOpen} onClose={close} />
    </ContactModalContext.Provider>
  );
}
