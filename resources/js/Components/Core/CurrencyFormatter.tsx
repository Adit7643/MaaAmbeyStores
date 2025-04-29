import React from 'react';

function CurrencyFormatter(
{amount, currency= 'INR', locale ='en-US' } :{amount:number, currency?: string, locale?:string}){

            const formatted = new Intl.NumberFormat(locale, {
                style : 'currency',
                currency
            }).format(amount)
            return <>{formatted}</>
}

export default CurrencyFormatter;