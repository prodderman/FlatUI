import 'jquery-ui/ui/widgets/datepicker';
import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/themes/base/datepicker.css';
import './calendar.styl';
import $ from 'jquery';

class Calendar {
  constructor(calendar) {
    this.$calendar = $(calendar);
    this._init();
  }

  _init() {
    const $nowNode = this.$calendar.children('.js-calendar__now');
    const _goToTodaySave = $.datepicker._gotoToday;
    const _selectDateSave = $.datepicker._selectDate;
    $nowNode.text(new Date().getDate());

    $.datepicker._selectDate = function(id, dateStr) {
      _selectDateSave.call(this, id, dateStr);
      $( id ).datepicker('setDate', dateStr);
    };

    $.datepicker._gotoToday = function(id) {
      _goToTodaySave.call(this,id);
      this._selectDate(id);
    };
    
    this.$calendar.datepicker({
      inline: true,
      selectOtherMonths: true,
      dayNamesMin: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      showButtonPanel: true,
      showOtherMonths: true,
      firstDay: 1,
      onSelect: function(date) {
        $nowNode.text(new Date(date).getDate());
      }
    });
  }
}

export default function render(inPage = false) {
  $(() => {
    $(inPage ? '.layout  .js-calendar' : '.js-calendar').map((index, node) => new Calendar(node));
  });
}