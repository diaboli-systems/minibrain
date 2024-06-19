<script>
    export let data;
</script>

<svelte:head>
    <title>{!data.folder ? 404 : data.folder.name} | MiniBrain</title>
</svelte:head>

{#if !data.folder}
    <h1>404</h1>
    <p>Not Found</p>
{:else}
    <h2>
        <span style = "color: {data.folder.color}">○</span>
        {data.folder.name}
    </h2>
    {#each data.folder_files as file}
        <a href = "/files/{file.original}" style = "text-decoration: none;">
            <div class = "file">
                <span style = "color: var(--secondary-darker); font-weight: 550;">{file.type.split("/")[1]}</span> {file.name}
            </div>
        </a>
    {/each}
{/if}