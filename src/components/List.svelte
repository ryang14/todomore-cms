<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let list;

  function deleteList(id) {
    fetch("lists.json", {
      method: "DELETE",
      body: JSON.stringify({ _id: id }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(dispatch('list-deleted'));
  }
</script>

<style>
  form {
    margin-top: 10px;
    margin-bottom: -10px;
    position: relative;
  }

  .new-task input {
    box-sizing: border-box;
    padding: 10px 0;
    background: transparent;
    border: none;
    width: 100%;
    padding-right: 80px;
    font-size: 1em;
  }

  .new-task input:focus {
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

  ul {
    margin: 0;
    padding: 0;
    background: white;
  }

  li {
    position: relative;
    list-style: none;
    padding: 15px;
    border-bottom: #eee solid 1px;
  }

  li .text {
    margin-left: 10px;
  }

  li.checked {
    color: #888;
  }

  li.checked .text {
    text-decoration: line-through;
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

  <ul />

  <label class="hide-completed">
    <input type="checkbox" />
    Hide Completed Tasks
  </label>

  <form class="new-task">
    <input type="text" name="text" placeholder="Type to add new tasks" />
  </form>
</div>
