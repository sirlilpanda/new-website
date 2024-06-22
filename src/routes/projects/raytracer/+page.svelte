<script>
    import Prism from "svelte-prism";
    const mycode = "glm::vec3 c = sceneObjects[shadowRay.index]-&lt; getColor(); \
            if (c == glm::vec3(0))&lbrace;                                       \
                color *= sceneObjects[shadowRay.index]-&lt; getRefractionCoeff();\
            &rbrace;else if (c.x == c.y && c.y == c.z)&lbrace;\
                printf(\"c : %f\n\", 1-sceneObjects[shadowRay.index]-&lt;getRefractionCoeff());\
                color -= sceneObjects[shadowRay.index]-&lt;getRefractionCoeff()*c.x;\
            &rbrace; else &lbrace;\
                c *= sceneObjects[shadowRay.index]-&lt;getRefractionCoeff();\
                glm::vec3 c_max = glm::vec3(std::max(&lbrace;c.x, c.y, c.z&rbrace;));\
                color -= c_max - c;\
            &rbrace;";
</script>
<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/themes/prism-okaidia.min.css'>

<div class="pt-20 items-center justify-center w-screen"> 
    <h1 class="text-5xl text-amber-100 text-center mx-auto w-screen pt-20">Ray Tracer</h1>
    <h2>Introduction</h2>
    <p>
        The ray tracer works by casting rays from a point to a through a point pixel gird, corresponding to the colour of the pixel that the ray traced. This illumination model allows us to only consider the light reaching the camera. the recursive ray tracing that is implemented here allows for serval key features, the ability to render, transparent, refractive, and reflective properties. This is in conjunction with the ability to render, planes, spheres, cones, truncated cones, double cone, and cylinders with caps.
        The simulation takes roughly 1 minute and 10 seconds to render a 1000x1000 pixel grid with a max depth of 6, running on a ryzen 9 5900x.
    </p>
    <h2> Transparent & refractive object shadows</h2>
    <p>Both transparent and refractive object cast lighter shadows based on their coefficients and colors. This was done by checking to see if the closest object intersecting the point to the light source, was either transparent or refractive and not the object itself. If the object the shadow was being cast on to be the object that it was the closest intersection, as in if the objects were the same object, the transparent or refractive would end up with a shadow on it like a regular object, this would no look correct as a clear object should not have a shadow. Once this check was done it would deice how to color the point based on the color of the transparent or refractive object.<p>
    <ul>
        <li>If the color of the object was black, then it would multiply the color of the point with either the transparentCoeff or refractionCoeff.</li>
        <li>If the color was within the gray tones or white, as in if all RGB channels were equal, then the gray tone would be multiplied by the transparentCoeff or refractionCoeff and subtracted from the color at the point. The reason for this subtraction is that this would then move the value of the color at that point closer to zero, there for the color would become darker, showing that it is in shadow.</li>
        <li>Finally, if the color was neither black nor gray/white, the color of the transparent or refractive is be multiplied by the transparentCoeff or refractionCoeff. Then each of the color channel of the object, has the max value of the RGB channels subtracted from it. This causes the value at that point that is in shadow to have a max value of the color that is going through the transparent or refractive object.</li>
    </ul>
    <p>
        <Prism language="cpp" source="{mycode}" />
    </p>
    <p> 
        &rbrace;
        This technique creates lighter shadows for transparent or refractive object while retaining the color that would be passing through them. 
    </p>
    <h2>Texture mapping </h2>




</div>


<style lang="postcss">
ul {
    @apply
    pl-32
    pt-0
    mt-0
    list-disc
    ;
}

li {
    @apply
    text-2xl
    text-amber-100 
    pt-10
    mx-[600px]
    text-justify 
    text-wrap
    ;
}

h2 {
    @apply
    text-3xl text-amber-200 text-center mx-auto w-screen pt-20
    ;
}

p {
        @apply
        text-2xl
        text-amber-100 
        pt-10
        mx-[600px]
        text-justify 
        text-wrap
        ;
    }




</style>