export const getConvertingParams = (str) => {
    const pattern = /(\d+)\s*([A-Z]{3})\s*in\s*([A-Z]{3})\s*/gm;
    const matches = Array.from(str.matchAll(pattern));
    const [, amount = 0, from = '', to = ''] = matches[0];
    return {
        amount,
        from,
        to,
    };
};
