import { Suspense } from "react";
import { CreatePageContent } from "./create-content";
import { Loader2 } from "lucide-react";

function CreatePageFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

export default function CreatePage() {
  return (
    <Suspense fallback={<CreatePageFallback />}>
      <CreatePageContent />
    </Suspense>
  );
}
