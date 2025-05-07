<template>
  <li class="p-4 bg-white rounded-lg shadow transition-shadow hover:shadow-md mx-auto relative" style="max-width: 500px;">
    <div class="absolute top-2 right-2 flex gap-2">
      <NuxtLink :to="`/note/${id}`" class="p-2 text-gray-500 hover:text-blue-500 transition-colors">
        <Icon name="uil:pen" style="color: black" />
      </NuxtLink>
      <button 
        class="p-2 text-gray-500 hover:text-red-500 transition-colors"
        @click="handleDelete" 
      >
        <Icon name="uil:trash" style="color: black" />
      </button>
    </div>
    <h3 class="text-lg font-semibold text-gray-800 mb-1 truncate pr-8">
      {{ notename }}
    </h3>
    <p class="text-sm text-gray-600">
      {{ text }}
    </p>
  </li>
</template>

<script setup>
const store = useWebsiteStore();
const toast = useToast();
const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  notename: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const handleDelete = () => {
  store.deleteNote(props.id).then(() => {
    toast.success({title: "Success", message: "Note deleted successfully"});
  }).catch((error) => {
    toast.error({title: "Error", message: error.toString()});
  });
}
</script>
