# FileUploader 

Renders a FileUploader - input type `file`.

### Proptypes

|        Name       |   Type   |                   Description                   | Optional |       Values      |   Default   |
|-------------------|----------|-------------------------------------------------|----------|-------------------|-------------|
| `style`           | `object` | defines the HTML style                          |          |                   | `{}`        |
| `type`            | `string` | defines the HTML input type                     |          | _text, password_, | `'text'`    |
| `id`              | `string` | defines the HTML id                             |          |                   | `undefined` |
| `className`       | `string` | defines the HTML classname                      |          |                   | `undefined` |
| `size`            | `string` | defines the size                                |          | _s, m, l_         | `'l'`       |
| `placeholder`     | `string` | defines the placeholder                         |          |                   | `undefined` |
| `onButtonClick`   | `func`   | defines the inner button _onclick_ function     |          |                   | `undefined` |
| `onChange`        | `func`   | defines the _onchange_ function                 |          |                   | `undefined` |
| `pending`         | `bool`   | defines if the spinner should be visible        |          |                   | `false`     |
| `required`        | `bool`   | defines if the required style should be applied |          |                   | `false`     |
| `invalid`         | `bool`   | defines if the invalid style should be applied  |          |                   | `false`     |
| `invalidMessages` | []()     | defines the validation messages and state       |          |                   | `[]`        |
| `disabled`        | `bool`   | defines the HTML `disabled` attribute           |          |                   | `false`     |
| file              | `string` | defines the file value                          |          |                   | `undefined` |
| fileName          | `string` | defines the file name                           |          |                   | `undefined` |
| fileType          | `string` | defines the file type for restricting selection |          |                   | `undefined` |
| parseFileAs       | `string` | defines how to parse the file the file value    |          | _text, base64_    | `undefined` |
