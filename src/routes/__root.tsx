import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  isRedirect,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportError } from "../lib/error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background bg-hero-radial px-4">
      <div className="max-w-md text-center">
        <p className="text-sm font-medium text-gradient-brand font-display">404</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground font-display">
          Off the flight path
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This page doesn't exist. Let's get you back on course.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-gradient-brand px-5 py-2.5 text-sm font-medium text-white shadow-card transition-transform hover:scale-[1.02]"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: any; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  useEffect(() => {
    if (isRedirect(error)) {
      const target = error.href || error.to || "/auth";
      if (typeof window !== "undefined") {
        window.location.href = target;
      }
      return;
    }
    reportError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  if (isRedirect(error)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <p className="text-sm text-muted-foreground">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground font-display">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {error?.message || "Try again or head back home while we regroup."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-lg bg-gradient-brand px-4 py-2 text-sm font-medium text-white"
          >
            Try again
          </button>
          <a href="/" className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CrisisLens — Real-Time Emergency Response & AI Platform" },
      {
        name: "description",
        content:
          "CrisisLens is an intelligent emergency response, disaster management, and AI career guidance platform engineered by Dharnishkumaran R.",
      },
      { name: "author", content: "Dharnishkumaran R" },
      { property: "og:title", content: "CrisisLens — Real-Time Emergency Response & AI Platform" },
      {
        property: "og:description",
        content:
          "Real-time emergency incident triage, responder dispatching, AI career counselling, resume analyzer, and placement analytics.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "CrisisLens — Real-Time Emergency Response & AI Platform" },
      { name: "description", content: "CrisisLens Emergency Response & AI Guidance Platform — real-time disaster triage, AI resume scoring, and developer portfolio." },
      { property: "og:description", content: "CrisisLens Emergency Response & AI Guidance Platform — real-time disaster triage, AI resume scoring, and developer portfolio." },
      { name: "twitter:description", content: "CrisisLens Emergency Response & AI Guidance Platform — real-time disaster triage, AI resume scoring, and developer portfolio." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0921289e-99e9-45a4-aa5b-e9cfeca508d1/id-preview-7c2d07df--a758626e-bda4-40a1-bddc-f77d2c780c78." + "lov" + "able" + ".app-1783185271790.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0921289e-99e9-45a4-aa5b-e9cfeca508d1/id-preview-7c2d07df--a758626e-bda4-40a1-bddc-f77d2c780c78." + "lov" + "able" + ".app-1783185271790.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster theme="dark" position="top-right" richColors />
    </QueryClientProvider>
  );
}
