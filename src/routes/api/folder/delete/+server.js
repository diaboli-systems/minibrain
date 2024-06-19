import { json } from "@sveltejs/kit";
import fs from "node:fs";
import { read_file, write_file } from "$lib/fs";

export async function POST({ request }) {
    const formData = await request.json();

    let files = read_file("database/files.json").file;
    let folders = read_file("database/folders.json").file;

    folders.forEach((folder, i) => {
        if (folder.name == formData.name) {
            folders.splice(i, 1);

            for (let i = 0; i < files.length; i++) {
                if (files[i].folder == formData.name) {
                    fs.unlinkSync(`static/f/${files[i].original}`);
                    files.splice(i, 1);
                    i--;
                }
            }
            write_file("database/files.json", JSON.stringify(files));
            write_file("database/folders.json", JSON.stringify(folders));
        }
    });
    
    return json({ success: true });
}