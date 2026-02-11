"use client";

// Pastikan ada kata 'export default' di depan function
export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="p-8 bg-white shadow-lg rounded-lg border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">DataVortex Login</h1>
        <p className="text-slate-500">PT Netra Vidya Analitika</p>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Masuk
        </button>
      </div>
    </div>
  );
}
