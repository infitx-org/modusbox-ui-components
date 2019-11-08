/* eslint no-console: "off" */

import React from 'react';

import FileUploader from '../../components/FileUploader';
import Row from '../../components/Row';

const TestFileUploader = () => (
  <div>
    <div className="p10 b1-ccc">
      <FileUploader
        className="m5"
        placeholder="Default"
        parseFileAs="text"
        onChange={console.log}
        fileName="test"
        file="zzz"
      />
      <FileUploader
        className="m5"
        placeholder="Only .txt file type"
        parseFileAs="base64"
        fileType=".txt"
        onChange={console.log}
      />
      <FileUploader className="m5" placeholder="Pending" pending />
      <FileUploader className="m5" placeholder="Disabled" disabled />
      <FileUploader
        className="m5"
        placeholder="Invalid"
        invalid
        invalidMessages={[
          { message: 'This is a test', active: true },
          { message: 'This is invalid', active: false },
        ]}
      />
      <FileUploader
        className="m5"
        placeholder="Required"
        required
        fileName="test"
        onChange={console.log}
      />
      <FileUploader className="m5" placeholder="small" required onChange={console.log} />
    </div>
    <Row className="p10 b1-ccc" align="space-between center">
      <FileUploader className="m5" placeholder="small" size="s" />
      <FileUploader className="m5" placeholder="medium" size="m" />
      <FileUploader className="m5" placeholder="large" size="l" />
      <FileUploader className="m5" placeholder="small" size="s" pending />
      <FileUploader className="m5" placeholder="medium" size="m" pending />
      <FileUploader className="m5" placeholder="large" size="l" pending />
    </Row>
  </div>
);

export default TestFileUploader;
