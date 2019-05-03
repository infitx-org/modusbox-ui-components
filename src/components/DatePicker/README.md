# DatePicker 

Renders a DatePicker

### Proptypes


|        Name       |   Type   |                     Description                     | Optional |       Values      |   Default   |
|-------------------|----------|-----------------------------------------------------|----------|-------------------|-------------|
| autofocus       | `bool`   | defines if should automatically get the focus       |          |                   | `false`     |
| style           | `object` | defines the HTML style                              |          |                   | `{}`        |
| type            | `string` | defines the HTML input type                         |          | _text, password_, | `'text'`    |
| id              | `string` | defines the HTML id                                 |          |                   | `undefined` |
| className       | `string` | defines the HTML classname                          |          |                   | `undefined` |
| size            | `string` | defines the size                                    |          | _s, m, l_         | `'l'`       |
| placeholder     | `string` | defines the placeholder                             |          |                   | `undefined` |
| value           | `string` | defines the value                                   |          |                   | `undefined` |
| onSelect        | `func`   | defines the _onchange_ function                     |          |                   | `undefined` |
| onBlur          | `func`   | defines the _onblur_ function                       |          |                   | `undefined` |
| onFocus         | `func`   | defines the _onfocus_ function                      |          |                   | `undefined` |
| pending         | `bool`   | defines if the spinner should be visible            |          |                   | `false`     |
| required        | `bool`   | defines if the required style should be applied     |          |                   | `false`     |
| invalid         | `bool`   | defines if the invalid style should be applied      |          |                   | `false`     |
| invalidMessages | []()     | defines the validation messages and state           |          |                   | `[]`        |
| disabled        | `bool`   | defines the HTML `disabled` attribute               |          |                   | `false`     |
| format            | `string` | defines the format using `moment`                   |          |                   | `undefined` |
| dateFormat        | `string` | defines the date format using `moment`              |          |                   | `undefined` |
| withTime          | `bool`   | defines if the picker will let select the time too  |          |                   | `false`     |
| defaultHour       | `number` | defines the default hour                            |          |                   | `0`         |
| defaultMinute     | `number` | defines the detault minute                          |          |                   | `0`         |
| defaultSecond     | `number` | defines the detault second                          |          |                   | `0`         |
| hideIcon          | `bool`   | defines if the calendar icon should be hidden       |          |                   | `false`     |
| initialMonth      | `string` | defines the initial month the picker will show      |          |                   | `undefined` |
| disabledDays      | `func`   | defines which days should be disabled for selection |          |                   | `undefined` |