<section class="flex items-center justify-center">
    <div class="max-w-[900px]">
        <h1 id="game-engine">Game engine</h1>
        <p>This game engine was developed for 2 main reasons, the first one was none of the game engines/frameworks on the market were that fast or were written in a horrible language like c++ or rust and wanting to create something myself. This was project was start after I finished my computer graphics course at uni. I wanted to explore more rendering techniques and just try to utilise all the knowledge I gathered from the course into a project.</p>
        <h3 id="if-you-want-to-skip-to-a-specific-part-">If you want to skip to a specific part:</h3>
        <h1 id="language-choice">Language choice</h1>
        <p>This game engine was written in zig, why? Because:</p>
        <ul>
        <li>C requires me to use some build system like cmake or just straight up makefiles. But c does allow me to do the meta programming shenanigans that I like.</li>
        <li>Rust would require me to fight with the borrow checker the annoying rat, but does have a nice build system and great language features that would make it trivial to implement some of the features, but I felt like this project isn’t the type of thing that would benefit from rusts amazing error handling and memory safety</li>
        <li>C++, I have only one word for why I wont use it “overloading”</li>
        <li>Python, i have a lot of experience with this language but I believe it has little to no support for low level OpenGL calls, as well as being slow</li>
        <li>Java, as much as I have come to respect java for the language that it, I still despise OOP with a passion even if it makes complete sense for OpenGL</li>
        <li>Odin a very cool language for computer graphics with inbuilt quaternion types and matrixes, with amazing support for graphic libraries its just a little too new for me, having to compile it from scratch, but might be an idea to use in the future (but I still don’t like its use of the proc keyword for functions, a procedure is something completely different to a function)</li>
        </ul>
        <p>So with why I did pick zig over basically every other language. Well the zig comptime keyword allows me to do the fun metaprogramming shenanigans that I love. As well as the zig having the best mascot (maybe except for V lang). zig also has some really cool features like allocators arnt global and you must pass them when every trying to add to the heap (great for embedded), it has oop in a sense but no inheritance (v tables arnt real and cant hurt me). As well as zig having quite honestly the best thing a very clean abstraction on SIMD instruction with the Vector type. Zig also has this amazing unit test system build into the language so you don’t have to have another dir called tests that just mirrors the main one, instead you can just write all your tests at the bottom of the file. All of these combined with a little personal bias made me picked zig.</p>
        <h1 id="windowing-and-graphics-libraries">Windowing and graphics libraries</h1>
        <p>Zig maybe be a really cool language with a great build system but it does currently lack something, a vast mature set of libraries (and documentation in some cases).  This meant that only really low-level things were exposed, since zig integration with the c ABI allows for the large library projects like glfw, sdl, etc. to be ported easy. For this project I choose OpenGL as that is what my computer graphics course used and that being the one I had experience in, although I did also look at vulkan and decided not to due to the shear quantity of boiler plate and some of the strange dynamic linking with function pointers and wrappers that vulkan-zig uses. However in the future I would like to try vulkan again so I can abuse more threads in my program as well as try a openXR for VR applications.
        For this project I originally wanted to use SDL 2 for it being used within valves games as well as having the bare minimum of calls to implement things, so I could write my own subsystems. However when trying to get the opengl context to use with SDL2, it would not work no matter what I did, therefor I reverted back to GLFW, still has all the same features as SDL2 but sightly more bloat as I see it.</p>
        <h1 id="the-math">The math</h1>
        <p>So after starting rendering the obligatory triangle I realized that, I now need matrix/vector math to actually start to render 3D objects. Luckly I already had a file full of vector math from one of my previous projects writing a ray tracer in zig. </p>
        <h2 id="vectors">Vectors</h2>
        <p>This vector math was all done the normal way with struct that as 3 values, but zig has the inbuilt vector type that could easily be handle all these vector functions.</p>
        <div class="bg-zinc-800 rounded-2xl mx-14 mt-3 pt-5">
        <pre><code class="lang-ts text-amber-100">        <span class="hljs-function"><span class="hljs-keyword">pub fn</span> <span class="hljs-built_in">Vec</span><span class="hljs-params">(comptime length: comptime_int)</span> <span class="hljs-built_in">type</span> &#123;
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">struct</span> &#123;
                <span class="hljs-title">const</span> <span class="hljs-title">Self</span> = @This<span class="hljs-params">()</span></span>;
                <span class="hljs-built_in">vec</span>: <span class="hljs-keyword">@Vector(length, f32),
        </span>}
        </code></pre>
        </div>

        <p>Snippet of the vector type</p>
        <p>This is a very thin abstraction the on the vector type that implements all your common operations, Add, sub, mul, div, norm, scale, etc. as well as a possibility to add 3 more for raytracing applications reflect, refract and a less common but really cool one reflectance for computing how things would bounce off water on a large scale.
        Comparing this new fancy vectorised one to the old slow vector struct running each test 200 times to get a clearer image of how long it took.</p>
        <p><img src="/game-engine/image.png" alt="alt text">
        Graph of time comparison</p>
        <p>we can see all the functions are greatly faster other than the obvious ones. However min and dot were pretty similar. my guess for this is it got optimised down to near enough the same code. The len functions are the same but that’s to be expected. now on to the outlier’s norm and scale. These were computed on a vector length of 3, I believe this played a keyfactor within why they were slow.</p>
        <div class="bg-zinc-800 rounded-2xl mx-14 mt-3 pt-5">
            <pre><code class="lang-ts text-amber-100">        <span class="hljs-keyword">pub</span> <span class="hljs-function"><span class="hljs-keyword">fn</span> <span class="hljs-title">mag</span></span>(a: <span class="hljs-keyword">Self</span>) <span class="hljs-keyword">f32</span> &#123;
            <span class="hljs-keyword">return</span> @sqrt(@reduce(.Add, a.vec * a.vec));
        }

        <span class="hljs-keyword">pub</span> <span class="hljs-function"><span class="hljs-keyword">fn</span> <span class="hljs-title">norm</span></span>(a: <span class="hljs-keyword">Self</span>) <span class="hljs-keyword">Self</span> &#123;
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">Self</span>&#123; .vec = a.vec / number(a.mag()).vec };
        }

        <span class="hljs-keyword">pub</span> <span class="hljs-function"><span class="hljs-keyword">fn</span> <span class="hljs-title">scale</span></span>(a: <span class="hljs-keyword">Self</span>, b: <span class="hljs-keyword">f32</span>) <span class="hljs-keyword">Self</span> &#123;
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">Self</span>&#123; .vec = a.vec * number(b).vec };
        }
            </code></pre>
        </div>
        <p>Vectorized norm and scale code</p>
        <div class="bg-zinc-800 rounded-2xl mx-14 mt-3 pt-5">
        <pre><code class="lang-ts text-amber-100">    <span class="hljs-keyword">pub</span> <span class="hljs-function"><span class="hljs-keyword">fn</span> <span class="hljs-title">scale</span></span>(a: <span class="hljs-keyword">Self</span>, b: T) <span class="hljs-keyword">Self</span> &#123;
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">Self</span>&#123;
            .x = a.x * b,
            .y = a.y * b,
            .z = a.z * b,
        };
    }
    <span class="hljs-comment">// len here is mag</span>
    <span class="hljs-keyword">pub</span> <span class="hljs-function"><span class="hljs-keyword">fn</span> <span class="hljs-title">norm</span></span>(a: <span class="hljs-keyword">Self</span>) <span class="hljs-keyword">Self</span> &#123;
        <span class="hljs-keyword">const</span> den: T = len(a);
        <span class="hljs-keyword">return</span> a.scale(<span class="hljs-number">1</span> / den);
    }
        </code></pre>
        </div>

        <p>Non Vectorized code</p>
        <p>as you can see in the vectorize  code within norm, the first step that is done is to compute the magnitude of the vector, this as we saw in the graph took about the same time as the normal magnitude code, but then it is required to do another vector operation on top of that, as well needing to creating an entirely new vector from this number inorder to scale the rest, I believe this creation of the new vector is causing the largest slow down within this code. The scale function also suffers the same problem if I have to guess, creating a new vector within the code before doing the operation.
        However, this vector math code is still vastly faster than the original slow vector math, as well as being able to take full advantage of SIMD vectors, for when I want create vectors of arbitrary length</p>
        <h2 id="matrix-math">Matrix math</h2>
        <p>Now on to the good stuff, vector math is easy and only really has the basic operations to it, but matrix math has the good stuff in it, and the most potential for improvement.
        The matrix struct in the code much like the vector code, is a very thin wrapper on a vector. Although my matrix code differs from other peoples implementation as instead of using an array of vector for either each row or col I choose to use 1 long vector, this was done to make the addition of matrixes to each other simpler as well as giving rise to some interesting code.</p>
        <div class="bg-zinc-800 rounded-2xl mx-14 mt-5 pt-5">
        <pre><code class="lang-ts text-amber-100">        <span class="hljs-keyword">pub</span> <span class="hljs-keyword">const</span> Mat3x3 = <span class="hljs-class"><span class="hljs-keyword">struct</span> &#123;</span>
            <span class="hljs-keyword">const</span> <span class="hljs-keyword">Self</span> = @This();
            vec: @Vector(<span class="hljs-number">9</span>, <span class="hljs-keyword">f32</span>),
        }
    </code></pre>
