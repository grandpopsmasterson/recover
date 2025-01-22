// types/notification.ts
interface NotificationDTO {
    id: number;
    message: string;
    type: NotificationType;
    timestamp: string;
    referenceId: number;
    read: boolean;
}

// components/notifications/NotificationItem.tsx
const NotificationItem: React.FC<{ notification: NotificationDTO }> = ({ notification }) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        markAsRead(notification.id);
        navigateToReference(notification);
    };
    
    const navigateToReference = (notification: NotificationDTO) => {
        switch (notification.type) {
            case 'PROJECT_ASSIGNED':
            case 'PROJECT_CREATED':
                navigate(`/projects/${notification.referenceId}`);
                break;
            case 'REQUEST_SUBMITTED':
                navigate(`/requests/${notification.referenceId}`);
                break;
            case 'APPROVAL_RECEIVED':
                navigate(`/approvals/${notification.referenceId}`);
                break;
            case 'COMMENT_ADDED':
                navigate(`/comments/${notification.referenceId}`);
                break;
        }
    };

    return (
        <div 
            className={`notification-item ${notification.read ? 'read' : 'unread'}`}
            onClick={handleClick}
        >
            <NotificationIcon type={notification.type} />
            <div className="notification-content">
                <p>{notification.message}</p>
                <span>{formatTimestamp(notification.timestamp)}</span>
            </div>
        </div>
    );
};