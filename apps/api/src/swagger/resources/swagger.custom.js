'use strict';

const customizeTopbar = () => {
  const topbarLink = document.querySelector('.topbar a');
  if (topbarLink) {
    const e = document.createElement('h3');
    e.innerText = 'Test';
    topbarLink.replaceWith(e);
  }
};

function closeAllSections(sections) {
  sections.forEach((section) => {
    console.log(section);
    console.log(section.classList);
    section.classList.remove('is-open');
  });
}

function createNewDescriptionElement(text) {
  const element = document.createElement('p');
  element.innerText = text;
  return element;
}

function moveTagDescriptionsUnderHeaders(sections) {
  sections.forEach((section) => {
    const descriptionElement = section.querySelector('.opblock-tag small');
    const descriptionText = descriptionElement.innerText;
    descriptionElement.remove();

    const dropdownElement = section.querySelector('div.no-margin');
    if (descriptionElement) {
      dropdownElement.prepend(createNewDescriptionElement(descriptionText));
    }

    const observer = new MutationObserver((mutationList, observer) => {
      console.log('mutation');

      const isToggleChange = mutationList.find((mutation) => mutation.attributeName === 'class');
      console.log(isToggleChange && isToggleChange.target.classList.contains('is-open'));
      if (isToggleChange && isToggleChange.target.classList.contains('is-open')) {
        console.log('adding text', descriptionText, dropdownElement);
        const newDescriptionElement = createNewDescriptionElement(descriptionText);
        console.log(newDescriptionElement);
        dropdownElement.prepend(newDescriptionElement);
        console.log(dropdownElement);
      }
    });
    observer.observe(section, { attributes: true, classList: true, subtree: true });
  });
}

window.addEventListener('load', () => {
  const sections = document.querySelectorAll('.opblock-tag-section');
  moveTagDescriptionsUnderHeaders(sections);
});
