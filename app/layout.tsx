import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SDH Systems — Staffing & Technology Services",
  description:
    "SDH Systems is a 300-person delivery team across India and the USA. We build software, deploy AI agents, staff enterprise programs, and ship SOW projects for state, private-sector, and Workday clients.",
  openGraph: {
    title: "SDH Systems — Staffing & Technology Services",
    description:
      "We engineer talent, platforms, AI systems, Workday, and delivery that ships.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
