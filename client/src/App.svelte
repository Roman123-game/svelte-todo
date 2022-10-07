<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { todos } from "./stores";

  let value = "";

  onMount(async function () {
    try {
      const { data } = await axios.get("/api/transactions");
      todos = data;
    } catch (error) {
      console.error(error);
    }
  });

  async function addTodo() {
    try {
      const transaction = { value: value };
      const response = await axios.post("/api/transactions", transaction);
      $todos = [response.data, ...$todos];
    } catch (error) {
      console.log(error);
    }
  }

  async function removeTodo(event) {
    try {
      const response = await axios.delete("/api/transactions/" + event._id);
      try {
        const { data } = await axios.get("/api/transactions");
        $todos = data;
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }
</script>

<main>
  <div class="mx-5">
    <input
      class="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-green-500 mx-auto my-2"
      type="text"
      id="success"
      placeholder="Enter Todo"
      bind:value
    />
    <button
      class="m-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      on:click={addTodo}
    >
      Submit
    </button>

    <div class="container">
      {#each $todos as todo (todo._id)}
        <p
          class=" m-2 block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <button
            class="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
            on:click={removeTodo(todo)}
          >
            X
          </button>
          {todo.value}
        </p>
      {/each}
    </div>
  </div>
</main>
