import MessageTemplateRoutes from './messagetemplate/messagetemplate.routes';
import NotificationTemplateRoutes from './notificationtemplate/notificationtemplate.routes';
import RecipientRoutes from './recipient/recipient.routes';
import NotificationRoutes from './notification/notification.routes';

export default app => {
    app.use(function(req, res, next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header("Access-Control-Allow-Methods", "*");
        next();
    });
    app.use('/api/v1/messagetemplate', MessageTemplateRoutes);
    app.use('/api/v1/notificationtemplate', NotificationTemplateRoutes);
    app.use('/api/v1/recipient', RecipientRoutes);
    app.use('/api/v1/notify', NotificationRoutes);
}