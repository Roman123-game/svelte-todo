<script>
  import axios from "axios";
  import {onMount} from 'svelte'
  $: todos = [{value:"make tea"},{value:"drink coffe"}];
  let value = ""
  let space = "   "

  onMount(async ()=> {
    const  {data}  = await axios.get("/api/transactions");
    todos =  data;
  });
  async function addTodo() {
    const transaction = {
      value: value
    };
    const response = await axios.post("/api/transactions", transaction);
    todos = [response.data, ...todos];
  }
  async function removeTodo(todo) {
    const response = await axios.delete("/api/transactions/" + todo._id);
    if (response.data.id === todo._id) {
     todos = todos.filter(todo => todo.id !== ev._id);
    }
  }

</script>

<main>
  <div >
    <input class="input is-primary" type="text" placeholder="Enter Todo" bind:value={value} />
<p>{value}</p>
<button class="button is-primary is-light" on:click={addTodo}>Submit</button>
<div class="container is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
    {#each todos as todo (todo._id)}
    <p class="is-align-self-center box ">{space}{todo.value} </p> 
      <button class="delete" on:click={removeTodo(todo)}></button>
    {/each}
  </div>
</div>


</main>
