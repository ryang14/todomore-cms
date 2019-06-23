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

  function submit(event) {
    post.html = event.target["content"].value;
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
  form {
    display: inline;
  }

  input {
    margin: 10px 0px;
  }
</style>

<svelte:head>
  <title>{post.title}</title>
</svelte:head>

{#if editable}
  <form on:submit={submit}>
    <input bind:value={post.title} />
    <input class="content" id="content" type="hidden" bind:value={post.html} />
    <trix-editor input="content" />
    <button type="submit">Save</button>
  </form>
{:else}
  <h1>{post.title}</h1>

  <div class="content">
    {#if post.html}
      {@html post.html}
    {/if}
  </div>

  <button on:click={() => (editable = !editable)}>Edit post</button>
{/if}

<button on:click={deletePost}>Delete post</button>
