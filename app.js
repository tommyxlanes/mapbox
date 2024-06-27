gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
  trigger: '.right',
  start: 'top top',
  end: 'bottom bottom',
  pin: '.left',
});

const tabs = document.querySelectorAll('.tab');

tabs.forEach((tab) => console.log(tab.getAttribute('data-tab')));

// Function to set query parameters
function setQueryParam(param, value) {
  let url = new URL(window.location.href);
  let params = new URLSearchParams(url.search);
  params.set(param, value);
  url.search = params.toString();
  window.history.pushState({}, '', url);
}

// Function to handle tab click
function onTabClick(event) {
  const clickedTab = event.target;
  const tabValue = clickedTab.getAttribute('data-tab');

  // Set the query parameter in the URL
  setQueryParam('tab', tabValue);

  // Update the active tab
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.classList.remove('active');
  });
  clickedTab.classList.add('active');
}

// Attach click event listeners to tabs
document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', onTabClick);
});

// Function to set the active tab based on URL query parameter
function setActiveTabFromURL() {
  const params = new URLSearchParams(window.location.search);
  const activeTab = params.get('tab');

  if (activeTab) {
    document.querySelectorAll('.tab').forEach((tab) => {
      if (tab.getAttribute('data-tab') === activeTab) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
  }
}

// Set the active tab on page load based on URL query parameter
window.onload = setActiveTabFromURL;

//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$('.next').click(function () {
  if (animating) return false;
  animating = true;

  current_fs = $(this).parent();
  next_fs = $(this).parent().next();

  //activate next step on progressbar using the index of next_fs
  $('#progressbar li').eq($('fieldset').index(next_fs)).addClass('active');

  //show the next fieldset
  next_fs.show();
  //hide the current fieldset with style
  current_fs.animate(
    { opacity: 0 },
    {
      step: function (now, mx) {
        //as the opacity of current_fs reduces to 0 - stored in "now"
        //1. scale current_fs down to 80%
        scale = 1 - (1 - now) * 0.2;
        //2. bring next_fs from the right(50%)
        left = now * 50 + '%';
        //3. increase opacity of next_fs to 1 as it moves in
        opacity = 1 - now;
        current_fs.css({
          transform: 'scale(' + scale + ')',
          position: 'absolute',
        });
        next_fs.css({ left: left, opacity: opacity });
      },
      duration: 800,
      complete: function () {
        current_fs.hide();
        animating = false;
      },
      //this comes from the custom easing plugin
      easing: 'easeInOutBack',
    }
  );
});

$('.previous').click(function () {
  if (animating) return false;
  animating = true;

  current_fs = $(this).parent();
  previous_fs = $(this).parent().prev();

  //de-activate current step on progressbar
  $('#progressbar li')
    .eq($('fieldset').index(current_fs))
    .removeClass('active');

  //show the previous fieldset
  previous_fs.show();
  //hide the current fieldset with style
  current_fs.animate(
    { opacity: 0 },
    {
      step: function (now, mx) {
        //as the opacity of current_fs reduces to 0 - stored in "now"
        //1. scale previous_fs from 80% to 100%
        scale = 0.8 + (1 - now) * 0.2;
        //2. take current_fs to the right(50%) - from 0%
        left = (1 - now) * 50 + '%';
        //3. increase opacity of previous_fs to 1 as it moves in
        opacity = 1 - now;
        current_fs.css({ left: left });
        previous_fs.css({
          transform: 'scale(' + scale + ')',
          opacity: opacity,
        });
      },
      duration: 800,
      complete: function () {
        current_fs.hide();
        animating = false;
      },
      //this comes from the custom easing plugin
      easing: 'easeInOutBack',
    }
  );
});

$('.submit').click(function () {
  return false;
});

// ************************************************************ END ************************************************

// Create a new URL object
let url = new URL('https://example.com');

// Create URLSearchParams object
let params = new URLSearchParams(url.search);

// Append query parameters
params.append('key', 'value');
params.append('anotherKey', 'anotherValue');

// Update the URL with the new query parameters
url.search = params.toString();

const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
