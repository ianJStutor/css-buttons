const rulesList = document.styleSheets[2];
const cssRules = [...rulesList.cssRules];

document.querySelector("header button").addEventListener("click", ({currentTarget: target}) => {
    if (target.textContent.startsWith("Pause")) {
        //pause all animations
        target.innerHTML = "Play All <span>&#9658;</span>";
        document.querySelectorAll(".spinner").forEach(s => s.classList.add("pause"));
    }
    else {
        //play all animations
        target.innerHTML = "Pause All <span>&#10074;&#10074;</span>";
        document.querySelectorAll(".spinner").forEach(s => s.classList.remove("pause"));
    }
});

document.querySelectorAll("main a").forEach(a => {
    a.addEventListener("click", e => {
        e.preventDefault();
        const paused = a.classList.contains("pause");
        if (paused) a.classList.remove("pause");
        const className = a.className.replace("spinner ", "");
        const rules = cssRules.filter(r => r.selectorText?.includes(className) || r.name?.includes(className)).map(r => r.cssText);
        const aside = document.createElement("aside");
        aside.innerHTML = `<div>
            <button>Close <span>&times;</span></button>
            <span class="spinner ${className}"></span>
            <p>${rules.join("</p><p>")}</p>
        </div>`;
        document.body.append(aside);
        document.querySelector("aside:last-of-type button").addEventListener("click", e => {
            aside.outerHTML = "";
            if (paused) a.classList.add("pause");
        });
    });
});
