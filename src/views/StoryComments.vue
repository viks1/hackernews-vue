<template>
  <div v-if="comments && comments.length" class="comments-section">
    <div v-for="comment in comments" :key="comment.id" class="comment"> <!-- for za printanje na site komentari-->
      <p><strong>{{ comment.by }}</strong> {{ timeSince(comment.time) }} ago</p>
      <p v-html="comment.text"></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    storyId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      comments: []
    };
  },
  async created() {
    // promise da gi zeme site komentari i replies (kids na koemntarite)
    const story = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${this.storyId}.json`
    ).then((res) => res.json());

    if (story && story.kids) {
      this.comments = await Promise.all(
        story.kids.map((id) =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then((res) => res.json())
            .catch((error) => {
              console.error("Error: ", error);
              return null;
            })
        )
      ).then((comments) => comments.filter((comment) => comment !== null));
      //filterot gi vadi site null komentariq
    }
  },
  methods: {
    timeSince(unixTimestamp) {
      const seconds = Math.floor(Date.now() / 1000 - unixTimestamp);
      const interval = Math.floor(seconds / 3600);
      if (interval > 24) {
        return Math.round(interval / 24) + " days";
      }
      return interval + " hours";
    }
  }
};
</script>

<style>
.comments-section {
  margin-top: 10px;
  padding-left: 20px;
  border-left: 2px solid #ddd;
}

.comment {
  margin-bottom: 10px;
}

.comment strong {
  color: #333;
}

.comment p {
  margin: 0;
}
</style>
