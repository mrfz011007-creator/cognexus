export class IndexedDBStorage {
    constructor(name = "cognexus", version = 1) {
        this.name = name;
        this.version = version;
        this.db = null;
    }

    async open() {
        if (this.db) return this.db;

        this.db = await new Promise((resolve, reject) => {
            const request = indexedDB.open(this.name, this.version);

            request.onupgradeneeded = () => {
                const db = request.result;

                if (!db.objectStoreNames.contains("knowledge")) {
                    db.createObjectStore("knowledge", {
                        keyPath: "id"
                    });
                }
            };

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });

        return this.db;
    }
}
