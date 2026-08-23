import { createClient } from "@supabase/supabase-js";

const URL = "https://myllzesyoxzspxhudqtu.supabase.co";
const API_KEY = "sb_publishable_BjO83iiUulFes88Yq72lqg_wulFolq0";

export const supabase = createClient(URL, API_KEY);
