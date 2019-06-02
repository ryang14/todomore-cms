<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`lists.json`)
      .then(r => r.json())
      .then(lists => {
        return { lists };
      });
  }
</script>

<script>
  import { stores } from "@sapper/app";
  import List from "../../components/List.svelte";

  export let lists;

  function refreshLists(title) {
    fetch("lists.json")
      .then(r => r.json())
      .then(listsRes => {
        lists = listsRes;
      });
  }

  function newList(title) {
    fetch("lists.json", {
      method: "PUT",
      body: JSON.stringify({ title: title }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(refreshLists);
  }
</script>

<style>
  .new-list {
    margin: 10px;
  }
</style>

<div>
  <input
    type="text"
    name="title"
    class="new-list"
    on:keydown={e => {
      if (e.which === 13) {
        newList(e.target.value);
        e.target.value = '';
      }
    }}
    placeholder="Type to add new lists" />
</div>

{#each lists as list}
  <List {list} on:list-deleted={refreshLists} />
{/each}
