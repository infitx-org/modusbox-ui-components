import html from './index';

// composeOption
// composeOptions
describe('tests the HTML utility methods', () => {
  it('Should build the correct pair', () => {
    expect(html.composeOption('label', 'value')).toStrictEqual({ label: 'label', value: 'value' });
  });
  it('Should build the correct pairs', () => {
    expect(html.composeOptions({ label: 'value', label2: 'value2' })).toStrictEqual([
      { label: 'label', value: 'value' },
      { label: 'label2', value: 'value2' },
    ]);
  });
});
