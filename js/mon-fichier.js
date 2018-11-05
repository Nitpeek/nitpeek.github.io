const content = localStorage.getItem('mon-fichier');

if (content !== null) {
  document.body.innerHTML = content;
}
