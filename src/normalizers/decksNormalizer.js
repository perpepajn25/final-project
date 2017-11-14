import { normalize, schema } from 'normalizr'

const card = new schema.Entity('cards')
const deck = new schema.Entity('decks', {
  cards: [card]
}
)

const deckList = [ deck ]

export function decksNormalizer(deckData) {
  return normalize(deckData,deckList)
}

export function deckNormalizer(deckData) {
  return normalize(deckData, deck)
}
