import { IndexedDBStorage } from "../infrastructure/indexeddb.js";
import { KnowledgeRepository } from "../infrastructure/knowledge-repository.js";

const output = document.createElement("pre");
document.body.appendChild(output);

function show(label, data) {
    output.textContent += `${label}\n${JSON.stringify(data, null, 2)}\n\n`;
}

function log(message, data = null) {
    console.info(`[Cognexus] ${message}`, data ?? "");
}

async function startApp() {
    try {
        log("Starting application");

        const storage = new IndexedDBStorage();
        const repository = new KnowledgeRepository(storage);

        const result = await repository.get("test-001");

        show("PERSISTENCE TEST", result);
        log("Application initialized");
    } catch (error) {
        console.error("[Cognexus] Application initialization failed", error);

        show("APPLICATION ERROR", {
            name: error?.name ?? "Error",
            message: error?.message ?? String(error)
        });
    }
}

startApp();
