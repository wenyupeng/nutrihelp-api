const supabase = require('../dbConnection.js');

async function addAppointment(userId, date, time, description) {
    try {
        let { data, error } = await supabase
            .from('appointments')
            .insert({ user_id: userId, date, time, description })
        return data;
    } catch (error) {
        throw error;
    }
}

async function getAllAppointments() {
    try {
        // Fetch all appointment data from the appointments table
        let { data, error } = await supabase
            .from('appointments')
            .select('*'); // Select all columns

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        throw error;
    }
}

module.exports = { addAppointment, getAllAppointments };
