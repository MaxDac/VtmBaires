// @flow

export type Base64Result = null | string | ArrayBuffer

export const toBase64 = (file: File): Promise<Base64Result> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = _ => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
