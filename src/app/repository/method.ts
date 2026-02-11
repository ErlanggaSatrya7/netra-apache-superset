import { supabase } from '@/lib/supabase';

export const method = {

    async selectMethod(name: string) {
    const { data, error } = await supabase
        .from('method')
        .select('id_method')
        // .eq('method', name)
        .ilike('method', name.trim())
        .single();

    if (error) return null;
    return data.id_method; 
}

}