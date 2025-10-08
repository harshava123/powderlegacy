// Quick test script for email API
// Run with: node test-email-api.js

const testEmailAPI = async () => {
  console.log('🧪 Testing Email API...')
  
  const testPayload = {
    orderId: 'test_' + Date.now(),
    paymentId: 'pay_test123',
    customerName: 'Test Customer',
    customerEmail: 'test@example.com',
    orderItems: [
      { title: 'Test Product (250g)', quantity: 1, price: 700 }
    ],
    orderTotal: 750,
    paymentMethod: 'Razorpay',
    customerAddress: 'Test Address\nTest City\nTest State 123456',
        invoiceHtml: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        @page { margin: 0.3in; size: A4; }
        body { font-family: Arial, sans-serif; font-size: 10px; line-height: 1.3; margin: 0; padding: 0; color: #333; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 2px solid #8B7355; padding-bottom: 10px; }
        .logo { width: 60px; height: 60px; }
        .company-info { text-align: right; }
        .company-name { font-size: 16px; font-weight: bold; color: #8B7355; margin: 0; }
        .company-tagline { font-size: 8px; color: #666; margin: 0; }
        .invoice-title { font-size: 20px; font-weight: bold; color: #8B7355; text-align: center; margin: 15px 0; }
        .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 15px; }
        .detail-section h3 { font-size: 12px; color: #8B7355; margin: 0 0 8px 0; border-bottom: 1px solid #8B7355; padding-bottom: 3px; }
        .detail-row { display: flex; justify-content: space-between; margin: 3px 0; font-size: 9px; }
        .detail-label { font-weight: bold; }
        .items-table { width: 100%; border-collapse: collapse; margin: 15px 0; font-size: 9px; }
        .items-table th { background: #8B7355; color: white; padding: 8px; text-align: left; font-weight: bold; }
        .items-table td { padding: 6px; border: 1px solid #ddd; }
        .items-table tr:nth-child(even) { background: #f9f9f9; }
        .totals { margin-top: 15px; }
        .total-row { display: flex; justify-content: space-between; margin: 5px 0; font-size: 10px; }
        .total-row.final { border-top: 2px solid #8B7355; padding-top: 8px; font-weight: bold; font-size: 12px; color: #8B7355; }
        .footer { margin-top: 20px; text-align: center; font-size: 8px; color: #666; border-top: 1px solid #ddd; padding-top: 10px; }
    </style>
</head>
<body>
    <div class="header">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==" alt="Logo" class="logo">
        <div class="company-info">
            <h1 class="company-name">THE POWDER LEGACY</h1>
            <p class="company-tagline">100% HAND-MADE • Traditional Self-Care Products</p>
        </div>
    </div>
    
    <div class="invoice-title">INVOICE</div>
    
    <div class="details-grid">
        <div class="detail-section">
            <h3>Invoice Details</h3>
            <div class="detail-row"><span class="detail-label">Invoice No:</span><span>test_${Date.now()}</span></div>
            <div class="detail-row"><span class="detail-label">Payment ID:</span><span>pay_test123</span></div>
            <div class="detail-row"><span class="detail-label">Date:</span><span>${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span></div>
            <div class="detail-row"><span class="detail-label">Payment Method:</span><span>Razorpay</span></div>
        </div>
        
        <div class="detail-section">
            <h3>Customer Details</h3>
            <div class="detail-row"><span class="detail-label">Name:</span><span>Test Customer</span></div>
            <div class="detail-row"><span class="detail-label">Email:</span><span>test@example.com</span></div>
            <div class="detail-row"><span class="detail-label">Phone:</span><span>9876543210</span></div>
            <div class="detail-row"><span class="detail-label">Address:</span><span>Test Address, Test City, Test State 123456</span></div>
        </div>
    </div>
    
    <table class="items-table">
        <thead>
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>Test Product (250g)</td><td>1</td><td>₹700</td><td>₹700</td></tr>
        </tbody>
    </table>
    
    <div class="totals">
        <div class="total-row">
            <span>Subtotal:</span>
            <span>₹700</span>
        </div>
        <div class="total-row">
            <span>Savings:</span>
            <span>-₹0</span>
        </div>
        <div class="total-row">
            <span>Delivery Charges:</span>
            <span>₹50</span>
        </div>
        <div class="total-row final">
            <span>Grand Total:</span>
            <span>₹750</span>
        </div>
    </div>
    
    <div class="footer">
        <p>Thank you for choosing The Powder Legacy!</p>
        <p>For any queries, contact us at: support@powderlegacy.com</p>
    </div>
</body>
</html>`
  }

  try {
    console.log('📤 Sending test request to http://localhost:3001/api/send-order-email')
    const response = await fetch('http://localhost:3001/api/send-order-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testPayload)
    })

    console.log('📥 Response status:', response.status)
    
    const result = await response.json()
    console.log('📥 Response body:', result)

    if (response.ok) {
      console.log('✅ EMAIL API TEST PASSED!')
    } else {
      console.log('❌ EMAIL API TEST FAILED!')
    }
  } catch (error) {
    console.error('❌ TEST ERROR:', error.message)
    console.log('\n⚠️ Make sure the API server is running:')
    console.log('   npm run server')
  }
}

testEmailAPI()

