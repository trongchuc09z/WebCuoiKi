import jwt from 'jsonwebtoken'
export const verifyToken = (req, res, next) => {

    let accessToken = req.headers.authorization?.split(' ')[1]
    if (!accessToken) return res.status(401).json({
        err: 1,
        msg: 'Missing access token'
    })

    jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(401).json({
            err: 1,
            msg: 'Access token expired'
        })

        req.user = user
        next()
    })
}
export const isAdmin = (req, res, next) => {
    const { role } = req.user
    if (role !== 'R1')
        throw new Error('Require Admin Role')
    next()
}
export const isHost = (req, res, next) => {
    const { role } = req.user
    if (role !== 'R1' && role !== 'R2')
        throw new Error('Require Host Role')
    next()
}

// Middleware kiểm tra email có domain PTIT
export const verifyPTITEmail = (req, res, next) => {
    const { email } = req.body
    
    if (!email) {
        return res.status(400).json({
            err: 1,
            msg: 'Email is required!'
        })
    }
    
    const ptitDomains = ['@ptit.edu.vn', '@student.ptit.edu.vn']
    const isPTITEmail = ptitDomains.some(domain => email.toLowerCase().endsWith(domain))
    
    if (!isPTITEmail) {
        return res.status(400).json({
            err: 1,
            msg: 'Chỉ email có domain PTIT (@ptit.edu.vn hoặc @student.ptit.edu.vn) mới được phép đăng ký!'
        })
    }
    
    next()
}
