import { CONFIG } from "./config.js";
import { createLogger, formatError } from "./utils.js";
import { IndexedDBStorage } from "../infrastructure/indexeddb.js";
import { KnowledgeRepository } from "../infrastructure/knowledge-repository.js";

const output = document.createElement("pre");
document.body.appendChild(output);

const logger = createLogger();

function show(label, data) {
    output.textContent += `${label}\n${JSON.stringify(data, null, 2)}\n\n`;
}

async function startApp() {
    try {
        logger.info("Starting application");

        const storage = new IndexedDBStorage(
            CONFIG.databaseName,
            CONFIG.databaseVersion
        );
        const repository = new KnowledgeRepository(storage);

        const result = await repository.get(CONFIG.persistenceTestId);

        show("PERSISTENCE TEST", result);
        logger.info("Application initialized");
    } catch (error) {
        const details = formatError(error);

        logger.error("Application initialization failed", details);
        show("APPLICATION ERROR", details);
    }
}

startApp();
