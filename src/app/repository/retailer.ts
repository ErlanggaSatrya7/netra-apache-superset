import { supabase } from '@/lib/supabase';

export const retailer = {

    // async selectRetailer(nameRetailer : string){
    //     try{
    //         return await supabase.from('retailer').select('id_retailer').eq('city', nameRetailer).single()
    //     }catch(error){
    //         return "gada id retailer itu"
    //     }
    // }

    async selectRetailer(name: string) {
    const { data, error } = await supabase
        .from('retailer')
        .select('id_retailer')
        // .eq('retailer_name', name)
        .ilike('retailer_name', name.trim())
        .single();

    if (error) return null;
    return data.id_retailer; 
}

}