const changePhotoOnHover = () => {
    const photos = document.querySelectorAll('.command__photo');
    
    const changePhoto = e => {
        const src = e.target.src;
        e.target.src = e.target.dataset.img;
        e.target.dataset.img = src;
    };

    photos.forEach(item => {
        item.addEventListener('mouseenter', changePhoto);
        item.addEventListener('mouseleave', changePhoto);
    });
};

export default changePhotoOnHover;