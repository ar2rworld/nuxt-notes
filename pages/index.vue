<script setup lang="ts">
  import type { FormSubmitEvent } from '@nuxt/ui';
  const websiteStore = useWebsiteStore();
  const toast = useToast();

  const state = reactive({
    noteName: '',
    noteText: ''
  });

  async function onSubmitNote(event: FormSubmitEvent<typeof state>) {
    const { data, error } = await useFetch('/back/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': websiteStore.token,
      },
      body: {
        name: event.data.noteName,
        text: event.data.noteText,
      },
    });

    if (error.value) {
      toast.error({
        title: 'Error',
        message: error.value.data.error,
      });
      return;
    }

    toast.success({
      title: 'Success',
      message: 'Note created successfully.',
      color: 'green'
    });
    state.noteName = '';
    state.noteText = '';

    websiteStore.notes.push({
      _id: data.value._id,
      name: data.value.name,
      text: data.value.text,
    });

  }
</script>
<template>
  <div class="container mx-auto p-4">
    <NuxtPage />
    <h1 class="text-2xl font-bold mb-4 text-center">Welcome to the homepage</h1>
    <p class="mb-6 text-gray-700 text-center">
      {{ websiteStore.username != "" ? "Hello " + websiteStore.username : "Please login" }}
    </p>

    <div v-if="websiteStore.username" class="bg-white p-6 rounded-lg shadow-md mx-auto" style="max-width: 500px;">
      <h2 class="text-xl font-semibold mb-4 text-center">Create a New Note</h2>
      <UForm :state="state" class="space-y-4" @submit="onSubmitNote">
        <UFormField label="Name" name="noteName">
          <UInput v-model="state.noteName" class="w-full p-2 border border-gray-300 rounded" placeholder="Enter note name" required />
        </UFormField>

        <UFormField label="Text" name="noteText">
          <UInput v-model="state.noteText" type="textarea" class="w-full p-2 border border-gray-300 rounded" placeholder="Enter note text" required />
        </UFormField>

        <UButton type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
          Create Note
        </UButton>
      </UForm>
    </div>

    <ul v-if="websiteStore.notes.length" class="mt-6 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
      <NoteCard
        v-for="note in websiteStore.notes"
        :id="note._id"
        :key="note._id"
        :notename="note.name"
        :text="note.text"
        />
      </ul>
  </div>
</template>
