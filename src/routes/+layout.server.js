import { read_file } from "$lib/fs"
import { PRIVATE_PASSWORD } from "$env/static/private";

export function load({ cookies }) {
    const files = read_file("database/files.json").file;
    const folders = read_file("database/folders.json").file;

    return {
        signed_in: !cookies.get("password") || cookies.get("password") != PRIVATE_PASSWORD ? false : true,
        folders: folders.reverse(),
        files: files.reverse()
    }
}