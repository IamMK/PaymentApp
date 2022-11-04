<script setup lang="ts">
import { reactive, computed, ref } from "vue";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const formData = reactive({
  email: "",
  password: "",
  rePassword: "",
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
const passwordConfirmed = computed(() => {
  if (data.mode === "login") return true;
  if (formData.password.length === 0) return false;
  console.log(formData.password.length === 0);

  return formData.password === formData.rePassword;
});
const formIsValid = (): boolean => {
  return (
    validEmail.value &&
    upperCase.value &&
    lowerCase.value &&
    digits.value &&
    special.value &&
    passwordLength.value &&
    passwordConfirmed.value
  );
};

let sendTry = ref(false);

const data = reactive({
  mode: "login" as "login" | "signup",
  formIsValid: true,
  isLoading: false,
  error: null as string | null | unknown,
});

const submitButtonCaption = computed(() => {
  if (data.mode === "login") return "Login";
  else return "Sign up";
});

const switchModeButtonCaption = computed(() => {
  if (data.mode === "login") return "Signup instead";
  else return "Login instead";
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
  if (!formIsValid()) {
    return;
  }

  data.isLoading = true;

  const authData = reactive({
    email: formData.email,
    password: formData.password,
    password2: formData.rePassword,
  });

  try {
    await authStore.authenticate({ ...authData, authType: data.mode });
  } catch (err: string | null | unknown) {
    data.error = err || "Failed to authenticate. Try later.";
  }

  data.isLoading = false;
  if (formIsValid() && !data.error) {
    if (data.mode === "login") router.push({ name: "home" });
    if (data.mode === "signup") data.mode = "login";
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
  <div>
    <base-dialog
      :show="!!data.error"
      title="An error occured"
      @close="handleError"
    >
      <p>{{ data.error }}</p>
    </base-dialog>
    <base-dialog title="Authenticating..." :show="data.isLoading" fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card mode="row">
      <base-container class="card__element" auth-padding>
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
          <transition name="confirm" mode="out-in">
            <div class="form-control" v-if="data.mode === 'signup'">
              <label for="re-password"
                ><i class="fa-solid fa-key"></i>
                <span>Confirm Password</span></label
              ><input
                type="password"
                name="re-password"
                id="re-password"
                v-model.trim="formData.rePassword"
                @focus="formReset"
              />
            </div>
          </transition>
          <p v-if="!formIsValid() && sendTry">
            Please enter a valid email and password.
          </p>
          <p
            v-if="
              formIsValid() &&
              sendTry &&
              data.mode === 'login' &&
              authStore.registered
            "
          >
            Now you can LogIn with your email and password.
          </p>
          <base-button>{{ submitButtonCaption }}</base-button>
          <base-button type="button" mode="flat" @click="switchAuthMode">{{
            switchModeButtonCaption
          }}</base-button>
        </form>
      </base-container>
      <transition name="confirm" mode="out-in">
        <base-container
          mode="flat"
          v-if="data.mode === 'signup'"
          class="card__element card__element--dialog"
        >
          <p class="rules" :class="validEmail ? 'rules--ok' : 'rules--ng'">
            Email ok
          </p>
          <p class="rules" :class="passwordLength ? 'rules--ok' : 'rules--ng'">
            Password has at least 8 letters
          </p>
          <p class="rules" :class="upperCase ? 'rules--ok' : 'rules--ng'">
            Password contains at least one capital letter
          </p>
          <p class="rules" :class="lowerCase ? 'rules--ok' : 'rules--ng'">
            Password contains at least one lower letter
          </p>
          <p class="rules" :class="digits ? 'rules--ok' : 'rules--ng'">
            Password constains numbers
          </p>
          <p class="rules" :class="special ? 'rules--ok' : 'rules--ng'">
            Password contains special char
          </p>
          <p
            class="rules"
            :class="passwordConfirmed ? 'rules--ok' : 'rules--ng'"
          >
            Password Confirmed
          </p>
        </base-container>
      </transition>
    </base-card>
  </div>
</template>

<style scoped lang="scss">
.card {
  &__element {
    margin: 1rem;

    width: auto;

    &--dialog {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      font-weight: 700;
    }
  }
}

form {
  margin: auto;
}

.form-control {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 0;
  text-align: center;
}

label {
  display: flex;
  flex-direction: column;
  font-weight: bold;
  margin-bottom: 0.5rem;
  width: 120px;
  padding: 10px;

  & i {
    height: 24px;
    line-height: 24px;
    margin-right: 5px;
  }
}

input,
textarea {
  display: block;
  width: 300px;
  // font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
  border-radius: 10px;
  font-size: large;
  font-weight: 400;
}

input:focus,
textarea:focus {
  border-color: $text-color;
  background-color: $background-color;
  color: $text-color;
  outline: none;
}

.confirm-enter-from {
  opacity: 0;
  transform: scaleY(0);
}
.confirm-leave-to {
  transform: scaleY(0);
  opacity: 0;
}

.confirm-enter-active {
  transition: all 0.3s ease-out;
}
.confirm-leave-active {
  transition: all 0.3s ease-in;
}

.confirm-enter-to,
.confirm-leave-from {
  opacity: 1;
  transform: scaleY(1);
}

.rules {
  transition: all 0.2s ease-in-out;
  &--ok {
    color: green;
  }
  &--ng {
    color: red;
  }
}

@media (max-width: $breakpoint-tablet) {
  .form-control {
    flex-direction: column;
  }
  label {
    flex-direction: row;
    width: auto;
  }
  input {
    width: 100%;
  }
}
</style>
