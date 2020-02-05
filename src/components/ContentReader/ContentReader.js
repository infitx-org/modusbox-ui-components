import 'highlight.js/styles/googlecode.css';
import './ContentReader.scss';

import hljs from 'highlight.js/lib/highlight';
import json from 'highlight.js/lib/languages/json';
import shell from 'highlight.js/lib/languages/shell';
import xml from 'highlight.js/lib/languages/xml';
import React, { PureComponent } from 'react';
import vkbeautify from 'vkbeautify';

import ScrollBox from '../ScrollBox';

hljs.registerLanguage('xml', xml);
hljs.registerLanguage('json', json);
hljs.registerLanguage('shell', shell);

function restrictKeysToSelectAndCopy (evt) {
  const { ctrlKey, metaKey, keyCode } = evt;
  const isCopyOrSelectKey = keyCode === 65 || keyCode === 67;
  const isCopyOrSelectModifier = ctrlKey || metaKey;
  if (!isCopyOrSelectKey || !isCopyOrSelectModifier) {
    evt.preventDefault();
  }
}

class ContentReader extends PureComponent {
  static parse(source = '') {
    let content = source;
    let lineNumbers = null;
    let error = false;

    try {
      content = vkbeautify.json(source, 2);
    } catch (jsonErr) {
      try {
        content = vkbeautify.xml(source, 2);
      } catch (xmlErr) {
        error = true;
      }
    }

    if (!error) {
      const lines = content.split(/(?:\r\n|\r|\n)/);
      lineNumbers = lines.map((_, index) => (
        <div className="content-reader__lines__line-n" key={index.toString()}>
          {index + 1}
        </div>
      ));
    }

    return { content, lineNumbers, error };
  }
  componentDidMount() {
    hljs.highlightBlock(this.code);
  }
  componentDidUpdate() {
    // remove className preventing re-highlighting
    this.code.className = '';
    hljs.highlightBlock(this.code);
  }

  render() {
    const { content, lineNumbers, error } = ContentReader.parse(this.props.data);
    if (error) {
      return <div>Unable to read the data</div>;
    }

    return (
      <div className="content-reader">
        <div className="content-reader__layout-v" style={this.props.style}>
          <ScrollBox flex>
            <div className="content-reader__layout-h">
              <div className="content-reader__lines">
                <pre>
                  <code>{lineNumbers}</code>
                </pre>
              </div>
              <div
                contentEditable
                spellCheck="false"
                className="content-reader__content"
                role="presentation"
                onKeyDown={restrictKeysToSelectAndCopy}
              >
                <pre>
                  <code
                    ref={code => {
                      this.code = code;
                    }}
                  >
                    {content}
                  </code>
                </pre>
              </div>
            </div>
          </ScrollBox>
        </div>
      </div>
    );
  }
}

export default ContentReader;
