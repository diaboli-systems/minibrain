<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { fetch_api } from "$lib/fetch";

    export let data;

    onMount(() => {
        if (data.signed_in == false) goto("/login");
    });
    
    // object templates

    let modal = {
        file: null,
        folder: null
    }

    let folder_preview = {
        name: null,
        color: null
    }

    let file_preview = {
        name: null,
        original: null,
        folder: null,
        type: null,
        icon: null,
    }

    // the modal for the file preview
    function open_file_preview(file) {
        modal.file.showModal();

        file_preview.name = file.name;
        file_preview.original = file.original;
        file_preview.type = file.type;

        file_preview.folder = file.folder;
        
        switch (file.type) {
            case "application/zip":
                file_preview.icon = "/icons/zip.png";
                break;
            case "video/mp4": case "video/quicktime":
                file_preview.icon = "/icons/video.png";
                break;
            case "image/jpeg": case "image/png": case "image/webp": case "image/jpg":
                file_preview.icon = "/icons/image.png";
                break;
            case "application/pdf":
                file_preview.icon = "/icons/pdf.png";
                break;
            case "audio/flac": case "audio/mp3": case "audio/m4a":
                file_preview.icon = "/icons/audio.png";
                break;
            case "image/gif":
                file_preview.icon = "/icons/gif.png";
                break;
            default:
                file_preview.icon = "/icons/file.png";
                break;
        }
    }

    // modal for folder preview
    function open_folder_preview(folder) {
        modal.folder.showModal();

        folder_preview.name.innerText = folder.name;
        folder_preview.color = folder.color;
    }
</script>

<svelte:head>
    <title>Files | MiniBrain</title>
</svelte:head>

{#each data.folders as folder, i}
    <div class = "folder">
        <div style = "display: flex; align-items: center; justify-content: center;">
            <span style = "color: {folder.color}; margin-right: 5px; font-size: 25px;">○</span>
            <input on:change = {async () => await fetch_api("/api/folder/rename", { original: folder.name, new: document.getElementById(`folder${i}`).value }, true)} id = "folder{i}" value = {folder.name} style = "width: 100%; height: 33px; text-align: center; font-size: 25px;" />
            <button on:click = {() => window.location.href = `/folders/${folder.name}`} style = "font-size: 25px; margin-left: 5px; padding: 0px; width: 10%; height: 33px;">
                <svg xmlns = "http://www.w3.org/2000/svg" width = "16" height = " 16" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" stroke-width = "2" stroke-linecap = "round" stroke-linejoin = "round">
                    <path stroke = "none" d = "M0 0h24v24H0z" fill = "none"></path>
                    <path d = "M5 19l2.757 -7.351a1 1 0 0 1 .936 -.649h12.307a1 1 0 0 1 .986 1.164l-.996 5.211a2 2 0 0 1 -1.964 1.625h-14.026a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v2"></path>
                </svg>
            </button>
            <button on:click = {() => open_folder_preview(folder)} style = "font-size: 25px; margin-left: 5px; padding: 0px; width: 10%; height: 33px;">
                <svg xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" stroke-width = "2" stroke-linecap = "round" stroke-linejoin = "round">
                    <path stroke = "none" d = "M0 0h24v24H0z" fill = "none"></path>
                    <path d = "M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"></path>
                    <path d = "M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                </svg>
            </button>
        </div>
        {#each data.files as file}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            {#if file.folder == folder.name}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div on:click = {() => open_file_preview(file)} class = "file">
                    <span style = "color: var(--secondary-darker); font-weight: 550;">{file.type.split("/")[1]}</span> {file.name}
                </div>
            {/if}
        {/each}
    </div>
{/each}

<dialog bind:this = {modal.file}>
    <button on:click = {() => modal.file.close()} class = "close">
        Close
    </button>
    <input on:change = {async () => await fetch_api("/api/file/rename", { original: file_preview.original, new_name: file_preview.name }, true)} bind:value = {file_preview.name} style = "text-align: center; font-size: 25px; width: 100%; height: 33px;">
    <img src = {file_preview.icon} width = "50%" height = "50%" style = "display: block; margin-left: auto; margin-right: auto; margin-top: 25px;" alt = "preview type">
    <p style = "text-align: center;">
        File in <span style = "text-decoration: underline;">{file_preview.original != null ? file_preview.type.split("/")[1] : ""}</span> format
    </p>
    <div style = "display: flex; align-items: center; justify-content: center; margin-top: 5px;">
        <a href = "/f/{file_preview.original}" style = "text-decoration: none;">
            <button style = "margin-right: 10px;">
                Original
            </button>
        </a>
        <a href = "/files/{file_preview.original}" style = "text-decoration: none;">
            <button style = "margin-right: 10px;">
                Go to&nbsp;<b>{file_preview.name}</b>
            </button>
        </a>
        <button on:click = {async () => await fetch_api("/api/file/delete", { original: file_preview.original }, true)} class = "danger">
            Delete
        </button>
    </div>
    <form on:submit|preventDefault = {async (e) => await fetch_api("/api/folder/change", { original: file_preview.original, folder: e.target.folder.value }, true)} style = "display: flex; align-items: center; justify-content: center; margin-top: 15px;">
        <select bind:value = {file_preview.folder} name = "folder" style = "margin-right: 10px;">
            {#each data.folders as folder}
                <option value = {folder.name}>
                    {folder.name}
                </option>
            {/each}
        </select>
        <button type = "submit">save</button>
    </form>
</dialog>
<dialog bind:this = {modal.folder}>
    <button on:click = {() => modal.folder.close()} class = "close">
        Close
    </button>
    <!-- svelte-ignore a11y-missing-content -->
    <h2 bind:this = {folder_preview.name}></h2>
    <div style = "display: flex; align-items: center;">
        Color:&nbsp;<input on:change = {async () => await fetch_api("/api/folder/color", { name: folder_preview.name.innerText, color: folder_preview.color }, true)} bind:value = {folder_preview.color} type = "color" />
        <button style = "margin-left :5px;">Reset to Default</button>
    </div>
    <button on:click = {async () => {await fetch_api("/api/folder/delete", { name: folder_preview.name.innerText }, true)}} class = "danger" style = "margin-top: 30px;">
        Delete Folder
    </button>
</dialog>