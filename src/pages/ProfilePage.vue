<template>
  <q-page class="row items-center justify-evenly">
    <div class="col-12 text-center text-xl">
      You are logged in with directus.
      <div v-if="can('read', 'accounts')">
        hi {{ can('read', 'accounts') }}
      </div>
    </div>
    <user-logout></user-logout>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserLogout from 'src/components/auth/UserLogout.vue';
// Ability Import
import { useAbility } from '@casl/vue';
import { setupMaster } from 'cluster';
export default defineComponent({
  name: 'ProfilePage',
  components: { UserLogout },
  setup() {
    // Ability Define
    const { can } = useAbility();
    console.log(can('read', 'accounts'))

    return { can };
  }
});
</script>
