import { json } from "@sveltejs/kit";
import { read_file, write_file } from "$lib/fs";

export async function POST({ request }) {
    const formData = await request.json();

    const files = read_file("database/files.json").file;
    const folders = read_file("database/folders.json").file;

    folders.forEach((folder) => {
        if (folder.name == formData.original) {
            folder.name = formData.new;

            files.forEach((file) => {
                if (file.folder == formData.original) {
                    file.folder = formData.new;
                }
            });
        }
    });

    write_file("database/files.json", JSON.stringify(files));
    write_file("database/folders.json", JSON.stringify(folders));

    return json({ success: true });
}