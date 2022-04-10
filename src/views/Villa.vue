<template>
  <div class="villa-wrapper" v-if="villa">
    <article class="villa">
      <header class="villa__header">
        <div id="lightgallery" ref="lightgallery">
          <a :href="villa._embedded['wp:featuredmedia'][0]['media_details'].sizes['header-villa'].source_url" id="main_photo" ref="first_photo">
            <div class="villa__header__photo" :style="{'background-image':`url(${villa._embedded['wp:featuredmedia'][0]['media_details'].sizes['header-villa'].source_url})`}"></div>
            <img :src="villa._embedded['wp:featuredmedia'][0]['media_details'].sizes['thumbnail'].source_url" style="display: none" alt="">
          </a>
          <template v-if="villa.acf.gallery">
            <a :href="image.sizes.header" style="display: none;" v-for="(image,i) in villa.acf.gallery" v-bind:key="`image_${i}`">
              <img :src="image.sizes.thumbnail" alt="">
            </a>
          </template>
        </div>
        <button class="view-photos btn btn--white btn--right btn--small" @click.prevent="$refs.first_photo.click()"><span>VIEW PHOTOS</span></button>		
      </header>

      <div class="villa__content">
        <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="villa__content__top">
              <h1 class="villa-title">CODE: {{ villa.id }}</h1>
              <div class="villa__content__top__location"><i class="icon-location"></i><span>{{ villa.acf.location }}</span></div>	
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="villa__content__icons">
                  <div class="details__icons">
                    <ul>
                      <li><i class="icon-bed"></i><span>{{villa.acf.bedrooms}} bedrooms </span></li>
                      <li><i class="icon-guests"></i><span>{{villa.acf.guests}} guests </span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="villa__content__main">
              <div v-html="villa.content.rendered"></div>
              <div class="villa__tabs">
                <nav class="villa__tabs__nav">
                  <ul>
                    <li :class="{'tab-current': active_tab == 1}" class=""><a href="#layout" @click.prevent="active_tab = 1"><span>Layout</span></a></li>
                    <li :class="{'tab-current': active_tab == 2}" class=""><a href="#amenities" @click.prevent="active_tab = 2"><span>Amenities</span></a></li>
                    <li :class="{'tab-current': active_tab == 3}" class=""><a href="#features" @click.prevent="active_tab = 3"><span>Features</span></a></li>
                    <li :class="{'tab-current': active_tab == 4}" class=""><a href="#distances" @click.prevent="active_tab = 4"><span>Distances</span></a></li>
                  </ul>
                </nav>							
                <div class="villa__tabs__content">
                  <section id="layout" class="layout" :class="{'content-current': active_tab == 1}">
                    <template v-if="villa.acf.layout">
                      <div class="row layout-block" v-for="(layout,i) in villa.acf.layout" v-bind:key="`layout_${i}`">
                          <div class="col-md-3"><h3>{{ layout.title }}</h3></div>
                          <div class="col-md-9" v-html="layout.description"></div>
                      </div>
                    </template>
                  </section>
                  <section id="amenities" class="" v-html="villa.acf.amenities" :class="{'content-current': active_tab == 2}"></section>
                  <section id="features" class="" v-html="villa.acf.features" :class="{'content-current': active_tab == 3}"></section>
                  <section id="distances" class="" v-html="villa.acf.distances" :class="{'content-current': active_tab == 4}"></section>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 sticky_sidebar" >
          </div>
        </div>
        </div>
        <!-- <div class="container-fluid">
          <div class="row">
            <div class="acf-map" style="margin-bottom: 60px;">
              <div class="marker" data-lat="<?php echo $location['lat']; ?>" data-lng="<?php echo $location['lng']; ?>"></div>
            </div>
          </div>
        </div> -->

      </div>

      <footer class="entry-footer">
        
      </footer><!-- .entry-footer -->
    </article><!-- #post-## -->

  </div>
</template>

<script>
import axios from 'axios';
import lightGallery from 'lightgallery';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgAutoplay from 'lightgallery/plugins/autoplay';
export default {
  data() {
    return {
      villa: null,
      active_tab: 1,
    }
  },
  mounted () {
    axios
      .get(`https://www.greekvillasboutique.com/wp-json/wp/v2/villas/${this.$route.params.id}?_embed`)
      .then(response => {
        this.villa = response.data;
        this.$nextTick(() => {
          this.initLightGallery();
        });
      })
  },
  methods: {
    initLightGallery() {
      lightGallery(this.$refs.lightgallery, {
        plugins: [ lgAutoplay, lgFullscreen, lgZoom, lgThumbnail ],
        download: false,
        speed: 500,
      });
    },
  }
}
</script>


<style>
  @import 'lightgallery/css/lightgallery.css';
  @import 'lightgallery/css/lg-thumbnail.css';
  @import 'lightgallery/css/lg-zoom.css';
</style>

