<template>
    <div class="container">
      <div class="main-layout">
        <!-- Sidebar -->
        <div class="left">
            <img src="../assets/hackernews.png" id="logo">
            <h1>Search <br> Hacker News</h1>
          <ul>
            <!-- redirect do drug page-->
            <li @click="navigateTo('/')">All</li>
            <li @click="navigateTo('hot')">Hot</li>
            <li @click="navigateTo('show')">Show HN</li>
            <li @click="navigateTo('ask')">Ask HN</li>
            <li @click="navigateTo('jobs')">Jobs</li>
            <li @click="navigateTo('login')">Task1</li>
          </ul>
        </div>
  
        <section> 
          <!-- sredniot story del-->
          <!-- slusha za podatoci shto mu gi isprakja search komponentot so emit-->
        <SearchBar @results="saveSearchResults" />
  
        <ul>
          <li v-for="story in (searchResults.length ? searchResults : stories)" :key="story.id" class="story-item">
            <a :href="story.url" target="_blank">{{ story.title }}</a>
            <div class="story-meta">
              <span>{{ story.score }} points</span>
              <span>by {{ story.by }}</span>
              <span>{{ timeSince(story.time) }} ago</span>
              <a :href="story.url" class="story-link"> {{ story.url }}</a>
              <span>{{ story.descendants }} comments</span>
              <!-- hide show komentari-->
              <button @click="toggleComments(story.id)" class="comments-button">
                {{ activeComments[story.id] ? "Hide Comments" : "View Comments" }}
              </button>
            </div>
            <!-- tuka gi prikazuva komentarite dokolku e kliknato view -->
            <div v-if="activeComments[story.id]" class="comments-section">
              <StoryComments :storyId="story.id" /> 
            </div>
          </li>
        </ul>
      </section>
      </div>
    </div>
  </template>
  
  <script>
  import SearchBar from "./SearchBar.vue";
  import StoryComments from "./StoryComments.vue";
  
  export default {
    components: {
      StoryComments, SearchBar
    },
    data() {
      return {
        stories: [],
        activeComments: {}, // gleda na koj stories sme otvorile komentari
        searchResults: [] // od searchbar komponentata
      };
    },
    async created() {
        const askStoriesId = await fetch(
            "https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty"
        ).then((res) => res.json());

        this.stories = await Promise.all(
            askStoriesId.slice(0,50).map((id) => 
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
                (res) => res.json()
            ))
        )
    },
  
    methods: {
      //presmetuvanje na vreme pominato
      timeSince(unixTimestamp) {
        const seconds = Math.floor(Date.now() / 1000 - unixTimestamp);
        const interval = Math.floor(seconds / 3600);
        if (interval > 24)
        {
          return Math.round(interval/24) + " days"
        }
        return interval + " hours";
      },
      toggleComments(storyId) {
        this.activeComments[storyId] = !this.activeComments[storyId];
      },
      navigateTo(x) {
        //smeni strana
        this.$router.push({path: `${x}`})
      },
      saveSearchResults(results) {
        if (!results || results.length === 0) {
        this.searchResults = [];
        } else {
            this.searchResults = results;
        }
}
    },
  };
  </script>
  
  <style>

  .container {
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100vw; 
  }
  
  .main-layout {
    display: flex;
    flex-grow: 1;
    flex-direction: row;
  }
  
  .left {
    flex: 0 0 15%; 
    min-width: 150px;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 10px;
  }
  
  .left img {
    max-width: 80%;
    height: auto;
    margin-bottom: 20px;
  }
  
  .left h1 {
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .left ul {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
  }
  
  .left ul li {
    text-align: center;
    padding: 10px 0;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .left ul li:hover {
    background-color: #ddd;
  }
  
  section {
    flex-grow: 1;
    padding: 20px;
    overflow-y: auto;
  }
  
  .story-item {
    padding: 15px;
    border-bottom: 1px solid #ddd;
    word-wrap: break-word;
  }
  
  .story-item a {
    font-weight: bold;
    color: #333;
    text-decoration: none;
  }
  
  .story-meta {
    font-size: 0.9rem;
    color: #555;
    display: flex;
    flex-wrap: wrap;
    gap: 10px; 
    align-items: center;
    margin-top: 5px;
  }
  
  .comments-button {
    color: #ff6600;
    text-decoration: none;
    font-weight: bold;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .comments-button:hover {
    text-decoration: underline;
  }
  
  .comments-section {
    margin-top: 10px;
    padding-left: 20px;
    border-left: 2px solid #ddd;
  }
  
  .search-bar {
    margin-bottom: 20px;
  }
  
  .search-bar input {
    padding: 8px;
    font-size: 1rem;
    width: 100%;
    border-radius: 25px;
    border: 1px solid #ddd;
  }
  
  @media (max-width: 768px) {
    
    .left {
      flex: 0 0 20%; 
      min-width: 100px;
    }
  
    .left h1 {
      font-size: 1.2rem;
    }
  
    .story-item {
      font-size: 0.9rem;
    }
  }
  
  @media (max-width: 480px) {
   
    .left {
      flex: 0 0 25%; 
    }
  
    .left h1 {
      font-size: 1rem;
    }
  
    .search-bar input {
      font-size: 0.9rem;
    }
  
    .story-meta {
      font-size: 0.8rem;
    }
  }
  
  </style>