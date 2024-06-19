import { read_file } from "$lib/fs";

export function load({ url }) {
    const files = read_file("database/files.json").file;

    try {
        let found = [];

        files.forEach(file => {
            if (file.name.toLowerCase().includes(url.searchParams.get("query").toLowerCase())) {
                found.push(file);
            }
        });

        return {
            search: url.searchParams.get("query"),
            found
        }
    } catch (e) {
        return {
            search: url.searchParams.get("query"),
            found: []
        }
    }
}