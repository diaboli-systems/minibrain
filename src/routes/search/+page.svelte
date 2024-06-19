<script>
    export let data;
</script>

<svelte:head>
    <title>{data.search ? `Searched for "${data.search}"` : "Search"} | MiniBrain</title>
</svelte:head>

<h2 style = "font-weight: normal; text-align: center;">Search Files</h2>
<div style = "max-width: 400px; margin: auto;">
    <form on:submit|preventDefault = {(e) => window.location.href = `?query=${e.target.file_name.value}`} style = "display: flex; align-items: center; justify-content: center;">
        <input value = {data.search ? data.search : ""} name = "file_name" placeholder = "file name" style = "height: 33px; width: 100%;" />
        <select>
            <option>mp4</option>
        </select>
        <button type = "submit" style = "height: 33px; width: 25%; margin-left: 10px;">
            <svg xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" stroke-width = "2" stroke-linecap = "round" stroke-linejoin = "round">
                <path stroke = "none" d = "M0 0h24v24H0z" fill = "none" />
                <path d = "M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                <path d = "M21 21l-6 -6" />
            </svg>
            <span class = "mobile-hide">&nbsp;Search</span>
        </button>
    </form>
    {#each data.found as file}
        <a href = "/files/{file.original}" style = "text-decoration: none;">
            <div class = "file">
                <span style = "color: var(--secondary-darker); font-weight: 550;">{file.type.split("/")[1]}</span> {file.name}
            </div>
        </a>
    {/each}
</div>