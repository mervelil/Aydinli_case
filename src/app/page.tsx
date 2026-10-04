import OnsiteCampaign from "@/components/onsite/OnsiteCampaign";
import { DemoHeader } from "@/components/demo/DemoHeader";
import { DemoProductGrid } from "@/components/demo/DemoProductGrid";

/**
 * Demo sayfası: widget'ın gerçek bir e-ticaret sayfası üzerinde
 * (scroll, fixed konumlama, z-index) nasıl davrandığını göstermek için.
 * Asıl çalışma: src/components/onsite
 */
export default function Home() {
  return (
    <>
      <DemoHeader />
      <main className="mx-auto max-w-6xl px-4 pb-32 pt-8 md:px-8">
        <h1 className="mb-6 text-lg font-medium md:text-xl">Erkek Polo Yaka T-Shirt</h1>
        <DemoProductGrid />
      </main>
      <OnsiteCampaign />
    </>
  );
}
