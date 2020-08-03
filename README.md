## Modusbox UI Components

Reusable modules to build Modusbox User Interfaces.

The library includes React components, Redux Middlewares, and commonly used JS utility modules.


### Installing


##### Makefile / Docker 

Make sure you have _Docker_ installed, then run `make install`.

If you make any changes to files outside `src`, such as `package.json`, you should run `make install` again.

You can easily chain that with the command you want to run, for example `make install test`.


##### Manual install

  1. Make sure to have a compatible version of NodeJS.
  2. Enter the project folder and run `yarn install`.


### Running


##### Running the dev playground

Launch dev mode with `make start` and open [http://localhost:9090](http://localhost:9090). So long as you keep
this process running, your files will be automatically linted (with automatic fixing) and you don't need to run a separate lint step.

##### Running the Storybook playground

Simply run `yarn storybook` to start the preconfigured Storybook playground.

##### Adding and removing packages

Run `make add package=name-of-package` or `make remove package=name-of-package`.
This will automatically run `install`. To install for dev, change to
`make add/remove package="--dev name-of-package"`.

##### Incrementing the package version
Run `make version increment=type-of-increment`, where `type-of-increment` is `major`, `minor`, or `patch` (defaults to `minor`).
For example if the version is currently `1.1.0` and you run `make version` the new version will be `1.2.0`. If you run
`make version increment=major` the new version will be `2.0.0`. You will then need to commit the updated package.json file. This
should be the last step before you merge a pull request into the `master` branch.


### Building

Note: Several module will be produces by the build; they are grouped into folders so that they can be easily imported separately when consumed in a project.

Building creates specific artifacts that the build process pulls out. To check that
the build works, run `make build`. Build artifacts will be stored in the `dist/`.

### Testing / Linting

**Note** Tests should be run each time some changes are committed to ensure everything works properly.

##### Linting strategy

Modern ESLint rules and AirBnb styleguide are applied to this code base. Linting runs
automatically if you use `make start`, but if you need to run them manually,
run `make lint`. Prettier is run as part of linting.

##### Local testing for development

In order to run the test locally, use `yarn jest`

##### Containerized testing

If you want to run the test inside docker, run `make test` or; if you want to pass additional arguments, `make cmd="test"`
(everything in double quotes will be passed to yarn).

##### Snapshot Testing

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
it's a cue to check that the new rendering is correct. Once that's verified, run `make cmd="test --updateSnapshot"`.
Make sure you only update the snapshots you've checked should be updated! To filter down to just some tests so you
don't update the rest, use the `--testNamePattern` argument.

You can read more about using snapshot testing with Jest at https://facebook.github.io/jest/docs/en/snapshot-testing.html
