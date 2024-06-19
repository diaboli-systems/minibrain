export async function fetch_api(route, data, reload) {
    let res = await fetch(route, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    res = await res.json();

    if (reload == true) {
        window.location.reload();
    } else {
        return res;
    }
}