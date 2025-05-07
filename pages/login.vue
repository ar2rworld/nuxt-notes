<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui';

const state = reactive({
  username: "",
  password: "",
  newUsername: "",
  newPassword: "",
})

const validate = (state): FormError[] => {
  const errors = []
  if (!state.username) errors.push({ name: 'username', message: 'Required' })
  if (!state.password) errors.push({ name: 'password', message: 'Required' })
  return errors
}

const validateRegister = (state): FormError[] => {
  const errors = []
  if (!state.newUsername) errors.push({ name: 'username', message: 'Required' })
  if (!state.newPassword) errors.push({ name: 'password', message: 'Required' })
  return errors
}

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<typeof state>) {
  const { data, error } = await useFetch('/back/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      username: event.data.username,
      password: event.data.password,
    },
  })
  if (error.value) {
    toast.error({ title: 'Error', message: error.value.data.error})
    return
  }

  const store = useWebsiteStore();
  store.setUser(event.data.username, data.value.id);
  store.setToken(data.value.token);
  
  const router = useRouter();
  router.push('/');
} 
async function onSubmitRegister(event: FormSubmitEvent<typeof state>) {
  const { error } = await useFetch('/back/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      username: event.data.newUsername,
      password: event.data.newPassword,
    },
  })

  if (error.value) {
    toast.error({ title: 'Error', message: error.value.data.error })
    return
  }

  state.newUsername = ''
  state.newPassword = ''
  toast.success({ title: 'Success', message: 'User registered successfully.' })
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12 px-4">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md mb-8">
      <h1 class="text-3xl font-bold text-center text-gray-900 mb-6">
        Login
      </h1>
      <UForm :validate="validate" :state="state" class="space-y-6" @submit="onSubmit">
        <UFormField label="Username" name="username" class="mb-4">
          <UInput 
            v-model="state.username" 
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm" 
            placeholder="Enter username"
          />
        </UFormField>

        <UFormField label="Password" name="password" class="mb-4">
          <UInput 
            v-model="state.password" 
            type="password" 
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm" 
            placeholder="Enter password"
          />
        </UFormField>

        <UButton type="submit" class="w-full">
          Sign in
        </UButton>
      </UForm>
    </div>

    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <h1 class="text-3xl font-bold text-center text-gray-900 mb-6">
        Register
      </h1>
      <UForm :validate="validateRegister" :state="state" class="space-y-6" @submit="onSubmitRegister">
        <UFormField label="Username" name="username" class="mb-4">
          <UInput 
            v-model="state.newUsername" 
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm" 
            placeholder="Choose username"
          />
        </UFormField>

        <UFormField label="Password" name="password" class="mb-4">
          <UInput 
            v-model="state.newPassword" 
            type="password" 
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm" 
            placeholder="Choose password"
          />
        </UFormField>

        <UButton type="submit" class="w-full">
          Create account
        </UButton>
      </UForm>
    </div>
  </div>
</template>

