document.addEventListener('DOMContentLoaded', () => {
  const imageFolder = 'gallery/';
  const imageList = [
    'test1.JPG', 'test2.JPG', 'test3.JPG', 'test4.JPG', 'test5.JPG',
    'test6.JPG', 'test7.JPG', 'test8.JPG', 'test9.JPG', 'test10.JPG',
    'test27.jpg', 'test28.jpg', 'test29.jpg', 'test30.jpg', 'test31.jpg',
    'test32.jpg', 'test33.jpg', 'test34.jpg', 'test35.jpg',
    'test36.jpg', 'test38.jpg', 'test39.jpg', 'test40.jpg', 'test41.jpg',
    'test42.jpg', 'test43.jpg', 'test44.jpg', 'test45.jpg', 'test46.jpg',
    'test47.jpg', 'test48.jpg', 'test49.jpg', 'test50.jpg', 'test51.jpg',
    'test52.jpg', 'test53.jpg', 'test54.jpg', 'test55.jpg', 'test56.jpg',
    'test57.jpg', 'test58.jpg'
  ];

  const galleryGrid = document.getElementById('gallery-grid');
  const galleryItems = [];

  let imagePromises = [];

  imageList.forEach((filename) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'gallery-item-wrapper';

    const img = document.createElement('img');
    img.src = `${imageFolder}${filename}`;
    img.alt = filename;
    img.className = 'gallery-item';

    const caption = document.createElement('div');
    caption.className = 'gallery-caption';
    caption.textContent = filename.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');

    img.onerror = () => {
      console.error('Image failed to load:', img.src);
      wrapper.remove();
    };

    const imageLoadPromise = new Promise((resolve) => {
      img.onload = () => {
        if (img.naturalWidth > img.naturalHeight) {
          wrapper.classList.add('landscape');
        }
        wrapper.appendChild(img);
        wrapper.appendChild(caption);
        galleryGrid.appendChild(wrapper);
        resolve();
      };
    });

    imagePromises.push(imageLoadPromise);
  });

  Promise.all(imagePromises).then(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const delay = index * 0.05; // 0.05s delay per item
          entry.target.style.setProperty('--delay', `${delay}s`);
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.gallery-item-wrapper').forEach((wrapper) => observer.observe(wrapper));
  });

  // Lightbox logic stays same as before 🚀
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const closeBtn = document.querySelector('.lightbox-close');
  const nextBtn = document.querySelector('.lightbox-next');
  const prevBtn = document.querySelector('.lightbox-prev');
  let currentIndex = 0;

  setTimeout(() => {
    document.querySelectorAll('.gallery-item').forEach((img, i) => {
      galleryItems.push(img);

      img.addEventListener('click', () => {
        currentIndex = i;
        openLightbox(currentIndex);
      });
    });
  }, 400);

  const openLightbox = (index) => {
    if (!galleryItems[index]) return;
    lightbox.style.display = 'flex';
    lightboxImg.src = galleryItems[index].src;
    lightboxImg.alt = galleryItems[index].alt;
    lightboxCaption.textContent = galleryItems[index].alt;
  };

  const closeLightbox = () => {
    lightbox.style.display = 'none';
  };

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    openLightbox(currentIndex);
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    openLightbox(currentIndex);
  });

  document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
      if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        openLightbox(currentIndex);
      } else if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        openLightbox(currentIndex);
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    }
  });
});








