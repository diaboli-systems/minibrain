import { json } from "@sveltejs/kit";
import { PRIVATE_PASSWORD } from "$env/static/private";

export async function POST({ request, cookies }) {
    const formData = await request.json();

    if (PRIVATE_PASSWORD == formData.password) {
        cookies.set("password", PRIVATE_PASSWORD, { path: "/" });

        return json({ success: true });
    } else {
        return json({ error: "Wrong Password." });
    }
}