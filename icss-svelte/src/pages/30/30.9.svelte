图文混排（平行四边形）
<div class="izq"></div>
<div class="dch"></div>
<h1>奇妙的 shape-outside</h1>
<h2>--- Cocoqiao</h2>
<p>Then, the frontal lobes and right hemisphere break down the intention of the speaker and look at things such as body language, tone of voice, and facial expression to interpret differences between the actual meaning of the word and this specific social context of the word.
    And lastly, the right ventromedial prefrontal cortex makes a decision on whether or not the comment is sarcastic based off of our social and emotional interpretation.
Then, the frontal lobes and right hemisphere break down the intention of the speaker and look at things such as body language, tone of voice, and facial expression to interpret differences between the actual meaning of the word and this specific social context of the word.
    And lastly, the right ventromedial prefrontal cortex makes a decision on whether or not the comment is sarcastic based off of our social and emotional interpretation.
	Then, the frontal lobes and right hemisphere break down the intention of the speaker and look at things such as body language, tone of voice, and facial expression to interpret differences between the actual meaning of the word and this specific social context of the word.
    And lastly, the right ventromedial prefrontal cortex makes a decision on whether or not the comment is sarcastic based off of our social and emotional interpretation.
	Then, the frontal lobes and right hemisphere break down the intention of the speaker and look at things such as body language, tone of voice, and facial expression to interpret differences between the actual meaning of the word and this specific social context of the word.
    And lastly, the right ventromedial prefrontal cortex makes a decision on whether or not the comment is sarcastic based off of our social and emotional interpretation.
</p>

<style>
    * {
        position: relative;
    }

    * {
        font-weight: 300;
    }

    h1, h2 {
        background: tomato;
        font-size: 3rem;
        line-height: 5rem;
        color: white;
        shape-outside: content-box;
        shape-margin: 1rem;
        margin: 30vh 2rem 0 -30vw;
        float: left;
        max-width: 60%;
        border-radius: 1rem;
    }

    h2 {
        background: cadetblue;
        float: right;
        margin: 70vh -29vw 0 0;
    }

    .izq {
        background: tomato;
        float: left;
        width: 30%;
        height: 100vh;
        clip-path: polygon(0% 0%, 90% 0%, 10% 100%, 0 100%);
        shape-outside: polygon(0% 0%, 90% 0%, 10% 100%, 0 100%);
        shape-margin: 1rem;
    }

    .dch {
        background: cadetblue;
        float: right;
        width: 30%;
        height: 100vh;
        clip-path: polygon(90% 0%, 100% 0%, 100% 100%, 10% 100%);
        shape-outside: polygon(90% 0%, 100% 0%, 100% 100%, 10% 100%);
        shape-margin: 1rem;
    }

    p {
        padding: 20px;
        font-size: 1.4rem;
        line-height: 2;
        font-weight: 300;
        text-align: justify;
    }
</style>