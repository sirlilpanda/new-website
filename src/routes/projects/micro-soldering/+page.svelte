
<section class="flex items-center justify-center pb-10"> 
    <div class="max-w-[900px]">
    <h1 id="micro-soldering">micro soldering</h1>
    <p>my journy into micro soldering started with watching a video on the <a href="https://github.com/aspro648/KiCad/tree/master/projects/Attiny/AttinyChallengeMisery">AttinyChallengeMisery</a> where you must solder progressively smaller components form 0805(imperial) down to 01005. however i didnt think of trying my hand at anything like that till i saw a <a href="https://www.youtube.com/watch?v=2vpTYaDGmCs&amp;t=1451s">video from marco reps</a> soldering another soldering challenge the (uSMD)[<a href="https://github.com/arthurbenemann/usmd?tab=readme-ov-file">https://github.com/arthurbenemann/usmd?tab=readme-ov-file</a>]. this chanllenge envoles soldering:</p>
    <ul>
    <li>x10 10000PF 008004 capacitors</li>
    <li>x1 2SMD LED</li>
    <li>x1 1k 01005 resistor</li>
    <li>x1 10M 01005 resistor</li>
    <li>x1 3MHZ 8-USMD 555 timer (BGA)</li>
    </ul>
    <p>needless to say that this is not the easiest thing to do. the 008004 capacitors are 0.25×0.125mm. here is an image of one next to a human hair:</p>
    <p>
    </p>
    <div class="flex items-center justify-center">
        <img src="/micro/08004_and_hair.jpg" alt="alt text">
    </div>
    <p>so as you can see (or not in this case) they are incredibly small, and 10 of these have to be soldered. luckily there are only 2 01005 resistor that need soldering, but even those these are larger then the caps they are still tiny as fuck. the LED that needs soldering just like the 555 timer has its pads underneath because they want us to feel pain in this project. lastly the 555 time is in a bare die package which is admittedly quite cool to look at, although there are 8 BGA balls on it so impossible to solder with an iron.
    
        <img src="/micro/image.png" alt="alt text">
    picture of the 555 timer very pretty.</p>
    <h2 id="the-setup">the setup</h2>
    <p>as you can tell since i have taken on this challenge i am definitely not in the right state of mind.
    below is an image of the size comparison of the tools i am using. in the top left is the solder roll just underneath that is 1 fork of my tweezers and lastly at the bottom is the tip of my soldering iron. And unlike marco reps in his video where he used brand new <a href="https://www.jbctools.com/">JBC soldering equipment</a> i dont have $10k to spend on new equipment, so i bought a $300 dollar microscope form jaycar a brand new set of tip for my <a href="https://www.aliexpress.com/item/1005006427194224.html?spm=a2g0o.productlist.main.5.367f22a6ioxJqh&amp;algo_pvid=f73c0b15-032a-4af1-882b-b4713f0efebf&amp;algo_exp_id=f73c0b15-032a-4af1-882b-b4713f0efebf-2&amp;pdp_npi=4%40dis%21NZD%21131.91%2160.05%21%21%2179.18%2136.05%21%40210307c017191470943688199e6f2a%2112000037128419911%21sea%21NZ%212538725004%21&amp;curPageLogUid=LseGb0C6mmki&amp;utparam-url=scene%3Asearch%7Cquery_from%3A">$40 indirect heat soldering iron from aliexpress</a> and a $10 set of tweezers form aliexpress. so as you can see only the highest quality of tools.
</p>
    <div class="flex items-center justify-center">
        <img src="/micro/image-4.png" alt="alt text">
    </div>
    <p>below is the setup i was working at. it is the roll of solder i was using masking taped the lid of my PCB cleaner can which was then kapton taped to a another pcb and finally the uSMD PCB was bluetacked to the PCB. this set up was done as the PCB had to be very close to the microscope to be able to see anything as well also needing to be that high up in order to not be sitting like a shrimp with my back fully curled up.
    </p>
    
    <div class="flex items-center justify-center">
        <img src="/micro/image-1.png" alt="alt text">
    </div>
    
        <h1 id="the-process">the process</h1>
    <p>i first started this project by soldering on the 555 timer, and as i dont have an oven or a tip large enough to make a little hot plate, i instead deicide on hot air. so to solder it on i applied a liberal amount of flux to the PCB placed the 555 timer on top, then not holding the 555 timer but pushing down on it with my tweezers and blasting it with hot air. i surprisingly only lost 1 555 timer this way, however this was the easy part. The hard part as expected was the 008004, for these i tinned one pad then did the ungodly sin of painting solder on the other side. i did this painting technique as my soldering iron was not small enough to get right to the pad so my rational was. if i just coating that side in in a molten blob of solder some solder would stick to the pad and the capacitor. for the most part this technique worked although there were some losses, i.e. &gt; 50%. but that was mainly because i couldnt fucking see them when i took them out of the package.</p>
    <p>here is the final image of the soldering, that big bridge at the top was from me attempting to coat the board in uv resin to protect it. but after trying it on that capacitor i didnt like how it turned out so i slowly removed it and with removing it i took some of the trace and capacitor with it. so i had to scrape back some of the solder mask and attempt to make a long enough bridge of solder from that to the capacitor.
    </p>
        <div class="flex items-center justify-center">
        <img src="/micro/image-5.png" alt="alt text">
    </div>
    <p>and here is the video of it working, with appropriate language from managing to solder everything correctly.
    </p>
    <div class="flex items-center justify-center">
        <img src="/micro/Snapchat-1421693696.gif" alt="alt text">
    </div>
    
    <h1 id="conclusion">conclusion</h1>
    <p>over all i think this challenge is not for everyone but it was a really good test of my steadiness as well a great way to get bragging rights over your friends.</p>
</div>
    
</section>


<style lang="postcss">

ul {
    @apply
    pl-10
    pt-0
    mt-0
    list-disc
    ;
}

li {
    @apply
    text-lg
    text-amber-100 
    pt-3
    pl-2
    max-w-[1100px]
    text-justify 
    text-wrap
    ;
}

h1 {
    @apply
    text-3xl text-amber-200 text-center mx-auto pt-3
    ;
}

h2 {
    @apply
    text-2xl text-amber-200 mx-auto  pt-3
    ;
}

p {
    @apply
    text-lg
    text-amber-100 
    pt-5
    max-w-[1100px]
    text-justify 
    ;
}

svg {
    @apply
    text-2xl
    mb-5    
    text-amber-100 
    max-w-[1100px]
    text-center
    ;
}
img {
    @apply
    rounded-xl
    pt-4
}

</style>