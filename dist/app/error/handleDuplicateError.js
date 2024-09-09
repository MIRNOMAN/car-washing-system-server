"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDuplicateError = void 0;
const handleDuplicateError = (err) => {
    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
    const errorSources = [
        {
            path: '',
            message: `${extractedMessage} is already exsist`,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'validation error',
        errorSources,
    };
};
exports.handleDuplicateError = handleDuplicateError;
