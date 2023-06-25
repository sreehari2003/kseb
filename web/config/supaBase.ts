import { createClient } from '@supabase/supabase-js'
import { ENV } from './ENV'



export const supabaseClient = createClient(ENV.supa_url,ENV.supa_anon)