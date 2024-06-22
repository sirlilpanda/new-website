<li class="NavUnit group">
    <div class=" bg-black w-0 pt-4 pb-1 group-hover:bg-black group-hover:w-full transition-all duration-200"/>
    <div class="">
        <slot class=""/>
    </div>
</li>


<style lang="postcss">
    li {
        @apply 
        inline-block 
        relative pr-7 bg-pink-500; 
    }
    div :global(span) {
        @apply 
        uppercase 
        text-xl 
        text-neutral-700 pt-4 
        bg-pink-500 group-hover:text-black
    }
</style>