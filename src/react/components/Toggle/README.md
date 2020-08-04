# Toggle

Renders a toggle.

### Proptypes

|    Name   |   Type   |                 Description                  | Optional | Values |   Default   |
|-----------|----------|----------------------------------------------|----------|--------|-------------|
| classname | `string` | defines the HTML classname                   | x        |        | `undefined` |
| id        | `string` | defines the HTML id                          | x        |        | `undefined` |
| style     | `object` | defines the HTML style                       | x        |        | `undefined` |
| label     | `string` | defines the text content                     |          |        | `undefined` |
| disabled  | `bool`   | defines if the button should be disabled     | x        |        | `false`     |
| checked   | `bool`   | defined whether the toggle is checked      |          |        | `false`     |
| semi      | `bool`   | defines whether the toggle is half-checked | x        |        | `false`     |
| onClick   | `func`   | defines the input _onclick_ function         |          |        | `undefined` |
| onChange  | `func`   | defines the input _onchange_ function        |          |        | `undefined` |
| onBlur    | `func`   | defines the input _onblur_ function          |          |        | `undefined` |
| onFocus   | `func`   | defines the input _onfocus_ function         |          |        | `undefined` |
