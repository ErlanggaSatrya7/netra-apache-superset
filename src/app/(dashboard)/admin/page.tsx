"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { BarChart3, Lock } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
          Executive Analytics
        </h1>
        <p className="text-slate-400 font-medium">
          PT Netra Vidya Analitika - Adidas Indonesia
        </p>
      </div>

      {/* Placeholder Box Apache Superset */}
      <Card className="bg-slate-900/40 border-2 border-dashed border-slate-800 backdrop-blur-md overflow-hidden min-h-[650px] flex flex-col">
        <CardHeader className="bg-slate-950/50 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <BarChart3 className="text-blue-500 h-6 w-6" />
            <div>
              <CardTitle className="text-white">
                Apache Superset Integration
              </CardTitle>
              <CardDescription>
                Visualisasi data global akan ditampilkan di sini
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col items-center justify-center text-center p-10">
          <div className="h-20 w-20 rounded-full bg-slate-800 flex items-center justify-center mb-6 animate-pulse">
            <Lock className="h-10 w-10 text-slate-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-400 mb-2 underline decoration-blue-500 decoration-4 underline-offset-8">
            RESERVED FOR APACHE SUPERSET
          </h2>
          <p className="text-slate-500 max-w-sm">
            Halaman ini sedang disiapkan untuk koneksi database dan Iframe
            Apache Superset. Modul visualisasi otomatis akan aktif setelah
            sinkronisasi database selesai.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4 w-full max-w-lg">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 bg-slate-800/20 rounded-xl border border-slate-800/50 border-dashed"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
