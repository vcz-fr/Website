import { createClient } from "@supabase/supabase-js";

const polarNextDNS = async (env) => {
  console.log("Invoking: polarNextDNS")
  const profiles = await fetch("https://api.nextdns.io/profiles", {
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": env.NEXTDNS_KEY
    }
  }).then((r) => r.json());

  const profileIDs = profiles.data.map((p) => p.id);
  console.log("Profile IDs: ", profileIDs)

  const analyticsPromises = [];
  for (const profileID of profileIDs) {
    analyticsPromises.push(
      fetch(`https://api.nextdns.io/profiles/${profileID}/analytics/status?from=-30d`, {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": env.NEXTDNS_KEY
        }
      }).then((r) => r.json()).then((r) => Object.assign({}, ...r.data.map((d) => ({ [d.status]: d.queries }))))
    );
  }

  const analytics = await Promise.allSettled(analyticsPromises);
  const totals = {
    untouched: 0,
    blocked: 0,
    allowed: 0
  };

  for (const analyticsResult of analytics) {
    const v = analyticsResult.value;
    totals.untouched += +(v.default ?? 0);
    totals.blocked += +(v.blocked ?? 0);
    totals.allowed += +(v.allowed ?? 0);
  }
  console.log("Totals: ", totals)
  const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
  await supabase.from('nextdns').insert(totals);
};

export default {
  async scheduled(event, env, ctx) {
    await polarNextDNS(env);
  }
}