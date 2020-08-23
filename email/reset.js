const keys = require('../keys/index')

module.exports = function(email,token){
    return {
        to : email,
        from : 'bogdangorgadze1@gmail.com',
        subject: 'Восстановление доступа',
        html:`
            <h1>Вы забыли пароль ?</h1>
            <p><a href="${keys.BASE_URL}/auth/password/${token}">ссылка на восстановление</a></p>
        `
    }
}