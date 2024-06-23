<section class="flex items-center justify-center pb-32 pt-10">
    <div class="max-w-[900px]">

        <h1 id="c-result-type">C result type</h1>
        <p>the c result type was made as i wanted better error handling in c than always having to write:</p>
    <div class="bg-zinc-800 rounded-2xl mt-3 mx-32">
        <pre><code class="lang-c"><span class="hljs-keyword">
            if</span> (func_that_could_error(__VA_ARGS) == -<span class="hljs-number">1</span>)&lbrace;
                perror(ERROR_MESSAGE);
                <span class="hljs-keyword">exit</span>(ERROR_CODE);     
            &rbrace;
        </code></pre>
</div>
<p>This type of error handling does definitely work, and i can see why it was implemented this way. although this type of error handling tends to lead to just stopping the program, or even worst not handling the error when it appears causing something to break later on. But we have had years to refine error handling and something more like rusts version of error handle just feels better for a modern time forcing the user to deal with error as they appear (yes i know you can just .unwrap and not give a shit but lets assume you have to deal with the error). But i will admit the initial learning curve of rusts robust error handle system is at times annoying. although i believe it to be one of the better implementations of it.</p>
        <p>however this error handling system needs the use of generic typing since you dont know what OK type the error has. this would be an easy fix in the vast majority of languages just throw in you generic type syntax or dont even worry about it in dynamic languages. but c does not a syntax for creating generic type, so we must create our own using both the best and worst thing in the world the c pre processor. for its time c pre processor was an amazing way for implementing meta programming, however it has become a convoluted mess of string manipulation and type unsafety. some of this problems have been addressed over the years such as type unsafety by implementing the __auto_type operator for creating macros. however its still a dangerous beast that can fuck up your entire code with one little mistake that can take hours to fix.
            Although all of this are in contrast to the power the pre processor has and with this power comes little responsibility.</p>
            <h1 id="implementation">implementation</h1>
            <h2 id="defining-the-syntax">defining the syntax</h2>
            <p>so finally starting with how i implemented with result type as a pre processor macro. firstly the best thing to do is determent how you think the macro should be used, like you might make a really cool macro but people will be discouraged to use it if it makes no sense. however in every macro there will be some fuckary that needs to be done in order to make it work. so this is the kinda of syntax i wanted for the macro.</p>
<div class="bg-zinc-800 rounded-2xl mx-14 mt-3">
            <pre><code class="lang-c">
    <span class="hljs-keyword">typedef</span> <span class="hljs-keyword">enum</span> numberAddingErrors_s&lbrace;
        NUMBERS_NOT_EVEN,
    &rbrace;numberAddingErrors_t;

    <span class="hljs-function"><span class="hljs-keyword">typedef</span> <span class="hljs-title">Result_t</span><span class="hljs-params">(<span class="hljs-keyword">int</span>, numberAddingErrors_t, Result_type_t)</span></span>;

    <span class="hljs-function">Result_type_t <span class="hljs-title">add_even_nums</span><span class="hljs-params">(<span class="hljs-keyword">int</span> num1, <span class="hljs-keyword">int</span> num2)</span></span>&lbrace;
        <span class="hljs-keyword">if</span> (num1%<span class="hljs-number">2</span> == <span class="hljs-number">0</span> &amp;&amp; num2%<span class="hljs-number">2</span> == <span class="hljs-number">0</span>)&lbrace;
            <span class="hljs-keyword">int</span> num3 = num1+num2;
            Result_type_t_Ok(num3);
        &rbrace;<span class="hljs-keyword">else</span> &lbrace;
            Result_type_t_error(NUMBERS_NOT_EVEN);
        &rbrace;
    &rbrace;

    <span class="hljs-function"><span class="hljs-keyword">int</span> <span class="hljs-title">main</span><span class="hljs-params">(<span class="hljs-keyword">int</span> argc, <span class="hljs-keyword">char</span> <span class="hljs-keyword">const</span> *argv[])</span></span>&lbrace;
        <span class="hljs-keyword">int</span> n1 = <span class="hljs-number">4</span>;
        <span class="hljs-keyword">int</span> n2 = <span class="hljs-number">5</span>;
        Result_type_t answer = add_even_nums(n1, n2);
        <span class="hljs-keyword">int</span> a = Result_type_t_unwrap(answer);
        <span class="hljs-built_in">printf</span>(<span class="hljs-string">"%d\n"</span>, a);
        <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
    &rbrace;
        </code></pre>
</div>
        <p>so you first must define a error type here defined as <code>numberAddingErrors_t</code> as an enum. This is so i can have a ton of errors for each type but also doesnt need to be an enum it could be something like another struct so if something errors you know there is an error but it gives you the error struct just incase you can recover from this state.</p>
        <p>the <code>typedef</code> defines what the error type is, the first argument of <code>Result_t</code> is the ok type, the next is the error type and finally is what the Result type should be called, since you will want more then one error type.</p>
        <p>within the function that can error here <code>add_even_nums</code> that will error when both numbers arnt even. you can see a kind of more literal from of <a href="https://en.wikipedia.org/wiki/Hungarian_notation">hungarian notation</a> where the type of the function prefixes the name of the function. this was done again to differentiate between each error type</p>
        <h2 id="implementing-the-syntax">implementing the syntax</h2>
        <p>finally the actually implementation of the macros the implement this</p>
        
