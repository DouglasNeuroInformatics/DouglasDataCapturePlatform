import React from 'react';

import { Random } from '@dnp/common/utils'

const IndexPage = () => {
  return (
    <div>
      <h1>Index Page</h1>
      {Random.int(1, 5)}
    </div>
  );
};

export default IndexPage;
