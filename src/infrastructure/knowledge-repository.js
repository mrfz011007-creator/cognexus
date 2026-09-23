export class KnowledgeRepository {
    constructor(storage) {
        this.storage = storage;
    }

    async save(knowledge) {
        const db = await this.storage.open();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction("knowledge", "readwrite");
            const store = transaction.objectStore("knowledge");

            const request = store.put(knowledge);

            request.onsuccess = () => resolve(knowledge);
            request.onerror = () => reject(request.error);
        });
    }

    async get(id) {
        const db = await this.storage.open();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction("knowledge", "readonly");
            const store = transaction.objectStore("knowledge");

            const request = store.get(id);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
}
