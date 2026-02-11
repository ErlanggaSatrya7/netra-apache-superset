"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileSpreadsheet,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function HistoryPage() {
  const historyData = [
    {
      id: 1,
      file: "Adidas_Sumatera_Jan26.xlsx",
      date: "11 Feb 2026",
      status: "Pending",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      icon: Clock,
    },
    {
      id: 2,
      file: "Adidas_Kalimantan_Dec25.csv",
      date: "05 Feb 2026",
      status: "Approved",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      icon: CheckCircle2,
    },
    {
      id: 3,
      file: "Adidas_Retail_Data_Old.xlsx",
      date: "01 Feb 2026",
      status: "Rejected",
      color: "text-red-500",
      bg: "bg-red-500/10",
      icon: XCircle,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            Upload History
          </h1>
          <p className="text-slate-400 font-medium">
            Lacak status verifikasi data Adidas Anda
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Cari file..."
            className="pl-10 bg-slate-900/50 border-slate-800 text-white"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {historyData.map((item) => (
          <Card
            key={item.id}
            className="bg-slate-900/40 border-slate-800 backdrop-blur-md transition-all hover:bg-slate-800/40"
          >
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="h-12 w-12 bg-slate-950 rounded-xl flex items-center justify-center border border-slate-800">
                  <FileSpreadsheet className="h-6 w-6 text-slate-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {item.file}
                  </h3>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                    Diunggah: {item.date}
                  </p>
                </div>
              </div>

              <Badge
                className={`${item.bg} ${item.color} border-none px-4 py-1.5 rounded-full flex gap-2 items-center`}
              >
                <item.icon className="h-4 w-4" />
                <span className="font-bold text-[10px] uppercase tracking-widest">
                  {item.status}
                </span>
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