</div>
        <p>Snippet of the matrix type</p>
        <p>The 3x3 matrix type implements most of the common operations, such as identity, mul and transpose. But as this is a game engine, we don’t care that much about the 3x3 matrix we care more about the 4x4 matrixes. These matrixes are implemented the same way but with a vector of 16 instead of 9. Now I will be explaining each function as my method of implementing them is unique and fully abuses the power of the abstraction of SIMD vectors.</p>
        <h3 id="matrix-multiplication">Matrix multiplication</h3>
        <p>Lets start out with the bread and butter of a matrix math library, the most common operation and therefor the one that needs to be the fastest. Most implementation of this rely on the matrix already being separated in to rows/col for easy indexing for calculating the dot product like seen in the zig mach engine, but as my matrix only has one vector, this wasn’t going work. Therefor after some thinking my idea was to compute the all the multiplication and additions of the dot products in one go, this technique would allow the code to use larger SIMD vector like seen in SSE4 which my cpu supports (no I did not know this at the time).
        So the first step of the matrix mul is to compute the dot product of each row vector from matrix A and with each col vector from matrix B, if it is within the form of</p>
        <p>C = A*B</p>
        <p>Now if we look at the first item of C i.e. C0, 0:</p>
        <p>C[0,0]=A[0,0]B[0,0]+A[0,1]B[1,0]+A[0,2]B[0,2]+A[0,3]B[0,3]</p>
        <p>And if we look at C1, 0:
        C[1,0]=A[1,0]B[0,0]+A[1,1]B[1,0]+A[1,2]B[0,2]+A[1,3]B[0,3]</p>
        <p>We can see that the elements of B do not change, so to calculate the first col of C we can copy B 4 times for each row of A which if we write it out in a slight nicer method, and by method I mean using a table:</p>
        <table>
        <thead>
        <tr>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td>A[0, 0]</td>
        <td>A[0, 1]</td>
        <td>A[0, 2]</td>
        <td>A[0, 3]</td>
        <td>A[1, 0]</td>
        <td>A[1, 1]</td>
        <td>A[1, 2]</td>
        <td>A[1, 3]</td>
        <td>A[2, 0]</td>
        <td>A[2, 1]</td>
        <td>A[2, 2]</td>
        <td>A[2, 3]</td>
        <td>A[3, 0]</td>
        <td>A[3, 1]</td>
        <td>A[3, 2]</td>
        <td>A[3, 3]</td>
        </tr>
        <tr>
        <td>B[0, 0]</td>
        <td>B[0, 1]</td>
        <td>B[0, 2]</td>
        <td>B[0, 3]</td>
        <td>B[0, 0]</td>
        <td>B[0, 1]</td>
        <td>B[0, 2]</td>
        <td>B[0, 3]</td>
        <td>B[0, 0]</td>
        <td>B[0, 1]</td>
        <td>B[0, 2]</td>
        <td>B[0, 3]</td>
        <td>B[0, 0]</td>
        <td>B[0, 1]</td>
        <td>B[0, 2]</td>
        <td>B[0, 3]</td>
        </tr>
        <tr>
        <td>C[0,0]_0</td>
        <td>C[0,0]_1</td>
        <td>C[0,0]_2</td>
        <td>C[0,0]_3</td>
        <td>C[1,0]_0</td>
        <td>C[1,0]_1</td>
        <td>C[1,0]_2</td>
        <td>C[1,0]_3</td>
        <td>C[2,0]_0</td>
        <td>C[2,0]_1</td>
        <td>C[2,0]_2</td>
        <td>C[2,0]_3</td>
        <td>C[3,0]_0</td>
        <td>C[3,0]_1</td>
        <td>C[3,0]_2</td>
        <td>C[3,0]_3</td>
        </tr>
        </tbody>
        </table>
        <p>And the dot product of the C at the index [i, j] being the:</p>
        <p>C\left[i,j\right]=\Sigma C\left[i,j\right]_w</p>
        <p>Or rewriting it in the form as before:
        C[0,0]=A[0,0]B[0,0]+A[0,1]B[1,0]+A[0,2]B[0,2]+A[0,3]B[0,3] = <br>
        C[0,0]<sub>0</sub> + C[0,0]<sub>1</sub> + C[0,0]<sub>2</sub> + C[0,0]<sub>3</sub> </p>
        <p>For sake of space I wont write out the full thing since its 64 items longs but you get the drift, just you can expand out all the multiplication of all the dot products within the matrix mul, and this is how you get the 2 large 64 long masks as you can see in the mat mul function [here].</p>
        <p>now that we have done all the multiplications we now actually need to do the summing of all these dot products. A sane person may extract them out then reduce them in their own vectors, however I am not sane, and since we already have them in the vector format we may as well keep them there. Therefor the dot product is done in vaguely the same way as the mul step,  all at once or as close as we can. So this time we align all C\left[i,j\right]_w indexes to each other so in 4 different vectors C[0, 0]0 , C[0, 0]1 , C[0, 0]2 , C[0, 0]3 will all be at index 0 in all 4 vectors, looking at this using the same table method as before:</p>
        <table>
        <thead>
        <tr>
        <th></th>
        <th></th>
        <th>...</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <td>C[0,0]_0</td>
        <td>C[1,0]_0</td>
        <td>...</td>
        </tr>
        <tr>
        <td>C[0,0]_1</td>
        <td>C[1,0]_1</td>
        <td>...</td>
        </tr>
        <tr>
        <td>C[0,0]_2</td>
        <td>C[1,0]_2</td>
        <td>...</td>
        </tr>
        <tr>
        <td>C[0,0]_3</td>
        <td>C[1,0]_3</td>
        <td>...</td>
        </tr>
        </tbody>
        </table>
        <p>then you just add all 4 of these vectors together and get all the dot products of all the values in the right indexes.
        Now this idea does sound slightly on the insane side, but comparing it with a conventional matrix mul as can be seen below we can see that this is ~50x faster than the normal matrix mul. However I believe the vast majority of this speed up is from the fact my CPU has [sse4] which will allow for the full computation of the 64 mul step to be done at once rather than break it up like cpus that don’t have the full sse instructing set will do.
        <img src="/game-engine/image-1.png" alt="alt text"></p>

            <h1 class="text-6xl text-yellow-100 text-center pt-20">if the formatting looks strange or eqs not displaying, im still currently writing this</h1>
            <p class="text-2xl text-yellow-100 pt-10 text-center mb-10"> 
                but you can check out the code <a class="text-blue-700 underline" href="https://github.com/sirlilpanda/game-engine">here</a>
            </p>
</div>
</section>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/base16-gruvbox-dark-medium.css">
<style lang="postcss">
ul {
    @apply
    pl-10
    pt-0
    mt-0
    list-disc
    ;
}
table {
    @apply
    text-amber-100
}
td {
    @apply
    pr-2
}

li {
    @apply
    text-lg
    text-amber-100 
    pt-1
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
}

</style>