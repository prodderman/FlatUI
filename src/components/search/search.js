import { bind } from 'decko';

class Search {
  constructor(node) {
    this.$search = $(node);
    this.searchText = '';
    this._addEventHadlers();
  }

  _addEventHadlers() {
    const $field = this.$search.find('.js-search__field');
    $field.on('change keyup', this._writeSearchText);
    $field.on('focusin', this._resetSearch);
    this.$search.submit(this._getSearchResult);
  }

  @bind
  _getSearchResult(event) {
    event.preventDefault();
    const $field = $(event.target).find('.js-search__field');
    $.ajax({
      type: 'POST',
      url: '',
      error: this._makeSearchErrorSetting($field)
    });
  }

  @bind
  _makeSearchErrorSetting($field) {
    return function() {
      $field.val('');
      $field.addClass('error');
      $field.attr('placeholder', 'I’ve not found what I’m looking for...');
    };
  }

  @bind
  _writeSearchText(event) {
    this.searchText = event.target.value;
  }

  @bind
  _resetSearch(event) {
    const $field = $(event.target);
    if ($field.hasClass('error')) {
      $field.removeClass('error');
      $field.attr('placeholder', 'Search');
      $field.val(this.searchText);
    }
  }
}

function render(isComponentOnPjaxContainer = false) {
  const $components = $(isComponentOnPjaxContainer ? '.js-layout__pjax-container .js-search' : '.js-search');
  if ($components.length > 0) {
    $components.map((index, node) => new Search(node));
  }
}

export default render;
