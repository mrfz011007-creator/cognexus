import { createKnowledge } from "../domain/knowledge.js";
import { IndexedDBStorage } from "../infrastructure/indexeddb.js";
import { KnowledgeRepository } from "../infrastructure/knowledge-repository.js";

const output = document.createElement("pre");
document.body.appendChild(output);

function show(label, data) {
    output.textContent += `${label}\n${JSON.stringify(data, null, 2)}\n\n`;
}

const storage = new IndexedDBStorage();
const repository = new KnowledgeRepository(storage);

const knowledge = createKnowledge({
    id: "test-001",
    type: "Concept",
    title: "IndexedDB",
    content: "Browser database",
    source: { type: "user" },
    tags: ["database"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
});

await repository.save(knowledge);

const result = await repository.get("test-001");

show("SAVED", knowledge);
show("RETRIEVED", result);
