document.addEventListener('DOMContentLoaded', () => {
  const imageFolder = 'images/';
  const imageList = [
    { file: 'test1.JPG', title: 'Urban Shadows' },
    { file: 'test2.JPG', title: 'Golden Hour Glow' },
    { file: 'test3.JPG', title: 'Studio Contrast' },
    { file: 'test4.JPG', title: 'Reflections' },
    { file: 'test5.JPG', title: 'Cinematic Still' },
    { file: 'test6.JPG', title: 'Street Style' },
    { file: 'test7.JPG', title: 'Lens Flare Play' },
    { file: 'test8.JPG', title: 'Sunset Cityscape' },
    { file: 'test9.JPG', title: 'Moody Portrait' },
    { file: 'test10.JPG', title: 'Vintage Vibes' },
    { file: 'test11.JPG', title: 'Speed & Grit' },
    { file: 'test12.JPG', title: 'Nightfall Drive' },
    { file: 'test13.JPG', title: 'Still in Motion' },
    { file: 'test14.JPG', title: 'Deep Focus' },
    { file: 'test15.JPG', title: 'Highway Dreams' },
    { file: 'test16.JPG', title: 'Concrete Jungle' },
    { file: 'test17.JPG', title: 'Silhouette Flow' },
    { file: 'test18.JPG', title: 'Mirror Motion' },
    { file: 'test19.JPG', title: 'Drive By Light' },
    { file: 'test20.JPG', title: 'Shadows & Steel' },
    { file: 'test21.JPG', title: 'Sunlit Grit' },
    { file: 'test22.JPG', title: 'Motion Locked' },
    { file: 'test23.JPG', title: 'Dark Gloss' },
    { file: 'test24.JPG', title: 'Rolling Focus' },
    { file: 'test25.JPG', title: 'Industrial Mood' },
    { file: 'test26.JPG', title: 'Crusin’ Vibe' }
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





