/* Updated file: src/app/layout.tsx */

import "~/styles/globals.css";
import "@uploadthing/react/styles.css";
import { ClerkProvider } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TopNav from "./_components/topnav";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { Toaster } from "sonner";
import { PostHogProvider } from "./_analytics/provider";

export const metadata: Metadata = {
	title: "Musebound",
	description: "Mused by Voor",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter-sans",
});

export default function RootLayout(props: { children: React.ReactNode; modal: React.ReactNode; }) {
	return (
		<ClerkProvider>
			<PostHogProvider>
				<html lang="en">
					<NextSSRPlugin
						/**
						 * The `extractRouterConfig` will extract **only** the route configs
						 * from the router to prevent additional information from being
						 * leaked to the client. The data passed to the client is the same
						 * as if you were to fetch `/api/uploadthing` directly.
						 */
						routerConfig={extractRouterConfig(ourFileRouter)}
					/>
					<body className={`font-sans ${inter.variable} dark`}>
						<div className="grid h-screen grid-rows-[auto,1fr]">
							<TopNav />
							<main className="overflow-y-scroll">{props.children}</main>
						</div>
						{props.modal}
						<div id="modal-root" />
						<Toaster />
					</body>
				</html>
			</PostHogProvider>
		</ClerkProvider>
	);
}


/* Updated file: next.config.js */

const nextConfig = {
	// You can add your other Next.js config options here
	async rewrites() {
		return [
			{
				source: "/ingest/static/:path*",
				destination: "https://us-assets.i.posthog.com/static/:path*"
			},
			{
				source: "/ingest/:path*",
				destination: "https://us.i.posthog.com/:path*"
			},
			{
				source: "/ingest/decide",
				destination: "https://us.i.posthog.com/decide"
			}
		];
	},
	// Required to support PostHog trailing slash API requests
	skipTrailingSlashRedirect: true,
};

export { nextConfig };
