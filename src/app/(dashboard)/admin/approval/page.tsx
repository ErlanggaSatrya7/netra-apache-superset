"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  XCircle,
  Clock,
  FileSpreadsheet,
  Eye,
} from "lucide-react";
import { toast } from "sonner";

export default function ApprovalPage() {
  const pendingData = [
    {
      id: 1,
      file: "Adidas_Sumatera_Jan26.xlsx",
      staff: "Angga",
      date: "11 Feb 2026",
      status: "Pending",
    },
    {
      id: 2,
      file: "Adidas_Jawa_Barat_Q4.csv",
      staff: "Budi",
      date: "10 Feb 2026",
      status: "Pending",
    },
  ];

  const handleAction = (type: "acc" | "reject") => {
    if (type === "acc") {
      toast.success("Data berhasil di-approve! Database akan diperbarui.");
    } else {
      toast.error("Data ditolak. Staff akan menerima notifikasi.");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
          Data Approval Queue
        </h1>
        <p className="text-slate-400 font-medium">
          Panel Direktur untuk verifikasi data masuk
        </p>
      </div>

      <div className="grid gap-4">
        {pendingData.map((item) => (
          <Card
            key={item.id}
            className="bg-slate-900/40 border-slate-800 backdrop-blur-md overflow-hidden transition-all hover:border-slate-700"
          >
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="h-14 w-14 bg-blue-600/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                    <FileSpreadsheet className="h-7 w-7 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {item.file}
                    </h3>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                      Oleh: {item.staff} • {item.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 px-3 py-1 gap-1">
                    <Clock className="h-3 w-3" /> {item.status}
                  </Badge>
                  <div className="h-8 w-[1px] bg-slate-800 mx-2 hidden md:block" />
                  <Button
                    variant="ghost"
                    className="text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    <Eye className="h-5 w-5 mr-2" /> Detail
                  </Button>
                  {/* Perbaikan: Penutupan tag Button yang benar di sini */}
                  <Button
                    onClick={() => handleAction("reject")}
                    variant="ghost"
                    className="text-red-500 hover:bg-red-500/10"
                  >
                    <XCircle className="h-5 w-5 mr-2" /> Tolak
                  </Button>
                  <Button
                    onClick={() => handleAction("acc")}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6"
                  >
                    <CheckCircle2 className="h-5 w-5 mr-2" /> APPROVE
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
