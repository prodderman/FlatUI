class Search {
  constructor(node) {
    this.$search = $(node);
    this._addEventHadlers();
  }

  _addEventHadlers() {
    const $field = this.$search.find('.js-search__field');
    const $seacrhList = this.$search.find('ul.js-search__result-list');
    $field.on('change keyup', () => {
      if ($field.val().length >= 2) {
        $.ajax({
          type: 'POST',
          url: this.$search.is('[data-action]') ? this.$search.data('action') : '',
          data: {
            'search': $field.val()
          },
          cache: false,
          response: 'text',
          success: (data) => {
            if (data.length > 0) {
              $seacrhList.html(data).show();
            }
            else {
              $seacrhList.hide();
            }
          },
          error: () => {
            $seacrhList.hide();
          }
        });
      }
    });

    $field.on('focusin', () => {
      if ($field.hasClass('error')) {
        $field.removeClass('error');
        $field.attr('placeholder', 'Search');
      }
    });

    this.$search.submit((event) => {
      event.preventDefault();
      $.ajax({
        type: this.$search.attr('[method]') ? this.$search.attr('method') : '',
        url: this.$search.is('[action]') ? this.$search.attr('action') : '',
        data: {
          'search': $field.val()
        },
        error: () => {
          $field.val('');
          $field.addClass('error');
          $field.attr('placeholder', 'I’ve not found what I’m looking for...');
        }
      });
    });
  }
}

function render(isComponentOnPjaxContainer = false) {
  const $components = $(isComponentOnPjaxContainer ? '.js-layout__pjax-container .js-search' : '.js-search');
  if ($components.length > 0) {
    $components.map((index, node) => new Search(node));
  }
}

export default render;
