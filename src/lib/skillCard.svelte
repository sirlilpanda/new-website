<div class="SkillCard mt-10 grid w-screen place-items-center">
    <div class="bg-zinc-800 rounded-2xl py-2 w-[1000px] shadow-inner flex ">
        
        <div class="my-auto">
            <slot name="image"/>
        </div>

        <div class="">
            <slot name="title"/>

            <div class="mt-1 rounded-full bg-lime-600 px-10 w-[570px] shadow-lg ml-20 float-right">
                <slot name="skill-level"/>
            </div>
            
            <div class="pt-10 pl-6">
                <slot/>
            </div>
        </div>
    </div>
</div>



<style lang="postcss">
    
    div :global(img){
        @apply
        max-h-28 
        px-5
        ;
    }

    div :global(h1){
        @apply
        text-2xl 
        text-rose-500 
        pt-1 
        float-left
        /* pr-10 */
        ;
    }

    div :global(p1){
        @apply
        text-2xl 
        text-amber-100  
        text-center
        ;
    }

    div :global(p2){
        @apply
        text-xl 
        text-amber-100
        ;
    }



</style>