import './sidebar.styl';

$(() => {
  $('.layout__pjax-container').on('pjax:success', () => {
    $.pjax({
      url: window.location.href,
      container: '.sidebar__menu',
      fragment: '.sidebar__menu',
      timeout: 4000
    });
  });
});