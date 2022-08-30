export const removeRefer = (message: string) => {
    return message.replace(/\{[a-z.]+\}/g, "");
};
