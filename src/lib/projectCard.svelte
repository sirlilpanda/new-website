<li class="ProjectCard group">
    <div class="">
        <slot></slot>
    </div>
</li>


<style lang="postcss">

    li {
        @apply
        inline-block 
        relative 
    }

    div :global(img) {
        @apply 
        m-[100px] 
        max-h-[300px] 
        w-auto 
        transition-all 
        rounded-xl
        duration-200 
        group-hover:m-[50px] 
        group-hover:blur-[8px] 
        group-hover:max-h-[400px]
        ;
    }

    div :global(p) {
        @apply 
        text-transparent 
        text-xs 
        p-0 
        absolute 
        blur-[2px] 
        top-1/2
        left-1/2
        transform-5050
        transition-all 
        duration-200
        group-hover:text-amber-100 
        group-hover:filter-none 
        group-hover:text-3xl
        ;
    }

</style>