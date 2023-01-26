const postData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=utf-8'
                },
        body: data
    });
    return await response.json();
};

const getData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }   
    return await response.json();
};

export {postData, getData};