# Development Setup - Email Functionality

## 🚨 Important: Email Setup Required

For emails to work in development, you need to run **both** the Vite dev server and the API server.

## ✅ Quick Start

### 1. Make sure your `.env` file exists with these variables:

```env
# Email Configuration
SMTP_USER=groupartihcus@gmail.com
SMTP_PASS=wqgopmkslbkeuin
ADMIN_EMAIL=harshavardhanpenthala@gmail.com

# Firebase (optional - has fallbacks)
VITE_FIREBASE_API_KEY=your-key
VITE_FIREBASE_PROJECT_ID=powderlegacy-b2111
```

### 2. Start the Development Environment

**Option A: Run Both Servers Automatically (Recommended)**
```bash
npm run dev
```
This will start:
- ✅ Vite dev server on http://localhost:5173
- ✅ API server on http://localhost:3001

**Option B: Run Servers Separately (for debugging)**

Terminal 1:
```bash
npm run server
```

Terminal 2:
```bash
npm run dev:vite
```

## 📧 Testing Email Functionality

1. Add items to cart
2. Go through checkout
3. Complete payment with Razorpay test card:
   - Card: `4111 1111 1111 1111`
   - CVV: `123`
   - Expiry: Any future date

4. Check browser console for:
   - ✅ `"Email sent successfully"` - Email worked
   - ❌ `"Email send failed:"` - Check error message

## 🔧 Troubleshooting

### "Email send failed: connect ECONNREFUSED"
- **Issue**: API server is not running
- **Fix**: Make sure you're using `npm run dev` (not just `vite`)

### "Email send failed: Invalid login"
- **Issue**: SMTP credentials are wrong
- **Fix**: Verify `.env` file has correct `SMTP_USER` and `SMTP_PASS`

### "Email send failed: Missing credentials"
- **Issue**: `.env` file not loaded
- **Fix**: 
  1. Restart both servers (stop with Ctrl+C, run `npm run dev` again)
  2. Verify `.env` is in the root directory

### API endpoint returns 404
- **Issue**: Vite proxy not configured
- **Fix**: Already configured in `vite.config.js`, just restart servers

## 📁 File Structure

```
powder-main/
├── api/
│   └── send-order-email.js    # Serverless email function
├── server/
│   └── index.js               # Express server for development
├── vite.config.js             # Proxy config for /api routes
├── .env                       # Environment variables (DO NOT COMMIT)
└── package.json               # Updated with dev script
```

## 🚀 Production Deployment (Vercel)

When deploying to Vercel:
1. The `api/` folder functions automatically become serverless functions
2. Add environment variables in Vercel dashboard:
   - `SMTP_USER`
   - `SMTP_PASS`
   - `ADMIN_EMAIL`
3. No need to deploy the `server/` folder (it's only for local dev)

## ✅ What's Working Now

- ✅ Products loading from local data (with Firestore fallback)
- ✅ Email API endpoint configured
- ✅ Development server setup complete
- ✅ Automatic invoice download
- ✅ Email to customer and admin

---

**Now restart your dev server with `npm run dev` and test a payment!** 🎉

