// @flow

export function post<TResponse>(url: string, body: any): Promise<TResponse> {
    return new Promise<TResponse>((res, rej) => {
        fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(r => {
            if (!r.ok || r.status !== 200) {
                r.json().then(j => rej(j));
            }
            else {
                r.json().then(j => res(j));
            }
        })
        .catch(err => {
            rej(err);
        })
    });
}
