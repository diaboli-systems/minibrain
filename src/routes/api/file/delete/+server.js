import { json } from "@sveltejs/kit";
import { read_file, write_file } from "$lib/fs";

export async function POST({ request }) {
    const formData = await request.json();

    let files = read_file("database/files.json").file;

    files.forEach((file, i) => {
        if (file.original == formData.original) {
            files.splice(i, 1);
        }
    });

    write_file("database/files.json", JSON.stringify(files));
    
    return json({ success: true });
}