import type { Metadata } from "next";

const title =
  "Interactive comments section solution - Frontend Mentor | Junayed Akbor";
const description =
  "This is a solution for the Interactive comments section by Junayed Akbor on the Frontend Mentor.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://interactive-comments-segment.netlify.app"),
  icons: [{ rel: "icon", url: "/favicon.png", type: "image/png" }],
  openGraph: {
    title,
    description,
    url: "/",
    type: "website",
    locale: "en_US",
    siteName: "Interactive comments section",
    images: { type: "image/png", url: "/og.png", width: 1515, height: 852 },
  },
};
