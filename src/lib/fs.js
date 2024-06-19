import fs from "node:fs";

export function read_file(path) {
    try {
        let file = JSON.parse(fs.readFileSync(path, "utf-8"));

        return {
            file
        }
    } catch (e) {
        return {
            error: e
        }
    }
}

export function write_file(path, content) {
    fs.writeFileSync(path, content, "utf-8");
}