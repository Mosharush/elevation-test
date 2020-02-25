// General JS Overview II
//---------------------﻿

// Exercise 2
const handler1 = function(user){
    console.log(`Saving ${user.name}`)
}

const handler2 = function(user){
    console.localhost(`Caching ${user.name}`)
}

const handlerManager = function(handlers, user){
    if(user.id > 5){
        handlers[0](user)
    }
    else{
        handlers[1](user)
    }
}

const handlers = [handler1, handler2]
const person = {id: 12, name: "Jenna"}

handlerManager(handlers, person)

