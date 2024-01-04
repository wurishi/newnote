离屏导航
<div class="page">
    <header>Header</header>
    <div class="nav-container">
        <div class="nav-container__mask" />
        <div class="nav-container__button" tabindex="0">
            <span class="nav-container__button__bar" />
            <span class="nav-container__button__bar" />
            <span class="nav-container__button__bar" />
        </div>
        <div class="nav-container__content" tabindex="0">
            <ul>
                <li><a href="#0">Home</a></li>
                <li><a href="#0">Services</a></li>
                <li><a href="#0">Blog</a></li>
                <li><a href="#0">About</a></li>
                <li><a href="#0">Contact</a></li>
                <li class="nav-container__content__small">
                    <a href="#0">Facebook</a><a href="#0">Instagram</a>
                </li>
            </ul>
        </div>
    </div>
    <main>
        <div class="content">
            <h2>Off-screen navigation using <span>:focus-within</span></h2>
            <p>
                Adding yet another pure CSS technique to the list of off-screen
                navigation by "hacking" the :focus-within pseudo-class. Have a
                look at the code to see how it works.
            </p>
            <small
                ><strong>NB!</strong> Use a browser that supports :focus-within</small
            >
        </div>
    </main>
</div>

<style>
    .page {
        width: 800px;
        height: 500px;
        position: relative;
        background: #eee;
        overflow: hidden;
    }

    header {
        color: white;
        position: absolute;
        font-size: 16px;
        left: 50%;
        top: calc(0px + 35px);
        transform: translate(-50%, -50%);
        z-index: 2;
    }

    .nav-container {
        position: absolute;
        width: 100%;
        height: 70px;
        background: #212121;
        z-index: 1;
    }

    .nav-container__button {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        width: 30px;
        height: 70px;
        justify-content: center;
        margin-left: 25px;
        cursor: pointer;
    }

    .nav-container__button__bar {
        display: block;
        width: 100%;
        height: 3px;
        background-color: #aaa;
        margin-top: 5px;
        transition: 0.3s;
    }

    .nav-container__button__bar:first-of-type {
        margin-top: 0;
    }

    .nav-container__content {
        transform: translateX(-110%);
        transition: 0.3s;
        background: white;
        width: 90%;
        max-width: 300px;
        height: calc(500px - 70px);
        padding: 12px 15px;
        box-sizing: border-box;
        position: absolute;
        top: 70px;
        left: 0;
        box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.3);
    }

    .nav-container__content ul {
        margin: 0;
        list-style: none;
        padding: 0;
        position: relative;
        height: 100%;
    }

    .nav-container__content ul a {
        color: black;
        text-decoration: none;
    }

    .nav-container__content ul a:hover {
        color: darkred;
    }

    .nav-container__content__small {
        position: absolute;
        display: flex;
        flex-direction: row;
        font-size: 12px;
        bottom: 0;
        justify-content: center;
        width: 100%;
    }

    .nav-container__content ul li {
        margin-bottom: 5px;
    }

    .nav-container__content ul li:last-of-type {
        margin-bottom: 0;
    }

    .nav-container__content ul .nav-container__content__small a {
        color: grey;
    }

    .nav-container__content ul .nav-container__content__small a:hover {
        color: darkred;
    }

    .nav-container__content__small a:first-of-type {
        margin-right: 10px;
    }

    .nav-container__mask {
        width: 100%;
        height: 500px;
        background-color: rgba(0, 0, 0, 0.7);
        position: absolute;
        opacity: 0;
        transition: .3s;
    }

    main {
        padding: 100px 50px;
    }

    main h2 span {
        color: darkred;
        font-weight: 100;
    }

    /* 选中 */

    .nav-container:focus-within .nav-container__button__bar:nth-of-type(1) {
        transform: translate3d(0, 8px, 0) rotate(45deg);
    }

    .nav-container:focus-within .nav-container__button__bar:nth-of-type(2) {
        opacity: 0;
    }

    .nav-container:focus-within .nav-container__button__bar:nth-of-type(3) {
        transform: translate(0, -8px) rotate(-45deg);
    }

    .nav-container:focus-within .nav-container__content {
        transform: translateX(0);
    }

    .nav-container:focus-within .nav-container__mask {
        opacity: 1;
    }
</style>
