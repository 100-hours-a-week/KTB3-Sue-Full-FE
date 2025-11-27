import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const JS_APP_SUPABASE_URL="https://eqzlqzaxdocdtrlylfxk.supabase.co"

const JS_APP_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxemxxemF4ZG9jZHRybHlsZnhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzNjUwNjMsImV4cCI6MjA3ODk0MTA2M30.nakuqFub0sLj4LP5uwshfd2-oxlpu_jtfsxUWq2Edfk"

export const supabase = createClient(JS_APP_SUPABASE_URL, JS_APP_SUPABASE_ANON_KEY)

const profileImageBucket = supabase.storage.from('profile-image')

const postImagesBucket = supabase.storage.from('post-images')
