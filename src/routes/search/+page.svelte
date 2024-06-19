<script>
    export let data;
</script>

<svelte:head>
    <title>{data.search ? `Searched for "${data.search}"` : "Search"} | MiniBrain</title>
</svelte:head>

<h2 style = "font-weight: normal; text-align: center;">Search Files</h2>
<div style = "max-width: 400px; margin: auto;">
    <form on:submit|preventDefault = {(e) => window.location.href = `?file=${e.target.file_name.value}${e.target.folder.value == "File Type" ? "" : `&folder=${e.target.folder.value}`}`} style = "display: flex; align-items: center; justify-content: center;">
        <input value = {data.search ? data.search : ""} name = "file_name" placeholder = "file name" style = "height: 33px; width: 100%;" />
        <select name = "folder" style = "margin-left: 10px; margin-right: 10px;">
            <option selected = {data.search && data.folder ? false : true} value = "all">All</option>
            {#each data.folders as folder}
                <option selected = {data.folder == folder.name ? true : false} value = {folder.name}>{folder.name}</option>
            {/each}
        </select>
        <button type = "submit" style = "height: 33px; width: 25%;">
            <svg xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" stroke-width = "2" stroke-linecap = "round" stroke-linejoin = "round">
                <path stroke = "none" d = "M0 0h24v24H0z" fill = "none" />
                <path d = "M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                <path d = "M21 21l-6 -6" />
            </svg>
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