<template>
  <aside :class="{ sidebar: true, 'sidebar--opened': active }">
    <button class="sidebar__close" @click="closeSidebar">
      <CloseIcon class="sidebar__icon" />
    </button>
    <form class="sidebar__form" @submit.prevent="() => submitLocation()">
      <FormInput
        :hasError={hasError}
        :inputValue="zipCode"
        class="sidebar__form__input"
        placeholder="Enter Zip Code"
        v-model="zipCode"
      />
      <FormButton primary class="sidebar__form__change" buttonType="submit">Search</FormButton>
      <FormButton tertiary class="sidebar__form__current" @click.prevent="() => changeLocation()">Current Location</FormButton>
      <p v-if="hasError" class="sidebar__form__error">Invalid Zip Code</p>
    </form>
    <div class="recent-searches" v-if="recentSearches.length > 0">
      <h2>Recent Zip Code Searches:</h2>
      <ul>
        <li :key="recentSearch" v-for="recentSearch in recentSearches.slice().reverse()">
          <a href="#" @click.prevent="() => changeLocation(recentSearch)">{{recentSearch}}</a>
        </li>
      </ul>
      <FormButton secondary @click.prevent="() => clearRecentSearches()">Clear Recent Zip Codes</FormButton>
    </div>
  </aside>
</template>

<script>
import localStore from 'store';
import { createNamespacedHelpers } from 'vuex';
import CloseIcon from '@/assets/svg/utility/close.svg';
import FormButton from '@/components/FormButton.vue';
import FormInput from '@/components/FormInput.vue';

const { mapActions: mapLocationActions } = createNamespacedHelpers('location');

export default {
  components: {
    CloseIcon,
    FormButton,
    FormInput,
  },
  data() {
    return {
      hasError: false,
      recentSearches: [],
      zipCode: '',
    };
  },
  methods: {
    ...mapLocationActions(['updateLocationCurrent']),
    async changeLocation(zipCode) {
      this.closeSidebar();
      this.zipCode = '';
      this.recentSearches = [...this.recentSearches, zipCode].reduce((a, b) => {
        if (b && !a.includes(b)) a.push(b);
        return a;
      }, []);
      await this.updateLocationCurrent(zipCode);
    },
    submitLocation() {
      const isValidZipCode = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.zipCode);

      if (isValidZipCode) {
        this.hasError = false;
        this.changeLocation(this.zipCode);
      } else {
        this.hasError = true;
      }
    },
    clearRecentSearches() {
      this.recentSearches = [];
    },
    closeSidebar() {
      this.$router.replace('/');
    },
  },
  mounted() {
    this.recentSearches = localStore.get('recentSearches') || [];
  },
  props: {
    active: {
      default: false,
      type: Boolean,
    },
  },
  watch: {
    recentSearches(zipCodes) {
      localStore.set('recentSearches', zipCodes);
    },
  },
};
</script>

<style scoped>
.sidebar {
  background: rgba(0, 0, 0, 0.8);
  box-sizing: border-box;
  color: #fff;
  height: 100vh;
  opacity: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 20px;
  position: fixed;
  right: -100vw;
  top: 0;
  transition: opacity 0.5s ease, right 0.5s ease;
  width: 100vw;
}

@media screen and (min-width: 768px) {
  .sidebar {
    right: -500px;
    width: 500px;
  }
}

.sidebar--opened {
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.5);
  opacity: 1;
  right: 0;
}

.sidebar__close {
  border: none;
  background: none;
  cursor: pointer;
  margin-bottom: 20px;
  padding: 5px;
}
.sidebar__close:focus {
  outline: none;
}

.sidebar__icon {
  height: 20px;
  fill: #fff;
}

.sidebar__form {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'input input'
    'change current'
    'error error';
}
.sidebar__form__input {
  grid-area: input;
}
.sidebar__form__input--error {
  color: #c90000;
}
.sidebar__form__error {
  color: #c90000;
  grid-area: error;
  margin: 0;
  text-align: center;
}
.sidebar__form__change {
  grid-area: change;
}
.sidebar__form__current {
  grid-area: current;
}

.recent-searches {
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  margin-top: 20px;
  padding-top: 20px;
  text-align: center;
}
.recent-searches h2 {
  margin: 0 0 20px;
}
.recent-searches ul {
  list-style: none;
  margin: 0 0 20px;
  padding: 0 0 0 20px;
}
.recent-searches a {
  color: #fff;
  text-decoration: none;
}
</style>
