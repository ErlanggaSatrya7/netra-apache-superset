"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function StaffDashboard() {
  const staffStats = [
    { label: "File Saya", value: "24", icon: FileUp, color: "text-blue-400" },
    { label: "Menunggu ACC", value: "3", icon: Clock, color: "text-amber-400" },
    {
      label: "Disetujui",
      value: "19",
      icon: CheckCircle,
      color: "text-emerald-400",
    },
    { label: "Ditolak", value: "2", icon: AlertCircle, color: "text-red-400" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <div>
        <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
          Staff Portal
        </h1>
        <p className="text-slate-400 font-medium">
          Selamat datang kembali, Angga. Siap mengolah data hari ini?
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {staffStats.map((stat, i) => (
          <Card
            key={i}
            className="bg-slate-900/40 border-slate-800 backdrop-blur-md"
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-black text-white leading-none">
                    {stat.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Action Card */}
      <Card className="bg-gradient-to-br from-blue-600/20 to-transparent border-blue-500/20 backdrop-blur-md overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <FileUp className="h-32 w-32 text-blue-500" />
        </div>
        <CardContent className="p-8 space-y-4 relative z-10">
          <h2 className="text-2xl font-bold text-white">
            Ada data Adidas baru?
          </h2>
          <p className="text-slate-400 max-w-md">
            Segera unggah laporan penjualan region Sumatera kamu agar bisa
            segera di-review oleh Direktur.
          </p>
          <Link href="/staff/upload">
            <Button className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-black px-8 py-6 rounded-xl group">
              MULAI UPLOAD SEKARANG
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
