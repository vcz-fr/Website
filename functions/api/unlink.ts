const MAX_RECURSION = 20;

export const onRequestPost: PagesFunction = async (ctx) => {
    const resp: any = {
        reason: "OK",
        content: ""
    };
    let status = 200;

    if (ctx.request.headers.get("content-type") !== "application/json") {
        return new Response(null, { status: 400 });
    }

    const { url } = await ctx.request.json();
    if (url === null) {
        resp.reason = "No URL to resolve";
        status = 400;
    } else {
        try {
            resp.content = await followRedirects(url);
        } catch (e) {
            resp.reason = "Some redirection could not be resolved";
            status = 500;
        }
    }

    return new Response(JSON.stringify(resp), {
        status,
        headers: { 'Content-Type': "application/json; charset=utf-8" }
    });
}

async function followRedirects(url: string, rec = 0): Promise<Array<{ url: string, status: number }>> {
    if (rec > MAX_RECURSION) {
        return [];
    }

    const currentResolution = await fetch((new URL(url)).href, { method: "HEAD", redirect: "manual" });
    const link = {
        url: currentResolution.url,
        status: currentResolution.status
    };

    const isRedirect = [301, 302, 307, 308].includes(currentResolution.status) &&
        currentResolution.headers.has("Location");

    return isRedirect ?
        [link, ...await followRedirects(currentResolution.headers.get("Location"), rec + 1)] :
        [link];
}
