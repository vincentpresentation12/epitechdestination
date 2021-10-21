<template>
    <div class="container">
      <BoardAdmin />
      <div class="container">
        <div class="header">
          <h1>Liste des Utilisateurs</h1>
           <router-link to="/createUtilisateurs"><button><i class="fa fa-plus" aria-hidden="true"></i>Créer un nouvel utilisateur</button></router-link>
        </div>
    
        <!-- ----------------------------SI PAS DE USERS-------------------------------- -->
        <div v-if="users.length === 0">
            <h2> Pas d'utilisateur trouvé pour le moment </h2>
        </div>
        <!-- ----------------------------TABLEAU----------------------------------------- -->
         <div class="tableau">
            <table class="table">
              <!-- ----tableau : header-------- -->
              <thead>
                <tr class="table-header">
                  <th scope="col">id</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Prénom</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Créé à</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>

              <!-- -----tableau : body-------- -->
              <tbody>
                <tr v-for="user in users" :key="user.id" class="table-body">
                  <td class="table-row">{{ user.id }}</td>
                  <td class="table-row">{{ user.nom }}</td>
                  <td class="table-row">{{ user.prénom }}</td>
                  <td class="table-row">{{ user.email }}</td>
                  <td class="table-row">{{ getRoles(user) }}</td>
                  <td class="table-row">{{ user.createdAt }}</td>
                  <td class="table-row">
                    <div class="table-row-modif">
                       <router-link :to="{name: 'EditUtilisateurs', params: {id: user.id}}" class="link"><i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i></router-link>
                      <button class="delete" v-on:click="deleteuser(user.id)"><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>  
  </div>    
</template>

<script>
import BoardAdmin from '@/components/BoardAdmin.vue'
import axios from "axios";

function getRoles(user){
    let str = ""
    str += user.roles[0].nom
    if (user.roles[1]){
      str += ", "
      str += user.roles[1].nom
    }
    return (str);
}

export default {
    name : "CrudUtilisateurs",
     components: {
      BoardAdmin,
    },
    getRoles,
  data() {
    return {
      users: {},
    };
  },
  created() {
    if (!this.$store.state.auth.user.roles.includes("ROLE_ADMIN"))
      return;
    this.fetchusers();
  },
  methods: {
    getRoles,
    fetchusers() {
      axios
        .get('https://my-epitech-destination-api.herokuapp.com/api/users')
        .then(data => (console.log(data),this.users = data.data));
    },
    deleteuser(id) {
      if(confirm("Etes-vous sûr de vouloir supprimer cet utilisateur ?")){
        axios.delete('https://my-epitech-destination-api.herokuapp.com/api/users/'+ id,)
        .then(data => {
          console.log(data);
          window.location.reload();
        });
      }
    }
  }
};
</script>

<style scoped>

.header{
    height: 12%;
    display: flex;
    align-items: center;
    
}

.header h1{
  margin: 15px 0;
  font-family:'Bebas Neue', cursive;
}

.header a{
    flex: 1;
    text-align: right;
    font-family: 'Lato';
    
} 

.header button{
  
  background-color: transparent;
  border: 2px solid #85C4AF;
  border-radius: 6px;
  padding: 10px 0;
}

.header button:hover{
  background-color: #85C4AF;
  padding: 10px 15px;
}

.header a i{
  padding: 0 10px;
  background-color: transparent;
}

.table-header{
  border: hidden;
  color: grey;
  text-align: center;
}

.table-header th{
  font-weight: 600;
}

.table-body{
  border-bottom: 5px solid white;
  background-color: #e5e5e575;
  margin-bottom: 100px;
}

.table-row{
  margin: 20px 0;
}

.table-row-modif{
  background-color: transparent
}

.table-row-modif .link{
  text-decoration: none;
  background-color: transparent;
  padding: 0 20px;
}

.table-row-modif i{
  background-color: transparent;
  color: grey;
}

.table-row-modif .delete {
  border: none;
  background-color: transparent;
  padding: 0 20px;
}

.table-row-modif .delete i{
  color: #C40002;
}

</style>