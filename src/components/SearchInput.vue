<template>
    <div class="row" style="min-width: 870px; height: 100%;">
        <div class="col-md-5 px-2">
            <div class="d-flex align-items-center shadow px-3 py-1 h-100 bg-body-tertiary rounded">
                <i class="fa-solid fa-magnifying-glass fa-xl" style="color: #03abfd;"></i>
                <input type="text" 
                class="form-control bg-body-tertiary border-0 focus-ring focus-ring-light" 
                placeholder="Nhập tên vị trí, công ty, từ khóa"
                v-model="KeyInputText"
                @input="updateModelValueKey"
                @keyup.enter="submit"
                />
            </div>
        </div>
        <div class="col-md-5 px-2">
            <div class="d-flex align-items-center shadow px-3 py-1 h-100 bg-body-tertiary rounded">
                <i class="fa-solid fa-location-dot fa-xl" style="color: #03abfd;"></i>
                <input type="text" 
                class="form-control bg-body-tertiary border-0 focus-ring focus-ring-light" 
                placeholder="Nhập tỉnh, thành phố"
                v-model="ProvinceInputText"
                @input="updateModelValueProvince"
                @keyup.enter="submit"
                />
            </div>
            
        </div>
        <div class="col-md-2 px-2">
            <div class="shadow h-100 w-100 bg-body-tertiary rounded">   
                <button class="btn h-100 w-100" style="background-color: #03abfd;" @click="submit">
                    <i class="fa-solid fa-magnifying-glass fa-xl" style="color: #ffffff;"></i>
                    <span class="ms-2 fw-bold text-white">Tìm kiếm</span>
                </button>
            </div>
            
        </div>
    </div>
</template>

<script>
import { useJobStore } from '@/store/job.store';
export default{
    created(){
        this.jobStore = useJobStore();
    },
    props: {
        modelValueKey: {type: String, default: ""},
        modelValueProvince: {type: String, default: ""},
    },
    data(){
        return{
            KeyInputText: this.modelValueKey,
            ProvinceInputText: this.modelValueProvince,
        }
    },
    // emits: ["submit","update:modelValueKey","update:modelValueProvince"],
    methods: {
        async submit(){
            const key = this.KeyInputText!=="" ? this.KeyInputText : "key";
            const province = this.ProvinceInputText!=="" ? this.ProvinceInputText : "province";
            await this.jobStore.findByKey(key, province);
            this.$router.push({
                name: "job",
                query: {
                    key: key === "key" ? undefined : key,
                    location: province === "province" ? undefined : province
                }
            })
        }
    }
}
</script>