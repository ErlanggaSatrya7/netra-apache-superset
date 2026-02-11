import { supabase } from '@/lib/supabase';

export const product = {

    async selectProduct(name: string) {
    const { data, error } = await supabase
        .from('product')
        .select('id_product')
        // .eq('product', name)
        .ilike('product', name.trim())
        .single();

    if (error) return null;
    return data.id_product; 
}

}