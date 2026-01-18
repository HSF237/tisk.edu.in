import { FaInbox, FaSearch } from 'react-icons/fa'

const EmptyState = ({ 
  icon: Icon = FaInbox, 
  title = 'No data found', 
  message = 'There is no data to display at the moment.',
  action,
  actionLabel
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <Icon className="text-6xl text-gray-300 mb-4" />
      <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
      <p className="text-gray-600 text-center max-w-md mb-6">{message}</p>
      {action && actionLabel && (
        <button onClick={action} className="btn btn-accent">
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export default EmptyState
