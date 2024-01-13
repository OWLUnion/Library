import { readdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function autoSidebar(dir) {
    var src = readdirSync(path.resolve(__dirname, "../..", dir));
    var out = [];
    src.forEach(function(fileName) {
        out.push("/" + dir + "/" + fileName);
    });
    return out;
}

export default autoSidebar
