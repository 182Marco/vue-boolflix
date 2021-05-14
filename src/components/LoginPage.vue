<template>
  <div
    class="main-cont"
    :style="{
      backgroundImage: 'url(' + require('@/assets/img/netflixBg.webp') + ')',
    }"
  >
    <img class="logo" src="@/assets/img/brand.svg" alt="logo" />
    <div class="login-box">
      <div class="txt-box">
        <!-- testi del login -->
        <h2>Sign In</h2>
        <input
          placeholder="Email"
          class="mail input"
          type="mail"
          @keyup.enter="passDownFocus()"
          v-model.trim="mailInmitted"
        />
        <input
          v-model.trim="pswInmitted"
          ref="psw"
          placeholder="Password"
          class="psw"
          type="password"
        />
        <button @click="ceckSignIn(users, mailInmitted, pswInmitted)">
          Sign In
        </button>
        <p v-if="er">Mail o Password errati</p>
      </div>
    </div>
  </div>
</template>

<script>
  // components

  export default {
    name: 'LoginPage',
    props: {},
    data() {
      return {
        er: false,
        mailInmitted: '',
        pswInmitted: '',
        users: [
          {
            mail: 'marcomilza@gmail.com',
            psw: 'xxx',
          },
          {
            mail: 'ugo@gmail.com',
            psw: 'aaa',
          },
          {
            mail: 'p@gmail.it',
            psw: 'bbb',
          },
        ],
      };
    },
    methods: {
      ceckSignIn(arOfObj, mailIn, pswIn) {
        if (
          arOfObj.filter(e => e.mail === mailIn && e.psw === pswIn).length > 0
        ) {
          this.$emit('completedLogin');
        } else {
          this.er = true;
          setTimeout(() => (this.er = false), 3000);
        }
      },
      passDownFocus() {
        this.$refs.psw.focus();
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  /* parcials */
  @import '@/scss/var';
  @import '@/scss/reset';
  @import '@/scss/mixins';
  .main-cont {
    @include width-height(100vw, 100vh);
  }

  .logo {
    width: 17%;
    margin-right: 15px;
  }
  .login-box {
    @include width-height(27%, 73%);
    background-color: rgba(0, 0, 0, 0.6);
    margin: 0 auto;
    @include flex(row, center, center);
    .txt-box {
      @include width-height(70%, 80%);
      h2 {
        margin-top: 0;
        color: $white;
        font-size: 2rem;
      }
      input,
      button {
        border-radius: 3px;
      }
      input {
        @include width-height(calc(100% - 20px), 40px);
        background-color: $searchBarCol;
        color: $white;
        padding-left: 20px;
        font-size: 1.2rem;
        &:focus {
          border: none;
        }
      }
      input.mail {
        margin-bottom: 15px;
      }
      input.psw {
        margin-bottom: 40px;
      }
      button {
        cursor: pointer;
        @include width-height(100%, 40px);
        font-size: 1.4rem;
        font-weight: bold;
        background-color: $brand;
        color: $white;
        border: 1px solid $brand;
        transition: box-shadow 0.2s;
        &:hover {
          border: 0;
          box-shadow: 0 0 1px 1px $brand;
        }
      }
      p {
        color: red;
      }
    }
  }
</style>
