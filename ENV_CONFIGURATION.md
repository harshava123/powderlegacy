# 🔧 Environment Variables Configuration

## 📋 What to Put in Your `.env` File

Create a file named `.env` in your project root (same folder as `package.json`) with the following content:

---

## 📝 Complete .env File Template

Copy and paste this into your `.env` file, then fill in the values:

```env
# ============================================
# SUPABASE CONFIGURATION (REQUIRED)
# ============================================

VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

# ============================================
# RAZORPAY PAYMENT (REQUIRED FOR CHECKOUT)
# ============================================

VITE_RZP_KEY_ID=
VITE_RZP_SECRET_KEY=
VITE_RZP_PAYMENT_PAGE_URL=

# ============================================
# EMAIL CONFIGURATION (REQUIRED FOR ORDERS)
# ============================================

SMTP_USER=
SMTP_PASS=
GMAIL_USER=
GMAIL_APP_PASSWORD=
ADMIN_EMAIL=

# ============================================
# APPLICATION URL (OPTIONAL)
# ============================================

APP_URL=http://localhost:5174
```

---

## 🔑 How to Get Each Value

### **1. SUPABASE CREDENTIALS** (Required!)

**Where to get:**
1. Go to [supabase.com](https://supabase.com)
2. Create account/login
3. Create new project (or select existing)
4. Go to **Settings** → **API**
5. Copy these values:

**VITE_SUPABASE_URL:**
```
Example: https://abcdefghijklmn.supabase.co
```
Found under: **Project URL**

**VITE_SUPABASE_ANON_KEY:**
```
Example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFz...
```
Found under: **Project API keys** → **anon public**

---

### **2. RAZORPAY CREDENTIALS** (For Payment)

**Where to get:**
1. Go to [razorpay.com](https://razorpay.com)
2. Sign up/login
3. Go to **Settings** → **API Keys**

**VITE_RZP_KEY_ID:**
```
Example: rzp_test_1234567890
```
For testing, use keys starting with `rzp_test_`

**VITE_RZP_SECRET_KEY:**
```
Example: abcdefghijklmnopqrstuvwxyz123456
```
Keep this SECRET!

**VITE_RZP_PAYMENT_PAGE_URL:** (Optional)
```
Example: https://razorpay.me/@powderlegacy
```
Only if using Razorpay payment pages

---

### **3. EMAIL CREDENTIALS** (For Order Notifications)

**Where to get Gmail App Password:**
1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Login to your Google account
3. Click **"Select app"** → Choose "Mail"
4. Click **"Select device"** → Choose "Other" → Type "Powder Legacy"
5. Click **"Generate"**
6. Copy the 16-character password (format: `abcd efgh ijkl mnop`)

**SMTP_USER & GMAIL_USER:**
```
Example: moksh.dev0411@gmail.com
```
Your Gmail address

**SMTP_PASS & GMAIL_APP_PASSWORD:**
```
Example: abcd efgh ijkl mnop
```
The app password from step above

**ADMIN_EMAIL:**
```
Example: harshavardhanpenthala@gmail.com
```
Email where order notifications are sent

---

## 📄 Example Filled .env File

Here's what your `.env` should look like with actual values:

```env
# ============================================
# SUPABASE CONFIGURATION
# ============================================

VITE_SUPABASE_URL=https://xyzabc123.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emFiYzEyMyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjIzODkyNDAwLCJleHAiOjE5Mzk0Njg0MDB9.dummySignatureForExample

# ============================================
# RAZORPAY PAYMENT
# ============================================

VITE_RZP_KEY_ID=rzp_test_AbCdEf123456
VITE_RZP_SECRET_KEY=YourSecretKey123456789
VITE_RZP_PAYMENT_PAGE_URL=https://razorpay.me/@powderlegacy

# ============================================
# EMAIL CONFIGURATION
# ============================================

SMTP_USER=moksh.dev0411@gmail.com
SMTP_PASS=abcd efgh ijkl mnop
GMAIL_USER=moksh.dev0411@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
ADMIN_EMAIL=harshavardhanpenthala@gmail.com

# ============================================
# APPLICATION URL
# ============================================

APP_URL=http://localhost:5174
```

---

## ⚠️ IMPORTANT NOTES

### **1. Don't Commit .env File**
Your `.env` file contains secrets and should **NEVER** be committed to git.

It's already in `.gitignore`, but verify:
```bash
# Check if .env is ignored
git status
# .env should NOT appear
```

### **2. Restart Server After Changes**
After editing `.env`, restart your development server:
```bash
# Stop server (Ctrl+C)
# Start again
npm run dev
```

### **3. Required vs Optional**

**REQUIRED for app to work:**
- ✅ VITE_SUPABASE_URL
- ✅ VITE_SUPABASE_ANON_KEY

**Required for payments:**
- ✅ VITE_RZP_KEY_ID
- ✅ VITE_RZP_SECRET_KEY

**Required for order emails:**
- ✅ SMTP_USER (or GMAIL_USER)
- ✅ SMTP_PASS (or GMAIL_APP_PASSWORD)
- ✅ ADMIN_EMAIL

**Optional:**
- VITE_RZP_PAYMENT_PAGE_URL
- APP_URL

### **4. Variable Naming**

**VITE_** prefix is REQUIRED for frontend variables:
- ✅ `VITE_SUPABASE_URL` - Correct
- ❌ `SUPABASE_URL` - Won't work in frontend

**Non-VITE** variables are for backend (server/API):
- `SMTP_USER` - Used in server
- `SMTP_PASS` - Used in server
- `ADMIN_EMAIL` - Used in server

---

## 🧪 Test Your Configuration

After creating `.env`, test if it works:

```bash
# 1. Restart server
npm run dev

# 2. Check browser console (F12)
# Should NOT see any errors about missing credentials

# 3. Try to signup
# Go to /signup
# Create test account

# 4. Try admin panel
# Go to /admin
# Login with: Dixit@powderlegacy.com / Dixit@12

# 5. Edit a product
# Should save without errors
```

---

## 📝 Step-by-Step Setup

### **Quick Start (5 minutes):**

1. **Create `.env` file in project root**
   ```bash
   # In your project folder
   touch .env
   # Or create manually in file explorer
   ```

2. **Copy template from above** into `.env`

3. **Fill in Supabase values:**
   - Go to Supabase Dashboard
   - Settings → API
   - Copy URL and anon key
   - Paste in .env

4. **Fill in Razorpay values** (if you have them)
   - Or use test keys for now

5. **Fill in Gmail values** (if you have them)
   - Or skip for now (emails won't work but app will)

6. **Save `.env` file**

7. **Restart server:**
   ```bash
   npm run dev
   ```

8. **Test the app!**

---

## 🔍 Verify Configuration

### **Check if .env is loaded:**

Add this temporarily to `src/lib/supabase.js`:

```javascript
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
console.log('Anon Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY)
```

Then check browser console. You should see your URL printed.

---

## 🚨 Common Issues

### **Issue: Variables not loading**
- **Cause**: Server not restarted
- **Fix**: Stop server (Ctrl+C) and run `npm run dev` again

### **Issue: "YOUR_SUPABASE_URL" showing in console**
- **Cause**: .env file not found or incorrect location
- **Fix**: Ensure .env is in project root (same level as package.json)

### **Issue: Vite not reading .env**
- **Cause**: Variables don't start with VITE_
- **Fix**: All frontend variables MUST start with `VITE_`

---

## 📞 Need Help?

**Can't find credentials?**
- Supabase: Settings → API (in dashboard)
- Razorpay: Settings → API Keys (in dashboard)
- Gmail: myaccount.google.com/apppasswords

**Still stuck?**
- Check SUPABASE_SETUP.md for detailed guide
- Review browser console for error messages
- Ensure Supabase project is created first

---

## ✅ Final Checklist

Before running the app:

- [ ] `.env` file created in project root
- [ ] Supabase URL added
- [ ] Supabase anon key added
- [ ] (Optional) Razorpay keys added
- [ ] (Optional) Gmail credentials added
- [ ] Server restarted
- [ ] No console errors about missing credentials

---

**Once configured, everything will work automatically!** 🚀

Your app will connect to Supabase and all features (products, auth, cart, images) will function perfectly.

