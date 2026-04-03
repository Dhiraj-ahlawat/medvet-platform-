// This file handles how a patient books an appointment with a Doctor or Veterinarian.

export function bookAppointment(patientId, doctorId, date, timeSlot) {
  // 1. Check if the requested time slot is actually available
  const isAvailable = checkSlotAvailability(doctorId, date, timeSlot);
  
  if (!isAvailable) {
    return { success: false, message: "Sorry, this slot was just booked by someone else." };
  }

  // 2. Create the new appointment record
  const newAppointment = {
    id: generateUniqueId(),
    patientId: patientId,
    doctorId: doctorId,
    date: date,
    time: timeSlot,
    status: "upcoming" // Status can be "upcoming", "completed", or "cancelled"
  };

  // 3. Save the appointment to the database
  mockDatabase.Appointments.push(newAppointment);

  // 4. Trigger system notifications
  sendEmailNotification(patientId, "Your appointment is confirmed!");
  sendNotificationToDoctor(doctorId, "You have a new patient booking.");

  return { success: true, data: newAppointment };
}

function checkSlotAvailability(doctorId, date, timeSlot) {
  // Searches the doctor's schedule to ensure the slot isn't already taken
  const conflictingAppointments = mockDatabase.Appointments.filter(
    app => app.doctorId === doctorId && app.date === date && app.time === timeSlot
  );
  
  // Returns true if no conflicts exist
  return conflictingAppointments.length === 0;
}
