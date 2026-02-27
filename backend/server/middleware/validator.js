// Validation middleware
const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false })
        
        if (error) {
            const errors = error.details.map(detail => detail.message)
            return res.status(400).json({
                success: false,
                status: 400,
                message: 'Validation Error',
                errors: errors
            })
        }
        
        next()
    }
}

// Sanitize input to prevent XSS
const sanitizeInput = (req, res, next) => {
    const sanitize = (obj) => {
        for (let key in obj) {
            if (typeof obj[key] === 'string') {
                obj[key] = obj[key].trim()
                    .replace(/[<>]/g, '') // Basic XSS prevention
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                sanitize(obj[key])
            }
        }
    }
    
    if (req.body) sanitize(req.body)
    if (req.query) sanitize(req.query)
    if (req.params) sanitize(req.params)
    
    next()
}

module.exports = { validateRequest, sanitizeInput }
