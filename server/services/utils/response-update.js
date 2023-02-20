export const responseUpdate = (message, type, data) => {
    return {
        message: message,
        messageType: type,
        items: data ? data : null,
    }
};

export const responseError = (message, stack, type, data) => {
    return {
        message: message,
        stack: stack,
        messageType: type,
        items: data ? data : null,
    }
};