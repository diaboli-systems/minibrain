import { json } from "@sveltejs/kit";
import { read_file, write_file } from "$lib/fs";

export async function POST({ request }) {
    const formData = await request.json();

    const files = read_file("database/files.json").file;

    files.forEach((file) => {
        if (file.original == formData.original) {
            file.name = formData.new_name;
        }
    });

    write_file("database/files.json", JSON.stringify(files));

    return json({ success: true });
}