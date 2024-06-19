import { json } from "@sveltejs/kit";
import { read_file, write_file } from "$lib/fs";

export async function POST({ request }) {
    const formData = await request.json();

    const folders = read_file("database/folders.json").file;

    folders.forEach((folder) => {
        if (folder.name == formData.name) {
            folder.color = formData.color;
        }
    });

    write_file("database/folders.json", JSON.stringify(folders));

    return json({ success: true });
}