import { useParams } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

/**
 * Dynamic MDX page renderer.
 *
 * Any .mdx file added to src/content/pages/ on GitHub automatically
 * becomes a route at /{filename-without-extension}.
 *
 * Example: src/content/pages/learn.mdx → /learn
 *
 * To add a new page:
 *  1. Create the .mdx file in src/content/pages/ on GitHub
 *  2. Sync runs automatically on next dev server start or deploy
 *  3. The route is live — no code changes needed
 */

// Vite bundles all MDX files in pages/ at build time via import.meta.glob.
// Adding a new .mdx file to the directory makes it available here automatically.
const pages = import.meta.glob("../content/pages/*.mdx", { eager: true }) as Record<
  string,
  { default: React.ComponentType }
>;

function slugToPath(slug: string): string {
  return `../content/pages/${slug}.mdx`;
}

export default function MdxPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? "";
  const key = slugToPath(slug);
  const mod = pages[key];

  if (!mod) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-32 pb-24 max-w-3xl mx-auto px-6">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">Page not found</h1>
          <p className="text-lg text-foreground/60 mb-8">
            No page exists at <code className="bg-muted px-2 py-1 rounded text-sm">/{slug}</code>.
            Add <code className="bg-muted px-2 py-1 rounded text-sm">src/content/pages/{slug}.mdx</code> to
            your GitHub repo and sync to create it.
          </p>
          <a href="/" className="text-primary font-semibold hover:underline">← Back to home</a>
        </main>
        <Footer />
      </div>
    );
  }

  const PageContent = mod.default;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-32 pb-24 max-w-3xl mx-auto px-6">
        <div className="prose prose-lg prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-primary prose-strong:text-foreground max-w-none">
          <PageContent />
        </div>
        <div className="mt-16 pt-8 border-t border-border">
          <a href="/" className="text-primary font-semibold hover:underline">← Back to home</a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
