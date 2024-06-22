<script>
    import ImageIcon from "../lib/imageIcon.svelte";
    import SkillCard from "../lib/skillCard.svelte";
</script>


<section>
    <div class="flex items-center justify-center w-screen pb-60">
        <div class="float-left pt-80">
            <p class="text-amber-100 text-4xl">
                Hi!! , I'm
            </p>
            <h1 class="text-rose-600 text-5xl pl-20 pt-10 pb-14">
                Logan Henderson.
            </h1>
            <p class="text-amber-100 text-4xl">
                developer 🧑‍💻 | maker 🛠️ | amateur chef 🍳
            </p>
        </div>

        <div class="float-right pl-12 pt-60">
            <img src="/placeholder.jpg" class="rounded-3xl" alt=""/>
        </div>
    </div>

    <h1 class="pt-32 text-5xl text-amber-100 text-center">skills:</h1>

    <SkillCard>
        <img src="/python.png" alt="" slot="image">
        <h1 slot = "title">python:</h1>
        <p1 slot="skill-level">4 years of experience</p1>
        <p2>some completed projects:</p2><br/>
        <p2>&nbsp &nbsp circuit making bot</p2><br/>
        <p2>&nbsp &nbsp auto cloud back up using ss</p2><br/>
        <p2>&nbsp &nbsp multi threaded brute force control system solve</p2><br/>
    </SkillCard>

    <SkillCard>
        <img src="c.png" alt="" slot="image">
        <h1 slot="title">c/cpp:&nbsp</h1>
        <p1 slot="skill-level">intermediate to advanced</p1>
        <p2>A macro based result type</p2><br/>
        <p2>basic multithreading integrator</p2><br/>
        <p2>basic ray tracer in cpp</p2><br/>
        <p2>openGL 2.0 art galler</p2><br/>
    </SkillCard> 
    
    <SkillCard>
        <img src="zig.png" alt="" slot="image">
        <h1 slot="title">zig: &nbsp&nbsp</h1>
        <p1 slot="skill-level">intermediate to advanced</p1> 
        <p2>start of an openGL based game engine</p2><br/> 
        <p2>terminal based raytacer</p2><br/>
        <p2>a simple dft algrothim</p2><br/>
        <p2>a simd accelerated simd matrix/vector lib</p2><br/>
    </SkillCard> 

    <SkillCard>
        <img src="linux.png" alt="" slot="image">
        <h1 slot="title">linux:&nbsp</h1>
        <p1 slot="skill-level">intermediate</p1> 
        <p2>been using ubutnu on my laptop for 5 years now</p2><br/>
        <p2>dual booted my desktop with both arch and ubuntu</p2><br/>
        <p2>running a server with ubutnu on it for 3 years</p2><br/>
    </SkillCard> 

    <h2 class="pt-32 text-5xl pb-20 text-amber-100 text-center" >Other technologies I have experience with:</h2>
    <div class=" flex justify-center w-screen">
        <div class="bg-zinc-800 grid grid-cols-5 gap-8 h-auto w- auto-rows-auto flex-col px-4 py-4 rounded-2xl">
    
            <ImageIcon>
                <a href="https://www.rust-lang.org/">
                    <img src="/rust.png" alt=""/>
                </a>
            </ImageIcon>
            
            <ImageIcon>
                <a href="https://ecma-international.org/publications-and-standards/standards/ecma-262/">
                    <img src="/js.jpg" alt="">
                </a> 
            </ImageIcon>
            
            <ImageIcon>
                <a href="https://www.solidjs.com/">
                    <img src="/solidjs.svg" alt="">
                </a> 
            </ImageIcon>
            
            <ImageIcon>
                <a href="https://tailwindcss.com/">
                    <img src="/tailwinds.png" alt="">
                </a> 
            </ImageIcon>
            
            <ImageIcon>
                <a href="https://www.opengl.org/">
                    <img src="/opengl.png" alt="">
                </a> 
            </ImageIcon>
            
            <ImageIcon>
                <a href="https://www.java.com/">
                    <img src="/java.png" alt="">
                </a> 
            </ImageIcon>
            
            <ImageIcon>
                <a href="https://www.kicad.org/">
                    <img src="/kicad.png" alt="">
                </a> 
            </ImageIcon>
            
            <ImageIcon>
                <a href="https://www.altium.com/">
                    <img src="/altium.png" alt="">
                </a> 
            </ImageIcon>
            
            <ImageIcon>
                <a href="https://www.autodesk.com/products/fusion-360/overview?term=1-YEAR&tab=subscription">
                    <img src="/fusion360.png" alt="">
                </a>
            </ImageIcon>
            
            <ImageIcon>
                <a href="https://www.solidworks.com/">
                    <img src="/solidworks.png" alt="">
                </a> 
            </ImageIcon>
            
            <ImageIcon>
                <a href="https://www.cloudflare.com/">
                    <img src="/cloudflare.png" alt="">
                </a> 
            </ImageIcon>
            
            <ImageIcon>
                <a href="https://www.gnu.org/software/bash/">
                    <img src="/bash.png" alt="">
                </a> 
            </ImageIcon>
            
            <ImageIcon>
                <a href="https://learn.microsoft.com/en-us/powershell/scripting/overview?view=powershell-7.4">
                    <img src="/powershell.png" alt="">
                </a> 
            </ImageIcon>
            
            <ImageIcon>
                <a href="https://www.truenas.com/">
                    <img src="/truenas.png" alt="">
                </a> 
            </ImageIcon>
            
            <ImageIcon>
                <a href="https://www.docker.com/">
                    <img src="/docker.png" alt="">
                </a> 
            </ImageIcon>
            
            <ImageIcon>
                <a href="https://git-scm.com/">
                    <img src="/git.png" alt="">
                </a> 
            </ImageIcon>
            
            <ImageIcon>
                <a href="https://github.com/sirlilpanda">
                    <img src="/github.png" alt="">
                </a> 
            </ImageIcon>
            
            <ImageIcon>
                <a href="https://www.sdrpp.org/">
                    <img src="/sdrpp.png" alt="">
                </a> 
            </ImageIcon>
            
            <ImageIcon>
                <a href="https://www.gnuradio.org/">
                    <img src="/gnuradio.png" alt="">
                </a> 
            </ImageIcon>
            
            <ImageIcon>
                <a href="https://www.st.com/en/ecosystems/stm32cube">
                    <img src="/stm32_cube.png" alt="">
                </a>
            </ImageIcon>
    

        </div>
    </div>



    <div id="about_me" class="pt-32 text-5xl text-amber-100 text-center">about_me:</div>
    <div id="contact" class="pb-30 pt-32 text-5xl text-amber-100 text-center">like what you see contact me: </div>
    <div id="contact" class="pb-30 pt-32 text-5xl text-amber-100 text-center mb-64">me@sirlilpanda.studio</div>




</section>
    