import React from 'react'

const ListContext = React.createContext()

const ListProvider = ListContext.Provider
const ListConsumer = ListContext.Consumer

export  { ListProvider, ListConsumer }
