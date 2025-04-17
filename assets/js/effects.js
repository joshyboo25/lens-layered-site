document.addEventListener('DOMContentLoaded', () => {
  const imageFolder = 'gallery/';
const imageList = [
  'test1.JPG', 'test2.JPG', 'test3.JPG', 'test4.JPG', 'test5.JPG',
  'test6.JPG', 'test7.JPG', 'test8.JPG', 'test9.JPG', 'test10.JPG',
  'test11.JPG', 'test12.JPG', 'test13.JPG', 'test14.JPG', 'test15.JPG',
  'test16.JPG', 'test17.JPG', 'test18.JPG', 'test19.JPG', 'test20.JPG',
  'test21.JPG', 'test22.JPG', 'test23.JPG', 'test24.JPG', 'test25.JPG',
  'test26.JPG'
];


  const galleryGrid = document.getElementById('gallery-grid');

  imageList.forEach((item, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'gallery-item-wrapper';

    const img = document.createElement('img');
    img.src = `${imageFolder}${item.file}`;
    img.alt = item.title;
    img.className = 'gallery-item';

    const caption = document.createElement('div');
    caption.className = 'gallery-caption';
    caption.textContent = item.title;

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





