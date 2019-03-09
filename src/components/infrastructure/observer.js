let subscriptions = {
  'loginUser': [],
  'notification': [],
  'isAdmin': []
}

export default {
  events: {
    loginUser: 'loginUser',
    notification: 'notification',
    isAdmin: 'isAdmin'
  },
  subscribe: (eventName, fn) => subscriptions[eventName].push(fn),
  trigger: (eventName, data) => subscriptions[eventName].forEach(fn => fn(data))
}
