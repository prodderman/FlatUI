import 'jquery-ui/ui/widgets/datepicker';
import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/themes/base/datepicker.css';
import './calendar.styl';

class Calendar {
  constructor(calendar) {
    this.calendar = $(calendar);
    this.init();
  }
  init() {
    const nowNode = this.calendar.children(".calendar__now");
    nowNode.text(new Date().getDate());

    this.calendar.datepicker({
      inline: true,
      selectOtherMonths: true,
      
      dayNamesMin: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      showButtonPanel: true,
      showOtherMonths: true,
      firstDay: 1,
    });
  }
}

$(() => {
  const calendars = $('.js-calendar').map((index, node) => new Calendar(node));
});