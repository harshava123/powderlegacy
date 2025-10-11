# 🔐 Admin Panel Guide

## Overview
The Powder Legacy admin panel is a comprehensive content management system that allows you to manage all aspects of your e-commerce website.

## Access

### Admin Login
- **URL**: `/admin`
- **Credentials**:
  - Email: `Dixit@powderlegacy.com`
  - Password: `Dixit@12`

After successful login, you'll be redirected to `/admindashboard`

## Features

### 1. 📊 Overview Dashboard
- View quick statistics about your store
- Total products count
- Categories count
- Content sections overview
- Quick action buttons to navigate to different management panels

### 2. 📦 Products Manager
Manage all your products with full CRUD (Create, Read, Update, Delete) capabilities.

#### Features:
- **View All Products**: See a comprehensive list with images, categories, and ratings
- **Add New Product**: Create new products with all details
- **Edit Existing Products**: Modify any product information
- **Delete Products**: Remove products from the catalog

#### Product Fields:
- Product Name
- Category (Skin Care, Hair Care, Oral Care)
- Short Description
- Full Description
- Benefits
- Key Benefits
- Ingredients
- Rating (1-5 stars)
- Number of Reviews
- Multiple Sizes & Pricing (each with size, weight, price, stock)
- Product Images (multiple URLs)

#### How to Add/Edit Products:
1. Click "Add New Product" or "Edit" icon on existing product
2. Fill in all required fields (marked with *)
3. Add multiple sizes by clicking "Add Size"
4. Enter image URLs (one per line in the text area)
5. Click "Save Product"

**Note**: Changes are saved to localStorage and will be reflected immediately on the frontend.

### 3. 🏠 Home Content Manager
Customize all content sections on your homepage.

#### Editable Sections:

**Hero Section**
- Main title
- Subtitle
- Primary button text
- Secondary button text

**About Section**
- Section title
- Description paragraphs (2 blocks)

**Features Section**
- 4 feature cards with:
  - Feature title
  - Feature description

**Testimonials**
- 3 customer testimonials with:
  - Customer name
  - Location
  - Rating
  - Comment text

**Call to Action Section**
- CTA title
- CTA subtitle
- Button texts

#### How to Edit:
1. Navigate to "Home Content" in the sidebar
2. Scroll through sections and edit text fields
3. Click "Save Changes" (appears at top and bottom)
4. Changes are immediately saved and reflected on homepage

### 4. 📑 Header Content Manager
Customize your website header and navigation menu.

#### Features:
- **Logo Management**: Update logo image URL
- **Site Name**: Change the brand name
- **Navigation Menu**: Full control over menu items
  - Add/remove menu items
  - Edit menu item names and URLs
  - Create submenu dropdowns
  - Reorder menu items

#### How to Manage Navigation:
1. Click "Add Menu Item" to create new menu links
2. For each menu item:
   - Set the display name
   - Set the URL path
   - Add submenu items if needed
3. Click "Add Submenu" to create dropdown items
4. Use the trash icon to remove items
5. Click "Save Changes"

### 5. ⚙️ Settings
Additional configuration options (coming soon)

## Data Storage

### How It Works:
- All admin changes are stored in **browser localStorage**
- Data is automatically synced between admin panel and frontend
- No database changes required for immediate updates

### Storage Keys:
- `admin_products` - Product data edited by admin
- `products_data` - Active products shown on frontend
- `admin_home_content` - Home page content
- `home_content` - Active home content
- `admin_header_content` - Header configuration
- `header_content` - Active header configuration
- `adminSession` - Admin authentication session

### Reset to Default:
Each content manager has a "Reset to Default" button that:
- Clears all admin edits
- Restores original content
- Requires page refresh

## Security

### Authentication:
- Admin login uses hardcoded credentials
- Session stored in localStorage
- Protected routes check authentication status
- Auto-redirect to login if not authenticated

### Session Management:
- Login creates admin session
- Session persists across page reloads
- Logout clears session and redirects to login

## Tips & Best Practices

### Products:
1. Always fill required fields (Name, Description)
2. Use high-quality image URLs
3. Keep sizes consistent across similar products
4. Update stock levels regularly
5. Maintain competitive pricing

### Content:
1. Keep hero text concise and impactful
2. Update testimonials with real customer feedback
3. Test navigation menu after changes
4. Use clear, action-oriented button text
5. Keep descriptions customer-focused

### Images:
1. Use absolute paths starting with `/` or full URLs
2. Optimize images for web (recommended: < 500KB)
3. Use consistent image dimensions per section
4. Test image URLs before saving

## Troubleshooting

### Can't Login?
- Verify credentials are exactly: `Dixit@powderlegacy.com` / `Dixit@12`
- Clear browser cache and try again
- Check browser console for errors

### Changes Not Showing?
- Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
- Clear localStorage and re-save changes
- Check browser console for errors

### Lost Changes?
- Changes are stored in localStorage - clearing browser data will remove them
- Always have backup of important content
- Use "Reset to Default" carefully as it's irreversible

## Keyboard Shortcuts

- **Save**: Ctrl/Cmd + S (in some browsers)
- **Logout**: Click logout button in sidebar

## Browser Compatibility

Tested and works on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Support

For technical issues or questions:
- Check browser console for error messages
- Review this guide for common solutions
- Contact: support@powderlegacy.com

---

## Quick Start Guide

1. **Login**: Go to `/admin` and enter credentials
2. **Navigate**: Use sidebar to access different sections
3. **Edit**: Make your changes in any section
4. **Save**: Click "Save Changes" button
5. **Preview**: Visit your website to see changes live
6. **Logout**: Use logout button when done

---

**Last Updated**: 2025
**Version**: 1.0.0

