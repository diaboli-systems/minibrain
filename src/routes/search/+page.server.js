import { read_file } from "$lib/fs";

export function load({ url }) {
    const files = read_file("database/files.json").file;

    try {
        let found = [];

        files.forEach(file => {
            if (file.name.toLowerCase().includes(url.searchParams.get("file").toLowerCase())) {
                if (url.searchParams.get("folder") != "all") {
                    if (file.folder == url.searchParams.get("folder")) {
                        found.push(file)
                    }
                } else {
                    found.push(file);
                }
            }
        });

        return {
            search: url.searchParams.get("file"),
            folder: url.searchParams.get("folder"),
            found
        }
    } catch (e) {
        return {
            search: url.searchParams.get("file"),
            found: []
        }
    }
}