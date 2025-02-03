import PropTypes from 'prop-types'
import { useNotificationValue } from '../contexts/NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()

  if (!notification) {
    return null
  }

  return <p>{notification}</p>
}

Notification.propTypes = {
  message: PropTypes.string,
}

export default Notification
