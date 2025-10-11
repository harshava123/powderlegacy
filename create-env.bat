@echo off
echo Creating .env file...

(
echo VITE_RZP_KEY_ID=rzp_live_RQe6fpgSWqgHQM
echo VITE_RZP_SECRET_KEY=WBcRm8ZPb5TKfF2eSk9b7OJu
echo VITE_RZP_PAYMENT_PAGE_URL=72BVfIPBg113R0ak1GelvX6e
echo VITE_ADMIN_KEY=admin123
echo.
echo GMAIL_USER=groupartihcus@gmail.com
echo GMAIL_APP_PASSWORD=wqgopmkslbkeuins
echo ADMIN_EMAIL=harshavardhanpenthala@gmail.com
) > .env

echo .env file created successfully!
echo.
echo Contents:
type .env
echo.
echo Done! Now restart your server with: npm run dev
pause

