import { PillLink } from "@/components/cards";

export default function NotFound() {
  return (
    <div className="container-site flex flex-col items-start py-24">
      <p className="text-sm text-subtle">404</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">This page wandered off.</h1>
      <p className="mt-2 max-w-md text-[15px] text-muted">
        The link is broken, or I deleted something I should not have. Either way, the homepage still works.
      </p>
      <div className="mt-6">
        <PillLink href="/">Back home</PillLink>
      </div>
    </div>
  );
}
