export const getConvertingParams = (str) => {

    if (!(typeof(str) === 'string')) {
        throw new Error('Parameter should be string!');
    }

    const pattern = /(\d+)\s*([A-Z]{3})\s*in\s*([A-Z]{3})\s*/gm;
    const matches = Array.from(str.matchAll(pattern));
    const [, amount = '0', from = '', to = ''] = matches.length > 0 ? matches[0]:[];
    return {
        amount,
        from,
        to,
    };
};
