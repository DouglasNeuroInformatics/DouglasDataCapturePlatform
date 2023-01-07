const customizeTopbar = () => {
  const topbarLink = document.querySelector('.topbar a');
  if (topbarLink) {
    const e = document.createElement('h3');
    e.innerText = 'Test';
    topbarLink.replaceWith(e);
  }
};

window.addEventListener('load', () => {
  //customizeTopbar();
});
