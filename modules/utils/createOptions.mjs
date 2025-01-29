export function createOptions(options, selectElement) {
    options.forEach(element => {
        const value = element[0];
        const name = element[1];

        const option = document.createElement("option");
        option.value = value;
        option.text = name;

        selectElement.appendChild(option);
    });
}