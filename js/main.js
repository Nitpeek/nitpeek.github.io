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

function initSpoilers() {
    var spoilers = document.getElementsByClassName('spoiler');
    Array.prototype.forEach.call(spoilers, function(spoiler) {
        spoiler.onclick = function() {
            document.getElementById(spoiler.dataset.body).classList.remove('hidden');
        }
    });
}

function initChoices() {
    var choices = document.getElementsByClassName('choice');
    Array.prototype.forEach.call(choices, function(choice) {
        var answer = document.getElementById(choice.dataset.answer);
        answer.onclick = function() {
            document.getElementById(choice.dataset.onSuccess).classList.remove('hidden');
        }
    });
}

function initAnswers() {
    var answers = document.getElementsByClassName('answer');
    Array.prototype.forEach.call(answers, function(answer) {
        var input = answer.getElementsByTagName('input')[0];
        input.oninput = function() {
            if(input.value === answer.dataset.answer) {
                document.getElementById(answer.dataset.onSuccess).classList.remove('hidden');
            }
        }
    });
}

function initDOM() {
    insertBrowerNameInDOM();
    downloadMonFichier();
    document.getElementById('mon-fichier-upload').onclick = uploadMonFichier;
    document.getElementById('mon-fichier').oninput = editMonFichier;
    initSpoilers();
    initChoices();
    initAnswers();
}

initDOM();
