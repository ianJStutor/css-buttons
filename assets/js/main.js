const rulesList = document.styleSheets[2];
const cssRules = [...rulesList.cssRules];

document.querySelectorAll("main button").forEach(button => {
    button.addEventListener("click", e => {
        e.preventDefault();
        const width = button.getBoundingClientRect().width;
        const className = button.closest("fieldset").id;
        const text = button.textContent;
        const rules = cssRules.filter(r => r.selectorText?.includes(className) || r.name?.includes(className)).map(r => r.cssText);
        const aside = document.createElement("aside");
        aside.innerHTML = `<div>
            <button>Close <span>&times;</span></button><br />
            <fieldset id="${className}"><button style="width:${width}px;">${text}</button></fieldset>
            <p>${rules.join("</p><p>")}</p>
        </div>`;
        document.body.append(aside);
        document.querySelector("aside:last-of-type button").addEventListener("click", e => {
            aside.outerHTML = "";
        });
    });
});
