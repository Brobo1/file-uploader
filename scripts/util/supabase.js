const { createClient } = require("@supabase/supabase-js");

function supabaseConn() {
  const sbUrl = process.env.SUPABASE_PROJECT_URL;
  const sbKey = process.env.SUPABASE_KEY;

  const supabase = createClient(sbUrl, sbKey);
}
