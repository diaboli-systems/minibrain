import { read_file } from "$lib/fs";

export async function load({ params }) {
    const files = read_file("database/files.json").file;
    const folders = read_file("database/folders.json").file;

    const file = files.find(find_file);
    const folder = folders.find(find_folder);

    function find_file(file) {
        return file.original == params.file;
    }

    function find_folder(folder) {
        return folder.name == file.folder;
    }

    return {
        file,
        folder
    }
}