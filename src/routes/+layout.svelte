<script>
    import { page } from "$app/stores";
    import "./styles/globals.css";
    
    export let data;
    
    let modal = {
        create_folder: null,
        upload_file: null
    };
</script>

<nav>
    <img src = "/favicon.ico" width = "40" height = "40" alt = "favicon" style = "border: 1px solid var(--background-lighter); border-radius: 50%; margin-right: 5px;" />
    <a href = "/" style = "text-decoration: none; color: currentColor;">
        <h2 style = "margin-left: 5px; cursor: pointer;">
            MiniBrain
            <span style = "font-style: italic; color: var(--secondary-darker); font-size: 16px;">
                filesystem
            </span>
        </h2>
    </a>
    <div style = "margin-left: auto; display: flex; align-items: center;">
        {#if data.signed_in == true}
            <button on:click = {() => modal.upload_file.showModal()}>
                <svg xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" stroke-width = "2" stroke-linecap = "round" stroke-linejoin = "round">
                    <path stroke = "none" d = "M0 0h24v24H0z" fill = "none"/>
                    <path d = "M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"/>
                    <path d = "M7 9l5 -5l5 5"/>
                    <path d = "M12 4l0 12"/>
                </svg>
                <span class = "mobile-hide">&nbsp;Upload</span>
            </button>
            <button on:click = {() => modal.create_folder.showModal()} style = "margin-left: 10px;">
                <svg xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" stroke-width = "2" stroke-linecap = "round" stroke-linejoin = "round">
                    <path stroke = "none" d = "M0 0h24v24H0z" fill = "none"/>
                    <path d = "M12 19h-7a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v3.5"/>
                    <path d = "M16 19h6"/>
                    <path d = "M19 16v6"/>
                </svg>
                <span class = "mobile-hide">&nbsp;New Folder</span>
            </button>
            <a href = "/search" style = "text-decoration: none; margin-left: 10px;">
                <button>
                    <svg xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" stroke-width = "2" stroke-linecap = "round" stroke-linejoin = "round">
                        <path stroke = "none" d = "M0 0h24v24H0z" fill = "none"/>
                        <path d = "M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"/>
                        <path d = "M21 21l-6 -6"/>
                    </svg>
                    <span class = "mobile-hide">&nbsp;Search</span>
                </button>
            </a>
        {:else}
            <p style = "display: flex; align-items: center;">
                <svg xmlns = "http://www.w3.org/2000/svg" width = "17.5" height = "17.5" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" stroke-width = "2" stroke-linecap = "round" stroke-linejoin = "round">
                    <path stroke = "none" d = "M0 0h24v24H0z" fill = "none"/>
                    <path d = "M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"/>
                    <path d = "M6 21v-2a4 4 0 0 1 4 -4h3.5"/>
                    <path d = "M19 22v.01"/>
                    <path d = "M19 19a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483"/>
                </svg>
                &nbsp;Guest
            </p>
        {/if}
    </div>
</nav>
<main style = {$page.url.pathname == "/" ? `display: grid; grid-template-columns: ${data.folders.length < 3 ? "auto ".repeat(data.folders.length) : "auto auto auto"}; justify-content: space-evenly;` : ""}>
    <slot />
</main>
<dialog bind:this = {modal.create_folder}>
    <button class = "close" on:click = {() => modal.create_folder.close()}>
        Close
    </button>
    <h2>
        Create Folder
    </h2>
    <form action = "/api/folder/create" method = "POST" style = "display: flex; align-items:center;">
        <input name = "name" placeholder = "folder name…" required />
        <button type = "submit" style = "margin-left: 10px;">
            Create
        </button>
    </form>
</dialog>
<dialog bind:this = {modal.upload_file}>
    <button class = "close" on:click = {() => modal.upload_file.close()}>
        Close
    </button>
    <form action = "/api/file/upload" method = "POST" enctype = "multipart/form-data">
        <div style = "display: flex; align-items: center;">
            <label for = "file" id = "fileLabel" style = "cursor: pointer;">
                Select a File
            </label>
            <input type = "file" id = "file" name = "file" accept = "*" required style = "display: none;" />
            <select name = "folder" style = "margin-left: 10px;">
                {#each data.folders as folder}
                    <option value = {folder.name}>{folder.name}</option>
                {/each}
            </select>
        </div>
        <button type = "submit" style = "margin-top: 10px;">
            Upload
        </button>
    </form>
</dialog>