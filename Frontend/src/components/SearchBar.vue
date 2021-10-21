<template>
  <div class="container">
    <div class="container searchbar">
      <div class="row">
        <div class="ok">
          <input
            type="text"
            name=""
            placeholder="Recherche par article"
            v-model="query"
            @keyup="searchBar(query)"
          />
        </div>
      </div>

      <div class="result-search">
        <div class="resulat" v-for="article in data.data" :key="article">
          <div class="result-main">
            <h1>{{ article.titre }}</h1>
            <img :src="'https://my-epitech-destination-api.herokuapp.com/' + article.image" width="250" height="200" />
            <div class="button">
              <a :href="'/article/' + article.id"><button>Voir l'article</button></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import UserService from "../services/user.service";
export default {
  name: "SearchBar",
  data() {
    return {
      content: "",
      data: [],
      articles: [],
    };
  },
  mounted() {
    UserService.getPublicContent().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
  created() {
    this.searchBar();
  },
  methods: {
    searchBar(query) {
      axios
        .get("https://my-epitech-destination-api.herokuapp.com/api/search?recherche=" + query)
        .then((resp) => {
          this.data = resp;
        });
    },
    onChange: function () {
      console.log(this.continent);
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
body {
  font-family: "Lato";
}
input {
  border: 2px solid #85c4af;
  background-color: #f1f1f1;
  padding: 10px;
  font-size: 16px;
  border-radius: 50px;
}
input[type="text"] {
  background-color: #f1f1f1;
  background-position: 99% 100%;
  background-color: #f1f1f1;
  padding: 12px;
  font-size: 16px;
  border-radius: 50px;
  width: 700px;
  text-align: left;
}

.result-search {
  display: flex;
  flex-wrap: wrap;
  margin: 40px 0;
}

.resulat {
  margin-left: 5.5em;
  width: 40%;
  margin-bottom: 3em;
}

.result-main .button button {
  margin-top: 20px;
  /* margin-left: 40px; */
  padding: 10px 40px;
  border-radius: 10px;
  background-color: #1b1b52;
  color: white;
  border: none;
  font-family: "Lato";
}

.result-main .button button:hover {
  background-color: white;
  border: 2px solid #1b1b52;
  color: #1b1b52;
}
.row {
  justify-content: center;
}
.ok
{
  justify-content: center;
}
input
{
  margin-left: 14em;
}
</style>