<div class="bg-zinc-800 rounded-2xl mt-3">
        <pre><code class="lang-c">
    #define <span class="hljs-type">Result_t_type</span>(ok_<span class="hljs-keyword">type</span>, error_type, <span class="hljs-keyword">type</span>)\
        struct <span class="hljs-type">Result_t</span> &lbrace;\
        union <span class="hljs-type">Data_U</span>&lbrace;ok_<span class="hljs-keyword">type</span> ok; error_type error;&rbrace; data;\
        _Bool has_errored;\
    &rbrace; <span class="hljs-keyword">type</span>;\

    #define <span class="hljs-type">Result_t_funcs</span>(ok_<span class="hljs-keyword">type</span>, error_type, <span class="hljs-keyword">type</span>)\
    <span class="hljs-keyword">type</span> <span class="hljs-keyword">type</span>##_Ok(ok_type ok)&lbrace;return (type) &lbrace;ok, 0&rbrace;;&rbrace;;\
    <span class="hljs-keyword">type</span> <span class="hljs-keyword">type</span>##_Error(error_type error)&lbrace;return (type) &lbrace;error, 1&rbrace;;&rbrace;;\
    ok_<span class="hljs-keyword">type</span> <span class="hljs-keyword">type</span>##_unwrap(type result)&lbrace;if (!result.has_errored) &lbrace;return result.data.ok;&rbrace; exit(1);&rbrace;\
    ok_<span class="hljs-keyword">type</span> <span class="hljs-keyword">type</span>##_unwrapor(type result, ok_type or)&lbrace; \
    if (!result.has_errored) &lbrace;return result.data.ok;&rbrace; return or;&rbrace;

    //you must call this with a <span class="hljs-keyword">type</span> def to avoid complier checks
    #define <span class="hljs-type">Result_t</span>(ok_<span class="hljs-keyword">type</span>, error_type, <span class="hljs-keyword">type</span>)\
    <span class="hljs-type">Result_t_type</span>(ok_<span class="hljs-keyword">type</span>, error_type, <span class="hljs-keyword">type</span>)\
    <span class="hljs-type">Result_t_funcs</span>(ok_<span class="hljs-keyword">type</span>, error_type, <span class="hljs-keyword">type</span>)\
        </code></pre>
</div>
    <p>something within this code you might not have seen before is the <a href="https://gcc.gnu.org/onlinedocs/cpp/Concatenation.html">##</a> operator. this operator basically combines two tokens in to one after macro expansion have been done.</p>
    <p>the first macro defined here is the <code>Result_t_type</code> defined the structure of the result type. this uses a union of both the ok and error type to as these will more then likely be 2 different types and it would just be wasteful having space in the struct for each of the types at the same time as well as this data being mutually exclusive. the only other thing in here is a Bool to tell if the result has errored.</p>
    <p>the second macro defined <code>Result_t_funcs</code> defines all the functions that the result type implements this also allows for more generalized functions to be added. there are 4 mostly self explanatory functions here.</p>
    <ul>
        <li><code>type type##_Ok</code>: use this if all your code didnt error</li>
        <li><code>type type##_Error</code> : use this if your code did error</li>
        <li><code>ok_type type##_unwrap</code> : assumes the states of the result is ok and gives the data, if not it exits the program with an error</li>
        <li><code>ok_type type##_unwrapor</code> : will attempt to unwrap the result type and if it has an error then it will default to the or arg</li>
    </ul>
    <p>lastly the <code>Result_t</code> macro combines these 2 macros together. however you maybe be looking at this code and thinking you have defined <code>Result_t</code> in 2 places the struct and the macro. well due to the c pre processor not allowing recursive macros (pussies), the <code>Result_t</code> as defined within the struct does not actually get counted as a macro call.</p>
    <h1 id="results">results</h1>
    <p>running this code with <code>n1 = 4</code> and <code>n2 = 2</code> gives the following output:</p>
<div class="bg-zinc-800 rounded-2xl mt-3">
    <pre><code class="lang-sh">
    $ gcc temp<span class="hljs-selector-class">.c</span> &amp;&amp; ./<span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.out</span>
    <span class="hljs-number">6</span>
    $
    </code></pre>
</div>
<p>and then again running this code with <code>n1 = 4</code> and <code>n2 = 3</code> gives the following output:</p>
<div class="bg-zinc-800 rounded-2xl mt-3">
<pre><code class="lang-sh">
    $ gcc temp<span class="hljs-selector-class">.c</span> &amp;&amp; ./<span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.out</span>
    $

</code></pre>
</div>
<p>although not extensive tests it shows the basic principal of the code working </p>
    <h1 id="conclusion">conclusion</h1>
    <p>this endeavor in to creating an appropriate replacement to the current c error handling works nicely. however this could benefit from some more extensive testing as well as some more unwrapping functions. for future improvement to this code i will be adding in more variations of the the unwrap function, changing the has_error to an error value so i can implement warns and other lesser errors.
        but overall it worked as i wanted it and i will probably continue to use it in the future. </p>
        <p>the git repo link can be found <a href="https://github.com/sirlilpanda/c-results-type">here</a>.</p>
        
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

code {
    @apply
    text-amber-100
}

</style>