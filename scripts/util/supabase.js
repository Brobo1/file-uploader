const { createClient } = require("@supabase/supabase-js");

exports.supabaseConn = async () => {
  const sbUrl = process.env.SUPABASE_PROJECT_URL;
  const sbKey = process.env.SUPABASE_KEY;
  const supabase = createClient(sbUrl, sbKey);

  try {
    // const { data, error } = await supabase.storage.listBuckets();
    const { data, error } = await supabase.storage.getBucket("users");

    if (error) {
      console.error(error.message);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Error with supabase", err);
  }
};
