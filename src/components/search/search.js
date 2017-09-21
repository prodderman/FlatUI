import './search.styl';

export default class Search {
  constructor(node) {
    this.search = $(node);
    this.addEventHadlers();
  }

  addEventHadlers() {
    const field = this.search.find("input");
    const seacrhList = this.search.find("ul.search__result-list");
    field.on("change keyup", (e) => {
      if (field.val().length >= 2) {
        $.ajax({
          type: 'POST',
          url: this.search.is("[data-action]") ? this.search.data("action") : "",
          data: {
            'search': field.val()
          },
          cache: false,
          response: 'text',
          success: (data) => {
            if (data.length > 0) {
              seacrhList.html(data).show();
            }
            else {
              seacrhList.hide();
            }
          },
          error: () => {
            seacrhList.hide();
          }
        });
      }
    });

    field.on("focusin", (e) => {
      if (field.hasClass("error")) {
        field.removeClass("error");
        field.attr("placeholder", "Search");
      }
    });

    this.search.submit((e) => {
      e.preventDefault();
      $.ajax({
        type: this.search.attr('[method]') ? this.search.attr('method') : "",
        url: this.search.is("[action]") ? this.search.attr("action") : "",
        data: {
          'search': field.val()
        },
        success: (data) => {
          //------------------
        },
        error: () => {
          field.val("");
          field.addClass("error");
          field.attr("placeholder", "I’ve not found what I’m looking for...");
        }
      });
    })
  }
}

$(() => {
  $('.js-search').map((index, node) => new Search($(node)));
});