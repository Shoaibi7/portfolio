import { ButtonLink, Container } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">This page doesn&apos;t exist.</h1>
      <p className="mt-3 text-ink-2">The link may be outdated. The work is still here.</p>
      <div className="mt-8 flex justify-center">
        <ButtonLink href="/#work">View selected work</ButtonLink>
      </div>
    </Container>
  );
}
