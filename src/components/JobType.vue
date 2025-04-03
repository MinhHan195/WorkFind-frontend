<template>
    <div class="container">
        <div class="row">
            <div class= "px-1 col-2 job-type-button" @click="findJobWithType('Kế toán/Kiểm toán')">
                <div class="bg-info-subtle rounded-3 card-custom d-flex flex-column align-items-center pt-4">
                    <div class="rounded-circle border border-primary border-2 d-flex justify-content-center align-items-center" style="height: 150px; width: 150px;">
                        <img src="../assets/icon/1.svg" alt="" class="img-fluid">
                    </div>
                    <h4 class="text-center text-primary mt-3">Kế toán/Kiểm toán</h4>
                </div>
            </div>
            <div class="px-1 col-2 job-type-button" @click="findJobWithType('Nông nghiệp/Lâm nghiệp')">
                <div class="bg-info-subtle rounded-3 card-custom d-flex flex-column align-items-center pt-4">
                    <div class="rounded-circle border border-primary border-2 d-flex justify-content-center align-items-center" style="height: 150px; width: 150px;">
                        <img src="../assets/icon/3.svg" alt="" class="img-fluid">
                    </div>
                    <h4 class="text-center text-primary mt-3">Nông nghiệp/Lâm nghiệp</h4>
                </div>
            </div>
            <div class="px-1 col-2 job-type-button" @click="findJobWithType('Nghệ thuật/Thiết kế')">
                <div class="bg-info-subtle rounded-3 card-custom d-flex flex-column align-items-center pt-4">
                    <div class="rounded-circle border border-primary border-2 d-flex justify-content-center align-items-center" style="height: 150px; width: 150px;">
                        <img src="../assets/icon/4.svg" alt="" class="img-fluid">
                    </div>
                    <h4 class="text-center text-primary mt-3">Nghệ thuật/Thiết kế</h4>
                </div>
            </div>
            <div class="px-1 col-2 job-type-button" @click="findJobWithType('Ngân hàng/Chứng khoán')">
                <div class="bg-info-subtle rounded-3 card-custom d-flex flex-column align-items-center pt-4">
                    <div class="rounded-circle border border-primary border-2 d-flex justify-content-center align-items-center" style="height: 150px; width: 150px;">
                        <img src="../assets/icon/5.svg" alt="" class="img-fluid">
                    </div>
                    <h4 class="text-center text-primary mt-3">Ngân hàng/Chứng khoán</h4>
                </div>
            </div>
            <div class="px-1 col-2 job-type-button" @click="findJobWithType('Thư ký/Hành chánh')">
                <div class="bg-info-subtle rounded-3 card-custom d-flex flex-column align-items-center pt-4">
                    <div class="rounded-circle border border-primary border-2 d-flex justify-content-center align-items-center" style="height: 150px; width: 150px;">
                        <img src="../assets/icon/6.svg" alt="" class="img-fluid">
                    </div>
                    <h4 class="text-center text-primary mt-3">Thư ký/Hành chánh</h4>
                </div>
            </div>
            <div class="px-1 col-2 job-type-button" @click="findJobWithType('Xây dựng')">
                <div class="bg-info-subtle rounded-3 card-custom d-flex flex-column align-items-center pt-4">
                    <div class="rounded-circle border border-primary border-2 d-flex justify-content-center align-items-center" style="height: 150px; width: 150px;">
                        <img src="../assets/icon/8.svg" alt="" class="img-fluid">
                    </div>
                    <h4 class="text-center text-primary mt-3">Xây dựng</h4>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped   >
.card-custom{
    height: 280px;
}
img{
    height: 60%;
    width: 60%;
    object-fit: cover;
}

.job-type-button:hover{
    cursor: pointer;
}
</style>

<script>
export default {
    emits: ["findJobWithType"],
    methods: {
        findJobWithType(typeString){
            this.$emit("findJobWithType", typeString)
        }
    }
}
</script>