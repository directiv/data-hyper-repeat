module.exports = {
  '/': {
    users: {
      href: '/users'
    }
  },
  '/users': {
    collection: [
      {href: '/users/1'},
      {href: '/users/2'},
      {href: '/users/3'}
    ],
    next: {
      href: '/users?page=2'
    }
  },
  '/users?page=2': {
    collection: [
      {href: '/users/4'},
      {href: '/users/5'},
      {href: '/users/6'}
    ]
  },
  '/users/1': {
    name: 'Mike'
  },
  '/users/2': {
    name: 'Brannon'
  },
  '/users/3': {
    name: 'Cameron'
  },
  '/users/4': {
    name: 'Matthew'
  },
  '/users/5': {
    name: 'Nate'
  },
  '/users/6': {
    name: 'Tim'
  }
};
