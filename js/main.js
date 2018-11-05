function getBrowserName() {
    if(!!window.chrome && !!window.chrome.webstore) {
        return "Google Chrome";
    }
    if (typeof InstallTrigger !== 'undefined') {
        return "Firefox";
    }
    if ((!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) {
        return "Opera";
    }
    if (/*@cc_on!@*/false || !!document.documentMode) {
        return "Internet Explorer";
    }
    if (/constructor/i.test(window.HTMLElement)
    ||(function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification))
    || navigator.userAgent.indexOf(' Safari/') >= 0) {
        return "Safari";
    }
    if (!window.StyleMedia) { // + not IE
        return "Edge";
    }
}

function insertBrowerNameInDOM() {
    const browserName = getBrowserName();
    const elements = document.getElementsByClassName('browser-name');
    Array.prototype.forEach.call(elements, function(element) {
        element.textContent = browserName;
    })
}

function downloadMonFichier() {
    content = localStorage.getItem('mon-fichier');

    if (content !== null) {
        document.getElementById('mon-fichier').value = content;
    }
}

function uploadMonFichier() {
    content = document.getElementById('mon-fichier').value;
    localStorage.setItem('mon-fichier', content);

    document.getElementById('mon-fichier-editor-network-file').classList.add('editor-network-file-uploaded');
}

function editMonFichier() {
    document.getElementById('mon-fichier-editor-network-file').classList.remove('editor-network-file-uploaded');
}

insertBrowerNameInDOM();
downloadMonFichier();
document.getElementById('mon-fichier-upload').onclick = uploadMonFichier;
document.getElementById('mon-fichier').oninput = editMonFichier;
