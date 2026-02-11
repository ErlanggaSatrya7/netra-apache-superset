import {transactionRepository} from '../repository/transaction'
import { Transaction} from '../models/transaction';
import { inputTransaction} from '../models/transaction';
import { retailer } from '../repository/retailer';
import { city } from '../repository/city';
import { product } from '../repository/product';
import { method } from '../repository/method';
import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { supabase } from '@/lib/supabase';

export const serviceTransaction = {

    // async addTransaction(transaction : inputTransaction){
    //     try{

    //         // console.log("Data diterima Service:", transaction);

    //         const [idRetailer, idCity, idMethod, idProduct] = await Promise.all([
    //             retailer.selectRetailer(transaction.retailer),
    //             city.selectCity(transaction.city),
    //             method.selectMethod(transaction.method),
    //             product.selectProduct(transaction.product)
    //         ]);

    //         if (!idRetailer) console.log("Gagal di: Retailer", transaction.retailer);
    //         if (!idCity) console.log("Gagal di: City", transaction.city);
    //         if (!idMethod) console.log("Gagal di: Method", transaction.method);
    //         if (!idProduct) console.log("Gagal di: Product", transaction.product);


    //         if (!idRetailer || !idCity || !idMethod || !idProduct) {
    //             return 'Salah satu referensi data (Retailer/City/Method/Product) tidak ditemukan';
    //         }

    //         const insertTransactionRepo : Transaction = {
    //             id_retailer: Number(idRetailer),
    //             id_city : Number(idCity),
    //             id_method : Number(idMethod),
    //             id_product : Number(idProduct),
    //             unit_sold : transaction.unit_sold,
    //             invoice_date : transaction.invoice_date,
    //             operating_margin : transaction.operating_margin,
    //             operating_profit : transaction.operating_profit,
    //             price_per_unit : transaction.price_per_unit,
    //             total_sales : transaction.total_sales

    //         }

    //         return await transactionRepository.insertTransaction(insertTransactionRepo)
    //         // return NextResponse.json(
    //         //     { message: insertTransactionRepo }, 
    //         //     { status: 200 }
    //         //     )

    //     }catch(error: any) {
    //         // Log untuk internal server (terminal)
    //         console.error("Kesalahan di Service:", error.message);
    //         // Lempar kembali agar ditangkap oleh Route
    //         throw error;
    //     }
    // },

    // TAMBAHKAN FUNGSI BARU INI
//     async importExcel(fileBuffer: Buffer) {
//     try {
//         const workbook = XLSX.read(fileBuffer, { type: 'buffer', cellDates: true });
//         const rows = XLSX.utils.sheet_to_json(workbook.Sheets[0], { raw: false }) as any[];

//         // 1. AMBIL SEMUA DATA REFERENSI SEKALIGUS (CACHE)
//         // Ini jauh lebih cepat daripada mencari ID satu per satu di dalam loop
//         const [retailers, cities, methods, products] = await Promise.all([
//             supabase.from('retailer').select('id_retailer, retailer_name'),
//             supabase.from('city').select('id_city, city'),
//             supabase.from('method').select('id_method, method'),
//             supabase.from('product').select('id_product, product')
//         ]);

//         // 2. BUAT MAP UNTUK PENCARIAN CEPAT DI MEMORI (Case Insensitive)
//         const retailerMap = new Map(retailers.data?.map(r => [r.retailer_name.toLowerCase().trim(), r.id_retailer]));
//         const cityMap = new Map(cities.data?.map(c => [c.city.toLowerCase().trim(), c.id_city]));
//         const methodMap = new Map(methods.data?.map(m => [m.method.toLowerCase().trim(), m.id_method]));
//         const productMap = new Map(products.data?.map(p => [p.product.toLowerCase().trim(), p.id_product]));

//         const finalDataToInsert: Transaction[] = [];
//         const errors = [];

//         // 3. PROSES DATA DI MEMORI (SANGAT CEPAT)
//         for (const row of rows) {
//             const rName = row['Retailer']?.toString().toLowerCase().trim();
//             const cName = row['City']?.toString().toLowerCase().trim();
//             const mName = row['Sales Method']?.toString().toLowerCase().trim();
//             const pName = row['Product']?.toString().toLowerCase().trim();

//             const idRetailer = retailerMap.get(rName);
//             const idCity = cityMap.get(cName);
//             const idMethod = methodMap.get(mName);
//             const idProduct = productMap.get(pName);

//             if (!idRetailer || !idCity || !idMethod || !idProduct) {
//                 errors.push(`Referensi tidak ditemukan untuk: ${row['Retailer']} - ${row['City']}`);
//                 continue;
//             }

//             finalDataToInsert.push({
//                 id_retailer: idRetailer,
//                 id_city: idCity,
//                 id_method: idMethod,
//                 id_product: idProduct,
//                 unit_sold: Number(row['Units Sold']),
//                 invoice_date: row['Invoice Date'],
//                 operating_margin: Number(row['Operating Margin']),
//                 operating_profit: Number(row['Operating Profit']),
//                 price_per_unit: Number(row['Price per Unit']),
//                 total_sales: Number(row['Total Sales'])
//             });
//         }

//         // 4. BULK INSERT: Kirim semua data sekaligus (per 500 baris agar aman)
//         if (finalDataToInsert.length > 0) {
//             const CHUNK_SIZE = 500;
//             for (let i = 0; i < finalDataToInsert.length; i += CHUNK_SIZE) {
//                 const chunk = finalDataToInsert.slice(i, i + CHUNK_SIZE);
//                 const { error } = await supabase.from('transaction').insert(chunk);
//                 if (error) throw error;
//             }
//         }

//         return { 
//             successCount: finalDataToInsert.length, 
//             errorCount: errors.length, 
//             details: errors.slice(0, 10) // Ambil 10 contoh error saja
//         };

//     } catch (error: any) {
//         console.error("Kesalahan Import:", error.message);
//         return 'Gagal memproses file Excel: ' + error.message;
//     }
// }


    async importExcel(fileBuffer: Buffer) {
    try {
        // 1. Baca dengan cellDates agar tanggal tidak jadi angka 43831
        const workbook = XLSX.read(fileBuffer, { type: 'buffer', cellDates: true });
        const sheetName = workbook.SheetNames[0];
        // raw: false agar data dibaca sebagai string yang sudah terformat
        const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { raw: false }) as any[];

        const finalDataToInsert: Transaction[] = [];
        const errorLogs: string[] = [];

        for (const row of rows) {
            // MAPPING HARUS SAMA PERSIS DENGAN HEADER EXCEL (Besar/Kecil & Spasi)
            const [idRetailer, idCity, idMethod, idProduct] = await Promise.all([
                retailer.selectRetailer(row['Retailer']),
                city.selectCity(row['City']),
                method.selectMethod(row['Sales Method']), // Sesuaikan 'Sales Method'
                product.selectProduct(row['Product'])
            ]);

            // Cek apakah ada referensi yang gagal ditemukan
            if (!idRetailer || !idCity || !idMethod || !idProduct) {
                errorLogs.push(`Gagal: Retailer(${row['Retailer']}), City(${row['City']}) - Referensi tak ditemukan`);
                continue; 
            }

            finalDataToInsert.push({
                id_retailer: Number(idRetailer),
                id_city: Number(idCity),
                id_method: Number(idMethod),
                id_product: Number(idProduct),
                unit_sold: Number(row['Units Sold']),
                invoice_date: row['Invoice Date'], // Tanggal sekarang aman
                operating_margin: Number(row['Operating Margin']),
                operating_profit: Number(row['Operating Profit']),
                price_per_unit: Number(row['Price per Unit']),
                total_sales: Number(row['Total Sales'])
            });
        }

        // 2. Lakukan Bulk Insert sekaligus
        if (finalDataToInsert.length > 0) {
            // Pastikan repository.insertTransaction menerima array Transaction[]
            const result = await transactionRepository.insertTransaction(finalDataToInsert);
            if (result?.error) throw new Error(result.error.message);
        }

        return { 
            successCount: finalDataToInsert.length, 
            errorCount: errorLogs.length, 
            details: errorLogs.slice(0, 10) 
        };

    } catch (error: any) {
        console.error("Kesalahan di Service:", error.message);
        throw error;
    }
}

}