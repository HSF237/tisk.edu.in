# Deployment Guide - TISK School ERP

## Production Deployment Checklist

### Pre-Deployment

- [ ] Update all environment variables
- [ ] Set `NODE_ENV=production`
- [ ] Configure production database (MongoDB Atlas recommended)
- [ ] Set up production Razorpay account
- [ ] Configure email service
- [ ] Update CORS settings
- [ ] Test all features in staging environment

### Frontend Deployment (Vercel/Netlify)

#### Vercel Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd client
vercel
```

3. Configure environment variables in Vercel dashboard:
   - `VITE_API_URL` = Your backend API URL

#### Netlify Deployment

1. Build the project:
```bash
cd client
npm run build
```

2. Deploy `dist/` folder to Netlify
3. Set environment variables in Netlify dashboard

### Backend Deployment (Heroku/Railway/Render)

#### Heroku Deployment

1. Install Heroku CLI
2. Login and create app:
```bash
heroku login
heroku create tisk-school-api
```

3. Set environment variables:
```bash
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set JWT_SECRET=your_secret
heroku config:set RAZORPAY_KEY_ID=your_key
heroku config:set RAZORPAY_KEY_SECRET=your_secret
# ... add all other variables
```

4. Deploy:
```bash
cd server
git init
git add .
git commit -m "Initial commit"
heroku git:remote -a tisk-school-api
git push heroku main
```

#### Railway Deployment

1. Connect GitHub repository
2. Select `server` folder as root
3. Add environment variables in Railway dashboard
4. Deploy automatically on push

#### Render Deployment

1. Create new Web Service
2. Connect GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables

### Database Setup (MongoDB Atlas)

1. Create cluster at https://www.mongodb.com/cloud/atlas
2. Create database user
3. Whitelist IP addresses (0.0.0.0/0 for all)
4. Get connection string
5. Update `MONGODB_URI` in production environment

### File Storage

For production, consider using:
- **AWS S3** for file uploads
- **Cloudinary** for images
- Update multer configuration to use cloud storage

### Security Checklist

- [ ] Use strong JWT secret (32+ characters)
- [ ] Enable HTTPS only
- [ ] Set secure CORS origins
- [ ] Implement rate limiting
- [ ] Use helmet.js for security headers
- [ ] Validate all inputs
- [ ] Sanitize user inputs
- [ ] Use environment variables (never commit secrets)
- [ ] Regular security updates

### Performance Optimization

- [ ] Enable gzip compression
- [ ] Implement caching strategies
- [ ] Optimize images
- [ ] Use CDN for static assets
- [ ] Database indexing
- [ ] Connection pooling

### Monitoring

Set up monitoring for:
- Application errors (Sentry, LogRocket)
- Server uptime (UptimeRobot, Pingdom)
- Performance (New Relic, Datadog)
- Analytics (Google Analytics)

### Backup Strategy

- [ ] Automated database backups (MongoDB Atlas provides this)
- [ ] Regular file backups
- [ ] Test restore procedures

### Domain & SSL

1. Point domain to hosting provider
2. Configure SSL certificate (Let's Encrypt free)
3. Update `FRONTEND_URL` and CORS settings

### Post-Deployment

- [ ] Test all features
- [ ] Verify email sending
- [ ] Test payment gateway
- [ ] Check file uploads
- [ ] Monitor error logs
- [ ] Set up alerts

## Environment Variables Reference

### Frontend (.env)
```
VITE_API_URL=https://your-api-domain.com
```

### Backend (.env)
```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
RAZORPAY_KEY_ID=rzp_live_...
RAZORPAY_KEY_SECRET=your_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=https://your-domain.com
```

## Support

For deployment issues, contact:
- Email: tiskprincipal@yahoo.com
- Phone: +91 497 281 2349
