// Email templates for various notifications

export const admissionConfirmationTemplate = (admission) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; background: #f8fafc; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .button { display: inline-block; padding: 12px 24px; background: #3b82f6; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>TISK English Medium School</h1>
          <p>Admission Application Received</p>
        </div>
        <div class="content">
          <p>Dear ${admission.parentName},</p>
          <p>We have received your admission application for <strong>${admission.studentName}</strong>.</p>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Application Number:</strong> ${admission.applicationNumber}</p>
            <p><strong>Class Applied:</strong> ${admission.classApplied}</p>
            <p><strong>Status:</strong> Under Review</p>
          </div>
          <p>Your application is currently under review. We will notify you via email once the status is updated.</p>
          <p>Thank you for choosing TISK English Medium School.</p>
        </div>
        <div class="footer">
          <p>TISK English Medium School<br>
          Kovvappuram, Cheruthazam Panchayath, Kannur, Kerala – 670305<br>
          Phone: +91 497 281 2349 | Email: tiskprincipal@yahoo.com</p>
        </div>
      </div>
    </body>
    </html>
  `
}

export const admissionApprovalTemplate = (admission, student) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; background: #f8fafc; }
        .credentials { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Admission Approved!</h1>
          <p>TISK English Medium School</p>
        </div>
        <div class="content">
          <p>Dear ${admission.parentName},</p>
          <p>We are pleased to inform you that the admission application for <strong>${admission.studentName}</strong> has been <strong style="color: #10b981;">APPROVED</strong>!</p>
          <div class="credentials">
            <h3>Student Login Credentials:</h3>
            <p><strong>Email:</strong> ${student.email}</p>
            <p><strong>Password:</strong> (Please check SMS or contact school office)</p>
            <p style="color: #ef4444; font-size: 12px; margin-top: 10px;">⚠️ Please login and change your password after first login.</p>
          </div>
          <p>Welcome to TISK English Medium School! We look forward to providing quality education to ${admission.studentName}.</p>
        </div>
        <div class="footer">
          <p>TISK English Medium School<br>
          Phone: +91 497 281 2349 | Email: tiskprincipal@yahoo.com</p>
        </div>
      </div>
    </body>
    </html>
  `
}

export const paymentConfirmationTemplate = (payment) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; background: #f8fafc; }
        .receipt { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Payment Successful</h1>
          <p>TISK English Medium School</p>
        </div>
        <div class="content">
          <p>Dear Parent/Guardian,</p>
          <p>Your fee payment has been successfully processed.</p>
          <div class="receipt">
            <h3>Payment Details:</h3>
            <p><strong>Amount:</strong> ₹${payment.amount}</p>
            <p><strong>Payment ID:</strong> ${payment.razorpayPaymentId}</p>
            <p><strong>Date:</strong> ${new Date(payment.paidAt).toLocaleDateString('en-IN')}</p>
            <p><strong>Status:</strong> <span style="color: #10b981;">Completed</span></p>
          </div>
          <p>You can download the receipt from your dashboard.</p>
          <p>Thank you for your payment.</p>
        </div>
        <div class="footer">
          <p>TISK English Medium School<br>
          Phone: +91 497 281 2349</p>
        </div>
      </div>
    </body>
    </html>
  `
}
