import React from 'react';

import Cross from './Cross';

const Icon = (props) => {
  switch (props.name) {
    case 'cross':
      return <Cross {...props} />;
    default:
      return;
  }
};

export default Icon;
