<script>
  import axios from "axios";
  import {writable} from 'svelte/store'
  import {onMount} from 'svelte'
  $: todos = [{value:"make tea"},{value:"drink coffe"}];
  let value = ""
  let space = "   "

  onMount(async () => {
    const  {data}  = await axios.get("/api/transactions");
    console.log(data)
    todos =  data;

  });
  async function addTodo() {
    console.log("addtodo")
    const transaction = {
      value: value
    };
    const response = await axios.post("/api/transactions", transaction);
    todos = [response.data, ...todos];

  }
</script>

<main>
  <div >
    <input class="input is-primary" type="text" placeholder="Enter Todo" bind:value={value} />
<p>{value}</p>
<button on:click={addTodo}>Submit</button>
<div class="container">
    {#each todos as todo}
     {space}{todo.value}
    {/each}
</div>
  </div>
</main>
