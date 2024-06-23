
<section>

    <div class="flex items-center justify-center ">
        <div class = "max-w-[900px]">
            <h1 class="text-6xl text-yellow-100 text-center">terminal graphics:</h1>
            <p class="text-2xl text-yellow-100 pt-10 w-[800px] text-justify">
                As i tend to utilized the terminal as an output for my code projects over
                using a more conventional GUI, even though during the process of building
                this website i have seen just how easy it is to make a nice looking GUI
                using just a bit of html and css. But that is besides the point, if i can
                complie, run, and check the output of my code in a aesthetically pleasing
                way all from the terminal that is the way i would perfer to do it.
            </p>

            <p class="text-2xl text-yellow-100 pt-10 w-[800px] text-justify">
                therefor i started looking in to how to colour text in the terminal and
                how to actually clear the terminal screen (there was so many stackoverflow
                posts that just said to print out 30 newlines and call it a day), those were 
                the 2 big goals of this project(and it admittedly got a bit out of hand) with
                a lesser goal of this but still a key one to try and accomplish was to port
                this library over to python
            </p>

            <p class="text-2xl text-yellow-100 pt-10 w-[800px] text-justify">
                this library is written is rust, although i did think of writing it in
                python i felt like it needed to be slightly more portable then that, mainly
                so i could attempt to port this to any other languague i would be using(even
                though getting this rust code to communicate with python is already a
                nightmare). The other reason i chose rust was it was low level and fast
                as well as being memeory safe
            </p>

            <p class="text-2xl text-yellow-100 pt-10 w-[800px] text-justify">
                to start this library the first thing i wanted to try to do was make a 
                checker board pattern with black and pink, as this would help me to make
                sure that my background and foreground colours were the right way around.
                And after a little bit of code i was able to achive this
            </p>

            <div class="pt-20">
                <img src="\terminal_graphic_example_1.png" class="ml-[275px] max-w-full h-auto rounded-3xl">
            </div>
            <p class="text-xl text-yellow-100 text-center">output from the first test</p>

            <p class="text-2xl text-yellow-100 pt-10 w-[800px] text-justify">
                Ok its admittedly slightly underwhelming but its a start. the next step i
                decided to do was a little off track, but it was to extract the rgb values
                from an image and have it print that to the terminal. And these results wernt
                too bad.
            </p>

            <div class="pt-20">
                <img src="\images\terminal_graphic_example_2.png" class="ml-[150px] w-[500px] h-auto rounded-3xl">
            </div>
            <p class="text-xl text-yellow-100 text-center">output from the second test</p>
            
            <p class="text-2xl text-yellow-100 pt-10 w-[800px] text-justify">
                then i realised if i just keep showing more images i can show a full video in the terminal
                using this and yes, you have guessed correctly. Next i decided to try to play a full video in
                the terminal and what video may you ask have a watch for yourself

            </p>
            
            <div class="pl-32 pt-10">
                <blockquote class="imgur-embed-pub" lang="en" data-id="a/7yCcKU9" data-context="false" ><a href="//imgur.com/a/7yCcKU9"></a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>
            </div>
            
            <p class="text-2xl text-yellow-100 pt-10 w-[800px] text-justify">
                since that small bit of fun, ive have been implmenting the coloured strings structs
                and possibly some sprite stuff so i can try out how some in terminal game dev
            </p>
            
            

            <p class="text-2xl text-yellow-100 pt-10 w-[800px] text-justify">
                all source code of this bot can be found on my github <a class="text-blue-700"href="https://github.com/sirlilpanda/terminal_graphics">here</a>
            </p>
        </div>
    </div>
</section>