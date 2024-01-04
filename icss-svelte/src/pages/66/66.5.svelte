<page>
    <div class="card line" />
    <div class="card line2" />
    <div class="card line3" />
    <div class="card line4" />
    <div class="card line5" />
    <div class="card line6" />
</page>

<style>
    page {
        display: flex;
        flex-wrap: wrap;

        --colorMain: #673ab7;
        --colorSub: #00bcd4;
    }

    .card {
        position: relative;
        width: 200px;
        height: 200px;
        box-sizing: border-box;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 24px;
        box-shadow: 1px 1px 4px 2px #222;
    }

    .line {
        background: repeating-linear-gradient(
            45deg,
            var(--colorMain),
            var(--colorSub)
        );

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: repeating-linear-gradient(
                45deg,
                var(--colorMain) 0px,
                var(--colorMain) 4px,
                var(--colorSub) 4px,
                var(--colorSub) 10px
            );
            -webkit-mask: linear-gradient(-45deg, #000, transparent, #000),
                repeating-radial-gradient(
                    #fff 30%,
                    transparent 30%,
                    transparent 60%,
                    #fff 60%,
                    #fff
                ),
                conic-gradient(from 150deg, #fff 10%, transparent, #fff);
            -webkit-mask-composite: xor, destination-in;
        }
    }

    .line2 {
        background: conic-gradient(
            from 90deg,
            var(--colorMain),
            var(--colorSub),
            var(--colorMain)
        );

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(
                var(--colorMain),
                var(--colorSub),
                var(--colorMain)
            );
            -webkit-mask: linear-gradient(90deg, #fff 25%, transparent 0);
            -webkit-mask-position: 50% 50%;
            -webkit-mask-size: 25px 100%;
        }

        &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(
                var(--colorSub),
                var(--colorMain),
                var(--colorSub)
            );
            -webkit-mask: linear-gradient(
                90deg,
                transparent 50%,
                #fff 50%,
                #fff 75%,
                transparent 0
            );
            -webkit-mask-position: 50% 50%;
            -webkit-mask-size: 25px 100%;
            mix-blend-mode: overlay;
        }
    }

    .line3 {
        background: linear-gradient(
            60deg,
            var(--colorSub),
            var(--colorMain),
            var(--colorSub)
        );

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(
                -60deg,
                var(--colorMain),
                var(--colorSub),
                var(--colorMain)
            );
            -webkit-mask: repeating-linear-gradient(
                    45deg,
                    #fff 0,
                    #fff 5px,
                    transparent 5px,
                    transparent 20px
                ),
                repeating-linear-gradient(
                    90deg,
                    #fff 0,
                    #fff 5px,
                    transparent 5px,
                    transparent 20px
                ),
                repeating-linear-gradient(
                    135deg,
                    #fff 0,
                    #fff 5px,
                    transparent 5px,
                    transparent 20px
                ),
                repeating-linear-gradient(
                    180deg,
                    #fff 0,
                    #fff 5px,
                    transparent 5px,
                    transparent 20px
                );
        }
    }

    .line4 {
        background: linear-gradient(135deg, #9c27b0, #0fd9f2);

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(
                -60deg,
                var(--colorMain),
                var(--colorSub)
            );
            -webkit-mask: repeating-linear-gradient(
                    30deg,
                    #fff 0,
                    #fff 20px,
                    transparent 20px,
                    transparent 45px
                ),
                repeating-linear-gradient(
                    60deg,
                    #fff 0,
                    #fff 20px,
                    transparent 20px,
                    transparent 45px
                ),
                repeating-linear-gradient(
                    90deg,
                    #fff 0,
                    #fff 20px,
                    transparent 20px,
                    transparent 45px
                ),
                repeating-linear-gradient(
                    120deg,
                    #fff 0,
                    #fff 20px,
                    transparent 20px,
                    transparent 45px
                ),
                repeating-linear-gradient(
                    150deg,
                    #fff 0,
                    #fff 20px,
                    transparent 20px,
                    transparent 45px
                ),
                repeating-linear-gradient(
                    180deg,
                    #fff 0,
                    #fff 20px,
                    transparent 20px,
                    transparent 45px
                ),
                conic-gradient(
                    transparent 40%,
                    #fff 40%,
                    #fff 50%,
                    transparent 50%,
                    transparent 90%,
                    #fff 90%,
                    #fff 0
                );
            -webkit-mask-composite: xor;
            mask-composite: exclude;
        }
    }

    .line5 {
        background: linear-gradient(var(--colorMain), var(--colorSub));

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: repeating-linear-gradient(
                    0,
                    var(--colorSub) 0,
                    var(--colorSub) 3px,
                    transparent 3px,
                    transparent 10px
                ),
                repeating-linear-gradient(
                    60deg,
                    var(--colorSub) 0,
                    var(--colorSub) 3px,
                    transparent 3px,
                    transparent 10px
                ),
                repeating-linear-gradient(
                    -60deg,
                    var(--colorSub) 0,
                    var(--colorSub) 3px,
                    transparent 3px,
                    transparent 10px
                );
            -webkit-mask: conic-gradient(
                from 45deg,
                transparent,
                #fff,
                transparent 50%
            );
        }

        &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: repeating-linear-gradient(
                    0,
                    var(--colorMain) 0,
                    var(--colorMain) 3px,
                    transparent 3px,
                    transparent 10px
                ),
                repeating-linear-gradient(
                    60deg,
                    var(--colorMain) 0,
                    var(--colorMain) 3px,
                    transparent 3px,
                    transparent 10px
                ),
                repeating-linear-gradient(
                    -60deg,
                    var(--colorMain) 0,
                    var(--colorMain) 3px,
                    transparent 3px,
                    transparent 10px
                );
            -webkit-mask: conic-gradient(
                from -135deg,
                transparent,
                #fff,
                transparent 50%
            );
        }
    }

    .line6 {
        background: conic-gradient(
            from 45deg,
            var(--colorMain),
            var(--colorSub),
            var(--colorMain)
        );

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(
                    circle,
                    var(--colorMain) 40%,
                    transparent 0
                ),
                radial-gradient(circle, var(--colorSub) 20%, transparent 0);
            background-size: 16px 16px;
            background-position: 0 0, 75% 75%;
            -webkit-mask: radial-gradient(circle, transparent 25%, #fff 0),
                radial-gradient(
                    circle,
                    transparent 50%,
                    #fff 0,
                    #fff 75%,
                    transparent 0
                );
            -webkit-mask-size: 12px 12px;
            -webkit-mask-composite: xor;
        }
    }
</style>
