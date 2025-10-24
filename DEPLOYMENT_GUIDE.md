# Hiligaynon Vocabulary App - Deployment Guide

This guide covers deploying your Hiligaynon vocabulary learning app to various platforms.

## 🚀 Quick Deploy Options

### Option 1: Netlify (Recommended for simplicity)

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder to Netlify
   - Or connect your GitHub repository for automatic deployments

3. **Configure environment variables in Netlify:**
   - Go to Site Settings → Environment Variables
   - Add your API keys:
     ```
     VITE_AWS_ACCESS_KEY_ID=your_aws_key
     VITE_AWS_SECRET_ACCESS_KEY=your_aws_secret
     VITE_PEXELS_API_KEY=your_pexels_key (if using Pexels)
     ```

### Option 2: Vercel (Great for Vue.js apps)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

3. **Set environment variables:**
   ```bash
   vercel env add VITE_AWS_ACCESS_KEY_ID
   vercel env add VITE_AWS_SECRET_ACCESS_KEY
   ```

### Option 3: GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json:**
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

### Option 4: Firebase Hosting

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase:**
   ```bash
   firebase init hosting
   ```

3. **Build and deploy:**
   ```bash
   npm run build
   firebase deploy
   ```

## 📁 Build Configuration

Your app builds to the `dist` folder with:
- `index.html` - Main HTML file
- `assets/` - CSS and JavaScript bundles
- All static assets from `public/` folder

## 🔐 Environment Variables

### Required for AWS Polly (Speech):
```bash
VITE_AWS_ACCESS_KEY_ID=your_aws_access_key
VITE_AWS_SECRET_ACCESS_KEY=your_aws_secret_key
VITE_AWS_REGION=ap-southeast-1
```

### Optional for Pexels Images:
```bash
VITE_PEXELS_API_KEY=your_pexels_api_key
```

## ⚙️ Production Optimizations

Your app includes:
- ✅ **Code splitting** - Automatic chunk optimization
- ✅ **Asset optimization** - CSS/JS minification
- ✅ **Icon optimization** - Iconify with tree-shaking
- ✅ **Caching strategies** - Service worker ready
- ✅ **Performance** - Lazy loading and image optimization

## 🌐 Domain Configuration

### Custom Domain Setup:
1. **DNS Configuration:**
   - Add CNAME record pointing to your hosting platform
   - Example: `hiligaynon-vocab.yourschool.edu`

2. **SSL Certificate:**
   - Most platforms provide automatic SSL
   - Ensure HTTPS is enforced

## 📊 Performance Monitoring

### Recommended Tools:
- **Google Analytics** - User engagement tracking
- **Google PageSpeed Insights** - Performance monitoring
- **Sentry** - Error tracking (for production apps)

### Performance Checklist:
- ✅ App loads in under 3 seconds
- ✅ Images are properly optimized
- ✅ Audio files load efficiently
- ✅ Responsive design works on all devices

## 🔧 Troubleshooting

### Common Deployment Issues:

1. **Build Fails:**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Environment Variables Not Working:**
   - Ensure they start with `VITE_`
   - Restart development server after changes
   - Check platform-specific env variable setup

3. **Assets Not Loading:**
   - Check base URL in `vite.config.js`
   - Ensure all paths are relative

4. **Audio Not Working:**
   - Verify AWS credentials
   - Check CORS settings
   - Test in different browsers

## 📱 Mobile Optimization

Your app is already optimized for mobile:
- ✅ **Responsive design** - Works on all screen sizes
- ✅ **Touch-friendly** - Proper button sizing
- ✅ **PWA-ready** - Can be installed as mobile app
- ✅ **Offline-capable** - Basic functionality without internet

## 🎯 Deployment Checklist

Before deploying:
- [ ] Test all features locally
- [ ] Verify AWS Polly speech synthesis works
- [ ] Check responsive design on mobile devices
- [ ] Test with different browsers
- [ ] Ensure all images load properly
- [ ] Verify quiz functionality
- [ ] Test progress tracking
- [ ] Check pronunciation features

After deployment:
- [ ] Verify live site works
- [ ] Test AWS speech synthesis in production
- [ ] Check all routes work properly
- [ ] Verify mobile responsiveness
- [ ] Test with students/users
- [ ] Monitor for any errors

## 🚀 Recommended Deployment

For **Hua Siong College**, I recommend **Netlify** because:
- ✅ **Free tier** with generous limits
- ✅ **Easy setup** - drag and drop deployment
- ✅ **Automatic SSL** and CDN
- ✅ **Environment variables** support
- ✅ **Custom domains** supported
- ✅ **Continuous deployment** from Git

Your app will be live at: `https://your-app-name.netlify.app`

## 📞 Support

For deployment help:
- **Netlify**: [docs.netlify.com](https://docs.netlify.com)
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **AWS**: [aws.amazon.com/getting-started](https://aws.amazon.com/getting-started)

Your Hiligaynon vocabulary app is ready for production! 🇵🇭📚