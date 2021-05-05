<template>
<div id="basic-card" class="container">
    <div class="row">
        <div class="col-md-5 mx-auto">
            <div class="card position-relative top-50 " style="  transform:translate(0%, -25%);">
                <div class="card-body">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props : ['mode'],
}
</script>