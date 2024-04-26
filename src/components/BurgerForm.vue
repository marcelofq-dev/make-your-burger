<script>
import Message from './Message.vue'

export default {
  data() {
    return {
      breads: null,
      meats: null,
      cheesesdata: null,
      vegetablesdata: null,
      saucesdata: null,
      optionalsdata: null,
      name: null,
      bread: null,
      meat: null,
      cheeses: null,
      vegetables: [],
      sauces: [],
      optionals: [],
      msg: null
    }
  },
  components: {
    Message
  },
  methods: {
    async getIngredients() {
      const req = await fetch("http://localhost:3000/ingredients")
      const data = await req.json()

      this.breads = data.breads
      this.meats = data.meats
      this.cheesesdata = data.cheeses
      this.vegetablesdata = data.vegetables
      this.saucesdata = data.sauces
      this.optionalsdata = data.optionals
    },
    async createBurger(e){
      e.preventDefault()
      const data = {
        name: this.name,
        meat: this.meat,
        bread: this.bread,
        cheeses: this.cheeses,
        vegetables: this.vegetables,
        sauces: this.sauces,
        optionals: this.optionals,
        status: 'Solicitado',
      }
      
      const dataJSON = JSON.stringify(data);
      const req = await fetch("http://localhost:3000/burgers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dataJSON,
      })

      const res = await req.json();

      // Exibir msg de sistema de pedido realizado
      this.msg = `Pedido N°${res.id} realizado com sucesso!`;

      // Limpar a msg de sistema
      setTimeout(() => this.msg = '', 3000)

      // Limpando os campos do formulário
      this.name = '';
      this.breads = '';
      this.meats = '';
      this.cheeses = null;
      this.vegetables = null,
      this.optionals = null;
    }
  },
  mounted() {
    this.getIngredients()
  }
}
</script>
<template>
  <div>
    <Message :msg="msg" v-show="msg" />
    <div>
      <form id="burger-form">
        <div class="input-container">
          <label for="name">Nome do cliente: </label>
          <input id="name" v-model="name" name="name" type="text" placeholder="Nome do cliente">
        </div>
        <div class="input-container">
          <label for="bread">Escolha o pão: </label>
          <select name="bread" id="bread" v-model="bread">
            <option value="">Selecione o seu pão</option>
            <option v-for="bread in breads" :key="bread.id" :value="bread.type">{{ bread.type }}</option>
          </select>
        </div>
        <div class="input-container">
          <label for="meat">Escolha a carne do seu Burger: </label>
          <select name="meat" id="meat" v-model="meat">
            <option value="">Selecione tipo de carne</option>
            <option v-for="meat in meats" :key="meat.id" :value="meat.type">{{ meat.type }}</option>
          </select>
        </div>
        <div id="cheese-container" class="input-container">
          <label id="cheese-title" for="cheeses">Selecione um tipo de queijo: </label>
          <div class="radio-container" v-for="cheese in cheesesdata" :key="cheese.key">
            <input type="radio" :name="cheeses" v-model="cheeses" :value="cheese.type" :id="`cheese` + cheese.id">
            <label :for="`cheese` + cheese.id">
              <span>{{ cheese.type }}</span>
            </label>
          </div>
        </div>
        <div id="optional-container" class="input-container">
          <label id="optional-title" for="optionals">Selecione os vegetais: </label>
          <div class="checkbox-container" v-for="vegetable in vegetablesdata" :key="vegetable.key">
            <input type="checkbox" name="vegetables" v-model="vegetables" :value="vegetable.type" :id="`vegetable-`+ vegetable.id">
            <label :for="`vegetable-`+ vegetable.id">
              <span>{{ vegetable.type }}</span>
            </label>
          </div>
        </div>
        <div id="optional-container" class="input-container">
          <label id="optional-title" for="optionals">Selecione os molhos: </label>
          <div class="checkbox-container" v-for="sauce in saucesdata" :key="sauce.key">
            <input type="checkbox" name="sauces" v-model="sauces" :value="sauce.type" :id="`sauce-` + sauce.id">
            <label :for="`sauce-` + sauce.id">
              <span>{{ sauce.type }}</span>
            </label>
          </div>
        </div>
        <!-- <div id="optional-container" class="input-container">
          <label id="optional-title" for="optionals">Selecione os opcionais: </label>
          <div class="checkbox-container" v-for="optional in optionalsdata" :key="optional.key">
            <input type="checkbox" name="optionals" v-model="optionals" :value="optional.type" :id="optional.id">
            <label :for="optional.id">
              <span>{{ optional.type }}</span>
            </label>
          </div>
        </div> -->
        <div class="input-container">
          <input type="submit" class="submit-btn" value="Criar meu Burger!" @click="createBurger">
        </div>
      </form>

    </div>
  </div>
</template>

<style scoped>
  #burger-form{
    max-width: 400px;
    margin: 0 auto;
  }
  .input-container{
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  .input-container > label{
    font-weight: bold;
    margin-bottom: 15px;
    color: #222;
    padding: 5px 10px;
    border-left: 4px solid #FCBA03;
  }
  input, select {
    padding: 5px 10px;
    width: 300px;
  }
  #optional-container, #cheese-container{
    flex-direction: row;
    flex-wrap: wrap;
  }
  #optional-title, #cheese-title{
    width: 100%;
  }
  .checkbox-container, .radio-container{
    display: flex;
    align-items: flex-start;
    width: 50%;
    margin-bottom: 20px;
  }
  .checkbox-container span,
  .checkbox-container input,
  .radio-container span,
  .radio-container input{
    width: auto;
  }
  .checkbox-container span,
  .radio-container span{
    margin-left: 6px;
    font-weight: bold;
  }
  .submit-btn{
    background-color: #222;
    color: #FCBA03;
    font-weight: bold;
    border: 2px solid #222;
    padding: 10px;
    font-size: 16px;
    margin: 0 auto;
    cursor: pointer;
    transition: .5s;
  }
  .submit-btn:hover{
    background-color: transparent;
    color: #222;
  }
</style>