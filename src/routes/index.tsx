import { createFileRoute } from "@tanstack/react-router";
import Proposal from "@/components/proposal/Proposal";

export const Route = createFileRoute("/")({
  component: Proposal,
  head: () => ({
    meta: [
      { title: "For Hawa." },
      { name: "description", content: "Something I've been meaning to say. — W." },
      { property: "og:title", content: "For Hawa." },
      { property: "og:description", content: "Something I've been meaning to say. — W." },
    ],
  }),
});
