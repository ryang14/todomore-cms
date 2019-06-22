<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`lists/items.json`)
      .then(r => r.json())
      .then(items => {
        return { items };
      });
  }
</script>

<script>
  import { createEventDispatcher, onMount } from "svelte";
  import Item from "./Item.svelte";

  const dispatch = createEventDispatcher();

  export let list;
  let items;

  function refreshItems() {
    fetch(`lists/items.json?listId=${list._id}`)
      .then(r => r.json())
      .then(itemsRes => {
        items = itemsRes;
      });
  }
  onMount(async () => {
    refreshItems();
  });

  function deleteList(id) {
    fetch("lists.json", {
      method: "DELETE",
      body: JSON.stringify({ _id: id }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(dispatch("listChanged"));
  }

  function newItem(title) {
    fetch("lists/items.json", {
      method: "PUT",
      body: JSON.stringify({ title: title, listId: list._id }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(refreshItems);
  }
</script>

<style>
  form {
    margin-top: 10px;
    margin-bottom: -10px;
    position: relative;
  }

  .new-item {
    box-sizing: border-box;
    padding: 10px 0;
    background: transparent;
    border: none;
    width: 100%;
    padding-right: 80px;
    font-size: 1em;
  }

  .new-item:focus {
    outline: 0;
  }

  h1 {
    display: inline;
  }

  .delete-list {
    float: right;
    font-weight: bold;
    background: none;
    font-size: 1em;
    border: none;
  }

  .hide-completed {
    float: left;
  }

  .share-button {
    margin-top: -10px;
    margin-left: 10px;
  }
</style>

<div class="list card" name={list.title} id={list._id}>
  <header>
    <h1 class="name">{list.title}</h1>

    <button class="delete-list" on:click={() => deleteList(list._id)}>×</button>
  </header>

  {#if items}
    {#each items as item}
      <Item {item} on:listChanged={refreshItems} />
    {/each}
  {/if}

  <label class="hide-completed">
    <input type="checkbox" />
    Hide Completed Tasks
  </label>

  <div>
    <input
      type="text"
      name="title"
      class="new-item"
      on:keydown={e => {
        if (e.which === 13) {
          e.preventDefault();
          newItem(e.target.value);
          e.target.value = '';
        }
      }}
      placeholder="Type to add new items" />
  </div>
</div>
