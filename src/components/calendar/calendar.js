import 'jquery-ui/ui/widgets/datepicker';
import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/themes/base/datepicker.css';

class Calendar {
  constructor(calendar) {
    this.$calendar = $(calendar);
    this._init();
  }

  _init() {
    const $calendarHead = this.$calendar.children('.js-calendar__head');
    const goToToday = $.datepicker._gotoToday;
    const selectDate = $.datepicker._selectDate;
    $calendarHead.text(new Date().getDate());

    $.datepicker._selectDate = function(id, dateStr) {
      selectDate.call(this, id, dateStr);
      $( id ).datepicker('setDate', dateStr);
    };

    $.datepicker._gotoToday = function(id) {
      goToToday.call(this,id);
      this._selectDate(id);
    };
    
    this.$calendar.datepicker({
      inline: true,
      selectOtherMonths: true,
      dayNamesMin: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      showButtonPanel: true,
      showOtherMonths: true,
      firstDay: 1,
      onSelect: this._writeDateInHead($calendarHead)
    });
  }

  _writeDateInHead($calendarHead) {
    return function(date) {
      $calendarHead.text(new Date(date).getDate());
    };
  }
}

function render(isComponentOnPjaxContainer = false) {
  const $components = $(isComponentOnPjaxContainer ? '.js-layout__pjax-container .js-calendar' : '.js-calendar');
  if ($components.length > 0) {
    $components.map((index, node) => new Calendar(node));
  }
}

export default render;
