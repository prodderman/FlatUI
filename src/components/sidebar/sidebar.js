import './sidebar.styl';

$(() => {
  if ($('.js-sidebar').length > 0) {
    $('.js-layout__pjax-container').on('pjax:end', () => {
      $.pjax({
        url: window.location.href,
        container: '.sidebar__menu',
        fragment: '.sidebar__menu',
        timeout: 4000
      });
    });
  }
});