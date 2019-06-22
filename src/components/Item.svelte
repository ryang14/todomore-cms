<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let item;

  function deleteItem(id) {
    fetch("lists/items.json", {
      method: "DELETE",
      body: JSON.stringify({ _id: id }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(dispatch("listChanged"));
  }
</script>

<style>
  .item {
    position: relative;
    list-style: none;
    padding: 15px;
    border-bottom: #eee solid 1px;
  }

  .item .name {
    display: inline;
  }

  .item.checked {
    color: #888;
  }

  .item.checked .name {
    text-decoration: line-through;
  }

  .delete-item {
    float: right;
    font-weight: bold;
    background: none;
    font-size: 1em;
    border: none;
  }
</style>

<div class="item" name={item.title} id={item._id}>
  <input type="checkbox" />
  <h2 class="name">{item.title}</h2>
  <button class="delete-item" on:click={() => deleteItem(item._id)}>×</button>
</div>
