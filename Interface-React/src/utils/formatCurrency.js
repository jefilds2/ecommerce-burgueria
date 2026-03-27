function formatCurrency(value) {
    const digits = value.replace(/\D/g, '');

    if (!digits) return '';

    const number = Number(digits) / 100;

    return number.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'BRL'
    });
}

function currencyToCents(value) {
    return String(value).replace(/\D/g, '');
}

export { formatCurrency, currencyToCents };