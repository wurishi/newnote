# Entitas CLI

### Entitas cli
use entitas cli to generate components, extensions & typescript declarations for entitas-ts


    Usage:
    entitas init namespace [-t name]
    entitas create -c name field:type... 
    entitas generate [-p <html5|scala>]
    
    Options:
    -d  [--debug>     # debug html5
    -t  [--template]  # template name
    -c  [--component] # create a component
    -p  [--platform]  # target platform for generated code: 
                            html5   - typescript & javascript combination (default)
                            scala   - scala & scalaJs
                            

Components classes are generated from json configuration, enforcing data oriented design.

### Install

    git clone git@github.com:darkoverlordofdata/entitas-ts.git
    cd entitas-ts
    npm install . -g


    
### Entitas RunTime
For CSharp, use the original: https://github.com/sschmid/Entitas-CSharp
This repository includes a Typescript implementation. Also:

    https://github.com/darkoverlordofdata/entitas-ts
    https://github.com/darkoverlordofdata/entitas-fsharp
    https://github.com/darkoverlordofdata/entitas-kotlin
    https://github.com/darkoverlordofdata/entitas-scala


### Live Demos
* https://darkoverlordofdata.com/entitas-ts-example/
    port of https://github.com/sschmid/Entitas-CSharp-Example
* https://darkoverlordofdata.com/entitas-ts-match-one/
    port of https://github.com/sschmid/Match-One
* [Spaceship Warriors](https://darkoverlordofdata.com/entitas-ts/example.html) 
    port of artemis https://github.com/Flet/spaceship-warrior-redux
* [Scala.js Example](https://darkoverlordofdata.com/invaders-scala-js/)
    new experiment...


### Visual Debugging
See https://darkoverlordofdata.com/entitas-ts-example/

Include dat.gui, and entitas-ts will display live stats for entities, pools, and systems.
 * http://code.google.com/p/dat-gui


    
# MIT License

Copyright (c) 2015-2016 Bruce Davidson &lt;darkoverlordofdata@gmail.com&gt;

Copyright (c) 2014 Simon Schmid

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
