# Icon

Renders a SVG icon by using the xLinkHref reference. The SVG should already be imported in order to be used.

### Proptypes

|       Name      |       Type       |              Description               | Optional |                  Values                  |   Default   |
|-----------------|------------------|----------------------------------------|----------|------------------------------------------|-------------|
| classname       | `string`         | defines the HTML classname             | x        |                                          | `undefined` |
| id              | `string`         | defines the HTML id                    | x        |                                          | `undefined` |
| style           | `object`         | defines the HTML style                 | x        |                                          | `undefined` |
| name            | `string`         | defines the icon name _xLinkHref_      |          |                                          | `undefined` |
| fill            | `string`         | defines the fill color                 |          |                                          | `undefined` |
| stroke          | `string`         | defines the stroke color               |          |                                          | `undefined` |
| spin            | `bool`           | defines whether the icon should rotate |          |                                          | `false`     |
| size            | `number`         | defines the icon height and width      |          |                                          | `20`        |
| tooltip         | `node`, `string` | defines the tooltip component or label |          |                                          | `undefined` |
| tooltipDelay    | `number`         | defines the delay in ms                |          |                                          | `undefined` |
| tooltipKind     | `string`         | defines the tooltip kind               |          | _regular, error, info, warning, neutral_ | `undefined` |
| tooltipPosition | `string`         | defines the tooltip position           |          | _top, bottom, left, right_               | `undefined` |
