"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Lock, ShieldCheck } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center gap-3">
        <ShieldCheck className="h-8 w-8 text-red-500" />
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            Director Settings
          </h1>
          <p className="text-slate-400 font-medium">
            Panel keamanan dan profil eksekutif
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-md">
          <CardHeader className="border-b border-slate-800/50 pb-6">
            <CardTitle className="text-white flex items-center gap-2">
              <User className="h-5 w-5 text-blue-500" /> Informasi Direktur
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-400">Nama Lengkap</Label>
                <Input
                  defaultValue="Direktur Utama"
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-400">Email Akun</Label>
                <Input
                  defaultValue="admin@netra.com"
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-400">Level Akses</Label>
                <Input
                  defaultValue="Administrator / Owner"
                  disabled
                  className="bg-slate-950 border-slate-800 text-red-400 font-bold"
                />
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-500 font-bold mt-4">
              UPDATE PROFIL
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
