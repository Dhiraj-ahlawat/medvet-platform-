// This file handles user login and checks if they are a Patient, Doctor, or Admin.

export function authenticateUser(email, password, role) {
  // In a real app, this connects to a database. 
  // For our MVP, we validate against local secure data.
  
  if (!email || !password) {
    return { success: false, message: "Please enter all fields." };
  }

  // 1. Verify User Credentials
  const user = mockDatabase.Users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // 2. Check if the user's role matches their account type
    if (user.role === role) {
      // 3. Generate a secure token and log them in
      const sessionToken = generateSecureToken(user.id);
      localStorage.setItem("sessionToken", sessionToken);
      
      // 4. Redirect to their specific dashboard
      redirectToDashboard(user.role);
      
      return { success: true, message: "Login successful!" };
    } else {
      return { success: false, message: "Unauthorized account role." };
    }
  }
  
  return { success: false, message: "Invalid credentials." };
}

function redirectToDashboard(role) {
  if (role === 'patient') window.location.href = '/dashboard/patient';
  else if (role === 'doctor') window.location.href = '/dashboard/doctor';
  else if (role === 'admin') window.location.href = '/dashboard/admin';
}
