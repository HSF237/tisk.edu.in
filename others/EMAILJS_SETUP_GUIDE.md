# TISK EMS Website - Admission System Setup Guide

## Dear Principal / Administrator,

To enable the **"Take Admission"** feature on the new school website to send applications directly to your official email, we need to configure a service called **EmailJS**. This ensures that student applications are delivered securely and reliably.

Please follow these steps to create an account and provide the necessary credentials to the technical team.

---

### Step 1: Create an EmailJS Account
1.  Go to **https://www.emailjs.com/**
2.  Click **"Sign Up Free"**.
3.  Fill in the details (Name, Email, Password) and create your account.
4.  Verify your email address if requested.

---

### Step 2: Connect Your Email Service (Gmail)
1.  Once logged in, look at the dashboard sidebar (left side).
2.  Click on **"Email Services"**.
3.  Click the blue button **"Add New Service"**.
4.  Select **"Gmail"** from the list.
5.  A pop-up will appear:
    *   **Name**: You can leave it as "Gmail".
    *   **Service ID**: content will be auto-generated (e.g., `service_xyz123`). **Copy this Service ID**.
6.  Click **"Connect Account"**.
7.  Select your official school Gmail account and grant permission.
8.  Click **"Create Service"** to finish.
    *   *Note: If you change your Gmail password in the future, you will need to reconnect here.*

---

### Step 3: Create the Email Template
1.  Click on **"Email Templates"** in the sidebar.
2.  Click **"Create New Template"**.
3.  You will see an email editor. We need to set it up to receive the student's data properly.

**Subject Line:**
Change the subject to:
`New Admission Inquiry: {{student_name}}`

**Content:**
Delete the default text and paste the following exactly:

```text
New Online Admission Inquiry Received

Details of the Applicant:
------------------------------------------
Student Name   : {{student_name}}
Class Seeking  : {{class}}
Parent Name    : {{parent_name}}
Phone Number   : {{phone}}
Email          : {{email}}
Address        : {{address}}
------------------------------------------

Please contact the parent at {{phone}} to proceed with the admission process.

Sent automatically from TISK EMS Website.
```

4.  Click **"Save"** (Top Right Corner).
5.  Look at the "Settings" tab (or near the title). Find the **Template ID** (e.g., `template_abc123`). **Copy this Template ID**.

---

### Step 4: Get Your Public Key
1.  Click on your name/profile at the top-right corner of the dashboard.
2.  Click **"Account"** (or "API Keys").
3.  Look for the **"Public Key"**. It will be a random string of characters (e.g., `user_aBcDeFgHiJkLmNoP`). **Copy this Public Key**.

---

### 🟢 Information Required for Website Integration

Please share the following 3 codes with the development team:

1.  **Service ID** (from Step 2): __________________________
2.  **Template ID** (from Step 3): __________________________
3.  **Public Key** (from Step 4):  __________________________

Once we have these three codes, the admission form will instantly start sending emails to you.

---
**Thank you.**
