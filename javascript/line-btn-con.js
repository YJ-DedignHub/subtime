document.addEventListener('DOMContentLoaded', () => {
  console.log('JS 파일 연결 완료');

  const container = document.querySelector('.line-btn-con');
  if (container) {
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseup', () => {
      isDown = false;
    });

    container.addEventListener('mouseleave', () => {
      isDown = false;
    });

    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 0.7;
      container.scrollLeft = scrollLeft - walk;
    });

    let targetScroll = container.scrollLeft;
    let isScrolling = false;

    container.addEventListener('wheel', (e) => {
      e.preventDefault();
      targetScroll += e.deltaY * 0.5;
      container.scrollLeft = targetScroll;
    }, { passive: false });

    let touchStartX = 0;
    let touchStartScrollLeft = 0;

    container.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].pageX;
      touchStartScrollLeft = container.scrollLeft;
    });

    container.addEventListener('touchmove', (e) => {
      const touchMoveX = e.touches[0].pageX;
      const moveDistance = touchStartX - touchMoveX;
      container.scrollLeft = touchStartScrollLeft + moveDistance;
    });

    const buttons = container.querySelectorAll('button');

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        if (button.classList.contains('active')) {
          button.classList.remove('active');
        } else {
          buttons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
        }
      });
    });

  } else {
    console.warn('.line-btn-con 요소 없음');
  }
});