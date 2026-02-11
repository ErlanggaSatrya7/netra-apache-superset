"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Mail, MapPin, Activity, ShieldCheck } from "lucide-react";

export default function ManagementPage() {
  const staffList = [
    {
      id: 1,
      name: "Angga",
      email: "angga@netra.com",
      region: "Sumatera",
      status: "Active",
      uploads: 24,
    },
    {
      id: 2,
      name: "Budi",
      email: "budi@netra.com",
      region: "Jawa Barat",
      status: "Active",
      uploads: 12,
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-black text-white italic uppercase">
        Staff Management
      </h1>
      <div className="grid gap-4">
        {staffList.map((staff) => (
          <Card key={staff.id} className="bg-slate-900/40 border-slate-800">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-slate-950 flex items-center justify-center border border-slate-800">
                  <Users className="text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-white flex items-center gap-2">
                    {staff.name}{" "}
                    <ShieldCheck className="h-3 w-3 text-blue-400" />
                  </h3>
                  <p className="text-xs text-slate-500">
                    {staff.email} | {staff.region}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-500 font-bold uppercase">
                  Uploads
                </p>
                <p className="text-xl font-black text-blue-500">
                  {staff.uploads}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
