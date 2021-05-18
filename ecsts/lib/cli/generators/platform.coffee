#!/usr/bin/env coffee
###
 * Entitas code generation
 *
 * Generate Entitas Stubs
 *
 *
###
fs = require('fs')
path = require('path')
mkdirp = require('mkdirp')
config = require("#{process.cwd()}/entitas.json")
#location = "#{config.src}/#{config.namespace.replace(/\./g,'/')}/"
location = "#{config.src}/"
sysloc = config.output.systems ? "systems"
liquid = require('liquid.coffee')

getType = (arg) ->
  switch arg
    when 'Int'      then 'Int'
    when 'Float'    then 'Float'
    when 'String'   then 'String'
    when 'Boolean'  then 'Boolean'
    else arg

getDefault = (arg) ->
  switch arg
    when 'Int'      then '0'
    when 'Float'    then '0f'
    when 'String'   then '""'
    when 'Boolean'  then 'false'
    when 'int'      then '0'
    when 'float32'  then '0.0f'
    when 'boolean'  then 'false'
    when 'string'   then '""'
    else 'null'
    
camel = (str) -> str.charAt(0).toLowerCase() + str.substr(1)

params = (args) ->
  s = []
  for arg in args
    name = arg.split(':')[0]
    type = getType(arg.split(':')[1]).replace('?', '') 
    s.push "#{camel(name)}:#{type}"
    
  s.join(', ') 

cparams = (args) ->
  s = []
  for arg in args
    name = arg.split(':')[0]
    type = getType(arg.split(':')[1]) ##.replace('?', '') 
    s.push "#{type} #{camel(name)}"
    
  s.join(', ') 

paramsonly = (args) ->
  s = []
  for arg in args
    name = arg.split(':')[0]
    s.push "#{camel(name)}"
    
  s.join(', ') 

filename = (name, lang) ->
    # if config.output? then if config.output[name]? then config.output[name] else "#{name}.#{lang}" 
    if config.output?
      if config.output[name]? then config.output[name] else "#{name}.#{lang}" 
    else 
      "unknown"

    
merge = (options...) ->
  result = {}
  for opt in options
    result[key] = value for key, value of opt
  result
  
parse = (flags) ->
  result = {}
  for flag in flags
    pair = flag.split(/\s*=\s*/)
    result[pair[0]] = pair[1]
  result

module.exports =
#
# generate code using Liquid template
#
# @return none
#
  run: (lang, flags...) ->
    ext = []
    options = parse(flags)


    # define some custom filters
    liquid.Template.registerFilter class
        @fieldType: (field) -> getType(field.split(':')[1]).replace('?', '')
        @defaultValue: (field) -> getDefault getType(field.split(':')[1]).replace('?', '')
        @camel: camel
        @property: (str) -> str.split(':')[0]
        @params: params
        @cparams: cparams
        @paramsonly: paramsonly
    
    # find externals
    for component, fields of config.components
      unless fields is false
        for field in fields
          type = field.split(':')[1]
          if type.indexOf('.') > -1 then ext.push type
              
          
    folder = "#{__dirname}/lang/"
    if flags[0] == "-t" then folder = path.resolve(flags[1])
    
    # generate the template
    tpl = liquid.Template.parse(fs.readFileSync("#{folder}/#{lang}.components.liquid", 'utf8'))
    code = tpl.render(merge(config, options, ext:ext))
    
    # Components - overwrite
    mkdirp.sync path.dirname(path.join(process.cwd(), location, filename("Components", lang)))
    fs.writeFileSync(path.join(process.cwd(), location, filename("Components", lang)), code)
    
    # systems
    mkdirp.sync path.join(process.cwd(), location, sysloc)
    tpl = liquid.Template.parse(fs.readFileSync("#{folder}/#{lang}.systems.liquid", 'utf8'))
    for Name, interfaces of config.systems
      name = path.join(process.cwd(), location, "#{sysloc}/#{Name}.#{lang}")
      unless fs.existsSync(name)
        code = tpl.render(merge(config, options, name:Name, interfaces:interfaces))
        fs.writeFileSync(name, code) 


