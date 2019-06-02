<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].html
    const res = await this.fetch(`blog/${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { post: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import { goto } from "@sapper/app";
  export let post;

  let editable = false;

  function deletePost() {
    fetch("blog.json", {
      method: "DELETE",
      body: JSON.stringify({ _id: post._id }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(goto("/blog"));
  }

  function submit() {
    fetch("blog.json", {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((editable = false));
  }
</script>

<style>
  textarea.content {
    overflow: hidden;
    display: block;
    margin: 10px 0px;
    height: 500px;
    width: 100%;
  }

  .content :global(h2) {
    font-size: 1.4em;
    font-weight: 500;
  }

  .content :global(pre) {
    background-color: #f9f9f9;
    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
    padding: 0.5em;
    border-radius: 2px;
    overflow-x: auto;
  }

  .content :global(pre) :global(code) {
    background-color: transparent;
    padding: 0;
  }

  .content :global(ul) {
    line-height: 1.5;
  }

  .content :global(li) {
    margin: 0 0 0.5em 0;
  }
</style>

<svelte:head>
  <title>{post.title}</title>
</svelte:head>

{#if editable}
  <form on:submit={submit}>
    <input bind:value={post.title} />
    <textarea class="content" bind:value={post.html} />
  </form>
{:else}
  <h1>{post.title}</h1>

  <div class="content">
    {@html post.html}
  </div>
{/if}

<button on:click={() => (editable = !editable)}>Edit post</button>
<button on:click={deletePost}>Delete post</button>
