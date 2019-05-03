## Tooltip

Renders a tooltip.

### Proptypes

|       Name      |             Type            |                       Description                       | Optional |                  Values                  |   Default   |
|-----------------|-----------------------------|---------------------------------------------------------|----------|------------------------------------------|-------------|
| delay           | `number`                   | describes the delay in ms                               |          |                                          | `200`       |
| forceVisibility | `bool`                     | describes whether it should be visible without hovering |          |                                          | `undefined` |
| showOnHover     | `bool`                     | describes whether it should be visible when hovering    |          |                                          | `undefined` |
| content         | `node`                     | describes the inner content                             |          |                                          | `undefined` |
| children        | `node`                     | describes the regularly shown content                   |          |                                          | `null`      |
| style           | `{}`                       | describes the HTML style                                |          |                                          | `{}`        |
| label           | `string`, `[string]`, `node` | describes the tooltip text label                        |          |                                          | `undefined` |
| position        | `string`                    | describes the position relatively to the source         |          | _top, bottom, left, right, auto_         | `undefined` |
| kind            | `string`                    | describes the appearance                                |          | _regular, error, info, warning, neutral_ | `regular`   |
| custom          | `bool`                      | describes whether it will show custom content           |          | ,                                        | `false`     |
