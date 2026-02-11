"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Settings2 } from "lucide-react";

export default function StaffSettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center gap-3">
        <Settings2 className="h-8 w-8 text-blue-500" />
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            Staff Settings
          </h1>
          <p className="text-slate-400 font-medium">
            Kelola profil dan preferensi kerja Anda
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-md">
          <CardHeader className="border-b border-slate-800/50 pb-6">
            <CardTitle className="text-white flex items-center gap-2">
              <User className="h-5 w-5 text-blue-500" /> Informasi Staff
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-400">Nama Lengkap</Label>
                <Input
                  defaultValue="Angga"
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-400">Email Kerja</Label>
                <Input
                  defaultValue="angga@netra.com"
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-400">Posisi</Label>
                <Input
                  defaultValue="Data Analyst Intern"
                  disabled
                  className="bg-slate-950 border-slate-800 text-blue-400 font-bold"
                />
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-500 font-bold mt-4">
              SIMPAN PERUBAHAN
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
