import { CONFIG } from "./config.js";
import { createLogger, formatError } from "./utils.js";
import { IndexedDBStorage } from "../infrastructure/indexeddb.js";
import { KnowledgeRepository } from "../infrastructure/knowledge-repository.js";
import { createAppView } from "../ui/app-view.js";

const root = document.getElementById("app");

if (!root) {
    throw new Error("Application root element not found");
}

const view = createAppView(root);
const logger = createLogger();

async function startApp() {
    try {
        logger.info("Starting application");

        const storage = new IndexedDBStorage(
            CONFIG.databaseName,
            CONFIG.databaseVersion
        );
        const repository = new KnowledgeRepository(storage);

        const result = await repository.get(CONFIG.persistenceTestId);

        view.showResult("PERSISTENCE TEST", result);
        logger.info("Application initialized");
    } catch (error) {
        const details = formatError(error);

        logger.error("Application initialization failed", details);
        view.showError(details);
    }
}

startApp();
