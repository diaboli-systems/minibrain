import { redirect } from "@sveltejs/kit";
import { read_file, write_file } from "$lib/fs";

export async function POST({ request }) {
    const formData = await request.formData();

    let files = read_file("database/files.json").file;

    files.push({
        type: formData.get("file").type,
        name: formData.get("file").name.split(".")[0],
        original: formData.get("file").name,
        folder: formData.get("folder"),
    });

    write_file("database/files.json", JSON.stringify(files)); // updating the db
    write_file(`static/f/${formData.get("file").name}`, Buffer.from(await formData.get("file").arrayBuffer())); // saving the file
    
    redirect(302, "/");
}