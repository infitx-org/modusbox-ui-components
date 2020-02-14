/* eslint no-console: "off" */
import React from 'react';

import ContentReader from '../../components/ContentReader';

/* eslint-disable max-len */
const json = `{
  "Interchange": {
    "DataElementSeparator": "*",
    "SegmentSeparat123or1": "~%WSP*; %NL;%WSP*;",
    "SegmentSeparato123r": "~%WSP*; %NL;%WSP*;",
    "SegmentSepar1ator": "~%WSP*; %NL;%WSP*;",
    "Segmen1tSepara2tor": "~%WSP*; %NL;%WSP*;",
    "Segment213Separat2or": "~%WSP*; %NL;%WSP*;",
    "SegmentSe23parato4r": "~%WSP*; %NL;%WSP*;",
    "aSegmentSepa23rato6r": "~%WSP*; %NL;%WSP*;",
    "SegmentSeparasdasa231to7r": "~%WSP*; %NL;%WSP*;",
    "ISA": {
      "ISA15": "PPPasdasdasdasdasdasdasdPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP",
      "ISA16": ">"
    }
  }
}`;
/* eslint-enable max-len */

const TestContentReader = () => (
  <div style={{ height: '400px', padding: '20px', display: 'flex' }}>
    <ContentReader data={json} />
  </div>
);
export default TestContentReader;
