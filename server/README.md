# TISK School ERP - Backend Server

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
All protected routes require JWT token in header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user
- `PUT /auth/profile` - Update profile

### Admissions
- `POST /admissions/apply` - Submit admission application
- `GET /admissions` - Get admissions (role-based)
- `GET /admissions/:id` - Get single admission
- `PUT /admissions/:id/approve` - Approve/reject admission (admin)
- `DELETE /admissions/:id` - Delete admission (admin)

### Transfer Certificates (TC)
- `POST /tc/generate` - Generate TC (admin)
- `GET /tc` - Get TCs (role-based)
- `GET /tc/:id` - Get single TC
- `GET /tc/:id/download` - Download TC PDF

### Fees
- `GET /fees/structure` - Get fee structures
- `POST /fees/structure` - Create fee structure (admin)
- `PUT /fees/structure/:id` - Update fee structure (admin)
- `POST /fees/payment` - Create payment order
- `POST /fees/verify` - Verify Razorpay payment
- `GET /fees/history` - Get payment history
- `GET /fees/payment/:id` - Get single payment
- `GET /fees/receipt/:id` - Download receipt PDF

### Teachers
- `GET /teachers` - Get all teachers
- `GET /teachers/:id` - Get single teacher
- `POST /teachers` - Create teacher (admin)
- `PUT /teachers/:id` - Update teacher (admin)
- `DELETE /teachers/:id` - Delete teacher (admin)

### Students
- `GET /students` - Get all students
- `GET /students/:id` - Get single student
- `PUT /students/:id` - Update student (admin)
- `DELETE /students/:id` - Delete student (admin)

### Notices
- `GET /notices` - Get all notices
- `GET /notices/:id` - Get single notice
- `POST /notices` - Create notice (admin/teacher)
- `PUT /notices/:id` - Update notice (admin/teacher)
- `PUT /notices/:id/publish` - Publish notice (admin)
- `DELETE /notices/:id` - Delete notice (admin)

### Gallery
- `GET /gallery` - Get gallery items
- `GET /gallery/:id` - Get single item
- `POST /gallery` - Create item (admin)
- `PUT /gallery/:id` - Update item (admin)
- `DELETE /gallery/:id` - Delete item (admin)

## Error Responses

All errors follow this format:
```json
{
  "success": false,
  "message": "Error message"
}
```

## Success Responses

```json
{
  "success": true,
  "data": {...},
  "message": "Success message"
}
```

## File Uploads

Upload endpoints accept `multipart/form-data`:
- Max file size: 5MB
- Allowed types: .jpg, .jpeg, .png, .pdf
- Files stored in `server/uploads/`

## Rate Limiting

Consider implementing rate limiting for production:
- Login attempts: 5 per 15 minutes
- API requests: 100 per minute per IP
