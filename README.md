## Modusbox UI Components

Reusable and configurable React UI components.

#### Installing

Install with `yarn install`

#### Running

Launch dev mode with `yarn start` and open [http://localhost:10000](http://localhost:10000)

#### Building

Simply run `yarn build`

#### Linting

Modern ESLint rules and AirBnb styleguide are applied to this code base.
In order to lint please run `yarn lint` or `yarn lint --watch` for watch mode.

#### Prettify

Code base can be easily prettified by running `yarn prettier`.

### Testing

To run the tests, run `yarn run test`.

#### Snapshot Testing

Since most of these components are Pure, we'll be able to do a large amount of our testing via a technique in Jest, snapshot testing.
Snapshot testing is related to doing pixel-by-pixel comparisons of rendered pages, but instead it compares markup.

Our first simple snapshot test looks like this:

```javascript
it('renders correct sizes', () => {
  [...Array(10).keys()].forEach(size => {
    const wrapper = shallow(<Heading size={size}> Text </Heading>);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
```

The three key calls related to snapshot testing are `shallow`, `shallowToJson`, and `toMatchSnapshot`.
First, `shallow` is a convenience function to make a wrapper for the component. Then, shallowToJson turns that
wrapped component into a JSON representation in a consistent way--effectively "rendering" the component as if it was on a page
at that moment, but structured for easier comparison.

That's where the test method `toMatchSnapshot` comes into play. On the first run, it just saves the snapshot to a special
directory, `__snapshots__`. On future runs, it compares each snapshot for that test to the saved
snapshots, and if they don't match, the test fails. If the intent of the code change was to change the code without
changing the rendering, that's just caught a problem. If, however, the rendering was supposed to change, then
it's a cue to check that the new rendering is correct. Once that's verified, run `yarn run test --updateSnapshot`.
Make sure you only update the snapshots you've checked should be updated! To filter down to just some tests so you
don't update the rest, use the `--testNamePattern` argument.

You can read more about using snapshot testing with Jest at https://facebook.github.io/jest/docs/en/snapshot-testing.html
