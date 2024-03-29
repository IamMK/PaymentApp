<script setup lang="ts">
import { reactive, computed, ref } from "vue";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";
import TopBar from "@/components/TopBar.vue";

const authStore = useAuthStore();
const router = useRouter();

const formData = reactive({
  email: "",
  password: "",
});

const validEmail = computed(() =>
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|pl|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)/.test(
    formData.email
  )
);

const upperCase = computed(() => /[A-Z]/.test(formData.password));
const lowerCase = computed(() => /[a-z]/.test(formData.password));
const digits = computed(() => /\d/.test(formData.password));
const special = computed(() =>
  /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(formData.password)
);
const passwordLength = computed(() => formData.password.length >= 8);
const formIsValid = computed((): boolean => {
  return (
    validEmail.value &&
    upperCase.value &&
    lowerCase.value &&
    digits.value &&
    special.value &&
    passwordLength.value
  );
});

let sendTry = ref(false);

const data = reactive({
  mode: "login" as "login" | "signup",
  isLoading: false,
  error: null as string | null | unknown,
});

const submitButtonCaption = computed(() => {
  if (data.mode === "login") return "Zaloguj";
  else return "Zarejestruj";
});

const switchModeButtonCaption = computed(() => {
  if (data.mode === "login") return "Rejestracja";
  else return "Logowanie";
});

const switchAuthMode = () => {
  if (data.mode === "login") {
    data.mode = "signup";
  } else {
    data.mode = "login";
  }
};

const submitForm = async () => {
  sendTry.value = true;
  if (!formIsValid.value) {
    data.error = "Sprawdź poprawność wpisanych danych";
    return;
  }

  data.isLoading = true;

  const authData = reactive({
    email: formData.email,
    password: formData.password,
  });

  try {
    await authStore.authenticate({ ...authData, authType: data.mode });
  } catch (err: string | null | unknown) {
    data.error = err;
  }

  data.isLoading = false;
  if (formIsValid.value && !data.error) {
    if (data.mode === "login") router.push({ name: "calendar" });
    if (data.mode === "signup") {
      data.mode = "login";
      authStore.registered = true;
    }
  }
};

const handleError = () => {
  data.error = null;
};

const formReset = () => {
  sendTry.value = false;
};
</script>

<template>
  <section class="auth">
    <top-bar>
      <transition name="header" mode="out-in">
        <h1 v-if="data.mode === 'login'">Logowanie</h1>
        <h1 v-else>Rejestracja</h1>
      </transition>
    </top-bar>

    <main class="card" auth-padding>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email"
            ><i class="fa-solid fa-envelope"></i> <span>E-mail</span></label
          ><input
            type="email"
            name="email"
            id="email"
            v-model.trim="formData.email"
            @focus="formReset"
          />
        </div>
        <div class="form-control">
          <label for="password"
            ><i class="fa-solid fa-key"></i> <span>Password</span></label
          ><input
            type="password"
            name="password"
            id="password"
            v-model.trim="formData.password"
            @focus="formReset"
          />
        </div>
        <p v-if="!formIsValid && sendTry && data.mode === 'login'">
          Wprowadź prawidłowe dane logowania.
        </p>
        <p
          v-if="
            formIsValid &&
            sendTry &&
            data.mode === 'login' &&
            authStore.registered
          "
        >
          Możesz zalogować się używając swojego loginu i hasła.
        </p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{
          switchModeButtonCaption
        }}</base-button>
      </form>
    </main>
    <transition name="confirm" mode="out-in">
      <aside
        mode="flat"
        v-if="data.mode === 'signup'"
        class="card card--dialog"
      >
        <p class="rules" :class="validEmail ? 'rules--ok' : 'rules--ng'">
          Email prawidłowy
        </p>
        <p class="rules" :class="passwordLength ? 'rules--ok' : 'rules--ng'">
          Hasło zawiera minimum 8 znaków
        </p>
        <p class="rules" :class="upperCase ? 'rules--ok' : 'rules--ng'">
          Hasło zawiera minimum jedną wielką literę
        </p>
        <p class="rules" :class="lowerCase ? 'rules--ok' : 'rules--ng'">
          Hasło zawiera minimum jedną małą literę
        </p>
        <p class="rules" :class="digits ? 'rules--ok' : 'rules--ng'">
          Hasło zawiera liczby
        </p>
        <p class="rules" :class="special ? 'rules--ok' : 'rules--ng'">
          Hasło zawiera znak specjalny
        </p>
      </aside>
    </transition>

    <base-dialog
      v-if="!!data.error"
      title="Błąd autoryzacji"
      @close="handleError"
    >
      <p class="auth__error">{{ data.error }}</p>
    </base-dialog>
    <base-dialog
      :title="data.mode === 'login' ? 'Logowanie...' : 'Rejestracja...'"
      v-if="data.isLoading"
    >
      <base-spinner></base-spinner>
    </base-dialog>
  </section>
</template>

<style scoped lang="scss">
.auth {
  &__header {
    width: 100%;
    background-color: $main-color;
    color: $text-color;
    padding: 20px;
  }
  &__error {
    padding: 20px;
    color: $text-color;
  }
}
.card {
  margin: 1rem;
  width: auto;
  height: 100%;
  text-align: justify;

  &--dialog {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    font-weight: 700;
  }
}

form {
  margin: auto;
  // background-color: $background-color;
  // box-shadow: 8px 8px 24px 0px rgba(0, 0, 0, 1);
  padding: 20px;
}

.form-control {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 0;
  text-align: center;
}

label {
  display: flex;
  font-weight: bold;
  flex-direction: row;
  width: auto;
  margin-bottom: 0.5rem;
  padding: 10px;
  color: $text-color;

  & i {
    height: 24px;
    line-height: 24px;
    margin-right: 5px;
  }
}

input,
textarea {
  display: block;
  border: none;
  padding: 0.15rem;
  // border-radius: 10px;
  font-size: large;
  font-weight: 400;
  width: 100%;
  color: $text-color;
  background-color: $main-color;
}

input:focus,
textarea:focus {
  background-color: $text-color;
  color: $main-color;
  outline: none;
}

.rules {
  transition: all 0.2s ease-in-out;
  &--ok {
    color: $calendar-overhours;
  }
  &--ng {
    color: $calendar-presence;
  }
}

@media (min-width: $breakpoint-tablet) {
  .card {
    margin: 1rem auto;
    padding-left: calc(20px + 78px);
    width: 90%;
  }
}

.header-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.header-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.header-enter-active {
  transition: all 0.3s ease-out;
}
.header-leave-active {
  transition: all 0.3s ease-in;
}

.header-enter-to,
.header-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
