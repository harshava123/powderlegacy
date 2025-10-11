# Vercel Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (free tier is fine)
- Namecheap domain

## Step 1: Push Code to GitHub

1. Create a new repository on GitHub
2. Push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### A. Connect Vercel to GitHub
1. Go to https://vercel.com
2. Click "Sign Up" or "Login"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your repositories

### B. Import Your Project
1. Click "Add New..." → "Project"
2. Select your repository from the list
3. Click "Import"

### C. Configure Build Settings
Vercel will auto-detect settings, but verify:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### D. Add Environment Variables
Click "Environment Variables" and add these:

**Firebase:**
```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

**Razorpay:**
```
VITE_RZP_KEY_ID=rzp_live_RQe6fpgSWqgHQM
VITE_RZP_SECRET_KEY=WBcRm8ZPb5TKfF2eSk9b7OJu
VITE_RZP_PAYMENT_PAGE_URL=72BVfIPBg113R0ak1GelvX6e
VITE_ADMIN_KEY=admin123
```

**Email (for serverless functions):**
```
GMAIL_USER=groupartihcus@gmail.com
GMAIL_APP_PASSWORD=wqgopmkslbkeuin
ADMIN_EMAIL=harshavardhanpenthala@gmail.com
```

### E. Deploy
1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like: `your-project.vercel.app`

## Step 3: Connect Namecheap Domain

### A. Get Vercel DNS Records
1. In Vercel project dashboard, go to "Settings" → "Domains"
2. Click "Add Domain"
3. Enter your domain (e.g., `thepowderlegacy.com`)
4. Vercel will show you DNS records to add

**You'll see something like:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### B. Configure Namecheap DNS
1. Login to Namecheap: https://www.namecheap.com
2. Go to "Domain List"
3. Click "Manage" next to your domain
4. Click "Advanced DNS" tab

### C. Add DNS Records
1. Click "Add New Record"
2. Add the A record:
   - **Type**: A Record
   - **Host**: @
   - **Value**: 76.76.21.21 (use the IP Vercel gives you)
   - **TTL**: Automatic

3. Add the CNAME record:
   - **Type**: CNAME Record
   - **Host**: www
   - **Value**: cname.vercel-dns.com (use what Vercel gives you)
   - **TTL**: Automatic

4. **Delete** any existing A records or CNAME records for @ and www

### D. Wait for DNS Propagation
- DNS changes can take 5 minutes to 48 hours
- Usually it's fast (15-30 minutes)
- Check status: https://www.whatsmydns.net/

### E. Verify in Vercel
1. Go back to Vercel → Settings → Domains
2. Wait for the status to show "Valid Configuration"
3. Vercel will automatically issue an SSL certificate (HTTPS)

## Step 4: Test Your Site

1. Visit your domain: `https://thepowderlegacy.com`
2. Test all features:
   - ✅ Product browsing
   - ✅ Add to cart
   - ✅ Checkout flow
   - ✅ Payment (use Razorpay test mode first!)
   - ✅ Email notifications

## Important Notes

### Serverless Functions
- Your `/api` folder will automatically deploy as serverless functions
- Each file in `/api` becomes an endpoint
- No need for `server/index.js` in production

### Environment Variables
- Make sure ALL variables are set in Vercel
- Variables starting with `VITE_` are exposed to frontend
- Other variables are server-side only (secure)

### Redirects
If you want `thepowderlegacy.com` to redirect to `www.thepowderlegacy.com`:
1. In Vercel Settings → Domains
2. Click the three dots next to your domain
3. Choose "Redirect to www"

### Custom Domain Best Practices
1. Use HTTPS (Vercel does this automatically)
2. Enable "Automatically renew SSL" in Vercel
3. Set up email forwarding in Namecheap if needed

## Troubleshooting

### Domain not working?
1. Check DNS propagation: https://www.whatsmydns.net/
2. Verify DNS records in Namecheap match Vercel's requirements
3. Clear browser cache (Ctrl + F5)

### Build failed?
1. Check build logs in Vercel
2. Verify all dependencies are in package.json
3. Test build locally: `npm run build`

### Environment variables not working?
1. Make sure they're set in Vercel Settings → Environment Variables
2. Redeploy after adding variables
3. Check variable names (case-sensitive)

## Ongoing Maintenance

### To Update Your Site:
1. Make changes locally
2. Test locally: `npm run dev`
3. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```
4. Vercel will automatically deploy the new version!

### To Rollback:
1. Go to Vercel → Deployments
2. Find a previous successful deployment
3. Click "..." → "Promote to Production"

---

## Quick Reference

**Your Vercel Project URL**: `https://your-project.vercel.app`
**Your Custom Domain**: `https://thepowderlegacy.com`

**Vercel Dashboard**: https://vercel.com/dashboard
**Namecheap Dashboard**: https://ap.www.namecheap.com/

Need help? Check:
- Vercel Docs: https://vercel.com/docs
- Vercel Community: https://github.com/vercel/vercel/discussions


