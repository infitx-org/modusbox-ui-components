# Tabs

Renders the tabs and the relative panels. Composed by 
  - [Tab](#tab-component)
  - [Tabs](#tabs-component)
  - [TabList](#tablist-component)
  - [TabPanel](#tabpanel-component)
  - [TabPanels](#tabpanels-component)


## Tab component

Renders a Tab

### Proptypes 

|   Name   |  Type  |                    Description                    | Optional | Values |   Default   |
|----------|--------|---------------------------------------------------|----------|--------|-------------|
| children | `node` | defines the content                               |          |        | `undefined` |
| selected | `bool` | defines whether it renders as selected            |          |        | `false`     |
| focused  | `bool` | defines whether it renders as focused             |          |        | `false`     |
| onSelect | `func` | defines the callback function on selection        |          |        | `undefined` |
| disabled | `bool` | defines whether the tab should render as disabled |          |        | `false`     |
| hidden   | `bool` | defines whether the tab should be hidden          |          |        | `false`     |
| flex     | `bool` | defines whether should render using flexbox       |          |        | `false`     |
| style    | `{}`   | defines the HTML style                            |          |        | `undefined` |

## Tabs component

Renders the Tabs

### Proptypes 

|   Name   |        Type        |                 Description                 | Optional | Values |     Default      |
|----------|--------------------|---------------------------------------------|----------|--------|------------------|
| id       | `string`           | defines the HTML id                         |          |        | `'el-tabs'` |
| selected | `number`, `string` | defines the selected tab                    |          |        | `0`              |
| onSelect | `func`             | defines the selection callback function     |          |        | `undefined`      |
| disabled | `bool`             | defines whether the the `Tab`s are disabled |          |        | `false`          |
| children | `node`             | defines the `TabPanels, TabList` children   |          |        | `undefined`      |
| flex     | `bool`             | defines whether should render using flexbox |          |        | `false`          |

## TabList component

Renders the TabList

### Proptypes 

|   Name   |  Type  |         Description         | Optional | Values |   Default   |
|----------|--------|-----------------------------|----------|--------|-------------|
| children | `node` | defines the `Tab` children` |          |        | `undefined` |

## TabPanel component

Renders a TabPanel

### Proptypes 

|   Name   |  Type  |                 Description                 | Optional | Values |   Default   |
|----------|--------|---------------------------------------------|----------|--------|-------------|
| children | `node` | defines the content                         |          |        | `undefined` |
| flex     | `bool` | defines whether should render using flexbox |          |        | `false`     |


## TabPanels component

Renders the TabPanels, only the selected TabPanel

### Proptypes 

|   Name   |  Type  |           Description            | Optional | Values |   Default   |
|----------|--------|----------------------------------|----------|--------|-------------|
| children | `node` | defines the `TabPanel` children` |          |        | `undefined` |
  