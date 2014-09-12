var users = [
  {
    href: '/users/1'
  },
  {
    href: '/users/2'
  },
  {
    href: '/users/3'
  }
];
users.href = '/users';

module.exports = {
  tag: 'div',
  state: {
    users: users
  },
  props: {},
  children: [
    {
      tag: 'div',
      state: {
        users: users,
        user: {
          href: '/users/1'
        }
      }
    },
    {
      tag: 'div',
      state: {
        users: users,
        user: {
          href: '/users/2'
        }
      }
    },
    {
      tag: 'div',
      state: {
        users: users,
        user: {
          href: '/users/3'
        }
      }
    }
  ]
};
