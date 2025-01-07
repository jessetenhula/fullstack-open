const Notification = ({ notification }) => {
  if(notification.message === null) {
    return null
  }

  return (
    <div className={notification.classes}>
      {notification.message}
    </div>
  )
}

export default Notification