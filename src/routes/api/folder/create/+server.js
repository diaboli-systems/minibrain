import { redirect } from "@sveltejs/kit";
import { read_file, write_file } from "$lib/fs";

export async function POST({ request }) {
    const formData = await request.formData();

    const folders = read_file("database/folders.json").file;
    
    folders.push({
        name: formData.get("name"),
        color: "#9e9e9e"
    });

    write_file("database/folders.json", JSON.stringify(folders));

    redirect(302, "/");
}