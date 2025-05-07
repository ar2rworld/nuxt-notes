<template>
  <li class="p-4 bg-white rounded-lg shadow transition-shadow hover:shadow-md mx-auto relative">
    <div class="absolute top-4 right-4 flex gap-2">
      <NuxtLink :to="`/note/${id}`" class="p-1.5 text-gray-500 hover:text-blue-500 transition-colors">
        <Icon name="uil:pen" size="1.2em" />
      </NuxtLink>
      <button 
        class="p-1.5 text-gray-500 hover:text-red-500 transition-colors"
        @click="handleDelete" 
      >
        <Icon name="uil:trash" size="1.2em" />
      </button>
    </div>
    <div class="pr-16">
      <h3 class="text-lg font-semibold text-gray-800 mb-2 break-words">
        {{ notename }}
      </h3>
      <p class="text-sm text-gray-600">
        {{ text }}
      </p>
    </div>
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
