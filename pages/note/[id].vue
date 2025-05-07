<template>
  <main class="container mx-auto p-4">
    <div class="max-w-2xl mx-auto">
      <form @submit.prevent="handleSubmit" class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold">Edit Note</h1>
          <button 
            type="button"
            @click="handleDelete"
            class="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 flex items-center gap-2"
          >
            <Icon name="uil:trash" />
            Delete Note
          </button>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="notename">
            Note Title
          </label>
          <input 
            id="notename"
            v-model="form.notename"
            type="text"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
        </div>

        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="text">
            Note Content
          </label>
          <textarea 
            id="text"
            v-model="form.text"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-48"
            required
          ></textarea>
        </div>

        <div class="flex justify-between">
          <button 
            type="button" 
            @click="router.push('/')"
            class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
          <button 
            type="submit"
            class="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const store = useWebsiteStore();
const toast = useToast();

const form = reactive({
  notename: '',
  text: ''
});

// Load current note data
onMounted(async () => {
  const note = store.notes.find(n => n._id === route.params.id);
  if (note) {
    console.log(note);
    form.notename = note.name;
    form.text = note.text;
  }
});

const handleSubmit = async () => {
  try {
    await store.updateNote(route.params.id, {
      name: form.notename,
      text: form.text
    });
    toast.success({ title: "Success", message: "Note updated successfully" });
    router.push('/');
  } catch (error) {
    toast.error({ title: "Error", message: error.toString() });
  }
};

const handleDelete = async () => {
  try {
    await store.deleteNote(route.params.id);
    toast.success({ title: "Success", message: "Note deleted successfully" });
    router.push('/');
  } catch (error) {
    toast.error({ title: "Error", message: error.toString() });
  }
};
</script>