<template>
<AppHeader/>
<div class="container my-5">
    <div class="row d-flex justify-content-center">
        <div class="col-8">
            <router-view/>
        </div> 
    </div>
</div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
export default{
    components:{
        AppHeader,
        AppFooter,
    },
}
</script>