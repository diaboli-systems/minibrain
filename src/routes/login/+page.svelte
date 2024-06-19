<script>
    import { fetch_api } from "$lib/fetch";

    let error = "";

    async function login(e) {
        const res = await fetch_api("/api/login", {
            password: e.target.password.value
        });

        if (res.error) {
            error = res.error;
        } else {
            window.location.href = "/";
        }
    }
</script>

<form on:submit|preventDefault = {login} autocomplete = "off" style = "margin: auto; width: 200px;">
    <input name = "password" type = "password" placeholder = "password" style = "width: 100%; margin-bottom: 10px;" />
    <button style = "width: 100%;">Login to MiniBrain</button>
</form>
<p style = "text-align: center; color: #ff0000">{error}</p>