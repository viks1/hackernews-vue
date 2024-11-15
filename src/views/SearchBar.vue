<template>
    <div class="search-bar">
      <input
        v-model="query"
        type="text"
        placeholder="Search stories by title, url, or author"
        @input="onInput"
      />
    </div>
  </template>
  
  <script>
  export default {
    name: "SearchBar",
    props: {
      debounceTime: {
        type: Number,
      },
    },
    data() {
      return {
        query: "",
      };
    },
    methods: {
      onInput() {
        this.fetchSearchResults(this.query);
        },
        async fetchSearchResults(query) {
        if (!query) {
            //ako nema nishto vrati prazen array
          this.$emit("results", []); 
          return;
        }
  
        try {
          const searchResponse = await fetch(
            `http://hn.algolia.com/api/v1/search?query=${query}&tags=story`
          );
  
          const data = await searchResponse.json();
  
          //more remap deka angolia api vrakja json so razlicni iminja
          const results = data.hits.map((story) => ({
            id: story.objectID,
            title: story.title,
            url: story.url,
            score: story.points || 0,
            by: story.author || "Unknown",
            time: story.created_at_i,
            descendants: story.num_comments || 0,
          }));
  
          this.$emit("results", results); // emit nazad do parent
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      },
    },
  };
  </script>

  <style>
  .search-bar input {
    padding: 8px;
    font-size: 14px;
    width: 97%;
    border-radius: 25px;
    border: 1px solid #ddd;
  }
  </style>
  