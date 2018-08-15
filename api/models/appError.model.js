class AppError extends Error {    

    constructor(message, code) {
        // Calling parent constructor of base Error class.
        super(message);
        
        // Saving class name in the property of our custom error as a shortcut.
        this.name = this.constructor.name;

        //save the code for later lookup
        this.code = code;

        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);            
    }
}

//error codes
AppError.UNKNOWN = 1000;
AppError.INVALID_APPLICATION_CONFIGURATION = 1010;
AppError.USER_DATA_INVALID = 2001;
AppError.USER_ALREADY_EXISTS = 2002;
AppError.USER_NOT_FOUND = 2010;
AppError.USER_LIST_QUERY_INVALID = 2030;
AppError.USER_ALREADY_ACTIVE = 2040;
AppError.USER_ALREADY_DEACTIVATED = 2050;
AppError.TENANT_DATA_INVALID = 3001;
AppError.TENANT_ALREADY_EXISTS = 3002;
AppError.TENANT_NOT_FOUND = 3010;
AppError.TENANT_LIST_QUERY_INVALID = 3030;
AppError.TENANT_ALREADY_ACTIVE = 3040;
AppError.TENANT_ALREADY_DEACTIVATED = 3050;
AppError.CASE_DATA_INVALID = 4001;
AppError.CASE_ALREADY_EXISTS = 4002;
AppError.CASE_NOT_FOUND = 4010;
AppError.CASE_LIST_QUERY_INVALID = 4030;
AppError.CASE_ALREADY_ACTIVE = 4040;
AppError.CASE_ALREADY_DEACTIVATED = 4050;
AppError.WIDGET_DATA_INVALID = 5001;
AppError.WIDGET_ALREADY_EXISTS = 5002;
AppError.WIDGET_NOT_FOUND = 5010;
AppError.WIDGET_LIST_QUERY_INVALID = 5030;
AppError.WIDGET_ALREADY_ACTIVE = 5040;
AppError.WIDGET_ALREADY_DEACTIVATED = 5050;






module.exports = AppError;