const smoothScroll = () => {
    const html = document.querySelector('html');
    html.style.cssText = `scroll-behavior: smooth`;
}

export default smoothScroll;