let CHANNELS: any;
const ROOMS = {
    "wB5cWzWsLvjD": { channel: "meetups", username: "BBL: FaaS apps" },
    "8mVUhdPeI9T4": { channel: "meetups", username: "Meet: Cloud & AWS" },
    "b0GlOIPeLX00": { channel: "apps", username: "Fowler" },
    "crl4HX7hHtGc": { channel: "apps", username: "Feedback" },
    "jM85ke3GcMUb": { channel: "apps", username: "Unlink" },
    "pjlxtVSLuZ2x": { channel: "apps", username: "Anagram" },
    "uF48VJ1fgo1s": { channel: "apps", username: "NSFW" },
    "ESc7Lj8VG4pH": { channel: "apps", username: "WED" },
    "DW7RbJ8FWHm5": { channel: "content", username: "Blog" },
    "hS7YejNaDu6k": { channel: "content", username: "TheFollowUp" }
};

// Send a message to a discord channel through a webhook
async function sendDiscordMsg(appid: string, content: any) {
    if (!ROOMS.hasOwnProperty(appid)) {
        throw "This topic does not exist";
    }

    const room = ROOMS[appid as keyof typeof ROOMS];
    const channel = await CHANNELS.get(room.channel);

    await fetch(`https://discordapp.com/api/webhooks/${channel}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content,
            username: room.username
        })
    });
}

// Retrieve the message contents and FWD to Discord!
export const onRequestPost: PagesFunction = async (ctx) => {
    if (ctx.request.headers.get("content-type") !== "application/json") {
        return new Response(null, { status: 400 });
    }

    const { msg, appid } = await ctx.request.json();
    CHANNELS = (ctx.env as any).HOOKS;

    if (!!msg && !!appid) {
        try {
            await sendDiscordMsg(appid, msg);
        } catch (e) {
            return new Response(null, { status: 400 });
        }
        return new Response(null, { status: 204 });
    }
}
