<script>
  import "../app.css";
  import NavUnit from "../lib/navUnit.svelte"
</script>

<nav class="bg-sky-800">
    <header class="bg-pink-500 after:content rounded-lg">
        <div class="pb-16 md:px-0">
        <a href="/">
            <h1 class="text-4xl px-3 pt-3 float-left bg-pink-500">Sir lil Pandas</h1>
        </a>
        <nav class="float-right md:relative md:flex md:p-0 md:bg-transparent md:flex-row md:space-x-6">
            <ul class="mx-0 px-7 bg-pink-500">
            <NavUnit>
                <a href="/">
                    <span>HOME()</span>
                </a>
            </NavUnit>
            <NavUnit>
                <a href="/#about_me">
                    <span>about_me()</span>
                </a>
            </NavUnit>
            <NavUnit>
                <a href="/Mywork">
                    <span>mywork()</span>
                </a>
            </NavUnit>
            <NavUnit>
                <a href="/projects">
                    <span>projects()</span>
                </a>
            </NavUnit>
            <NavUnit>
                <a href="/Contact">
                    <span>contact()</span>
                </a>
            </NavUnit>
            </ul>
        </nav>
        </div>
    </header>
    </nav>
<slot />
