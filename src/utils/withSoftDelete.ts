import { Filter } from '@mikro-orm/core';

const WithSoftDelete = (): ClassDecorator => {
  return Filter({
    name: 'softDelete',
    cond: {
      deletedAt: null,
    },
    default: true,
  });
};

export default WithSoftDelete;
