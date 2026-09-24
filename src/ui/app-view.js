export function createAppView(root) {
    function render(title, data = null) {
        root.replaceChildren();

        const heading = document.createElement("h1");
        heading.textContent = "Cognexus";

        const status = document.createElement("h2");
        status.textContent = title;

        root.append(heading, status);

        if (data !== null) {
            const output = document.createElement("pre");
            output.textContent = JSON.stringify(data, null, 2);
            root.appendChild(output);
        }
    }

    return {
        showResult(label, data) {
            render(label, data);
        },
        showError(data) {
            render("APPLICATION ERROR", data);
        }
    };
}
