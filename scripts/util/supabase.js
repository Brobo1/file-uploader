const { createClient } = require("@supabase/supabase-js");
const sbUrl = process.env.SUPABASE_PROJECT_URL;
const sbKey = process.env.SUPABASE_KEY;

exports.supabase = createClient(sbUrl, sbKey);
