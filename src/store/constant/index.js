

export const API = {
    STATUS: {
        /* *** SERVER STATUS CODES *** */
        OK: '200',
        CREATED: '201',
        CONFLICK: '409',
        TOKEN: '498',
        BAD_REQUEST: '400',
        NOT_FOUND: '404',
        UNAUTHORIZED:'401',
        TOKEN_EXPIRED: '498',
        INTERNAL_SERVER_ERROR: '500',

    },
    ERROR_MESSAGE: {
        TOKEN_EXPIRED: 'Token Expired',
        REQUEST: 'Request Submitted Successfully',
        PENDING_REQUEST: 'Already Have a Pending Request',
        NETWORK_FAILURE:'Network failed',
        SIGN_IN_INVALID: 'Invalid Username or Password',
        INTERNAL_SERVER_ERROR: "A server error occurred while processing your request please try much later",
    }
}

