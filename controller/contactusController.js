let addContactUsMsg = require("../model/contactusModel");

const addContactMsg = async (req, res) => {
   
    const { name, email, subject, message } = req.body;

    try {
        await addContactUsMsg(name, email, subject, message);

        return res.status(201).json({ message: 'Data received successfully!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { addContactMsg };