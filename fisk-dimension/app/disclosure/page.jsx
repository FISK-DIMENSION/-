"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DisclosurePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#0f0c29] to-[#302b63] text-white p-6">
      <h1 className="text-3xl font-extrabold text-emerald-400 mb-6 text-center">
        🔱 FISK DIMENSION PUBLIC DISCLOSURE
      </h1>

      <Card className="bg-black/40 border border-emerald-500 rounded-xl mb-8">
        <CardContent className="p-4">
          <iframe
            src="/FISK_DIMENSION_Public_Disclosure_Report.pdf"
            className="w-full h-[80vh] rounded-lg border border-emerald-600"
            title="Public Disclosure Report"
          />
          <div className="text-center mt-4">
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
              <a href="/FISK_DIMENSION_Public_Disclosure_Report.pdf" download>
                📥 Download Public Report
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
