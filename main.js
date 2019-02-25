const sliderContainer = document.querySelector('.slider__content');
const sliderBar = document.querySelector('.slider__scroll-bar');
const sliderBarContainer = document.querySelector('.slider__scroll');
const sliderTrackWidth = sliderContainer.scrollWidth; // Overall width including bits we can't see
const sliderContainerWidth = sliderContainer.clientWidth; // Width of slider content that we can see
const sliderBarTrackWidth = sliderBarContainer.offsetWidth; // Width of scrollbar container
const scrollRatio = sliderTrackWidth / sliderBarTrackWidth; // Calculates the ratio to make scrollbar movement equal to slider movement
const barWidthRatio = sliderTrackWidth / sliderContainerWidth; // Calculates the ratio of how much smaller the scrollbar container is from the slider container
const barWidth = sliderBarTrackWidth / barWidthRatio; // Calculates required width of scrollbar in relation to the width of content in the slider
let isDown = false;
let barStartX;
let barCurrentXLeft = 0; // Sets left side of scrollbar position on page load
let barCurrentXRight = Math.round(0 + barWidth);  // Sets right side of scrollbar position on page load
let sliderPosition = 0;

// TODO: Set this in a function so it can continue to work when page resizes etc
sliderBar.style.width = barWidth + 'px'; // Sets bar width on page load

sliderBarContainer.addEventListener('mousedown', (e) => {
  isDown = true;
  barStartX = e.clientX - sliderBar.offsetLeft;
  sliderPosition = sliderContainer.scrollLeft;
});

sliderBarContainer.addEventListener('mouseleave', () => {
  isDown = false;
});

sliderBarContainer.addEventListener('mouseup', () => {
  isDown = false;
});

sliderBarContainer.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  barCurrentXLeft = e.clientX - barStartX;
  console.log({barCurrentXLeft, barStartX});
  barCurrentXRight = Math.round(barCurrentXLeft + barWidth);
  let walk = barCurrentXLeft - barStartX;
  if (barCurrentXLeft >= 0 && barCurrentXRight <= sliderBarTrackWidth) {
    sliderBar.style.left = barStartX + walk + 'px';
    sliderContainer.scrollLeft = (sliderPosition + walk) * scrollRatio;
  }
});