import { GetConfig } from "@/lib/service";

export async function GET(request: Request) {
    const searchParams = new URL(request.url).searchParams;
    const auth = searchParams.get("auth");
    if (!auth) {
        return new Response("Unauthorized", { status: 401 });
    }

    if(auth !== process.env.AUTH) {
        return new Response("Forbidden", { status: 403 });
    }

    const config = await GetConfig()

    return new Response(config);
}