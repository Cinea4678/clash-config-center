import { GetConfig } from "@/lib/service";
import { toByteArray } from 'base64-js'

export async function GET(request: Request) {
    const searchParams = new URL(request.url).searchParams;
    const auth = searchParams.get("auth");
    if (!auth) {
        return new Response("Unauthorized", { status: 401 });
    }

    if (auth !== process.env.AUTH) {
        return new Response("Forbidden", { status: 403 });
    }

    const remote = (() => {
        let remoteB64 = searchParams.get("remote");
        if (!!remoteB64) {
            remoteB64 = decodeURIComponent(remoteB64);
            const remoteByteArray = toByteArray(remoteB64);
            const remoteText = new TextDecoder().decode(remoteByteArray);
            return remoteText;
        }
    })()

    const config = await GetConfig({ remote })

    return new Response(config);
}