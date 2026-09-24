export function formatError(error) {
    return {
        name: error?.name ?? "Error",
        message: error?.message ?? String(error)
    };
}

export function createLogger(scope = "Cognexus") {
    return {
        info(message, data = null) {
            console.info(`[${scope}] ${message}`, data ?? "");
        },
        error(message, data = null) {
            console.error(`[${scope}] ${message}`, data ?? "");
        }
    };
}
