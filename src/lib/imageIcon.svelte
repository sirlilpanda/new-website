<div class="ImageIcon">
    <slot/>
</div>

<style lang="postcss">

    div :global(img){
        @apply
        object-scale-down 
        h-32 
        w-32 
        rounded-xl
        ;
    }
</style>