<template>
  <div>
    <label for="username">Username:</label>
    <input type="username" id="username" v-model="username" @input="evaluatePasswor">

    <label for="password">Password:</label>
    <input type="password" id="password" v-model="password" @input="evaluatePassword">

    <p>Password Strength: {{ score }}</p>
    <div v-if="password != ''"> <!-- ceka da se pise neshto pred da go pojavi tekstot-->
    <p v-if="score === -2">Password is not allowed to contain the username. Please choose a better one</p>
    <p v-if="score === -1">Password used is common. Please choose a new one</p>
    <p v-if="score === 0">Very weak password. Please choose a stronger one.</p>
    <p v-else-if="score === 1">Weak password. Consider adding more complexity.</p>
    <p v-else-if="score === 2">Medium password. Improve by adding more criteria.</p>
    <p v-else-if="score === 3">Strong password. Good job!</p>
    <p v-else-if="score>3">Very strong password. Perfect choice!</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: '',
      score: 0,
      username: '',
      commonPasw: ['password', '12345', 'qwerty', 'admin', 'secret','123456','password','qwerty123','qwerty1','123456789','password1','12345678','12345','abc123','qwerty','iloveyou','Password','baseball','1234567','111111','princess','football','monkey','sunshine']

    };
  },
  methods: {
    evaluatePassword() {
      let score = 0;

      if (this.password.length == 0){
        this.score=0
        return;
      }

      if(this.password.toLowerCase().includes(this.username.toLowerCase()))
      {
        this.score=-2; //ako go sodrzhi username togas score = -2
        return;
      }

      if (this.password.length >= 8) {
        score++;
      }
      if (/[A-Z]/.test(this.password)) {
        score++;
      } // barem edna golema bukva
      if (/[a-z]/.test(this.password)) {
        score++;
      } // barem edna mala bukva
      if (/\d/.test(this.password)) {
        score++;
      } //cifra
      if (/[!@#$%^&*()_+-]/.test(this.password)) {
        score++;
      } //specijalni karakteri

      if (this.commonPasw.includes(this.password)) {
        score=-1; //listata ja najdov na: https://www.mentalfloss.com/most-common-passwords-2024
        return
      }

      this.score = score;
    },
  },
};
</script>