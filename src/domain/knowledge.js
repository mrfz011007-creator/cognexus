const KNOWLEDGE_TYPES = [
    "Concept",
    "Tool",
    "Workflow",
    "Lesson",
    "Project"
];

export function createKnowledge(data) {
    validateKnowledge(data);

    return {
        id: data.id,
        type: data.type,
        title: data.title,
        content: data.content,
        source: data.source,
        status: data.status ?? "active",
        epistemic_status: data.epistemic_status ?? "known",
        tags: data.tags ?? [],
        created_at: data.created_at,
        updated_at: data.updated_at
    };
}

export function validateKnowledge(data) {
    if (!data?.id) throw new Error("Knowledge id is required");
    if (!KNOWLEDGE_TYPES.includes(data.type)) {
        throw new Error("Invalid knowledge type");
    }
    if (!data.title) throw new Error("Knowledge title is required");
    if (!data.content) throw new Error("Knowledge content is required");

    return true;
}
