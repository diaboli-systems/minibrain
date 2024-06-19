<script>
    export let data;
</script>

<svelte:head>
        <title>{!data.file ? 404 : data.file.original} | MiniBrain</title>
</svelte:head>

{#if !data.file}
    <h1>404</h1>
    <p>Not Found</p>
{:else}
    <h2 style = "display: block; text-align: center;">
        {data.file.name}
    </h2>
    <div style = "display: flex; align-items: center; justify-content: center;">
        <p style = "margin-right: 5px; color: {data.folder.color}">
            ○
        </p>
        <a href = "/f/{data.file.original}" style = "text-decoration: none;">
            <button style = "margin-right: 10px;">View Original</button>
        </a>
        <a href = "/f/{data.file.original}" style = "text-decoration: none;" download>
            <button>Download</button>
        </a>
    </div>
    {#if data.file.type.startsWith("image")}
        <img src = "/f/{data.file.original}" style = "width: 30%; height: 30%; display: block; margin: auto;" alt = "icon" />
    {:else}
        <embed src = "/f/{data.file.original}" type = {data.file.type} style = "display: block; margin: auto; width: 100%; height: 85vh;" />
    {/if}
{/if}