# Firebase Firestore Setup Instructions

## Issue: "Missing or insufficient permissions" Error

The Firestore permissions error happens because Firebase's default rules don't allow public write access to the database.

## Solution: Update Firestore Security Rules

### Option 1: Deploy Using Firebase CLI (Recommended)

1. **Install Firebase CLI** (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**:
   ```bash
   firebase login
   ```

3. **Initialize Firebase in your project** (if not already done):
   ```bash
   firebase init firestore
   ```
   - Select your existing project: `powderlegacy-b2111`
   - Accept default filenames (firestore.rules and firestore.indexes.json)

4. **Deploy the rules**:
   ```bash
   firebase deploy --only firestore:rules
   ```

### Option 2: Update Rules Manually in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **powderlegacy-b2111**
3. Click on **Firestore Database** in the left sidebar
4. Click on the **Rules** tab
5. Replace the existing rules with the content from `firestore.rules` file
6. Click **Publish**

## What These Rules Do

- ✅ Allow **anyone** to create and read orders (needed for checkout without authentication)
- ✅ Allow **anyone** to create contact messages
- ✅ Allow **authenticated users** to read/write their own cart and favorites
- ❌ Prevent order deletion (security measure)
- ❌ Deny all other operations by default (security measure)

## Security Note

These rules allow public write access to the orders collection. In a production environment, you might want to add additional validation:

```javascript
// Example: Validate order data structure
match /orders/{orderId} {
  allow create: if request.resource.data.orderId is string
                && request.resource.data.items is list
                && request.resource.data.totals.total > 0;
  allow read: if true;
  allow update: if false; // Prevent updates after creation
  allow delete: if false; // Prevent deletion
}
```

## Testing

After deploying the rules, try making a test order. The Firestore error should be resolved.

If you still see permission errors:
1. Check the browser console for the exact error
2. Verify the rules were deployed successfully in Firebase Console
3. Wait 1-2 minutes for rules to propagate
4. Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)

