const KNOWLEDGE_TYPES = [
    "Concept",
    "Tool",
    "Workflow",
    "Lesson",
    "Project"
];

function generateKnowledgeId() {
    if (!globalThis.crypto?.randomUUID) {
        throw new Error("UUID generation is not supported");
    }

    return globalThis.crypto.randomUUID();
}

export function createKnowledge(data) {
    validateKnowledge(data);

    const now = new Date().toISOString();

    return {
        id: generateKnowledgeId(),
        type: data.type,
        title: data.title,
        content: data.content,
        source: data.source,
        status: data.status ?? "active",
        epistemic_status: data.epistemic_status ?? "known",
        tags: data.tags ?? [],
        created_at: now,
        updated_at: now
    };
}

export function validateKnowledge(data) {
    if (!data) throw new Error("Knowledge data is required");
    if (!KNOWLEDGE_TYPES.includes(data.type)) {
        throw new Error("Invalid knowledge type");
    }
    if (!data.title) throw new Error("Knowledge title is required");
    if (!data.content) throw new Error("Knowledge content is required");

    return true;
}
