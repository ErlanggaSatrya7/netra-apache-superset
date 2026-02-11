// // app/api/user/route.ts
// import { supabase } from '@/lib/supabase'
// import { NextResponse } from 'next/server'
// import { serviceTransaction} from '../../services/transaction'
// import { Transaction} from '../../models/transaction'
// import { inputTransaction} from '../../models/transaction'

// interface UserBody {
//   nama: string
// }

// export async function POST(request: Request) {
//   try {
//     // Memberikan tipe data pada body yang di-parse
//     const bodyTransaction : inputTransaction = await request.json()
//     // const body: UserBody = await request.json()

//     if (!bodyTransaction.unit_sold) {
//       return NextResponse.json(
//         { error: 'unit sold di isi harus diisi' },
//         { status: 400 }
//       )
//     }

//     // Menggunakan supabase client (akan terbaca sebagai 'any' oleh TS)
//     const success= await serviceTransaction.addTransaction(bodyTransaction)
//     if(success){
//         return NextResponse.json(
//       { message: success }, 
//       { status: 200 }
//     )
//     }

//     return NextResponse.json(
//         { error: 'Terjadi kesalahan pada server' }, 
//         { status: 500 }
//     )

//   } catch (err) {
//     return NextResponse.json(
//       { error: 'Terjadi kesalahan pada server' }, 
//       { status: 500 }
//     )
//   }
// }