import { supabase } from '@/lib/supabase';
import { Transaction} from '../models/transaction';

export const transactionRepository = {
    // 
    
    // src/app/repository/transaction.ts
async insertTransaction(payload: Transaction[]) { // Tambahkan []
    const { data, error } = await supabase
        .from('transaction')
        .insert(payload) // Supabase otomatis melakukan bulk insert jika dikirim array
        .select();
    return { data, error };
}
}