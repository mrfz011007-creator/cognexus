import { IndexedDBStorage } from "../infrastructure/indexeddb.js";
import { KnowledgeRepository } from "../infrastructure/knowledge-repository.js";

const output = document.createElement("pre");
document.body.appendChild(output);

function show(label, data) {
    output.textContent += `${label}\n${JSON.stringify(data, null, 2)}\n\n`;
}

const storage = new IndexedDBStorage();
const repository = new KnowledgeRepository(storage);

const result = await repository.get("test-001");

show("PERSISTENCE TEST", result);
