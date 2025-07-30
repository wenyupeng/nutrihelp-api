const supabase = require('./dbConnection');

const insertAuthLog = async ({email, user_id, success, ip_address, created_at}) => {
    const { error } = await supabase.from('auth_logs').insert([
        {
            email,
            user_id: user_id || null,
            success,
            ip_address,
            created_at,
        },
    ]);

    if (error) {
        throw new Error(error.message);
    }
}

module.exports = {insertAuthLog};