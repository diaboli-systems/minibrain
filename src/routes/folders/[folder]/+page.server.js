import { read_file } from "$lib/fs";

export async function load({ params }) {
    const files = read_file("database/files.json").file;
    const folders = read_file("database/folders.json").file;

    let folder_files = [];
    const folder = folders.find(find_folder);

    function find_folder(folder) {
        return folder.name == params.folder;
    }

    files.forEach(file => {
        if (file.folder == folder.name) {
            folder_files.push(file);
        }
    });

    if (!folder) {
        return {
            error: 404
        }
    } else {
        return {
            folder,
            folder_files
        }
    }
}