import { writable } from "svelte/store";

function createLists() {
  const { subscribe, set, update } = writable([{ name: "test", id: 0 }]);
  let id = 1;

  return {
    subscribe: () => {
      fetch("/lists.json");

      return subscribe;
    },
    add: name => {
      update(lists => [...lists, { name: name, id: id++ }]);
    },
    remove: id => {
      update(lists => lists.filter(list => list.id !== id));
    }
  };
}

export const lists = createLists();

function createItems() {
  const { subscribe, set, update } = writable([{ name: "test", id: 0 }]);
  let id = 1;

  return {
    subscribe,
    add: name => {
      update(items => [...items, { name: name, id: id++ }]);
    },
    remove: id => {
      update(items => items.filter(item => item.id !== id));
    }
  };
}

export const items = createItems();