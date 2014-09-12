module.exports = {
  tag: 'div',
  props: {
    'data-hyper-repeat': 'user in users'
  },
  state: {
    users: {
      href: '/users'
    }
  },
  children: [
    {
      tag: 'div'
    }
  ]
};
