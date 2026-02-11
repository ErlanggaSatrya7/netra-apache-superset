import { supabase } from '@/lib/supabase';

export const city = {

    async selectCity(name: string) {
    const { data, error } = await supabase
        .from('city')
        .select('id_city')
        .ilike('city', name.trim())
        .single();

    if (error) return null;
    return data.id_city; 
}

}