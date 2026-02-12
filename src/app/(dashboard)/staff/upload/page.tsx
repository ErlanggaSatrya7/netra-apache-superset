"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Upload, FileSpreadsheet, X, Send, Eye } from "lucide-react";
import { toast } from "sonner";
import * as XLSX from "xlsx"; //

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [dataPreview, setDataPreview] = useState<any[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      // Logika membaca file Excel
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        setDataPreview(data.slice(0, 5)); // Ambil 5 baris pertama saja untuk preview
      };
      reader.readAsBinaryString(selectedFile);
    }
  };

  // const handleSendToDirector = () => {
  //   toast.success(
  //     "Data Adidas Indonesia telah dikirim ke Direktur untuk di-approve!"
  //   );
  //   setFile(null);
  //   setDataPreview([]);
  // };

  const handleSendToDirector = async () => {
    if (!file) {
      toast.error("Silakan pilih file terlebih dahulu!");
      return;
    }

    try {

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Data berhasil diproses dan dikirim ke Direktur!");

        setFile(null);
        setDataPreview([]);
      } else {
        toast.error(result.error || "Gagal mengunggah data");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error("Terjadi kesalahan jaringan saat mengunggah file.");
    }
  };

  

  return (
    <div className="space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
          Upload Adidas Data
        </h1>
        <p className="text-slate-400 font-medium">
          Sistem Analisis Penjualan Region - PT Netra Vidya Analitika
        </p>
      </div>

      {/* Area Dropzone */}
      <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-md">
        <CardContent className="pt-8 pb-8">
          <div className="border-2 border-dashed border-slate-800 rounded-3xl p-10 flex flex-col items-center justify-center transition-all hover:border-blue-500/50 hover:bg-blue-500/5 group">
            {!file ? (
              <>
                <div className="h-20 w-20 rounded-2xl bg-slate-950 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(37,99,235,0.1)]">
                  <Upload className="h-10 w-10 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Tarik file Excel kamu ke sini
                </h3>
                <p className="text-sm text-slate-500 mt-2 italic">
                  Format: .xlsx atau .csv
                </p>
                <input
                  type="file"
                  className="hidden"
                  id="file-upload"
                  accept=".xlsx, .csv"
                  onChange={handleFileChange}
                />
                <Button
                  className="mt-8 bg-blue-600 hover:bg-blue-500 font-bold px-10 py-6 rounded-xl"
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                >
                  CARI FILE
                </Button>
              </>
            ) : (
              <div className="w-full flex items-center justify-between bg-slate-950/80 p-6 rounded-2xl border border-blue-500/30">
                <div className="flex items-center gap-5">
                  <div className="h-14 w-14 bg-blue-600/20 rounded-xl flex items-center justify-center">
                    <FileSpreadsheet className="h-8 w-8 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white tracking-tight leading-none mb-1">
                      {file.name}
                    </p>
                    <p className="text-xs text-slate-500 uppercase font-bold">
                      {(file.size / 1024).toFixed(2)} KB • DATA SIAP DIPROSES
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setFile(null);
                    setDataPreview([]);
                  }}
                  className="p-2 hover:bg-red-500/20 rounded-full text-slate-500 hover:text-red-400 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Preview Table Section */}
      {dataPreview.length > 0 && (
        <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-md overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-400" />
              <h2 className="text-lg font-bold text-white uppercase tracking-wider">
                Preview 5 Data Teratas
              </h2>
            </div>
          </div>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-950">
                  <TableRow className="border-slate-800">
                    {Object.keys(dataPreview[0]).map((key) => (
                      <TableHead
                        key={key}
                        className="text-slate-400 font-bold uppercase text-[10px] tracking-widest py-5"
                      >
                        {key}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataPreview.map((row, i) => (
                    <TableRow
                      key={i}
                      className="border-slate-800 hover:bg-slate-800/30 transition-colors"
                    >
                      {Object.values(row).map((val: any, j) => (
                        <TableCell
                          key={j}
                          className="text-slate-300 text-sm py-4 font-medium"
                        >
                          {val}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="p-6 bg-slate-950/50 flex justify-end">
              <Button
                onClick={handleSendToDirector}
                className="bg-blue-600 hover:bg-blue-500 text-white font-black px-10 py-7 rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.3)] border-none"
              >
                KIRIM KE DIREKTUR <Send className="ml-3 h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
