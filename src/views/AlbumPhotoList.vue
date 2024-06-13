<template>
    <div class="album-detail">
      <div class="photos-grid">
        <div
          class="photo-container"
          v-for="(photo, index) in photos"
          :key="index"
          @click="showPhoto(photo.url)"
        >
          <img :src="photo.thumbnailUrl" :alt="photo.title" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useAlbumsStore } from '../store/album';
  import { usePhotosStore } from '../store/photo';
  
  export default defineComponent({
    setup() {
      const route = useRoute();
      const albumTitle = ref('');
      const photos = ref([]);
      const albumsStore = useAlbumsStore();
      const photosStore = usePhotosStore();
  
      onMounted(async () => {
        const albumId = route.params.id;
        await photosStore.fetchPhotos(albumId);
        photos.value = photosStore.photos;
        albumTitle.value = albumsStore.albums.find(album => album.id == albumId)?.title;
      });
  
      const showPhoto = (url) => {
        window.open(url);
      };
  
      return {
        albumTitle,
        photos,
        showPhoto,
      };
    },
  });
  </script>
  
  <style scoped>
  .album-detail {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }
  
  .album-detail h1 {
    font-size: 2rem;
    color: whitesmoke;
    margin-bottom: 20px;
    font-weight: bolder;
  }
  
  .photos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }
  
  .photo-container {
    width: 100%;
    overflow: hidden;
    border-radius: 8px;
    border: 2px solid whitesmoke;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: transform 0.5s, box-shadow 0.5s;
  }
  
  .photo-container:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
  
  .photo-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  </style>
  