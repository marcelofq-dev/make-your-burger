<script>
import Message from './Message.vue'

export default {
  data() {
    return {
      burgers: null,
      burger_id: null,
      status:[],
      msg: null
    }
  },
  components: {
    Message
  },
  methods: {
    async getBurgers() {
      const req = await fetch("http://localhost:3000/burgers")
      const data = await req.json()
      this.burgers = data
      this.getStatus()
    },

    async getStatus() {
      const req = await fetch("http://localhost:3000/status")
      const data = await req.json()
      this.status = data
      console.log(data)
    },

    async deleteBurger(id) {
      
      const req = await fetch(`http://localhost:3000/burgers/${id}`, {
        method: "DELETE",
      })

      const res = await req.json();

      // Exibir msg de sistema de pedido removido
      this.msg = `Pedido removido com sucesso!`;

      // Limpar a msg de sistema
      setTimeout(() => this.msg = '', 3000)
      this.getBurgers()
    },
    async updateStatus(event, id){

      const option = event.target.value;

      const dataJSON = JSON.stringify({ status: option });

      const req = await fetch(`http://localhost:3000/burgers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type" : "application/json" },
        body: dataJSON
      })

      const res = await req.json()

      // Exibir msg de sistema de pedido atualizado
      this.msg = `O pedido foi N°${res.id} foi atualizado para: ${res.status}`;

      // Limpar a msg de sistema
      setTimeout(() => this.msg = '', 3000)
      this.getBurgers()
    }
  },
  mounted() {
    this.getBurgers()
  }
  
}
</script>
<template>
  <div id="burger-table">
    <Message :msg="msg" />
    <div>
      <div id="burger-table-heading">
        <div class="order-id">N°</div>
        <div>Cliente:</div>
        <div>Pão</div>
        <div>Carne:</div>
        <div>Queijo:</div>
        <div>Vegetais:</div>
        <div>Molhos:</div>
        <div class="action-label">Ações:</div>
      </div>
      <div id="burger-table-rows">
        <div v-for="burger in burgers" :key="burger.id" class="burger-table-row">
          <div class="order-number">{{ burger.id }}</div>
          <div>{{ burger.name }}</div>
          <div>{{ burger.bread }}</div>
          <div>{{ burger.meat }}</div>
          <div>{{ burger.cheeses }}</div>
          <div>
            <ul>
              <li v-for="(vegetables, index) in burger.vegetables" :key="index" >
                {{ vegetables }}
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li v-for="(sauces, index) in burger.sauces" :key="index" >
                {{ sauces }}
              </li>
            </ul>
          </div>
          <!-- <div>
            <ul>
              <li v-for="(optionals, index) in burger.optionals" :key="index" >
                {{ optionals }}
              </li>
            </ul>
          </div> -->
          <div class="actions">
            <select name="status" class="status" @change="updateStatus($event, burger.id)">
              <option value="">Selecione</option>
              <option v-for="s in status" :key="s.id" :value="s.type" :selected="burger.status === s.type">
                {{ s.type }}
              </option>
            </select>
            <button 
              class="delete-btn" 
              @click="deleteBurger(burger.id)"
              :disabled="burger.status == 'Finalizado'"
            >Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>

  #burger-table {
    max-width: 1200px;
    margin: 0 auto;
  }

  #burger-table-heading,
  #burger-table-rows,
  .burger-table-row {
    display: flex;
    flex-wrap: wrap;
  }

  #burger-table-heading {
    font-weight: bold;
    padding: 12px;
    border-bottom: 3px solid #333;
  }

  .burger-table-row {
    width: 100%;
    padding: 12px;
    border-bottom: 1px solid #CCC;
  }
  .burger-table-row ul {
    list-style-type: disc;
  }

  #burger-table-heading div,
  .burger-table-row div {
    align-items: flex-start;
    width: 12%;
  }

  #burger-table-heading .order-id,
  .burger-table-row .order-number {
    width: 5%;
  }
  #burger-table-heading .action-label,
  .burger-table-row .actions {
    width: auto;
    min-width: 23%;
    text-align: end;
  }

  select {
    padding: 12px 6px;
    margin-right: 12px;
  }

  .delete-btn {
    background-color: #222;
    color:#fcba03;
    font-weight: bold;
    border: 2px solid #222;
    padding: 10px;
    font-size: 16px;
    margin: 0 auto;
    cursor: pointer;
    transition: .5s;
  }
  .delete-btn:hover {
    background-color: transparent;
    color: #222;
  }

  .delete-btn:disabled{
    cursor: inherit;
    opacity: .4;
    transition: none;
  }
  .delete-btn:disabled:hover {
    background-color: #222;
    color:#fcba03;
  }
  
</style>