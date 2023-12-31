window.Import = (src) => {
    console.log("Script " + src + " imported.");
    const script = document.createElement("script");
    script.src = src;
    document.head.appendChild(script);
};