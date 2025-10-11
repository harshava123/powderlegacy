# 🚀 Deployment Checklist

## Before Deploying

- [ ] Test locally: `npm run dev`
- [ ] Test build: `npm run build`
- [ ] Check all environment variables are documented
- [ ] Test payment flow with Razorpay test keys
- [ ] Verify email sending works
- [ ] Check all images load correctly
- [ ] Test mobile responsiveness

## GitHub Setup

- [ ] Create GitHub repository
- [ ] Push code to GitHub:
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  git remote add origin YOUR_REPO_URL
  git push -u origin main
  ```

## Vercel Setup

- [ ] Sign up at https://vercel.com
- [ ] Connect GitHub account
- [ ] Import your repository
- [ ] Configure build settings (auto-detected for Vite)
- [ ] Add ALL environment variables:
  - [ ] `VITE_FIREBASE_API_KEY`
  - [ ] `VITE_FIREBASE_AUTH_DOMAIN`
  - [ ] `VITE_FIREBASE_PROJECT_ID`
  - [ ] `VITE_FIREBASE_STORAGE_BUCKET`
  - [ ] `VITE_FIREBASE_MESSAGING_SENDER_ID`
  - [ ] `VITE_FIREBASE_APP_ID`
  - [ ] `VITE_RZP_KEY_ID`
  - [ ] `VITE_RZP_SECRET_KEY`
  - [ ] `VITE_RZP_PAYMENT_PAGE_URL`
  - [ ] `VITE_ADMIN_KEY`
  - [ ] `GMAIL_USER`
  - [ ] `GMAIL_APP_PASSWORD`
  - [ ] `ADMIN_EMAIL`
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete
- [ ] Test the Vercel URL (e.g., `your-app.vercel.app`)

## Namecheap Domain Setup

- [ ] Login to Namecheap
- [ ] Go to Domain List → Manage
- [ ] Click "Advanced DNS"
- [ ] Add Vercel's DNS records:
  - [ ] A Record: @ → Vercel's IP
  - [ ] CNAME: www → cname.vercel-dns.com
- [ ] Delete old A/CNAME records
- [ ] Save changes
- [ ] Wait 15-30 minutes for DNS propagation

## Vercel Domain Connection

- [ ] Go to Vercel → Settings → Domains
- [ ] Add your Namecheap domain
- [ ] Wait for SSL certificate (automatic)
- [ ] Verify "Valid Configuration" status

## Final Testing

- [ ] Visit your custom domain
- [ ] Test all pages load correctly
- [ ] Test product browsing
- [ ] Test add to cart functionality
- [ ] Test checkout flow (with test payment)
- [ ] Verify order confirmation email arrives
- [ ] Check admin notification email
- [ ] Test on mobile devices
- [ ] Check browser console for errors

## Go Live

- [ ] Switch Razorpay to LIVE mode:
  - Update `VITE_RZP_KEY_ID` to live key
  - Update `VITE_RZP_SECRET_KEY` to live secret
  - Redeploy in Vercel
- [ ] Test a small real transaction
- [ ] Monitor for 24 hours
- [ ] Share with friends/family for beta testing

## Post-Launch

- [ ] Set up Google Analytics (optional)
- [ ] Submit to Google Search Console
- [ ] Create social media pages
- [ ] Start marketing!

---

## Quick Commands

**Local Development:**
```bash
npm run dev
```

**Build for Production:**
```bash
npm run build
```

**Deploy Updates:**
```bash
git add .
git commit -m "Your changes"
git push
```
(Vercel auto-deploys from GitHub)

---

## Support Contacts

- **Vercel Support**: https://vercel.com/help
- **Razorpay Support**: https://razorpay.com/support/
- **Namecheap Support**: https://www.namecheap.com/support/

Good luck with your launch! 🎉


