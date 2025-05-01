import { cartItem } from "./types";

export const arraysAreEqual = (arr1: any[], arr2: any[]): boolean =>  {
    return arr1.length === arr2.length && arr1.every((val, i) => val === arr2[i]);
}

export const productRoute = (item: cartItem) => {
    const params = new URLSearchParams();
    Object.entries(item.option_ids).forEach(([typeid, optionId]) => {
        params.append(`options[${typeid}]`, optionId + '');
    });
    console.log(route('product.show', item.slug) + '?' + params.toString());
    return route('product.show', item.slug) + '?' + params.toString();
};
