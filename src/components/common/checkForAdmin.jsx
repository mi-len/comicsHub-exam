import requester from '../infrastructure/requester'
import observer from '../infrastructure/observer'

const checkForAdmin = {
  isAdmin: () => {
    let endpoint = sessionStorage.getItem('id')

    requester.get('user', endpoint, 'kinvey')
      .then(res => {
        observer.trigger(observer.events.isAdmin, res.isAdmin)
      })
  }
}
export default checkForAdmin
