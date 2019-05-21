# Menu 

Renders a Menu. Composed by the components
  - [Menu](#menu-component)
  - [MenuSection](#menusection-component)
  - [MenuItem](#menuitem-component)


## Menu component 

Renders the whole menu component 

### Proptypes

|   Name   |   Type   |           Description           | Optional | Values |   Default   |
|----------|----------|---------------------------------|----------|--------|-------------|
| path     | `string` | describes the starting path     |          |        | `undefined` |
| pathname | `string` | describes the current pathname  |          |        | `undefined` |
| onChange | `func`   | describes the callback function |          |        | `undefined` |


## MenuSection component

Renders a menu section with the label

### Proptypes

|  Name |   Type   |         Description         | Optional | Values |   Default   |
|-------|----------|-----------------------------|----------|--------|-------------|
| label | `string` | describes the section label |          |        | `undefined` |

## MenuItem Component

Renders a menu item

### Proptypes

|   Name   |   Type   |                 Description                 | Optional | Values |   Default   |
|----------|----------|---------------------------------------------|----------|--------|-------------|
| path     | `string` | describes the path where the item is active |          |        | `undefined` |
| to       | `string` | describes the path to go to                 |          |        | `undefined` |
| disabled | `bool`   | describes if the item is disabled           |          |        | `false`     |
| hidden   | `bool`   | describes if should be hidden               |          |        | `false`     |
| back     | `bool`   | describes if it renders as a _back_ button  |          |        | `false`     |
| icon     | `string` | describes the icon name to render           |          |        | `undefined` |
| fill     | `string` | describes the icon fill color               |          |        | `undefined` |
