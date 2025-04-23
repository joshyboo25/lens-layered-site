document.addEventListener('DOMContentLoaded', () => {
  const imageFolder = 'gallery/';
  const imageList = [
    'test1.JPG', 'test2.JPG', 'test3.JPG', 'test4.JPG', 'test5.JPG',
    'test6.JPG', 'test7.JPG', 'test8.JPG', 'test9.JPG', 'test10.JPG',
    'test27.jpg', 'test28.jpg', 'test29.jpg', 'test30.jpg', 'test31.jpg',
    'test32.jpg', 'test33.jpg', 'test34.jpg', 'test35.jpg', 'test36.jpg',
    'test36.jpg', 'test38.jpg', 'test39.jpg', 'test40.jpg', 'test41.jpg',
    'test42.jpg', 'test43.jpg', 'test44.jpg', 'test45.jpg', 'test46.jpg',
	'test47.jpg', 'test48.jpg', 'test49.jpg', 'test50.jpg', 'test51.jpg',
	'test52.jpg', 'test53.jpg', 'test54.jpg', 'test55.jpg', 'test56.jpg',
	'test57.jpg', 'test58.jpg'
  ];

  const galleryGrid = document.getElementById('gallery-grid');

  imageList.forEach((filename) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'gallery-item-wrapper';

    const img = document.createElement('img');
    img.src = `${imageFolder}${filename}`;
    img.alt = filename;
    img.className = 'gallery-item';  

    const caption = document.createElement('div');
    caption.className = 'gallery-caption';
    caption.textContent = filename.replace(/\.[^/.]+$/, '').replace(/_/g, ' '); // simple caption

    img.onerror = () => {
      console.error('Image failed to load:', img.src);
      wrapper.remove();
    };

    wrapper.appendChild(img);
    wrapper.appendChild(caption);
    galleryGrid.appendChild(wrapper);
  });

  // Scroll animation
  setTimeout(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.gallery-item').forEach(item => observer.observe(item));
  }, 300);

  // === Lightbox logic ===
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const closeBtn = document.querySelector('.lightbox-close');
  const nextBtn = document.querySelector('.lightbox-next');
  const prevBtn = document.querySelector('.lightbox-prev');
  let currentIndex = 0;

  const galleryItems = [];

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






