<script>
  import axios from "axios";
  import { onMount } from "svelte";
  $: todos = [];
  let value = "";
  let space = "   ";

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
      todos = [response.data, ...todos];
    } catch (error) {
      console.log(error);
    }
  }

  async function removeTodo(event) {
    try {
      const response = await axios.delete("/api/transactions/" + event._id);
      const { data } = await axios.get("/api/transactions");
      todos = data;
    } catch (error) {
      console.log(error);
    }
  }
</script>

<main>
  <div>
    <input
      class="input is-primary"
      type="text"
      placeholder="Enter Todo"
      bind:value
    />
    <p>{value}</p>
    <button class="button is-primary is-light" on:click={addTodo}>Submit</button
    >
    <div
      class="container is-flex is-flex-direction-column is-justify-content-center is-align-items-center"
    >
      {#each todos as todo (todo._id)}
        <p class="is-align-self-center box ">{space}{todo.value}</p>
        <button class="delete" on:click={removeTodo(todo)} />
      {/each}
    </div>
  </div>
</main>
